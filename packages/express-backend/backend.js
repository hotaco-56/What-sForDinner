// backend.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
//import restaurantServices from "./models/restaurant-services.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./database.js";
import { Restaurant, getRestaurantModel } from "./models/restaurant.js";

dotenv.config();

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

connectDB();

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": process.env.RAPIDAPI_KEY,
    "x-rapidapi-host": "tripadvisor-scraper.p.rapidapi.com",
  },
};

async function fetchRestaurants(page, location) {
  const encodedLocation = encodeURIComponent(location);
  const url = `https://tripadvisor-scraper.p.rapidapi.com/restaurants/list?query=${encodedLocation}&page=${page}`;

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const restaurants = data.results || [];

    for (const restaurant of restaurants) {
      const priceRange = restaurant.price_range_usd?.includes(" - ")
        ? restaurant.price_range_usd.split(" - ")
        : restaurant.price_range_usd
          ? [restaurant.price_range_usd]
          : [];
      const restaurantDetails = {
        id: restaurant.id,
        name: restaurant.name,
        link: restaurant.link,
        reviews: restaurant.reviews,
        rating: restaurant.rating,
        price_range_usd: priceRange,
        menu_link: restaurant.menu_link,
        reservation_link: restaurant.reservation_link,
        featured_image: restaurant.featured_image,
        has_delivery: restaurant.has_delivery,
        cuisines: restaurant.cuisines,
      };

      try {
        const newRestaurant = new Restaurant(restaurantDetails);
        await newRestaurant.save();
      } catch (dbError) {
        console.error(
          `Error saving restaurant ${restaurant.name}:`,
          dbError.message,
        );
      }
    }
    console.log("Saves completed");
  } catch (error) {
    console.error(
      `Error fetching or storing restaurants from page ${page} in ${location}:`,
      error.message,
    );
  }
}

async function fetchAllRestaurants(location) {
  await fetchRestaurants(1, location);
  await fetchRestaurants(2, location);
  await fetchRestaurants(3, location);
  await fetchRestaurants(4, location);
  await fetchRestaurants(5, location);
  await fetchRestaurants(6, location);
  await fetchRestaurants(7, location);
  await fetchRestaurants(8, location);
  await fetchRestaurants(9, location);
  await fetchRestaurants(10, location);
  await fetchRestaurants(11, location);
  await fetchRestaurants(12, location);
  await fetchRestaurants(13, location);
  await fetchRestaurants(14, location);
  await fetchRestaurants(15, location);
  console.log("all saves complete");
}

//sf pages 1-10, 300 restaurants
//slo pages 1-5, 150 restaurants
//nyc pages 1-15, 450 restaurnts
//fetchAllRestaurants("New York City"); //DONT UNCOMMENT

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/restaurants", restaurantRoutes);
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
