import express from "express";
import * as billController from "../controllers/billController.js";

const router = express.Router();

router
    .route("/bills")
    .post(billController.saveBill);

router
    .route("/bills/:id")
    .get(billController.getBill);

export default router;
