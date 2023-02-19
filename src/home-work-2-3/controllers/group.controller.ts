import { NextFunction, Response, Request } from "express";
import { IGetGroupRequest } from "../routes/group.js";
import * as GroupService from "../services/group.service.js";

export const addGroupToRequest = async (
  req: IGetGroupRequest,
  res: Response,
  next: NextFunction,
  id: string
): Promise<void> => {
  try {
    const group = await GroupService.getGroupByID(id);

    if (!group) {
      res
        .status(404)
        .json({ message: `Group with id ${req.params.id} not found` });
      return;
    }

    req.group = group.toJSON();

    next();
  } catch (err) {
    next({
      message: err.message,
      method: "getGroupByID",
      args: { groupID: req.params.id },
    });
  }
};

export const getAllGroups = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const group = await GroupService.getAllGroups();

    res.json({ group });
  } catch (err) {
    next({
      message: err.message,
      method: "getAllGroups",
      args: { group: req.body },
    });
  }
};

export const getGroupByID = async (
  req: IGetGroupRequest,
  res: Response
): Promise<void> => {
  res.json(req.group);
};

export const createGroup = async (
  req: IGetGroupRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const group = await GroupService.createGroup(req.body);

    if (group) {
      res.status(201).json(group);
    } else {
      res.sendStatus(501);
    }
  } catch (err) {
    next({
      message: err.message,
      method: "createGroup",
      args: { group: req.body },
    });
  }
};

export const updateGroup = async (
  req: IGetGroupRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const group = await GroupService.updateGroup(req.body, req.group.id);

    res.json(group);
  } catch (err) {
    next({
      message: err.message,
      method: "updateGroup",
      args: { groupID: req.group.id, group: req.body },
    });
  }
};

export const removeGroup = async (
  req: IGetGroupRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const group = await GroupService.removeGroup(req.group.id);

    res.json(group);
  } catch (err) {
    next({
      message: err.message,
      method: "removeGroup",
      args: { groupID: req.group.id },
    });
  }
};
