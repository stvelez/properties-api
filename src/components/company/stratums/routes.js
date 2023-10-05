import express from "express";
import { getAllStratums } from "./stratums.controller.js";
const router = express.Router();

router.route("/").get(getAllStratums)



export default router;
