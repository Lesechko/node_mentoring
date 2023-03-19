import winston from "winston";
import { NextFunction, Request, Response } from "express";
import { isNotFoundError } from "../utils/NotFoundError";

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const info = {
    date: new Date().toLocaleString(),
    method: req.method,
    data: req.body,
  };

  console.log(info);

  next();
}

export const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

export const errorMiddleware = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { err, args, method } = error;

  logger.error({ message: err.message, args, method });

  if (isNotFoundError(err)) {
    res.status(404).json({ message: err.message });
  } else {
    res.status(500).send();
  }
};

export const infoLogger =
  (target: Function) =>
  (...params: any[]) => {
    const info = {
      date: new Date().toLocaleString(),
      method: target.name,
      params: params,
    };

    console.log(info);

    return target(...params);
  };
