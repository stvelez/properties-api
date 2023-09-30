import express from "express";
import propertiesRoutes from "../../components/properties/routes.js";
const routes = express.Router();


routes.use("/properties",propertiesRoutes);

export default routes;