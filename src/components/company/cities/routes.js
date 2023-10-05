import express from "express";
import { getCities } from "./cities.controller.js ";

const router = express.Router();

router.route("/").get(getCities)



export default router;
