import React, { useState } from 'react';
import CustomWheel from '../components/Wheel';
import RestaurantModal from '../components/RestaurantModal';
import restaurants from '../../../express-backend/models/restaurant';

const Home = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSpinClick = () => {
    const randomPrizeNumber = Math.floor(Math.random() * restaurants.restaurants_list.length);
    setPrizeNumber(randomPrizeNumber);
    setMustSpin(true);
  };

  const handleStopSpinning = () => {
    setMustSpin(false);
    fetchRandomRestaurantInfo();
  };

  const fetchRandomRestaurantInfo = async () => {
    const randomIndex = Math.floor(Math.random() * restaurants.restaurants_list.length);
    const restaurantInfo = restaurants.restaurants_list[randomIndex];
    setSelectedItem(restaurantInfo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <h1>Home Page</h1>
      <CustomWheel mustSpin={mustSpin} prizeNumber={prizeNumber} onStopSpinning={handleStopSpinning} />
      <button onClick={handleSpinClick}>Spin the Wheel</button>
      
      <RestaurantModal open={open} handleClose={handleClose} selectedItem={selectedItem} />
    </div>
  );
};

export default Home;