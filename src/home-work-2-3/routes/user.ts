import express, { Request } from "express";
import { userValidationMiddleware } from "../middleware/user.middleware.js";
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

router.post("/add", userValidationMiddleware, addUser);

router.get("/:id", getUserByID);

router.put("/:id", userValidationMiddleware, updateUser);

router.delete("/:id", deleteUser);
