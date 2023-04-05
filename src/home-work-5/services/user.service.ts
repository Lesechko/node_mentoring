import { Model, Transaction } from "sequelize";
import { IUser } from "../DB/models/User";
import { NotFoundError } from "../utils/NotFoundError";
import { infoLogger } from "../middleware/logger.middleware";
import * as userData from "../data-access/user.data-access";

const getAllUsers = (): Promise<Model<IUser, IUser>[]> => {
  return userData.getAll();
};

const getUserByID = async (
  id: string,
  transaction?: Transaction
): Promise<Model<IUser, IUser>> => {
  const t = transaction ? { transaction } : {};

  const user = await userData.getByID(id, t);

  if (!user) {
    throw new NotFoundError(`User not found for id ${id}`);
  }

  return user;
};

const getAutoSuggestUsers = (loginSubstring: string, limit: number) => {
  return userData.getAutoSuggest(loginSubstring, limit);
};

const addUser = async ({ login, password, age }: IUser): Promise<IUser> => {
  const newUser = await userData.add({ login, password, age });

  return newUser.toJSON();
};

const updateUser = async (data: IUser, id: string): Promise<IUser> => {
  const [rowsUpdated, [updatedUser]] = await userData.update(data, id);

  if (rowsUpdated === 0) {
    throw new NotFoundError(`User not found for id ${id}`);
  }

  return updatedUser.dataValues;
};

const deleteUser = async (id: string): Promise<IUser> => {
  const [rowsUpdated, [updatedUser]] = await userData.remove(id);

  if (rowsUpdated === 0) {
    throw new NotFoundError(`User not found for id ${id}`);
  }

  return updatedUser.dataValues;
};

export const userService = {
  getAllUsers: infoLogger(getAllUsers),
  getUserByID: infoLogger(getUserByID),
  getAutoSuggestUsers: infoLogger(getAutoSuggestUsers),
  addUser: infoLogger(addUser),
  updateUser: infoLogger(updateUser),
  deleteUser: infoLogger(deleteUser),
};
