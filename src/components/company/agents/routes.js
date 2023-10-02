import express from "express";
import { createAgent, getAllAgents } from "./agents.controller.js";
const router = express.Router();

router.route("/").get(getAllAgents).post(createAgent)


export default router;
