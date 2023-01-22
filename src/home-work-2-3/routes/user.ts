import express, { Request } from "express";
import { validationMiddleware } from "../middleware/user.middleware.js";
import { IUser } from "../models/User.js";
import {
  addUser,
  addUserToRequest,
  deleteUser,
  getUserByID,
  getUsers,
  getUsersByLoginSubstring,
  updateUser,
} from "../controllers/user.controller.js";

export interface IGetUserAuthInfoRequest extends Request {
  user: IUser;
}

export const router = express.Router();

router.param("id", addUserToRequest);

router.get("/", getUsers);

router.post("/autosuggest", getUsersByLoginSubstring);

router.post("/add", validationMiddleware, addUser);

router.get("/:id", getUserByID);

router.put("/:id", validationMiddleware, updateUser);

router.delete("/:id", deleteUser);
