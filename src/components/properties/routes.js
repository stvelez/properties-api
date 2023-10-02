import express from "express";
import { createProperty, getAllProperties, getpropertyById } from "./properties.controller.js";

const router = express.Router();

router.route("/").get(getAllProperties).post(createProperty)
router.route("/:id").get(getpropertyById);

export default router;
