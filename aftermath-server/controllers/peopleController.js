import initKnex from "knex";
import configuration from "../knexfile.js";
import validator from "validator";

const knex = initKnex(configuration);

//---------------------------------------------------------------------------------------------

// Get data for all people
const getAllPeople = async (_req, res) => {
  try {
    const peopleList = await knex("people").select("id", "name");

    res.status(200).json(peopleList);
  } catch (error) {
    console.log(error);
  }
};

//---------------------------------------------------------------------------------------------

// Get data for a specific person
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

// Add an person
const addPerson = async (req, res) => {
  try {
    // Checks that name property is defined
    if (!req.body.name) {
      return res.status(400).json("Person must be named");
    }

    // Checks that if email has a value, it is in the correct format
    if (req.body.email && !validator.isEmail(req.body.email)) {
      return res.status(400).json("Invalid email address");
    }

    // Checks that email value does not already exist in people table
    const peopleList = await knex("people");
    if (peopleList.find((person) => person.email === req.body.email)) {
      return res.status(400).json(`User with email ${req.body.email} already exists`);
    };

    const updatedPeopleList = await knex("people").insert(req.body);
    const newPersonId = updatedPeopleList[0];
    const newPerson = await knex("people").where({ id: newPersonId }).select();

    res.status(200).json(newPerson[0]);
  } catch (error) {
    console.log(error);
  }
};

//---------------------------------------------------------------------------------------------

// Edit a person
const editPerson = async (req, res) => {
  try {
    const id = req.params.personId;

    // Checks that person with id matching personId exists
    const selectedPerson = await knex("people").where({ id }).select();
    if (selectedPerson.length === 0) {
      return res.status(404).json(`Person with ID ${id} cannot be found`);
    }

    // Checks that name property is defined
    if (!req.body.name) {
      return res.status(400).json("Person must be named");
    }

    // Checks that if email has a value, it is in the correct format
    if (req.body.email && !validator.isEmail(req.body.email)) {
      return res.status(400).json("Invalid email address");
    }

    // Checks if person was added with an email originally, updated email cannot be empty
    if (selectedPerson[0].email && !req.body.email) {
      return res.status(400).json("Email cannot be left empty")
    }

    // Checks that email value does not already exist in people table
    // except if email has not been changed from original
    const peopleList = await knex("people");
    if (selectedPerson[0].email !== req.body.email &&
      peopleList.find((person) => person.email === req.body.email)
    ){
      return res.status(400).json(`User with email ${req.body.email} already exists`);
    }

    await knex("people").where({ id }).update(req.body);
    const updatedPerson = await knex("people").where({ id }).select();

    res.status(200).json(updatedPerson[0]);
  } catch (error) {
    console.log(error);
  }
};

//---------------------------------------------------------------------------------------------

export { getAllPeople, getPerson, addPerson, editPerson };
