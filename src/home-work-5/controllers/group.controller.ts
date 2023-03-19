import { NextFunction, Response, Request } from "express";
import { IGetGroupRequest } from "../routes/group.js";
import { groupService } from "../services/group.service.js";

export const addGroupToRequest = async (
  req: IGetGroupRequest,
  _res: Response,
  next: NextFunction,
  id: string
): Promise<void> => {
  try {
    const group = await groupService.getGroupByID(id);

    req.group = group.toJSON();

    next();
  } catch (err) {
    next({
      err,
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
    const group = await groupService.getAllGroups();

    res.status(200).json({ group });
  } catch (err) {
    next({
      err,
      method: "getAllGroups",
      args: { group: req.body },
    });
  }
};

export const getGroupByID = async (
  req: IGetGroupRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.id;

  try {
    const group = await groupService.getGroupByID(id);

    res.status(200).json(group.toJSON());
  } catch (err) {
    next({
      err,
      method: "getAllUsers",
      args: {},
    });
  }
};

export const createGroup = async (
  req: IGetGroupRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const group = await groupService.createGroup(req.body);

    res.status(201).json(group);
  } catch (err) {
    next({
      err,
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
    const group = await groupService.updateGroup(req.body, req.group.id);

    res.status(200).json(group);
  } catch (err) {
    next({
      err,
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
    const group = await groupService.removeGroup(req.group.id);

    res.status(200).json(group);
  } catch (err) {
    next({
      err,
      method: "removeGroup",
      args: { groupID: req.group.id },
    });
  }
};
