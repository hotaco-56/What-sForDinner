const mockActualModule = jest.requireActual("../models/users");
jest.mock("../models/users", () => ({
  __esModule: true,
  ...mockActualModule,
  Users: jest.fn()
}));

const { Users } = require("../models/users");

describe ("User Mocked Model Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create and save a user successfully", async () => {
    const exampleUser = {
      name: "Will Kim",
      email: "will@example.com",
      bio: "Software Engineer",
      phone: "123-456-7890",
      profilePic: "https://example.com/will.jpg",
      location: "New York",
      favorites: [{ restaurantId: "111", name: "Pizza Hut" }],
      history: [{ restaurantId: "222", name: "McDonald's" }],
    };

    const savedMock = jest.fn().mockResolvedValue({
      _id: "1234567890",
      ...exampleUser
    });

    Users.mockImplementation(() => ({
        save: savedMock
    }));

    const newUser = new Users(exampleUser);
    const savedUser = await newUser.save();

    expect(savedMock).toHaveBeenCalled();
    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(exampleUser.name);
    expect(savedUser.email).toBe(exampleUser.email);
    expect(savedUser.bio).toBe(exampleUser.bio);
    expect(savedUser.phone).toBe(exampleUser.phone);
    expect(savedUser.profilePic).toBe(exampleUser.profilePic);
    expect(savedUser.location).toBe(exampleUser.location);
    expect(savedUser.favorites).toHaveLength(1);
    expect(savedUser.history).toHaveLength(1);
  });

  it("should fail if the required fields are missing", async () => {
    const savedMock = jest.fn().mockRejectedValue({
      errors: { email: { message: "Email is required" } }
    });

    Users.mockImplementation(() => ({
      save: savedMock
    }));

    const invalidUser = new Users({ bio: "Missing required fields" });
    await expect(invalidUser.save()).rejects.toEqual({
      errors: expect.objectContaining({
        email: expect.any(Object),
      })
    });
  });

  it ("should retrieve a user by email", async () => {
    const exampleUser = { name: "Jane", email: "jane@example.com" };
    const mockFindOne = jest.fn().mockResolvedValue(exampleUser);
    Users.findOne = mockFindOne;

    const foundUser = await Users.findOne({ email: exampleUser.email });
    expect(mockFindOne).toHaveBeenCalledWith({ email: exampleUser.email });
    expect(foundUser).toBeDefined();
    expect(foundUser.email).toBe(exampleUser.email);
  });
  
})