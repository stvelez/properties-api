import express from "express";
import v1Routes from "./versions/v1/public.routes.js";
import res from "express/lib/response.js";
const routes = express.Router();

routes.route("/agents",(res,req)=>{
    res.json({
        message:"Hola mundo"
    })
})

export default routes;  