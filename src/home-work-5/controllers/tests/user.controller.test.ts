import {
  addUser,
  deleteUser,
  getUserByID,
  getUsers,
  getUsersByLoginSubstring,
  updateUser,
} from "../user.controller";

const mockUser = {
  username: "johndoe",
  email: "johndoe@example.com",
  password: "password123",
};

jest.mock("../../services/user.service", () => ({
  userService: {
    getUserByID: jest.fn(() => ({
      toJSON() {
        return mockUser;
      },
    })),
    getAllUsers: jest.fn(() => []),
    addUser: jest.fn((user) => user),
    updateUser: jest.fn((user) => user),
    getAutoSuggestUsers: jest.fn(() => []),
    deleteUser: jest.fn(() => mockUser),
  },
}));

const json = jest.fn();
const next = jest.fn();

const res: any = {
  status: jest.fn(() => ({ json })),
  json: jest.fn(),
};

describe("UserController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getUsers", () => {
    it("should get all users", async () => {
      const req: any = {
        params: { id: "123" },
      };

      await getUsers(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);

      expect(json).toHaveBeenCalledWith({ users: [] });
    });
  });

  describe("addUser", () => {
    it("should add a new user", async () => {
      const req: any = {
        body: mockUser,
        params: { id: "123" },
      };

      await addUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);

      expect(json).toHaveBeenCalledWith(mockUser);
    });
  });

  describe("updateUser", () => {
    it("should update an existing user", async () => {
      const req: any = {
        params: { id: "123" },
        body: mockUser,
      };

      await updateUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith(mockUser);
    });
  });

  describe("getUserByID", () => {
    it("should get a user by ID", async () => {
      const req: any = {
        params: { id: "123" },
      };

      await getUserByID(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith(mockUser);
    });
  });

  describe("getUsersByLoginSubstring", () => {
    it("should get a user by ID", async () => {
      const req: any = {
        params: { id: "123" },
        body: { loginSubstring: "", limit: 1 },
      };

      await getUsersByLoginSubstring(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith({ users: [] });
    });
  });

  describe("deleteUser", () => {
    it("should delete a user by ID", async () => {
      const req: any = {
        params: { id: "123" },
      };

      await deleteUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith(mockUser);
    });
  });
});
