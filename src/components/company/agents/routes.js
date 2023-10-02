import express from "express";
import { createAgent, deleteAgentPermanent, getAllAgents } from "./agents.controller.js";
const router = express.Router();

router.route("/").get(getAllAgents).post(createAgent)
router.route("/delete-permanent/:id").delete(deleteAgentPermanent)


export default router;
