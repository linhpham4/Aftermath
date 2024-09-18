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

    const updatedItemsList = await knex("items").insert(req.body);
    const newItemId = updatedItemsList[0];
    const newItem = await knex("items").where({ id: newItemId }).select()

    res.status(200).json(newItem);
  } catch (error) {
    console.log(error);
  }
};

//---------------------------------------------------------------------------------------------

export { getAllItems, getItem, addItem };
