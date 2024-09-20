import express from "express";
import * as billController from "../controllers/billController.js";
import * as itemController from "../controllers/itemController.js";
import * as transactionController from "../controllers/transactionController.js";
import * as peopleController from "../controllers/peopleController.js";
import multer from "multer";

const router = express.Router();

// Store image uploaded from front end into public/images folder
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/images")
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`)
    }
});

const upload = multer({storage: storage});

// Bills
router
    .route("/bills")
    .post(upload.any(), billController.saveBill)
    .get(billController.getAllBills);

router
    .route("/bills/:billId")
    .get(billController.getBill)
    .put(billController.editBill)
    .delete(billController.removeBill);

// Items
router
    .route("/items")
    .get(itemController.getAllItems)
    .post(itemController.addItem);

router
    .route("/items/:itemId")
    .get(itemController.getItem)
    .put(itemController.editItem)
    .delete(itemController.removeItem);

// Transactions
router
    .route("/transactions")
    .get(transactionController.getAllTransactions)
    .post(transactionController.addTransaction);

router
    .route("/transactions/:transactionId")
    .get(transactionController.getTransaction)
    .put(transactionController.editTransaction)
    .delete(transactionController.removeTransaction);


// People
router
    .route("/people")
    .get(peopleController.getAllPeople)
    .post(peopleController.addPerson);

router
    .route("/people/:personId")
    .get(peopleController.getPerson)
    .put(peopleController.editPerson)
    .delete(peopleController.removePerson);

export default router;
