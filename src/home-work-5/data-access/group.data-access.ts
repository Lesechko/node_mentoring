import { Group } from "../DB/index";
import { Model, Transaction } from "sequelize";
import { IGroup } from "../DB/models/Group";

type UpdatedGroupData = [
  affectedCount: number,
  affectedRows: Model<IGroup, IGroup>[]
];

export const getAll = (): Promise<Model<IGroup, IGroup>[]> => {
  return Group.findAll();
};

export const getByID = async (
  id: string,
  transaction?: Transaction | {}
): Promise<Model<IGroup, IGroup>> => {
  return await Group.findOne({ where: { id }, ...transaction });
};

export const create = ({
  name,
  permissions,
}: IGroup): Promise<Model<IGroup, IGroup>> => {
  return Group.create({
    name,
    permissions,
  });
};

export const update = async (data: IGroup, id: string): Promise<UpdatedGroupData> => {
  return await Group.update(data, {
    where: {
      id,
    },
    returning: true,
  });
};

export const remove = async (id: string): Promise<number> => {
  return Group.destroy({
    where: {
      id,
    },
  });
};
