import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

//create RestaurantCard component
const RestaurantCard = ({ restaurant }) => {
  return (
    <Card>
      <CardHeader title={restaurant.name} />
      <CardContent>
        <p>Caregory: {restaurant.category}</p>
        <p>Price: {restaurant.price}</p>
        <p>Average Rating: {restaurant.avg_rating}</p>
      </CardContent>
    </Card>
  );
};

//list all restaurant using RestaurantCard component

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  function fetchRestaurants() {
    const promise = fetch("http://localhost:8000/restaurants");
    return promise;
  }

  useEffect(() => {
    fetchRestaurants()
      .then((res) => res.json())
      .then((json) => setRestaurants(json["restaurants_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return restaurants.map((restaurant) => (
    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
  ));
};

export default RestaurantList;
