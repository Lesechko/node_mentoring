import { Sequelize } from "sequelize";
import { infoLogger } from "../middleware/logger.middleware";
import { groupService } from "./group.service";
import { userService } from "./user.service";

const addUsersToGroup = async (
  groupId: string,
  userIds: string,
  sequelize: Sequelize
): Promise<any> => {
  const t = await sequelize.transaction();

  try {
    const user = (await userService.getUserByID(groupId, t)) as any;
    const group = await groupService.getGroupByID(userIds, t);

    const userGroup = await user.addGroup(group);
    await t.commit();

    return userGroup;
  } catch (err) {
    await t.rollback();

    return null;
  }
};

export const userGroupService = {
  addUsersToGroup: infoLogger(addUsersToGroup),
};
