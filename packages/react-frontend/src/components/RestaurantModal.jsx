import React from "react";
import { Modal, Box, Typography, Button, Link } from "@mui/material";

const RestaurantModal = ({ open, handleClose, selectedItem }) => {
  console.log("Modal open:", open);
  console.log("Selected Item:", selectedItem);

  if (!selectedItem) return null;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          color: "black",
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2">
          {selectedItem.name || "Unknown Restaurant"}
        </Typography>

        <img
          src={selectedItem.featured_image || "NA"}
          alt={selectedItem.name || "Unknown"}
          style={{ width: "100%", height: "auto", marginBottom: "10px" }}
        />

        <Typography sx={{ mt: 1 }}>
          <strong>Rating:</strong> {selectedItem.rating || "No rating"}
        </Typography>

        <Typography sx={{ mt: 1 }}>
          <strong>Reviews:</strong> {selectedItem.reviews || 0} reviews
        </Typography>

        <Typography sx={{ mt: 1 }}>
          <strong>Price Range:</strong>{" "}
          {selectedItem.price_range_usd.length > 0
            ? selectedItem.price_range_usd.join(", ")
            : "N/A"}
        </Typography>

        <Typography sx={{ mt: 1 }}>
          <strong>Cuisines:</strong>{" "}
          {selectedItem.cuisines.length > 0
            ? selectedItem.cuisines.join(", ")
            : "Unknown"}
        </Typography>

        <Typography sx={{ mt: 1 }}>
          <strong>Delivery:</strong> {selectedItem.has_delivery ? "Yes" : "No"}
        </Typography>

        {selectedItem.link && (
          <Typography sx={{ mt: 1 }}>
            <Link href={selectedItem.link} target="_blank" rel="noopener">
              View on TripAdvisor
            </Link>
          </Typography>
        )}

        {selectedItem.menu_link && (
          <Typography sx={{ mt: 1 }}>
            <Link href={selectedItem.menu_link} target="_blank" rel="noopener">
              View Menu
            </Link>
          </Typography>
        )}

        {selectedItem.reservation_link && (
          <Typography sx={{ mt: 1 }}>
            <Link
              href={selectedItem.reservation_link}
              target="_blank"
              rel="noopener"
            >
              Make a Reservation
            </Link>
          </Typography>
        )}

        <Button
          onClick={handleClose}
          sx={{
            mt: 2,
            display: "block",
            mx: "auto",
            bgcolor: "#1976d2",
            color: "white",
            "&:hover": { bgcolor: "#115293" },
          }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default RestaurantModal;
