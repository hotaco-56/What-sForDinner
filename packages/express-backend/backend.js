// backend.js
import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import restaurantServices from "./models/restaurant-services.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";

dotenv.config();

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

async function fetchNearbyRestaurants() {
  const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
  const url = `https://places.googleapis.com/v1/places:searchNearby?key=${API_KEY}`;

  function formatRestaurantType(type) {
    return type
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  try {
    const response = await axios.post(
      url,
      {
        includedTypes: ["restaurant"], // Filter for restaurants
        locationRestriction: {
          circle: {
            center: { latitude: 35.2828, longitude: -120.6596 }, // San Luis Obispo, CA
            radius: 50000.0,
          },
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-FieldMask":
            "places.id,places.displayName,places.rating,places.priceLevel,places.formattedAddress,places.primaryType",
        },
      },
    );

    // Check if response contains places
    const restaurants = response.data.places || [];

    const priceMapping = {
      PRICE_LEVEL_UNSPECIFIED: "NA",
      PRICE_LEVEL_FREE: "$",
      PRICE_LEVEL_INEXPENSIVE: "$",
      PRICE_LEVEL_MODERATE: "$$",
      PRICE_LEVEL_EXPENSIVE: "$$$",
      PRICE_LEVEL_VERY_EXPENSIVE: "$$$$",
    };

    // Process and store each restaurant's details
    restaurants.forEach((restaurant) => {
      const restaurantDetails = {
        id: restaurant.id,
        type: formatRestaurantType(restaurant.primaryType) || "Unknown",
        name: restaurant.displayName?.text || "Unknown",
        address: restaurant.formattedAddress || "Unknown",
        price: priceMapping[restaurant.priceLevel] || "NA",
        avg_rating: restaurant.rating || "NA",
      };
      restaurantServices.addRestaurant(restaurantDetails);
    });

    console.log("Successfully fetched and stored nearby restaurants.");
  } catch (error) {
    console.error(
      "Error fetching nearby restaurants:",
      error.response?.data || error.message,
    );
  }
}

fetchNearbyRestaurants(); //Try to limit use

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/restaurants", restaurantRoutes);

app.get("/favorites", (req, res) => {
  let favorites = restaurantServices.getAllRestaurants(); //change
  res.json({ favorites_list: favorites });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
