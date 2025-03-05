import React, { useState, useEffect } from "react";
import RestaurantList from "../components/RestaurantList";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      const response = await fetch("http://localhost:8000/user/favorites");
      const data = await response.json();

      if (!data.favorites || data.favorites.length === 0) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      const restaurantDetailsPromises = data.favorites.map(
        async (restaurantId) => {
          const restaurantResponse = await fetch(
            `http://localhost:8000/restaurants/${restaurantId}`,
          );
          if (!restaurantResponse.ok) {
            throw new Error(`Failed to fetch restaurant ${restaurantId}`);
          }
          return await restaurantResponse.json();
        },
      );

      const restaurantDetails = await Promise.all(restaurantDetailsPromises);
      setFavorites(restaurantDetails);
    } catch (err) {
      console.error("Error fetching favorites:", err);
      setError("Failed to fetch favorite restaurants.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div>
      <h1>Favorites</h1>
      <RestaurantList restaurants={favorites} />
      <p>Recommended Restaurants based on your favorites</p>
    </div>
  );
};

export default Favorites;
