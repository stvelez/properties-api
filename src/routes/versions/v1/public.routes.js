import express from "express";
import propertiesRoutes from "../../../components/properties/routes.js";
import contactMeRoutes from "../../../components/contactme/routes.js";
const routes = express.Router();


routes.use("/properties",propertiesRoutes);
routes.use("/contact-me",contactMeRoutes);

export default routes;