import express from "express";
import { getAllPropertyCharacteristics } from "./propertyCharacteristics.controller.js";

const router = express.Router();

router.route("/").get(getAllPropertyCharacteristics)

export default router;