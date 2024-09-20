import express from "express";
import * as transactionController from "../controllers/transactionController.js";

const router = express.Router();

router
    .route("/")
    .get(transactionController.getAllTransactions)
    .post(transactionController.addTransaction);

router
    .route("/:transactionId")
    .get(transactionController.getTransaction)
    .put(transactionController.editTransaction)
    .delete(transactionController.removeTransaction);

export default router;