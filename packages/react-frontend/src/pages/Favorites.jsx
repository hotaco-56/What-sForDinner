import React, { useState, useEffect } from "react";
import RestaurantList from "../components/RestaurantList";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setIsSignedIn(false);
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:8000/users/details", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        console.error("Invalid or expired token");
        setIsSignedIn(false);
        setLoading(false);
        return;
      }

      setIsSignedIn(true);
      const data = await response.json();

      if (!data.favorites || data.favorites.length === 0) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      // Fetch details for each favorited restaurant
      const restaurantDetails = [];
      for (const restaurantId of data.favorites) {
        try {
          const restaurantResponse = await fetch(
            `http://localhost:8000/restaurants/${restaurantId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (restaurantResponse.ok) {
            const restaurantData = await restaurantResponse.json();
            restaurantDetails.push(restaurantData);
          }
        } catch (error) {
          console.error(`Error fetching restaurant ${restaurantId}:`, error);
        }
      }

      setFavorites(restaurantDetails);
    } catch (err) {
      console.error("Error fetching favorites:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!isSignedIn) {
    return (
      <div style={{ textAlign: "center", marginTop: "20%", color: "white" }}>
        <h1>Please sign in to visit favorites</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Favorites</h1>
      {favorites.length > 0 ? (
        <RestaurantList restaurants={favorites} />
      ) : (
        <p>No favorite restaurants found.</p>
      )}
    </div>
  );
};

export default Favorites;
