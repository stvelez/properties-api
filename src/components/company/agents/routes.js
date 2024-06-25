import express from "express";
import { createAgent, deleteAgentPermanent, getAllAgents } from "./agents.controller.js";
import { validateCreateAgent } from "../../../validators/agents.validator.js";
const router = express.Router();

router.route("/").get(getAllAgents).post(validateCreateAgent,createAgent)
router.route("/delete-permanent/:id").delete(deleteAgentPermanent)


export default router;
