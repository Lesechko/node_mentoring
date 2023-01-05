import { Request } from "express";

export interface IUser {
  login: string;
  password: string;
  age?: string;
  isDeleted?: boolean;
  id?: string;
}

export interface IGetUserAuthInfoRequest extends Request {
  user: IUser;
}
