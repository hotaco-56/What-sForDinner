import React, { useState, useEffect } from "react";
import RestaurantList from "../components/RestaurantList";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  const fetchRestaurants = async () => {
    const promise = fetch(`http://localhost:8000/favorites`);
    return promise;
  };

  useEffect(() => {
    fetchRestaurants()
      .then((res) => res.json())
      .then((json) => setFavorites(json["favorites_list"]))
      .catch((error) => {
        console.log(error);
        setFavorites([]);
      });
  }, []);

  return (
    <div>
      <h1>Favorites</h1>
      <p>display favories and recommend based on</p>
      <RestaurantList restaurants={favorites} />
    </div>
  );
};

export default Favorites;
