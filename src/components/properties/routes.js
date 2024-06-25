import express from "express";
import {
  getAllProperties,
  getpropertyById,
} from "./properties.controller.js";

const router = express.Router();

router
  .route("/")
  .get(getAllProperties)
router.route("/:id").get(getpropertyById);

export default router;
