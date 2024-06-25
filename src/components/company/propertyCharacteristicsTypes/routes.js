import express from "express";
import { getAllPropertyCharacteristicsTypes } from "./propertyCharacteristicsTypes.controller.js";

const router = express.Router();

router.route("/").get(getAllPropertyCharacteristicsTypes)

export default router;