import Joi from "joi";
import { IUser } from "./models.js";

const validator = (schema: Joi.ObjectSchema<IUser>) => (payload: IUser) =>
  schema.validate(payload, { abortEarly: false });

const userSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string()
    .pattern(/^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i)
    .required()
    .messages({
      "string.pattern.base": `Password should contain letters and numbers`,
    }),
  age: Joi.number().integer().min(4).max(130).required(),
  isDeleted: Joi.boolean(),
  id: Joi.string(),
});

export const validateUser = validator(userSchema);
