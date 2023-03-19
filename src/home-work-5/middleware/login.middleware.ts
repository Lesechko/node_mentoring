import { NextFunction, Request, Response } from "express";
import { validateLogin } from "../utils/validator.js";

export const loginValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error } = validateLogin(req.body);

  if (error) {
    res.status(400).json({
      success: false,
      errors: error.details.map((err) => ({ message: err.message })),
    });

    return;
  }

  next();
};
