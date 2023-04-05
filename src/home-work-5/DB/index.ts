import { Dialect, Sequelize } from "sequelize";
import { defineGroupModel, GroupModel } from "./models/Group";
import { defineUserModel, UserModel } from "./models/User";
import { addAssociatios } from "./models/UserGroup";

export let sequelize: Sequelize = null;
export let User: UserModel = null;
export let Group: GroupModel = null;

export const runDB = async (): Promise<void> => {
  const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

  sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: "postgres" as Dialect,
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
