import { DataTypes, Model, ModelCtor, Sequelize } from "sequelize";

export enum Permission {
  READ = "READ",
  WRITE = "WRITE",
  DELETE = "DELETE",
  SHARE = "SHARE",
  UPLOAD_FILES = "UPLOAD_FILES",
}

export interface IGroup {
  name: string;
  permissions: Permission[];
  id?: string;
}

type GroupModel = ModelCtor<Model<IGroup, IGroup>>;

export let Group: ModelCtor<Model<IGroup, IGroup>> = null;

export const defineGroupModel = async (sequelize: Sequelize) => {
  const G = sequelize.define(
    "Group",
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
        allowNull: false,
      },
      permissions: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      tableName: "Group",
      timestamps: false,
    }
  );

  Group = G;

  return G;
};
