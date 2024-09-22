import express from "express";
import * as billController from "../controllers/billController.js";
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

router
    .route("/:hostId")
    .post(upload.any(), billController.saveBill)
    .get(billController.getAllBills);

router
    .route("/:hostId/:billId")
    .get(billController.getBill)
    .put(billController.editBill)
    .delete(billController.removeBill);

export default router;
