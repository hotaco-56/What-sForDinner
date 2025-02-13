import React, { useState, useEffect } from "react";
import RestaurantList from "../components/RestaurantCard";

const Restaurants = () => {
  return (
    <div>
      <h1>Restaurants</h1>
      <p>here well display all restaurants and ability to search</p>
      <RestaurantList />
    </div>
  );
};

export default Restaurants;
