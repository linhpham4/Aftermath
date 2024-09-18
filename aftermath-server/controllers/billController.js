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

// Upload image to Veryfi API bucket to be processed into json data
const convertBill = async (imageUrl) => {
  try {
    // Create new form to append image file to
    const form = new FormData();
    form.append("file", fs.createReadStream(`${imageUrl}`));

    // POST request to Veryfi API
    const response = await axios.post(BASE_URL, form, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        "CLIENT-ID": `${CLIENT_ID}`,
        AUTHORIZATION: `apikey ${USERNAME}:${API_KEY}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
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

    /* 
      ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
      │ host_id will change dynamically later when there are multiple users                                                         │
      └─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
     */

    // Add the necessary data from Veryfi API response to database
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
    const newBillData = await knex("bills").where({ id: newBillId }).select();

    res.status(201).json(newBillData[0]);
  } catch (error) {
    console.log(error);
  }
};

//---------------------------------------------------------------------------------------------

export { saveBill };
