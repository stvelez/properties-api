import express from "express";
import publicRoutes from "./public.routes.js";
import companyRoutes from "./company.routes.js";
const routes = express.Router();

routes.use("/",publicRoutes);
routes.use("/company",companyRoutes);

export default routes;  