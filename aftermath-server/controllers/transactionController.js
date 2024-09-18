import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

//---------------------------------------------------------------------------------------------

// Get data for all transactions
const getAllTransactions = async (_req, res) => {
  try {
    const transactionsList = await knex("transactions").select(
      "id",
      "item_id",
      "payment_to_id",
      "payment_from_id"
    );

    res.status(200).json(transactionsList);
  } catch (error) {
    console.log(error);
  }
};

//---------------------------------------------------------------------------------------------

// Get data for a specific transaction
const getTransaction = async (req, res) => {
  try {
    const id = req.params.transactionId;
    const selectedTransaction = await knex("transactions")
      .where({ id })
      .select();

    if (selectedTransaction.length === 0) {
      return res.status(404).json(`Transaction with ID ${id} cannot be found`);
    }

    res.status(200).json(selectedTransaction[0]);
  } catch (error) {
    console.log(error);
  }
};

//---------------------------------------------------------------------------------------------

// Add a transaction
const addTransaction = async (req, res) => {
  try {
     // Checks that request body contains all required data
     if (
      !req.body.item_id ||
      !req.body.payment_to_id ||
      !req.body.payment_from_id ||
      !req.body.total ||
      !req.body.settled
    ) {
      return res.status(400).json("Please provide all required transaction information");
    }

    // Checks that item with id matching bill_id from the request exists
    const items = await knex("items");
    if (!items.find((item) => item.id === req.body.item_id)) {
      return res.status(400).json(`Item with ID ${req.body.item_id} not found`);
    }

    // Checks that people with id matching payment_to_id and payment_from_id from the request exists
    const people = await knex("people");
    if (!people.find((person) => person.id === req.body.payment_to_id)) {
      return res.status(400).json(`Person with ID ${req.body.payment_to_id} not found`);
    }

    if (!people.find((person) => person.id === req.body.payment_from_id)) {
      return res.status(400).json(`Person with ID ${req.body.payment_from_id} not found`);
    }

    // Checks if the value of total is a number
    if (typeof req.body.total !== "number") {
      return res.status(400).json("Total must be a number");
    }

    // Checks if the value of settled is a boolean
    if (typeof req.body.settled !== "boolean") {
      return res.status(400).json("Value of settled must be a boolean");
    }

    const updatedTransactionsList = await knex("transactions").insert(req.body);
    const newTransactionId = updatedTransactionsList[0];
    const newTransaction = await knex("transactions").where({ id: newTransactionId }).select();

    res.status(200).json(newTransaction[0]);
  } catch (error) {
    console.log(error);
  }
};

//---------------------------------------------------------------------------------------------

export { getAllTransactions, getTransaction, addTransaction };
