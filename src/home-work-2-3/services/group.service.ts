import { Model, Transaction } from "sequelize";
import { Group, IGroup } from "../models/Group.js";

export const getAllGroups = (): Promise<Model<IGroup, IGroup>[]> => {
  return Group.findAll();
};

export const getGroupByID = async (
  id: string,
  transaction?: Transaction
): Promise<Model<IGroup, IGroup>> => {
  const t = transaction ? { transaction } : {};

  return await Group.findOne({ where: { id }, ...t });
};

export const createGroup = ({
  name,
  permissions,
}: IGroup): Promise<Model<IGroup, IGroup>> => {
  if (!name || !permissions?.length) {
    return null;
  }

  return Group.create({
    name,
    permissions,
  });
};

export const updateGroup = async (
  updatedGroup: IGroup,
  id: string
): Promise<IGroup> => {
  if (!updatedGroup) {
    return null;
  }

  const group = (await getGroupByID(id)).toJSON();

  if (!group) {
    return null;
  }

  const g = await Group.update(
    {
      name: updatedGroup.name || group.name,
      permissions: updatedGroup.permissions || group.permissions,
    },
    {
      where: {
        id,
      },
      returning: true,
    }
  );

  return g[1][0].dataValues;
};

export const removeGroup = async (groupID: string): Promise<number> => {
  if (!groupID) {
    return null;
  }

  const group = await getGroupByID(groupID);

  if (!group) {
    return null;
  }

  const updatedUser = await Group.destroy({
    where: {
      id: groupID,
    },
  });

  return updatedUser;
};
