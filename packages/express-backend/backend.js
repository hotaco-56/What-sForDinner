// backend.js
import express from "express";
import cors from "cors";
import restaurantServices from "./models/restaurant-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/restaurants", (req, res) => {
  const { search, category, price, min_rating } = req.query;

  let filteredRestaurants = restaurantServices.getAllRestaurants();

  if (search) {
    filteredRestaurants = restaurantServices.findRestaurantBySearch(
      search,
      filteredRestaurants,
    );
  }
  if (category) {
    filteredRestaurants = restaurantServices.findRestaurantByCategory(
      category,
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

app.get("/restaurants/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = restaurantServices.findRestaurantById(id);
  if (!result) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.post("/restaurants", (req, res) => {
  const restaurantToAdd = req.body;
  restaurantServices.addRestaurant(restaurantToAdd);
  res.send();
});

app.delete("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  let delet = restaurantServices.deleteRestaurantById(id);
  if (!delet) {
    res.status(404).send("Resource not found.");
  } else {
    res.status(200).send(`User with id ${id} was deleted.`);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
