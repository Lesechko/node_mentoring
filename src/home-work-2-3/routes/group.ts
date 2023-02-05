import express, { Request } from "express";
import {
  addGroupToRequest,
  createGroup,
  getAllGroups,
  getGroupByID,
  removeGroup,
  updateGroup,
} from "../controllers/group.controller.js";
import { IGroup } from "../models/Group.js";
import { groupValidationMiddleware } from "../middleware/group.middleware.js";

export interface IGetGroupRequest extends Request {
  group: IGroup;
}

export const router = express.Router();

router.param("id", addGroupToRequest);

router.get("/", getAllGroups);

router.post("/add", groupValidationMiddleware, createGroup);

router.get("/:id", getGroupByID);

router.put("/:id", groupValidationMiddleware, updateGroup);

router.delete("/:id", removeGroup);
