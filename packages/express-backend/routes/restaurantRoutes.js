import express from "express";
import restaurantServices from "../models/restaurant-services.js";

const router = express.Router();

router.get("/", (req, res) => {
  const { search, type, price, min_rating } = req.query;

  let filteredRestaurants = restaurantServices.getAllRestaurants();

  if (search) {
    filteredRestaurants = restaurantServices.findRestaurantBySearch(
      search,
      filteredRestaurants,
    );
  }
  if (type) {
    filteredRestaurants = restaurantServices.findRestaurantByType(
      type,
      filteredRestaurants,
    );
  }
  if (price) {
    filteredRestaurants = restaurantServices.findRestaurantByPrice(
      price,
      filteredRestaurants,
    );
  }
  if (min_rating) {
    filteredRestaurants = restaurantServices.findRestaurantByAvgRating(
      parseFloat(min_rating),
      filteredRestaurants,
    );
  }
  res.json({ restaurants_list: filteredRestaurants });
});

router.get("/:id", (req, res) => {
  const id = req.params["id"];
  let result = restaurantServices.findRestaurantById(id);
  if (!result) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

router.post("/", (req, res) => {
  const restaurantToAdd = req.body;
  restaurantServices.addRestaurant(restaurantToAdd);
  res.send();
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  let delet = restaurantServices.deleteRestaurantById(id);
  if (!delet) {
    res.status(404).send("Resource not found.");
  } else {
    res.status(200).send(`User with id ${id} was deleted.`);
  }
});

export default router;
