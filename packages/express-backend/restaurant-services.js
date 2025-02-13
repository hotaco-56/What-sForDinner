import restaurants from "./restaurant.js";

const findRestaurantByName = (name) => {
  return restaurants["restaurants_list"].filter(
    (restaurant) => restaurant["name"] === name,
  );
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
  findRestaurantByName,
  findRestaurantById,
  addRestaurant,
  deleteRestaurantById,
};
