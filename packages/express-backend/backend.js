// backend.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import restaurantServices from "./models/restaurant-services.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

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

    restaurants.forEach((restaurant) => {
      const restaurantDetails = {
        id: restaurant.id,
        name: restaurant.name,
        link: restaurant.link,
        reviews: restaurant.reviews,
        rating: restaurant.rating,
        price_range_usd: restaurant.price_range_usd,
        menu_link: restaurant.menu_link,
        reservation_link: restaurant.reservation_link,
        featured_image: restaurant.featured_image,
        has_delivery: restaurant.has_delivery,
        cuisines: restaurant.cuisines,
      };

      restaurantServices.addRestaurant(restaurantDetails);
    });
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
}

//fetchAllRestaurants("San Luis Obispo"); //try to limit use 200 calls per month

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/restaurants", restaurantRoutes);
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
