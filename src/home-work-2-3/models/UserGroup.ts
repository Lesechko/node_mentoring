import { Model, ModelCtor } from "sequelize";

export const addAssociatios = async (
  Group: ModelCtor<Model<any, any>>,
  User: ModelCtor<Model<any, any>>,
) => {
  Group.belongsToMany(User, { through: "UserGroup", onDelete: "CASCADE" });
  User.belongsToMany(Group, { through: "UserGroup", onDelete: "CASCADE" });
};
