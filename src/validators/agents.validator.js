import validate from "../helpers/validate.js";

import { check } from "express-validator";

const validateCreateAgent = [
  check("email").isEmail().withMessage("El correo no es válido"),
  check("userName").notEmpty().withMessage("El nombre de usuario es requerido"),
  check("password").notEmpty().withMessage("La contraseña es requerida"),
  check("passwordConfirm")
    .notEmpty()
    .withMessage("La confirmación de la contraseña es requerida"),
  check("role").notEmpty().withMessage("El rol es requerido"),
  (req, res, next) => {
    validate(req, res, next);
  },
];

export { validateCreateAgent };
