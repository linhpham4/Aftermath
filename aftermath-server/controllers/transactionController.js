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

export { getAllTransactions, getTransaction };
