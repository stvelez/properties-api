import {validationResult} from 'express-validator';

const validate = (req, res, next) => {
    try {
        validationResult(req).throw();
        next();
    } catch (error) {
        console.log(error.errors);
        res.status(400).json({message: 'Error al crear el usuario', errors: error.errors})
    }
}

export default validate;

