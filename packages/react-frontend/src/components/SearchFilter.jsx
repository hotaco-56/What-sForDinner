import React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import {
  Restaurant,
  getRestaurantModel,
} from "../../../express-backend/models/restaurant.js";
import { useState, useEffect } from "react";

const SearchBar = ({ filters, setFilters }) => {
  const handleChange = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      searchQuery: event.target.value,
    }));
  };

  return (
    <TextField
      label="Search restaurant..."
      value={filters.searchQuery}
      onChange={handleChange}
      sx={{ width: 200, backgroundColor: "#333333",
        "& .MuiInputLabel-root": {
          color: "white", // White label color
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "white",
          },
          "&:hover fieldset": {
            borderColor: "white",
          },  
          "&.Mui-focused fieldset": {
            borderColor: "white", // Keep border white when focused
          },
          "& .MuiSelect-icon": {
          color: "white", // Set the dropdown arrow color to white
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "white", // White color when focused
        },
        "& input": {
            color: "white", // White text inside the input field
          },
        }
      }}
    />
  );
};

const RatingDropdown = ({ filters, setFilters }) => {
  const ratingOptions = [4.5, 4, 3.5, 3, 2.5, 2];

  const handleChange = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      min_rating: parseFloat(event.target.value),
    }));
  };

  return (
    <TextField
      select
      label="Minimum Rating"
      value={filters.min_rating}
      onChange={handleChange}
      sx={{ width: 170, backgroundColor: "#333333",
        "& .MuiInputLabel-root": {
          color: "white", // White label color
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "white",
          },
          "&:hover fieldset": {
            borderColor: "white",
          },  
          "&.Mui-focused fieldset": {
            borderColor: "white", // Keep border white when focused
          },
          "& .MuiSelect-icon": {
          color: "white", // Set the dropdown arrow color to white
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "white", // White color when focused
        },
        "& input": {
            color: "white", // White text inside the input field
          },
        }
       }}
    >
      <MenuItem value={0}>Any</MenuItem>
      {ratingOptions.map((rating) => (
        <MenuItem key={rating} value={rating}>
          {rating} & up
        </MenuItem>
      ))}
    </TextField>
  );
};

const TypeDropdown = ({ filters, setFilters }) => {
  const [types, setTypes] = useState([]);
  const city = "slo";

  useEffect(() => {
    const fetchRestaurantTypes = async (city) => {
      try {
        const response = await fetch(
          `http://localhost:8000/restaurants/${city.toLowerCase()}`,
        );
        const data = await response.json();

        // Flatten and remove duplicates
        const uniqueTypes = [...new Set(data.flatMap((r) => r.cuisines))];
        setTypes(uniqueTypes);
      } catch (error) {
        console.error("Error fetching restaurant types:", error);
      }
    };

    fetchRestaurantTypes(city); 
  }, []);

  const handleChange = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      type: event.target.value,
    }));
  };

  return (
    <TextField
      select
      label="Type"
      value={filters.type}
      onChange={handleChange}
      sx={{ width: 150, backgroundColor: "#333333", 
        "& .MuiInputLabel-root": {
          color: "white",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "white",
          },
          "&:hover fieldset": {
            borderColor: "white",
          },  
          "&.Mui-focused fieldset": {
            borderColor: "white",
          },
          "& .MuiSelect-icon": {
          color: "white",
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "white",
        },
        "& input": {
            color: "white",
          },
        }
       }}
    >
      <MenuItem value="">All Types</MenuItem>
      {types.map((type) => (
        <MenuItem key={type} value={type}>
          {type}
        </MenuItem>
      ))}
    </TextField>
  );
};

const PriceDropdown = ({ filters, setFilters }) => {
  const priceOptions = ["$", "$$", "$$$", "$$$$"];

  const handleChange = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      price: event.target.value,
    }));
  };

  return (
    <TextField
      select
      label="Price"
      value={filters.price}
      onChange={handleChange}
      sx={{ width: 150, backgroundColor: "#333333",
        "& .MuiInputLabel-root": {
          color: "white", // White label color
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "white",
          },
          "&:hover fieldset": {
            borderColor: "white",
          },  
          "&.Mui-focused fieldset": {
            borderColor: "white", // Keep border white when focused
          },
          "& .MuiSelect-icon": {
          color: "white", // Set the dropdown arrow color to white
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "white", // White color when focused
          },
          "& input": {
            color: "white", // White text inside the input field
          },
        }
      }}
    >
      <MenuItem value="">Any Price</MenuItem>
      {priceOptions.map((price) => (
        <MenuItem key={price} value={price}>
          {price}
        </MenuItem>
      ))}
    </TextField>
  );
};

//combines all filter components
const SearchFilter = ({ filters, setFilters }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        pl: 4,
        overflowX: "hidden",
      }}
    >
      <SearchBar filters={filters} setFilters={setFilters} />
      <RatingDropdown filters={filters} setFilters={setFilters} />
      <TypeDropdown filters={filters} setFilters={setFilters} />
      <PriceDropdown filters={filters} setFilters={setFilters} />
    </Box>
  );
};

export default SearchFilter;
