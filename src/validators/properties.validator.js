import validate from "../helpers/validate.js";
import { check } from "express-validator";

const validateCreateProperty = [
  check("title").notEmpty().withMessage("El título es requerido"),
  check("address").notEmpty().withMessage("La dirección es requerida"),
  check("city").notEmpty().withMessage("La ciudad es requerida"),
  check("price").notEmpty().isNumeric().custom(
    (value) => {
      if (value <= 0) {
        throw new Error("El precio debe ser mayor a 0");
      }
      return true;
    }
  ),
  check("rooms")
    .notEmpty()
    .withMessage("El número de habitaciones es requerido"),
  check("bathrooms").notEmpty().withMessage("El número de baños es requerido"),
  check("description").notEmpty().withMessage("La descripción es requerida"),
  check("propertyType").notEmpty().withMessage("Ingrese un tipo de propiedad"),
  check("contractStatus").notEmpty().withMessage("El estado es requerido"),
  check("agent").notEmpty().withMessage("Seleccione un encargado para esta propiedad"),
  (req, res, next) => {
    validate(req, res, next, "Error al crear la propiedad");
  },
];

export { validateCreateProperty };