import express from "express";
import agentsRoutes from "../../../components/company/agents/routes.js";
const routes = express.Router();

routes.use("/agents", agentsRoutes);

export default routes;