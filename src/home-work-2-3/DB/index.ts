import { Sequelize } from "sequelize";
import config from "../../config/config.js";

export const runDB = async () => {
  const { database, username, password, host, dialect } = config;

  const sequelize = new Sequelize(database, username, password, {
    host,
    dialect,
  });

  try {
    await sequelize.authenticate();

    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  return sequelize;
};
