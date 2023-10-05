import express from "express";
import { getNeighborhoods } from "./neighborhoods.controller.js";
const router = express.Router();

router.route("/").get(getNeighborhoods)



export default router;
