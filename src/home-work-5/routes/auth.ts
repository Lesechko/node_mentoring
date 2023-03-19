import express from "express";
import { login } from "../controllers/auth.controller.js";
import { loginValidationMiddleware } from "../middleware/login.middleware.js";

export const router = express.Router();

router.post("/", loginValidationMiddleware, login);
