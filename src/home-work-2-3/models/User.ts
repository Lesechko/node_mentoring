import { DataTypes, Model, ModelCtor, Sequelize } from "sequelize";

export interface IUser {
  login: string;
  password: string;
  age?: string;
  isDeleted?: boolean;
  id?: string;
}

export let User: ModelCtor<Model<IUser, IUser>> = null;

export const defineModels = async (sequelize: Sequelize) => {
  const U = sequelize.define(
    "User",
    {
      login: {
        type: DataTypes.STRING,
        validate: {
          unique: true,
          allowNull: false,
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          is: /^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i,
          allowNull: false,
          notEmpty: true,
        },
      },
      age: {
        type: DataTypes.INTEGER,
        validate: {
          min: 4,
          max: 130,
          allowNull: false,
          notEmpty: true,
        },
      },
      isDeleted: DataTypes.BOOLEAN,
    },
    {
      tableName: "User",
    }
  );

  await sequelize.sync();
  User = U;
};
