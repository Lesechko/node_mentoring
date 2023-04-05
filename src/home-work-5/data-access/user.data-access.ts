import { Model, Op, Transaction } from "sequelize";
import { User } from "../DB/index";
import { IUser } from "../DB/models/User";

type UpdatedUserData = [
  affectedCount: number,
  affectedRows: Model<IUser, IUser>[]
];

export const getAll = (): Promise<Model<IUser, IUser>[]> => {
  return User.findAll();
};

export const getByID = async (
  id: string,
  transaction?: Transaction | {}
): Promise<Model<IUser, IUser>> => {
  return await User.findOne({ where: { id }, ...transaction });
};

export const getAutoSuggest = (loginSubstring: string, limit: number) => {
  return User.findAll({
    where: {
      login: { [Op.substring]: loginSubstring },
    },
    order: [["login", "ASC"]],
    limit,
  });
};

export const add = ({
  login,
  password,
  age,
}: IUser): Promise<Model<IUser, IUser>> => {
  return User.create({
    login: login,
    password: password,
    age,
    isDeleted: false,
  });
};

export const update = async (
  data: IUser,
  id: string
): Promise<UpdatedUserData> => {
  return User.update(data, {
    where: { id },
    returning: true,
  });
};

export const remove = async (id: string): Promise<UpdatedUserData> => {
  return User.update(
    { isDeleted: true },
    {
      where: { id },
      returning: true,
    }
  );
};
