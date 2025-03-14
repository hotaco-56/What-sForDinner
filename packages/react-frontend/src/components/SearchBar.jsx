import React, { useState } from "react";
import restaurants from "./RestaurantCard";

const searchBar = () => {
    const [searchInput, setSearchInput] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };
      
    if (searchInput.length > 0) {
        restaurants.filter((restaurant) => {
        return restaurant.name.match(searchInput);
        });
    }
    
    <div>

    <input
        type="text"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput} />

    <table>
      <tr>
        <th>Name</th>
      </tr>

    {restaurants.map((country) => {
      <tr>
        <td>{restaurants.name}</td>
      </tr>

    })}
    </table>

    </div>
    
}

export default searchBar;