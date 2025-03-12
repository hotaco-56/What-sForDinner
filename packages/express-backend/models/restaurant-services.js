import restaurants from "./restaurant.js";

const getAllRestaurants = () => {
  return restaurants.restaurants_list;
};

const findRestaurantByName = (name) => {
  return restaurants["restaurants_list"].filter(
    (restaurant) => restaurant["name"] === name,
  );
};

const findRestaurantBySearch = (search, restaurantList) => {
  return restaurantList.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(search.toLowerCase()),
  );
};

const findRestaurantByType = (type, restaurantList) => {
  return restaurantList.filter((restaurant) => restaurant.type === type);
};

const findRestaurantByPrice = (price, restaurantList) => {
  return restaurantList.filter((restaurant) => restaurant.price === price);
};

const findRestaurantByAvgRating = (min_rating, restaurantList) => {
  return restaurantList.filter((restaurant) => restaurant.rating >= min_rating);
};

const findRestaurantById = (id) => {
  return restaurants["restaurants_list"].find(
    (restaurant) => restaurant["id"] === id,
  );
};

const addRestaurant = (restaurant) => {
  restaurants["restaurants_list"].push(restaurant);
  return restaurant;
};

const deleteRestaurantById = (id) => {
  const index = restaurants["restaurants_list"].findIndex(
    (restaurant) => restaurant["id"] === id,
  );
  if (index !== -1) {
    restaurants["restaurants_list"].splice(index, 1);
    return true;
  }
  return false;
};

export default {
  getAllRestaurants,
  findRestaurantByName,
  findRestaurantBySearch,
  findRestaurantByType,
  findRestaurantByPrice,
  findRestaurantByAvgRating,
  findRestaurantById,
  addRestaurant,
  deleteRestaurantById,
};
