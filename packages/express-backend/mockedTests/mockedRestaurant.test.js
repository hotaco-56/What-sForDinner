const mockActualModule = jest.requireActual("../models/restaurant");
jest.mock("../models/restaurant", () => ({
  __esModule: true,
  ...mockActualModule,
  Restaurant: jest.fn(),
  getRestaurantModel: jest.fn()
}));

const { Restaurant, getRestaurantModel } = require("../models/restaurant");

describe("Restaurant Mocked Model Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create and save a restaurant successfully", async () => {
    const restaurantData = {
      name: "McDonald's",
      link: "https://www.mcdonalds.com",
      reviews: 500,
      rating: 4.1,
      price_range_usd: ["$"],
      menu_link: "https://www.mcdonalds.com/menu",
      reservation_link: "https://www.mcdonalds.com/reservation",
      featured_image: "https://via.placeholder.com/150",
      has_delivery: true,
      cuisines: ["American", "Fast Food", "Burgers"],
    };

    const savedMock = jest.fn().mockResolvedValue({
      _id: "1234567890",
      ...restaurantData
    });

    Restaurant.mockImplementation(() => ({
      save: savedMock
    }));

    const newRestaurant = new Restaurant(restaurantData);
    const savedRestaurant = await newRestaurant.save();

    expect(savedMock).toHaveBeenCalled();
    expect(savedRestaurant._id).toBeDefined();
    expect(savedRestaurant.name).toBe(restaurantData.name);
  });

  it("should fail if required fields are missing", async () => {
    const savedMock = jest.fn().mockRejectedValue({
      errors: {name: {message: "Name is required"}}
    });

    Restaurant.mockImplementation(() => ({
      save: savedMock
    }));

    const invalidRestaurant = new Restaurant({});

    await expect(invalidRestaurant.save()).rejects.toEqual({
      errors: expect.objectContaining ({
        name: expect.any(Object),
      })
    });
  });

  it("should retrieve a restaurant by name", async () => {
    const restaurantData = {
      name: "Test Restaurant",
      cuisines: ["Italian"]
    };
  
    const mockFindOne = jest.fn().mockResolvedValue(restaurantData);
    Restaurant.findOne = mockFindOne;

    const foundRestaurant = await Restaurant.findOne({ name: restaurantData.name });

    expect(mockFindOne).toHaveBeenCalledWith({ name: restaurantData.name });
    expect(foundRestaurant).toBeDefined();
    expect(foundRestaurant.name).toBe(restaurantData.name);
  }); 

  it("should create a restaurant model dynamically for a city", async () => {
    const cityName = "Paris";
    const mockSave = jest.fn().mockResolvedValue({
      name: "Le Test",
      cuisines: ["French"],
    });

    // This is the mocked model constructor
    function MockModel(data) {
      return { ...data, save: mockSave };
    }
    MockModel.modelName = "paris_restaurants";
    getRestaurantModel.mockReturnValue(MockModel);

    const CityRestaurantModel = getRestaurantModel();
    const cityRestaurantInstance = new CityRestaurantModel({ name: "Le Test", cuisines: ["French"] });
    const savedRestaurant = await cityRestaurantInstance.save();
    expect(savedRestaurant.name).toBe("Le Test");
    expect(savedRestaurant.cuisines).toEqual(["French"]);
  });
  

  it("should generate the correct collection name in getRestaurantModel (real implementation)", () => {

    const real = jest.requireActual("../models/restaurant");
    const city = "San Francisco";
    const Model = real.getRestaurantModel(city);

    expect(Model.modelName).toBe("san_francisco_restaurants");
  });

});
