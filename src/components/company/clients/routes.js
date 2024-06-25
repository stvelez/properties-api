import express from "express";
import { getClients, getClientById } from "./clients.controller.js";

const router = express.Router();

router.route("/").get(getClients)
router.route("/:id").get(getClientById)



export default router;
