import express from "express";
import * as peopleController from "../controllers/peopleController.js";

const router = express.Router();

router
    .route("/")
    .get(peopleController.getAllPeople)
    .post(peopleController.addPerson);

router
    .route("/:personId")
    .get(peopleController.getPerson)
    .put(peopleController.editPerson)
    .delete(peopleController.removePerson);

export default router;