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
const convertBill = async (req, res) => {
  try {
/* 
  ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
  │     change from static file to file user upload later!                                                              │
  └─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
 */
    // Create new form to append image file to
    const form = new FormData();
    form.append("file", fs.createReadStream("./public/images/bill1.png"));

    // POST request to Veryfi API
    const response = await axios.post(BASE_URL, form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          "CLIENT-ID": `${CLIENT_ID}`,
          AUTHORIZATION: `apikey ${USERNAME}:${API_KEY}`,
        },
      }
    );

    res.status(200).json(response.data.img_url)
  } catch (error) {
    console.log(error);
  }
};

export { convertBill };
