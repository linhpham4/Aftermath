import express from "express";
import * as itemController from "../controllers/itemController.js";

const router = express.Router();

router
    .route("/")
    .get(itemController.getAllItems)
    .post(itemController.addItem);

router
    .route("/:itemId")
    .get(itemController.getItem)
    .put(itemController.editItem)
    .delete(itemController.removeItem);

export default router;