import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const RestaurantModal = ({ open, handleClose, selectedItem }) => {
  if (!selectedItem) return null;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        width: 400, 
        bgcolor: 'black', 
        color: 'white', 
        border: '2px solid #000', 
        boxShadow: 24, 
        p: 4 
      }}>
        <Typography variant="h6" component="h2">
          {selectedItem.name}
        </Typography>
        <img src={selectedItem.featured_image} alt={selectedItem.name} style={{ width: '100%', height: 'auto' }} />
        <Typography sx={{ mt: 2 }}>
          Rating: {selectedItem.rating}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Price Range: {selectedItem.price_range_usd}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Cuisines: {selectedItem.cuisines.join(', ')}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <a href={selectedItem.menu_link} target="_blank" rel="noopener noreferrer" style={{ color: 'blue' }}>View Menu</a>
        </Typography>
        <Button onClick={handleClose} sx={{ mt: 2, color: 'white', borderColor: 'white' }}>Close</Button>
      </Box>
    </Modal>
  );
};

export default RestaurantModal;