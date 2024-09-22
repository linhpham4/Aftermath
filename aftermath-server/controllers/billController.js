import initKnex from "knex";
import configuration from "../knexfile.js";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import path from "path";

const knex = initKnex(configuration);

const BASE_URL = "https://api.veryfi.com/api/v8/partner/documents";
const CLIENT_ID = process.env.CLIENT_ID;
const USERNAME = process.env.USERNAME;
const API_KEY = process.env.API_KEY;

// // Upload image to Veryfi API bucket to be processed into json data
// const convertBill = async (imageUrl) => {
//   try {
//     // Create new form to append image file to
//     const form = new FormData();
//     form.append("file", fs.createReadStream(`${imageUrl}`));

//     // POST request to Veryfi API
//     const response = await axios.post(BASE_URL, form, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Accept: "application/json",
//         "CLIENT-ID": `${CLIENT_ID}`,
//         AUTHORIZATION: `apikey ${USERNAME}:${API_KEY}`,
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

//---------------------------------------------------------------------------------------------

// DELETE LATER ******
// Use with mock data to avoid using up API call limit
const convertBill = async (imageUrl) => {
  const mockData = fs.readFileSync("./mockData.json");
  return JSON.parse(mockData);
};

//---------------------------------------------------------------------------------------------

// Call convertBill and save the response to database
const saveBill = async (req, res) => {
  try {
    const hostId = req.params.hostId;

    const foundPerson = await knex("people").where({ id: hostId }).select();
    if (foundPerson.length === 0) {
      res.status(404).json(`Person with ID ${hostId} cannot be found`);
    }

    // Order image files in public/images folder from latest to oldest
    const orderFiles = (dir) => {
      return fs.readdirSync(dir)
        .map(file => ({ file, mtime: fs.lstatSync(path.join(dir, file)).mtime }))
        .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
    }

    // Get url of latest image 
    const latestImage = orderFiles("./public/images");
    const imageUrl = `./public/images/${latestImage[0].file}`;

    const bill = await convertBill(imageUrl);

    // If there are any properties that are null, set the value to 0 instead
    for (const property in bill) {
      if (bill[property] === null) {
        bill[property] = 0;
      }
    }

    // Same check for line_items
    for (const line_item of bill.line_items) {
      for (const property in line_item) {
        if (line_item[property] === null) {
          line_item[property] = 0;
        }
      }
    }

    // Add the necessary data from Veryfi API response to bills table
    const newBill = await knex("bills").insert({
      host_id: hostId,
      restaurant: bill.vendor.name,
      subtotal: bill.subtotal,
      tax: bill.tax,
      tip: bill.tip,
      total: bill.total,
      image_url: bill.img_url,
    });

    const newBillId = newBill[0];

    // Add each line item data into items table
    bill.line_items.map(async (line_item) => {
      await knex("items").insert({
        bill_id: newBillId,
        description: line_item.description,
        quantity: line_item.quantity,
        item_total: line_item.total,
      });
    });

    // Create response object combining bill and items
    const newBillData = await knex("bills")
      .where({ id: newBillId })
      .select(
        "bills.id",
        "bills.host_id",
        "bills.restaurant",
        "bills.subtotal",
        "bills.tax",
        "bills.tip",
        "bills.total",
        "bills.image_url"
      );

    const newItemsData = await knex("items")
      .where({ bill_id: newBillId })
      .select("items.id", "items.description", "items.quantity", "items.item_total");

    const responseObj = { ...newBillData[0], line_items: newItemsData };

    res.status(201).json(responseObj);
  } catch (error) {
    console.log(error);
  }
};

//---------------------------------------------------------------------------------------------

// Get data for all bills
const getAllBills = async (req, res) => {
  try {
    const hostId = req.params.hostId;

    const billsList = await knex("bills").where({ host_id: hostId }).select(
      "id",
      "host_id",
      "restaurant",
      "created_at"
    );

    if(billsList.length === 0) {
      res.status(404).json(`Person with ID ${hostId} has not created any bills`);
    }

    res.status(200).json(billsList);
  } catch (error) {
    console.log(error);
  }
};

//---------------------------------------------------------------------------------------------

// Get bill and item data for a specific bill
const getBill = async (req, res) => {
  try {
    const id = req.params.billId;
    const selectedBill = await knex("bills").where({ id }).select();

    if (selectedBill.length === 0) {
      return res.status(404).json(`Bill with ID ${id} cannot be found`);
    }

    const billItems = await knex("items")
      .where({ bill_id: id })
      .select("id", "description", "quantity", "total");

    const billDetails = { ...selectedBill[0], line_items: billItems };

    res.status(200).json(billDetails);
  } catch (error) {
    console.log(error);
  }
};

//---------------------------------------------------------------------------------------------

// Edit a bill
const editBill = async (req, res) => {
  try {
    const id = req.params.billId;

    // Checks that bill with id matching billId exists
    const selectedBill = await knex("bills").where({ id }).select();
    if (selectedBill.length === 0) {
      return res.status(404).json(`Bill with ID ${id} cannot be found`);
    }

    // Checks that request boday contains all required data
    if (
      !req.body.host_id ||
      req.body.subtotal === undefined ||
      req.body.tax === undefined ||
      req.body.tip === undefined ||
      req.body.total === undefined ||
      !req.body.image_url
    ) {
      return res.status(400).json("Please provide all required item information");
    }

    // Checks that a person in the people table has an id matching host_id from the request
    const foundPerson = await knex("people").where("id", req.body.host_id);
    if (foundPerson.length === 0) {
      return res.status(400).json(`Person with ID ${req.body.host_id} not found`);
    }

    // Checks if the value of subtotal, tax, tip(if any), and total is a number
    if (
      typeof req.body.subtotal !== "number" ||
      typeof req.body.tax !== "number" ||
      (req.body.tip !== undefined && typeof req.body.tip !== "number") ||
      typeof req.body.total !== "number"
    ) {
      return res.status(400).json("Subtotal, tax, tip (if any), and total must be a number");
    }

    // Checks that the value of subtotal and total is not zero
    if (req.body.subtotal === 0 || req.body.tax === 0 || req.body.total === 0) {
      return res.status(400).json("Subtotal, tax, and total cannot be zero for an existing bill");
    }

    // Checks that host_id has not been changed
    if (selectedBill[0].host_id !== req.body.host_id) {
      return res.status(400).json("Host cannot be changed for an existing bill");
    }

    await knex("bills").where({ id }).update(req.body);
    const updatedBill = await knex("bills").where({ id }).select();

    res.status(200).json(updatedBill[0]);
  } catch (error) {
    console.log(error);
  }
};

//---------------------------------------------------------------------------------------------

// Delete a bill
const removeBill = async (req, res) => {
  try {
    const id = req.params.billId;
    const selectedBill = await knex("bills").where({ id }).select();

    if (selectedBill.length === 0) {
      return res.status(404).json(`Bill with ID ${id} cannot be found`);
    }

    await knex("bills").where({ id }).del();

    res.status(200).end();
  } catch (error) {
    console.log(error);
  }
};
  
  //---------------------------------------------------------------------------------------------

export { saveBill, getBill, getAllBills, editBill, removeBill };
