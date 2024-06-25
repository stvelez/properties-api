import express from "express";
import {
  getAllPropertyCharacteristics,
  removePropertyCharacteristic,
  addPropertyCharacteristic,
} from "./propertyCharacteristics.controller.js";

const router = express.Router();

router
  .route("/")
  .get(getAllPropertyCharacteristics)
  .post(addPropertyCharacteristic)

router.route("/:id").put(removePropertyCharacteristic);
export default router;
