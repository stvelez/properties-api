import express from "express";
import { getAllofferTypes } from "./offerTypes.controller.js";


const router = express.Router();

router.route("/").get(getAllofferTypes)



export default router;
