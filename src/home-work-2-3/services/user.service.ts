import { Model, Op, Transaction } from "sequelize";
import { IUser, User } from "../models/User.js";

export const getAllUsers = (): Promise<Model<IUser, IUser>[]> => {
  return User.findAll();
};

export const getUserByID = async (
  id: string,
  transaction?: Transaction
): Promise<Model<IUser, IUser>> => {
  const t = transaction ? { transaction } : {};

  return await User.findOne({ where: { id }, ...t });
};

export const getAutoSuggestUsers = (loginSubstring: string, limit: number) => {
  return User.findAll({
    where: {
      login: { [Op.substring]: loginSubstring },
    },
    order: [["login", "ASC"]],
    limit,
  });
};

export const addUser = ({
  login,
  password,
  age,
}: IUser): Promise<Model<IUser, IUser>> => {
  if (!login || !password || !age) {
    return null;
  }

  return User.create({
    login: login,
    password: password,
    age,
    isDeleted: false,
  });
};

export const updateUser = async (
  updatedUser: IUser,
  id: string
): Promise<IUser> => {
  if (!updatedUser) {
    return null;
  }

  const user = (await getUserByID(id)).toJSON();

  if (!user) {
    return null;
  }

  const f = await User.update(
    {
      age: updatedUser.age || user.age,
      login: updatedUser.login || user.login,
      password: updatedUser.password || user.password,
    },
    {
      where: {
        id,
      },
      returning: true,
    }
  );

  return updatedUser[1][0].dataValues;
};

export const deleteUser = async (userID: string): Promise<IUser> => {
  if (!userID) {
    return null;
  }

  const user = await getUserByID(userID);

  if (!user) {
    return null;
  }

  const updatedUser = await User.update(
    { isDeleted: true },
    {
      where: {
        id: userID,
      },
      returning: true,
    }
  );

  return updatedUser[1][0].dataValues;
};
