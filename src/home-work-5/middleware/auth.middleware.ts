import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.js";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("auth-token");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    verifyToken(token);

    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token." });
  }
};
