import { NextFunction, Request, Response } from "express";
import { validateGroup, } from "../validator.js";

export const groupValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = validateGroup(req.body);

  if (error) {
    res.status(400).json({
      success: false,
      errors: error.details.map((err) => ({ message: err.message })),
    });
    return;
  }

  next();
};
