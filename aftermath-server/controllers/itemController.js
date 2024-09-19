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
      req.body.quantity === undefined ||
      req.body.total === undefined
    ) {
      return res.status(400).json("Please provide all required item information");
    };

    // Checks that a bill in the bills table has an id matching bill_id from the request
    const foundBill = await knex("bills").where("id", req.body.bill_id);
    if (foundBill.length === 0){
      return res.status(400).json(`Bill with ID ${req.body.bill_id} not found`);
    };

    // Checks if the value of quantity and total is a number
    if (typeof req.body.quantity !== "number" || typeof req.body.total !== "number") {
      return res.status(400).json("Quantity and total must be a number");
    };

    // Checks that the value of quantity and total is not zero
    if (req.body.quantity === 0 || req.body.total === 0){
      return res.status(400).json("Quantity and total cannot be zero for an existing item");
    };

    const updatedItemsList = await knex("items").insert(req.body);
    const newItemId = updatedItemsList[0];
    const newItem = await knex("items").where({ id: newItemId }).select();

    res.status(201).json(newItem[0]);
  } catch (error) {
    console.log(error);
  }
};

//---------------------------------------------------------------------------------------------

// Edit an item
const editItem = async (req, res) => {
  try {
    const id = req.params.itemId;

    // Checks that item with id matching itemId exists
    const foundItem = await knex("items").where({ id }).select();
    if (foundItem.length === 0) {
      res.status(404).json(`Item with ID ${id} cannot be found`)
    }

    // Checks that request boday contains all required data
    if (
      !req.body.bill_id ||
      !req.body.description ||
      req.body.quantity === undefined ||
      req.body.total === undefined
    ) {
      return res.status(400).json("Please provide all required item information");
    };

    // Checks that a bill in the bills table has an id matching bill_id from the request
    const foundBill = await knex("bills").where("id", req.body.bill_id);
    if (foundBill.length === 0){
      return res.status(400).json(`Bill with ID ${req.body.bill_id} not found`);
    };

    // Checks if the value of quantity and total is a number
    if (typeof req.body.quantity !== "number" || typeof req.body.total !== "number") {
      return res.status(400).json("Quantity and total must be a number");
    };

    // Checks that the value of quantity and total is not zero
    if (req.body.quantity === 0 || req.body.total === 0){
      return res.status(400).json("Quantity and total cannot be zero for an existing item");
    };

    // Checks that bill_id has not been changed
    if (foundItem[0].bill_id !== req.body.bill_id) {
      return res.status(400).json("Item cannot be moved to another bill");
    }

    await knex("items").where({ id }).update(req.body);
    const updatedItem = await knex("items").where({ id }).select();

    res.status(200).json(updatedItem[0]);
  } catch (error) {
    console.log(error);
  }
};

//---------------------------------------------------------------------------------------------

// Delete an item
const removeItem = async (req, res) => {
  try {
    const id = req.params.itemId;
    const selectedItem = await knex("items").where({ id }).select();

    if (selectedItem.length === 0) {
      return res.status(404).json(`Item with ID ${id} cannot be found`);
    }

    await knex("items").where({ id }).del();
    
    res.status(200).end();
  } catch (error) {
    console.log(error);
  }
};

//---------------------------------------------------------------------------------------------

export { getAllItems, getItem, addItem, editItem, removeItem };
