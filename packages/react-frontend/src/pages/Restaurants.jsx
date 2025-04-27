import React, { useState, useEffect } from "react";
import RestaurantList from "../components/RestaurantList";
import SearchFilter from "../components/SearchFilter";
import "../CSS/restaurants.css";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filters, setFilters] = useState({
    searchQuery: "",
    type: "",
    price: "",
    min_rating: "",
  });
  const [city, setCity] = useState("");
  const [filtersLoaded, setFiltersLoaded] = useState(false);

  const fetchLocation = async () => {
    try {
      const res = await fetch("http://localhost:8000/users/current/location", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setCity(data.location.toLowerCase());
    } catch (err) {
      console.error("Error fetching location:", err);
    }
  };

  const fetchFilters = async () => {
    try {
      const res = await fetch("http://localhost:8000/users/current/filters", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setFilters(data.filters);
      setFiltersLoaded(true);
    } catch (err) {
      console.error("Error fetching filters:", err);
    }
  };

  const saveFilters = async (newFilters) => {
    try {
      await fetch("http://localhost:8000/users/current/filters", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ filters: newFilters }),
      });
    } catch (err) {
      console.error("Error saving filters:", err);
    }
  };

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

    const res = await fetch(
      `http://localhost:8000/restaurants/${city}?${queryParams}`,
    );
    return res.json();
  };

  // On mount, fetch location and filters
  useEffect(() => {
    fetchLocation();
    fetchFilters();
  }, []);

  // Fetch restaurants when city and filters load
  useEffect(() => {
    if (city && filtersLoaded) {
      fetchRestaurants(city)
        .then((data) => setRestaurants(data))
        .catch((error) => console.error(error));
    }
  }, [city, filtersLoaded, filters]);

  // Save filters only after filters have been loaded
  useEffect(() => {
    if (filtersLoaded) {
      saveFilters(filters);
    }
  }, [filters]);

  return (
    <div className="restaurants-page">
      <h1>Restaurants</h1>
      <SearchFilter filters={filters} setFilters={setFilters} city={city} />
      <RestaurantList restaurants={restaurants} />
    </div>
  );
};

export default Restaurants;
