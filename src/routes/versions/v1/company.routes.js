import express from "express";
import agentsRoutes from "../../../components/company/agents/routes.js";
import propertyTypesRoutes from "../../../components/company/propertyTypes/routes.js";
import offerTypesRoutes from "../../../components/company/offerTypes/routes.js";
import stratumsRouters from "../../../components/company/stratums/routes.js";
import neighborhoodsRoutes  from "../../../components/company/neighborhoods/routes.js";
import propertyCharacteristicsRoutes from "../../../components/company/propertyCharacteristics/routes.js";
import propertyCharacteristicsTypesRoutes from "../../../components/company/propertyCharacteristicsTypes/routes.js";
import citiesRoutes from "../../../components/company/cities/routes.js";
import propertyContractStatusRoutes from "../../../components/company/propertyContractStatus/routes.js";
import propertiesRoutes from '../../../components/company/properties/routes.js'
import clientsRoutes from '../../../components/company/clients/routes.js'
import authRoutes from '../../../components/company/auth/routes.js'
import propertyStatus from "../../../components/company/propertyStatus/routes.js";
import contractsRoutes from "../../../components/company/contratcs/routes.js";

const routes = express.Router();

routes.use("/properties",propertiesRoutes)
routes.use("/agents", agentsRoutes);
routes.use("/clients", clientsRoutes);
routes.use("/property-types", propertyTypesRoutes);
routes.use("/offer-types", offerTypesRoutes);
routes.use("/stratums", stratumsRouters);
routes.use("/neighborhoods", neighborhoodsRoutes);
routes.use("/property-characteristics", propertyCharacteristicsRoutes)
routes.use("/property-characteristics-types", propertyCharacteristicsTypesRoutes)
routes.use("/cities",citiesRoutes)
routes.use("/property-status",propertyStatus) 
routes.use("/property-contract-status",propertyContractStatusRoutes)
routes.use("/auth", authRoutes);
routes.use("/contracts", contractsRoutes);

export default routes;
