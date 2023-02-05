import { Sequelize } from "sequelize";
import config from "../../config/config.js";
import { defineGroupModel } from "../models/Group.js";
import { defineUserModel } from "../models/User.js";
import { addAssociatios } from "../models/UserGroup.js";

export let sequelize: Sequelize

export const runDB = async (): Promise<void> => {
  const { database, username, password, host, dialect } = config;

   sequelize = new Sequelize(database, username, password, {
    host,
    dialect,
  });

  try {
    await sequelize.authenticate();
    const Group = await defineGroupModel(sequelize);
    const User = await defineUserModel(sequelize);
    addAssociatios(Group, User);

    await sequelize.sync({ alter: true });

    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
