import express from "express";
import { Restaurant, getRestaurantModel } from "../models/restaurant.js";

const router = express.Router();

router.get("/:city", async (req, res) => {
  try {
    const { search, type, price, min_rating } = req.query;
    const { city } = req.params;

    const Restaurant = getRestaurantModel(city);
    let query = {};

    if (search) query.name = { $regex: search, $options: "i" };
    if (type) query.cuisines = { $in: [type] };
    if (price) query.price_range_usd = price;
    if (min_rating) query.rating = { $gte: parseFloat(min_rating) };

    const restaurants = await Restaurant.find(query);

    res.json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ error: "Error fetching restaurants" });
  }
});

// check bellow never used yet
router.get("/:id", async (req, res) => {
  const { city } = req.params;
  const Restaurant = getRestaurantModel(city);
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: "Not found" });
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ error: "Error fetching restaurant" });
  }
});

router.post("/", async (req, res) => {
  const { city } = req.params;
  const Restaurant = getRestaurantModel(city);
  try {
    const newRestaurant = new Restaurant(req.body);
    await newRestaurant.save();
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(500).json({ error: "Error adding restaurant" });
  }
});



router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Restaurant.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Restaurant deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting restaurant" });
  }
});

export default router;
