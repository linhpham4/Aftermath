import initKnex from "knex";
import configuration from "../knexfile.js";
import validator from "validator";

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

// Add an item
const addPerson = async (req, res) => {
  try {
    // Checks that name property is defined
    if (!req.body.name) {
      return res.status(400).json("Person must be named");
    }

    // Checks that if email has a value, it is in the correct format
    if (req.body.email && !validator.isEmail(req.body.email)) {
      return res.status(400).json(`Invalid email address`);
    }

    // Checks email does not already exist in people table
    const peopleList = await knex("people");
    peopleList.map((person) => {
      if(person.email === req.body.email) {
        return res.status(400).json(`User with email ${req.body.email} already exists`);
      }
    });

    const updatedPeopleList = await knex("people").insert(req.body);
    const newPersonId = updatedPeopleList[0];
    const newPerson = await knex("people").where({ id: newPersonId }).select();

    res.status(200).json(newPerson[0]);
  } catch (error) {
    console.log(error);
  }
};

//---------------------------------------------------------------------------------------------

export { getAllPeople, getPerson, addPerson };
