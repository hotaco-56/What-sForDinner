import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

//create RestaurantCard component
const RestaurantCard = ({ restaurant }) => {
  const [hover, setHover] = useState(false);
  const [favorited, setFavorited] = useState(false);

  const toggleFavorite = () => {
    setFavorited((prev) => !prev);
  };

  return (
    <Card
      sx={{
        width: "275px",
        flexShrink: 0,
        position: "relative",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {(hover || favorited) && // Show star if hovered or favorited
        (favorited ? (
          <StarIcon
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              cursor: "pointer",
              color: "gold",
            }}
            onClick={toggleFavorite}
          />
        ) : (
          <StarBorderIcon
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              cursor: "pointer",
              color: "primary",
              "&:hover": { color: "gold" },
            }}
            onClick={toggleFavorite}
          />
        ))}
      <CardHeader title={restaurant.name} />
      <CardContent>
        <p>Type: {restaurant.type}</p>
        <p>Address: {restaurant.address}</p>
        <p>Price: {restaurant.price}</p>
        <p>Average Rating: {restaurant.avg_rating}</p>
      </CardContent>
    </Card>
  );
};

//list all restaurant using RestaurantCard component

const RestaurantList = (props) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 2,
        padding: 2,
        overflowX: "hidden",
      }}
    >
      {props.restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </Box>
  );
};

export default RestaurantList;
