import express from "express";
import v1Routes from "./versions/v1/routes.js";
const routes = express.Router();


routes.use("/v1",v1Routes);

export default routes;  