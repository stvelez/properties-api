import express from "express";
import agentsRoutes from "../../../components/company/agents/routes.js";
import propertyTypesRoutes from "../../../components/company/propertyTypes/routes.js";
import offerTypesRoutes from "../../../components/company/offerTypes/routes.js";
import stratumsRouters from "../../../components/company/stratums/routes.js";
import neighborhoodsRoutes  from "../../../components/company/neighborhoods/routes.js";
import propertyCharacteristicsRoutes from "../../../components/company/propertyCharacteristics/routes.js";

const routes = express.Router();

routes.use("/agents", agentsRoutes);
routes.use("/property-types", propertyTypesRoutes);
routes.use("/offer-types", offerTypesRoutes);
routes.use("/stratums", stratumsRouters);
routes.use("/neighborhoods", neighborhoodsRoutes);
routes.use("/property-characteristics", propertyCharacteristicsRoutes)

export default routes;
