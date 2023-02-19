import { NextFunction, Response } from "express";
import { sequelize } from "../DB/index.js";
import { IGetUserAuthInfoRequest } from "../routes/user.js";
import * as UserService from "../services/user.service.js";
import * as UserGroupService from "../services/userGroup.service.js";

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

    req.user = user.toJSON();

    next();
  } catch (err) {
    next({
      message: err.message,
      method: "getUserByID",
      args: { id },
    });
  }
};

export const getUsers = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await UserService.getAllUsers();

    res.json({ users });
  } catch (err) {
    next({
      message: err.message,
      method: "getAllUsers",
      args: {},
    });
  }
};

export const getUserByID = async (
  req: IGetUserAuthInfoRequest,
  res: Response
): Promise<void> => {
  res.json(req.user);
};

export const getUsersByLoginSubstring = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const { loginSubstring, limit } = req.body;

  try {
    const users = await UserService.getAutoSuggestUsers(loginSubstring, limit);

    res.json({ users });
  } catch (err) {
    next({
      message: err.message,
      method: "getAutoSuggestUsers",
      args: { loginSubstring, limit },
    });
  }
};

export const addUser = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await UserService.addUser(req.body);

    if (user) {
      res.status(201).json(user.dataValues);
    } else {
      res.sendStatus(501);
    }
  } catch (err) {
    next({
      message: err.message,
      method: "addUser",
      args: { userID: req.user.id },
    });
  }
};

export const updateUser = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await UserService.updateUser(req.body, req.user.id);

    res.json(user);
  } catch (err) {
    next({
      message: err.message,
      method: "updateUser",
      args: { userID: req.user.id },
    });
  }
};

export const deleteUser = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await UserService.deleteUser(req.user.id);

    res.json(user);
  } catch (err) {
    next({
      message: err.message,
      method: "deleteUser",
      args: { userID: req.user.id },
    });
  }
};

export const addUsersToGroup = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const userID = req.user.id;
  const groupID = req.body.id;

  try {
    UserGroupService.addUsersToGroup(groupID, userID, sequelize);

    res.status(200);
  } catch (err) {
    next({
      message: err.message,
      method: "addUsersToGroup",
      args: { groupID, userID },
    });
  }
};
