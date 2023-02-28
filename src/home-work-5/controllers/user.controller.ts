import { NextFunction, Response } from "express";
import { sequelize } from "../DB/index.js";
import { IGetUserAuthInfoRequest } from "../routes/user.js";
import { userService } from "../services/user.service.js";
import { userGroupService } from "../services/userGroup.service.js";

export const addUserToRequest = async (
  req: IGetUserAuthInfoRequest,
  _res: Response,
  next: NextFunction,
  id: string
): Promise<void> => {
  try {
    const user = await userService.getUserByID(id);

    req.user = user.toJSON();

    next();
  } catch (err) {
    next({
      err,
      method: "getUserByID",
      args: { id },
    });
  }
};

export const getUsers = async (
  _req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await userService.getAllUsers();

    res.status(200).json({ users });
  } catch (err) {
    next({
      err,
      method: "getAllUsers",
      args: {},
    });
  }
};

export const getUserByID = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.id;

  try {
    const user = await userService.getUserByID(id);

    res.status(200).json(user.toJSON());
  } catch (err) {
    next({
      err,
      method: "getAllUsers",
      args: {},
    });
  }
};

export const getUsersByLoginSubstring = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const { loginSubstring, limit } = req.body;

  try {
    const users = await userService.getAutoSuggestUsers(loginSubstring, limit);

    res.status(200).json({ users });
  } catch (err) {
    next({
      err,
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
    const user = await userService.addUser(req.body);

    res.status(201).json(user);
  } catch (err) {
    next({
      err,
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
    const user = await userService.updateUser(req.body, req.user.id);

    res.status(200).json(user);
  } catch (err) {
    next({
      err,
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
    const user = await userService.deleteUser(req.user.id);

    res.status(200).json(user);
  } catch (err) {
    next({
      err,
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
    userGroupService.addUsersToGroup(groupID, userID, sequelize);

    res.status(200);
  } catch (err) {
    next({
      err,
      method: "addUsersToGroup",
      args: { groupID, userID },
    });
  }
};
