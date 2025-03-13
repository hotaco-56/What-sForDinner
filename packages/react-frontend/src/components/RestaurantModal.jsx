import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const RestaurantModal = ({ open, handleClose, selectedItem }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        width: 400, 
        bgcolor: 'background.paper', 
        border: '2px solid #000', 
        boxShadow: 24, 
        p: 4 
      }}>
        <Typography variant="h6" component="h2">
          {selectedItem}
        </Typography>
        <img src="placeholder-image-url" alt={selectedItem} style={{ width: '100%', height: 'auto' }} />
        <Typography sx={{ mt: 2 }}>
          Location: Placeholder Location
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Price Range: Placeholder Price Range
        </Typography>
        <Button onClick={handleClose} sx={{ mt: 2 }}>Close</Button>
      </Box>
    </Modal>
  );
};

export default RestaurantModal;