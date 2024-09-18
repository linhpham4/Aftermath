import express from "express";
import * as billController from "../controllers/billController.js";

const router = express.Router();

router
    .route("/bills")
    .post(billController.saveBill);

export default router;
