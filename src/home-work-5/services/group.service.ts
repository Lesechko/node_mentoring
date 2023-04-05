import { Model, Transaction } from "sequelize";
import { IGroup } from "../DB/models/Group";
import * as groupData from "../data-access/group.data-access";
import { NotFoundError } from "../utils/NotFoundError";
import { infoLogger } from "../middleware/logger.middleware";

const getAllGroups = (): Promise<Model<IGroup, IGroup>[]> => {
  return groupData.getAll();
};

const getGroupByID = async (
  id: string,
  transaction?: Transaction
): Promise<Model<IGroup, IGroup>> => {
  const t = transaction ? { transaction } : {};

  const group = await groupData.getByID(id, t);

  if (!group) {
    throw new NotFoundError(`Group not found for id ${id}`);
  }

  return group;
};

const createGroup = async ({ name, permissions }: IGroup): Promise<IGroup> => {
  const newGroup = await groupData.create({
    name,
    permissions,
  });

  return newGroup.toJSON();
};

const updateGroup = async (data: IGroup, id: string): Promise<IGroup> => {
  const [rowsUpdated, [updatedGroup]] = await groupData.update(data, id);

  if (rowsUpdated === 0) {
    throw new NotFoundError(`Group not found for id ${id}`);
  }

  return updatedGroup.dataValues;
};

const removeGroup = async (groupID: string): Promise<number> => {
  return groupData.remove(groupID);
};

export const groupService = {
  getAllGroups: infoLogger(getAllGroups),
  createGroup: infoLogger(createGroup),
  getGroupByID: infoLogger(getGroupByID),
  updateGroup: infoLogger(updateGroup),
  removeGroup: infoLogger(removeGroup),
};
