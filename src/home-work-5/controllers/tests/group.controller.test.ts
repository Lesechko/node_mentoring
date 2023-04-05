import {
  getAllGroups,
  getGroupByID,
  createGroup,
  updateGroup,
  removeGroup,
} from "../group.controller";

const mockGroup = {
  name: "mock_group",
  permissions: ["READ"],
};

jest.mock("../../services/group.service", () => ({
  groupService: {
    getGroupByID: jest.fn(() => ({
      toJSON() {
        return mockGroup;
      },
    })),
    getAllGroups: jest.fn(() => []),
    createGroup: jest.fn((group) => group),
    updateGroup: jest.fn(() => mockGroup),
    removeGroup: jest.fn(() => mockGroup),
  },
}));

const json = jest.fn();
const next = jest.fn();

const res: any = {
  status: jest.fn(() => ({ json })),
  json: jest.fn(),
};

describe("Group Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllGroups", () => {
    it("should return all groups", async () => {
      const req: any = {
        params: { id: "123" },
      };

      await getAllGroups(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);

      expect(json).toHaveBeenCalledWith({ group: [] });
    });
  });

  describe("createGroup", () => {
    it("should create a new group", async () => {
      const req: any = {
        body: mockGroup,
        params: { id: "123" },
      };

      await createGroup(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);

      expect(json).toHaveBeenCalledWith(mockGroup);
    });
  });

  describe("updateGroup", () => {
    it("should update an existing group", async () => {
      const req: any = {
        params: { id: "123" },
        body: mockGroup,
      };

      await updateGroup(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith(mockGroup);
    });
  });

  describe("getGroupByID", () => {
    it("should return group with apropriate ID", async () => {
      const req: any = {
        params: { id: "123" },
      };

      await getGroupByID(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);

      expect(json).toHaveBeenCalledWith(mockGroup);
    });
  });

  describe("removeGroup", () => {
    it("should remove the group by ID", async () => {
      const req: any = {
        params: { id: "123" },
      };

      await removeGroup(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith(mockGroup);
    });
  });
});
