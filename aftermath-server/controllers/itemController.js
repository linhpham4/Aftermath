import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

//---------------------------------------------------------------------------------------------

// Get data for all items
const getAllItems = async (_req, res) => {
  try {
    const itemsList = await knex("items").select(
      "id",
      "bill_id",
      "description"
    );

    res.status(200).json(itemsList);
  } catch (error) {
    console.log(error);
  }
};

//---------------------------------------------------------------------------------------------

// Get data for a specific item
const getItem = async (req, res) => {
  try {
    const id = req.params.itemId;
    const selectedItem = await knex("items").where({ id }).select();

    if (selectedItem.length === 0) {
      return res.status(404).json(`Item with ID ${id} cannot be found`);
    }

    res.status(200).json(selectedItem[0]);
  } catch (error) {
    console.log(error);
  }
};

//---------------------------------------------------------------------------------------------

// Add an item
const addItem = async (req, res) => {
  try {
    // Checks that request boday contains all required data
    if (
      !req.body.bill_id ||
      !req.body.description ||
      !req.body.quantity ||
      !req.body.total
    ) {
      return res.status(400).json("Please provide all required item information");
    }

    // Checks that a bill in the bills table has an id matching bill_id from the request
    const bills = await knex("bills");
    if (!bills.find((bill) => bill.id === req.body.bill_id)) {
      return res.status(400).json(`Bill with ID ${req.body.bill_id} not found`);
    }

    // Checks if the value of quantity and total is a number
    if (typeof req.body.quantity !== "number" || typeof req.body.total !== "number") {
      return res.status(400).json("Quantity and total must be a number");
    }

    const updatedItemsList = await knex("items").insert(req.body);
    const newItemId = updatedItemsList[0];
    const newItem = await knex("items").where({ id: newItemId }).select()

    res.status(200).json(newItem[0]);
  } catch (error) {
    console.log(error);
  }
};

//---------------------------------------------------------------------------------------------

export { getAllItems, getItem, addItem };
