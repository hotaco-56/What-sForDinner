import express from "express";
import userServices from "../models/users-services.js";
import User from "../models/users.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.send(userServices.getUsers());
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
