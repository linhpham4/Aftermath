import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

//---------------------------------------------------------------------------------------------

// Get data for all transactions
const getAllPeople = async (_req, res) => {
  try {
    const peopleList = await knex("people").select("id", "name");

    res.status(200).json(peopleList);
  } catch (error) {
    console.log(error);
  }
};

//---------------------------------------------------------------------------------------------

// Get data for a specific transaction
const getPerson = async (req, res) => {
  try {
    const id = req.params.personId;
    const selectedPerson = await knex("people").where({ id }).select();

    if (selectedPerson.length === 0) {
      return res.status(404).json(`Person with ID ${id} cannot be found`);
    }

    res.status(200).json(selectedPerson[0]);
  } catch (error) {
    console.log(error);
  }
};

//---------------------------------------------------------------------------------------------

export { getAllPeople, getPerson };
