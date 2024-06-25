import express from "express";
import {
  postContactme,
} from "./contactme.controller.js";

const router = express.Router();

router
  .route("/")
  .post(postContactme)

export default router;
