import jwt from "jsonwebtoken";

export const getToken = (data: any): string =>
  jwt.sign(data, process.env.TOKEN_SECRET);

export const verifyToken = (token: string): string | jwt.JwtPayload =>
  jwt.verify(token, process.env.TOKEN_SECRET);
