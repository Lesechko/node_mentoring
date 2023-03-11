import { Response, Request } from "express";
import { getToken } from "../utils/jwt.js";

export const login = (req: Request, res: Response): void => {
  try {
    const token = getToken({ username: req.body.username });

    res.json({ "auth-token": token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
