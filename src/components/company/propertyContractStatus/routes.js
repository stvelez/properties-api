import express from "express";
import { getpropertyContractStatus } from "./propertyContractStatus.controller.js";

const router = express.Router();

router.route("/").get(getpropertyContractStatus)



export default router;
