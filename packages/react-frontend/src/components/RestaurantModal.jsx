import React from "react";
import { Modal, Box, Typography, Button, Link } from "@mui/material";
import "../CSS/RestaurantModal.css";

const RestaurantModal = ({ open, handleClose, selectedItem }) => {
  if (!selectedItem) return null;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="modal-container">
        <Typography className="modal-title" variant="h6" component="h2">
          {selectedItem.name || "Unknown Restaurant"}
        </Typography>

        <img
          className="modal-image"
          src={selectedItem.featured_image || "NA"}
          alt={selectedItem.name || "Unknown"}
          style={{ height: "175px", width: "auto", marginBottom: "10px" }}
        />

        <Typography className="modal-typography" sx={{ mt: 1 }}>
          <strong>Rating:</strong> {selectedItem.rating || "No rating"}
        </Typography>

        <Typography className="modal-typography" sx={{ mt: 1 }}>
          <strong>Reviews:</strong> {selectedItem.reviews || 0} reviews
        </Typography>

        <Typography className="modal-typography" sx={{ mt: 1 }}>
          <strong>Price Range:</strong> {selectedItem.price_range_usd || "N/A"}
        </Typography>

        <Typography className="modal-typography" sx={{ mt: 1 }}>
          <strong>Cuisines:</strong>{" "}
          {selectedItem.cuisines.length > 0
            ? selectedItem.cuisines.join(", ")
            : "Unknown"}
        </Typography>

        <Typography className="modal-typography" sx={{ mt: 1 }}>
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

        <Button className="close-button" onClick={handleClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default RestaurantModal;
