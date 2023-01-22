import { NextFunction, Response } from "express";
import { IGetUserAuthInfoRequest } from "../routes/user.js";
import * as UserService from "../services/user.service.js";

export const addUserToRequest = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction,
  id: string
): Promise<void> => {
  try {
    const user = await UserService.getUserByID(id);

    if (!user) {
      res
        .status(404)
        .json({ message: `User with id ${req.params.id} not found` });
      return;
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUsers = async (
  req: IGetUserAuthInfoRequest,
  res: Response
): Promise<void> => {
  try {
    const users = await UserService.getAllUsers();

    res.json({ users });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserByID = async (
  req: IGetUserAuthInfoRequest,
  res: Response
): Promise<void> => {
  res.json(req.user);
};

export const getUsersByLoginSubstring = async (req, res) => {
  try {
    const { loginSubstring, limit } = req.body;

    const users = await UserService.getAutoSuggestUsers(loginSubstring, limit);

    res.json({ users });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addUser = async (
  req: IGetUserAuthInfoRequest,
  res: Response
): Promise<void> => {
  try {
    const user = await UserService.addUser(req.body);

    if (user) {
      res.status(201).json(user);
    } else {
      res.sendStatus(501);
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateUser = async (
  req: IGetUserAuthInfoRequest,
  res: Response
): Promise<void> => {
  try {
    const user = await UserService.updateUser(req.body, req.user.id);

    res.json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteUser = async (
  req: IGetUserAuthInfoRequest,
  res: Response
): Promise<void> => {
  try {
    const user = await UserService.deleteUser(req.user.id);

    res.json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
