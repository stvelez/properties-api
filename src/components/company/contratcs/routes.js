import express from "express";
import { createContract, getContract, getContracts } from "./contracts.controller.js";
const router = express.Router();

router.route("/").get(getContracts).post(createContract);
router.route("/:id").get(getContract);

export default router;
