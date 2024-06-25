import express from "express";
import {
  createProperty,
  deletePermanentlyProperty,
  getAllProperties,
  getpropertyById,
  removeAllCharacteristics,
  updateProperty,
  updateImageProperty,
  deleteImageProperty,
  deleteProperty,
  activeProperty,
} from "./properties.controller.js";
import { validateCreateProperty } from "../../../validators/properties.validator.js";
import upload from "../../../middleware/upload.js";

const router = express.Router();

router
  .route("/")
  .get(getAllProperties)
  .post(validateCreateProperty, createProperty);

router
  .route("/:id")
  .get(getpropertyById)
  .put(updateProperty)
  .delete(deleteProperty);
router.route("/active/:id").put(activeProperty);
router.route("/update-image/:id").put(upload, updateImageProperty);
router.route("/delete-image/:id").delete(deleteImageProperty);
router.route("/delete-permanently/:id").delete(deletePermanentlyProperty);
router.route("/clean-characteristics/:id").put(removeAllCharacteristics);

export default router;
