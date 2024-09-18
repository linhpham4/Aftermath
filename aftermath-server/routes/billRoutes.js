import express from "express";
import * as billController from "../controllers/billController.js";
import * as itemController from "../controllers/itemController.js";
import * as transactionController from "../controllers/transactionController.js";
import * as peopleController from "../controllers/peopleController.js";

const router = express.Router();
// Bills
router
    .route("/bills")
    .post(billController.saveBill)
    .get(billController.getAllBills);

router
    .route("/bills/:billId")
    .get(billController.getBill)

// Items
router
    .route("/items")
    .get(itemController.getAllItems)
    .post(itemController.addItem);

router
    .route("/items/:itemId")
    .get(itemController.getItem);

// Transactions
router
    .route("/transactions")
    .get(transactionController.getAllTransactions);

router
    .route("/transactions/:transactionId")
    .get(transactionController.getTransaction);


// People
router
    .route("/people")
    .get(peopleController.getAllPeople)
    .post(peopleController.addPerson);

router
    .route("/people/:personId")
    .get(peopleController.getPerson);

export default router;
