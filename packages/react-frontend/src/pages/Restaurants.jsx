import React, { useState, useEffect } from "react";
import RestaurantList from "../components/RestaurantList";
import SearchFilter from "../components/SearchFilter";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filters, setFilters] = useState({
    searchQuery: "",
    type: "",
    price: "",
    min_rating: "",
  });

  const fetchRestaurants = async (city) => {
    if (!city) {
      console.error("City parameter is required!");
      return Promise.reject("City parameter is required");
    }

    let queryParams = new URLSearchParams();

    if (filters.searchQuery) queryParams.append("search", filters.searchQuery);
    if (filters.type) queryParams.append("type", filters.type);
    if (filters.price) queryParams.append("price", filters.price);
    if (filters.min_rating > 0)
      queryParams.append("min_rating", filters.min_rating);

    const promise = fetch(
      `http://localhost:8000/restaurants/${city.toLowerCase()}?${queryParams}`,
    );
    return promise;
  };

  useEffect(() => {
    fetchRestaurants("nyc") //later change to get city from user
      .then((res) => res.json())
      .then((json) => {
        setRestaurants(json);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [filters]);

  return (
    <div>
      <h1>Restaurants</h1>
      <SearchFilter filters={filters} setFilters={setFilters} />
      <RestaurantList restaurants={restaurants} />
    </div>
  );
};

export default Restaurants;
