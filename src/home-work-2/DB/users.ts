import { IUser } from "../models.js";
import { v4 as uuidv4 } from "uuid";

const users: IUser[] = [];

export const getAllUsers = (): IUser[] => {
  return users;
};

export const getUserByID = (id: string): IUser | null => {
  return users.find((user) => user.id === id);
};

export const getAutoSuggestUsers = (loginSubstring: string, limit: number) => {
  return users
    .filter((user) => user.login.includes(loginSubstring))
    .sort((user1, user2) => user1.login.localeCompare(user2.login))
    .slice(0, limit);
};

export const addUser = (user: IUser): IUser => {
  if (!Object.keys(user).length) {
    return null;
  }

  const newUser = { ...user, id: uuidv4(), isDeleted: false };
  users.push(newUser);

  return newUser;
};

export const updateUser = (updatedUser: IUser, id: string): IUser | null => {
  if (!updatedUser) {
    return null;
  }

  const user = getUserByID(id);

  if (!user) {
    return null;
  }

  user.age = updatedUser.age || user.age;
  user.login = updatedUser.login || user.login;
  user.password = updatedUser.password || user.password;

  return user;
};

export const deleteUser = (userID: string): IUser | null => {
  if (!userID) {
    return null;
  }

  const user = getUserByID(userID);

  if (!user) {
    return null;
  }

  user.isDeleted = true;

  return user;
};
