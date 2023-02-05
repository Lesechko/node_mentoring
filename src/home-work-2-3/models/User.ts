import { DataTypes, Model, ModelCtor, Sequelize } from "sequelize";

export interface IUser {
  login: string;
  password: string;
  age?: string;
  isDeleted?: boolean;
  id?: string;
}

type UserModel = ModelCtor<Model<IUser, IUser>>;

export let User: UserModel = null;

export const defineUserModel = async (
  sequelize: Sequelize
): Promise<UserModel> => {
  const U = sequelize.define(
    "User",
    {
      login: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          is: /^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i,
          notEmpty: true,
        },
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        validate: {
          min: 4,
          max: 130,
          notEmpty: true,
        },
        allowNull: false,
      },
      isDeleted: DataTypes.BOOLEAN,
    },
    {
      tableName: "User",
      timestamps: false,
    }
  );

  User = U;

  return User;
};
