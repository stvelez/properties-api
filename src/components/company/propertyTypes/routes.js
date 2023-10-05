import express from "express";
import { getAllpropertyTypes } from "./propertyTypes.controller.js";
const router = express.Router();

router.route("/").get(getAllpropertyTypes)



export default router;
