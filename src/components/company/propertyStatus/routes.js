import express from "express";
import { getPropertyStatus } from "./propertyStatus.controller.js";

const router = express.Router();

router.route("/").get(getPropertyStatus)



export default router;
