import initKnex from "knex";
import configuration from "../knexfile.js";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";

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
    const imageUrl = req.body.url;
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

    /* 
      ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
      │ host_id will change dynamically later when there are multiple users                                                         │
      └─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
     */

    // Add the necessary data from Veryfi API response to bills table
    const newBill = await knex("bills").insert({
      host_id: 1,
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
        total: line_item.total,
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
      .select("items.id", "items.description", "items.quantity", "items.total");

    const responseObj = { ...newBillData[0], line_items: newItemsData };

    res.status(201).json(responseObj);
  } catch (error) {
    console.log(error);
  }
};

//---------------------------------------------------------------------------------------------

// Get data for all bills
const getAllBills = async (_req, res) => {
  try {
    const billsList = await knex("bills").select("id", "host_id", "restaurant", "created_at");

    res.status(200).json(billsList);
  } catch (error) {
    console.log(error);
  }
};

//---------------------------------------------------------------------------------------------

// Get data for specific bill
const getBill = async (req, res) => {
  try {
    const id = req.params.billId;
    const selectedBill = await knex("bills").where({ id }).select();

    if (selectedBill.length === 0) {
      return res.status(404).json(`Bill with ID ${id} cannot be found`);
    }

    res.status(200).json(selectedBill[0]);
  } catch (error) {
    console.log(error);
  }
};

//---------------------------------------------------------------------------------------------

export { saveBill, getBill, getAllBills };
