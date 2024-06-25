import { validationResult } from "express-validator";

const validate = (req, res, next, message, code = 403) => {
  try {
    validationResult(req).throw();
    next();
  } catch (error) {
    const messsageClient = error.errors.length ? error.errors[0].msg : message;

    res.status(code).json({
      message: messsageClient,
      errors: error.errors,
      code,
    });
  }
};

export default validate;
