import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import "../CSS/RestaurantList.css";

//create RestaurantCard component
const RestaurantCard = ({ restaurant }) => {
  const [hover, setHover] = useState(false);
  const [favorited, setFavorited] = useState(false);

  const toggleFavorite = () => {
    setFavorited((prev) => !prev);
  };

  return (
    <Card
      className="restaurant-card"
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
        <p className="restaurant-image">
          {restaurant.featured_image ? (
            <img
              src={restaurant.featured_image}
              alt={`${restaurant.name} image`}
              style={{
                width: "100%",
                maxWidth: "500px",
                height: "auto",
              }}
            />
          ) : (
            "No image available"
          )}
        </p>
        <p className="restaurant-link">
          {restaurant.link ? (
            <a href={restaurant.link} target="_blank" rel="noopener noreferrer">
              Visit Website
            </a>
          ) : (
            "Unknown"
          )}
        </p>
        <p>
          Cuisines:{" "}
          {restaurant.cuisines.length > 0
            ? restaurant.cuisines.join(", ")
            : "NA"}
        </p>
        <p>Price Range: {restaurant.price_range_usd || "NA"}</p>
        <p>Average Rating: {restaurant.rating || "NA"}</p>
        <p>Reviews: {restaurant.reviews || "NA"}</p>
        <p>Has Delivery: {restaurant.has_delivery ? "Yes" : "No"}</p>

        {/* Menu Link */}
        <p>
          {restaurant.menu_link ? (
            <a
              href={restaurant.menu_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Menu
            </a>
          ) : (
            "Menu Not Available"
          )}
        </p>

        {/* Reservation Link */}
        <p className="restaurant-link">
          {restaurant.reservation_link ? (
            <a
              href={restaurant.reservation_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Make a Reservation
            </a>
          ) : (
            "Reservation Not Available"
          )}
        </p>
      </CardContent>
    </Card>
  );
};

//list all restaurant using RestaurantCard component

const RestaurantList = (props) => {
  return (
    <Box className="restaurant-list">
      {(props.restaurants || []).map((restaurant) => (
        <RestaurantCard key={restaurant._id} restaurant={restaurant} />
      ))}
    </Box>
  );
};

export default RestaurantList;
