import { NextFunction, Request, Response } from "express";
import { validateUser } from "../utils/validator.js";

export const userValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = validateUser(req.body);

  if (error) {
    res.status(400).json({
      success: false,
      errors: error.details.map((err) => ({ message: err.message })),
    });
    return;
  }

  next();
};
