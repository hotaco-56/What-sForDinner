// backend.js
import express from "express";
import cors from "cors";
import restaurants from "./restaurant.js";
import restaurantServices from "./restaurant-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/restaurants", (req, res) => {
  const name = req.query.name;
  //const category = req.query.price;
  //const price = req.query.price;
  //const avg_rating = req.query.avg_rating;

  if (name != undefined) {
    let result = restaurantServices.findRestaurantByName(name);
    result = { restaurants_list: result };
    res.send(result);
  } else {
    res.send(restaurants);
  }
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
