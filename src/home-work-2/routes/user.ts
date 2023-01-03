import express from "express";
import {
  addUser,
  deleteUser,
  getAllUsers,
  getAutoSuggestUsers,
  getUserByID,
  updateUser,
} from "../DB/users.js";
import { IGetUserAuthInfoRequest } from "../models.js";

export const router = express.Router();

router.param("id", (req: IGetUserAuthInfoRequest, res, next, id) => {
  const user = getUserByID(id);

  if (!user) {
    return res
      .status(404)
      .json({ message: `User with id ${req.params.id} not found` });
  }

  req.user = user;
  next();
});

router.get("/", (req, res) => {
  const users = getAllUsers();

  res.json({ users });
});

router.post("/autosuggest", (req, res) => {
  const { loginSubstring, limit } = req.body;
  
  const users = getAutoSuggestUsers(loginSubstring, limit);

  res.json({ users });
});

router.post("/add", (req: IGetUserAuthInfoRequest, res) => {
  const user = addUser(req.body);

  if (user) {
    res.status(201).json(user);
  } else {
    res.sendStatus(501);
  }
});

router.get("/:id", (req: IGetUserAuthInfoRequest, res) => {
  res.json(req.user);
});

router.put("/:id", (req: IGetUserAuthInfoRequest, res) => {
  const user = updateUser(req.body, req.user.id);

  res.json(user);
});

router.delete("/:id", (req: IGetUserAuthInfoRequest, res) => {
  const user = deleteUser(req.user.id);

  res.json(user);
});
