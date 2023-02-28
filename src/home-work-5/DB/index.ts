import { Sequelize } from "sequelize";
import config from "../../config/config.js";
import { defineGroupModel, GroupModel } from "./models/Group.js";
import { defineUserModel, UserModel } from "./models/User.js";
import { addAssociatios } from "./models/UserGroup.js";

export let sequelize: Sequelize = null;
export let User: UserModel = null;
export let Group: GroupModel = null;

export const runDB = async (): Promise<void> => {
  const { database, username, password, host, dialect } = config;

  sequelize = new Sequelize(database, username, password, {
    host,
    dialect,
  });

  try {
    await sequelize.authenticate();
    Group = await defineGroupModel(sequelize);
    User = await defineUserModel(sequelize);
    addAssociatios(Group, User);

    await sequelize.sync({ alter: true });

    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
