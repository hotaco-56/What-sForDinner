import React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

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
      sx={{ width: 200 }}
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
      sx={{ width: 150 }}
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

const CuisineDropdown = ({ filters, setFilters }) => {
  const categories = ["Italian", "Japanese", "BBQ", "Vegan", "Chinese"];

  const handleChange = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: event.target.value,
    }));
  };

  return (
    <TextField
      select
      label="Cuisine"
      value={filters.category}
      onChange={handleChange}
      sx={{ width: 150 }}
    >
      <MenuItem value="">All Cuisines</MenuItem>
      {categories.map((category) => (
        <MenuItem key={category} value={category}>
          {category}
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
      sx={{ width: 150 }}
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
        gap: 2,
        pl: 4,
        overflowX: "hidden",
      }}
    >
      <SearchBar filters={filters} setFilters={setFilters} />
      <RatingDropdown filters={filters} setFilters={setFilters} />
      <CuisineDropdown filters={filters} setFilters={setFilters} />
      <PriceDropdown filters={filters} setFilters={setFilters} />
    </Box>
  );
};

export default SearchFilter;
