import { Sequelize } from "sequelize";
import { getGroupByID } from "./group.service.js";
import { getUserByID } from "./user.service.js";

export const addUsersToGroup = async (
  groupId: string,
  userIds: string,
  sequelize: Sequelize,
): Promise<any> => {
  const t = await sequelize.transaction();

try {
  const user = (await getUserByID(groupId, t)) as any;
  const group = await getGroupByID(userIds, t);

  const  userGroup = await user.addGroup(group);
  await t.commit();

  return userGroup
} catch (err) {
  await t.rollback();

  return null
}
 
};
