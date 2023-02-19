import winston from "winston";
import { NextFunction, Request, Response } from "express";

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
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(500).send();

  logger.error({message : err.message, args : err.args, method: err.method});
};
