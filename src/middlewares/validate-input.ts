import { NextFunction, Request, Response } from "express";
import Joi from "joi";

// Define arrow function handle input-request error
const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const errors = error.details.map((det) => det.message);
      return next(new Error(errors.toString()));
    } else {
      next();
    }
  };
};

// Export function
export default validateRequest;
