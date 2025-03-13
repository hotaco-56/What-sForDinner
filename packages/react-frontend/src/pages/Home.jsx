import React, { useState } from 'react';
import CustomWheel from '../components/Wheel';
import RestaurantModal from '../components/RestaurantModal';

const Home = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);
  const items = ['Popeyes', 'Santa Cruz Taqueria', 'Jack In The Box', 'Quesedilla Gorilla'];

  const handleSpinClick = () => {
    const randomIndex = Math.floor(Math.random() * items.length);
    setPrizeNumber(randomIndex);
    setMustSpin(true);
  };

  const handleStopSpinning = () => {
    setMustSpin(false);
    setSelectedItem(items[prizeNumber]);
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
      {selectedItem && <p>Selected Restaurant: {selectedItem}</p>}
      
      <RestaurantModal open={open} handleClose={handleClose} selectedItem={selectedItem} />
    </div>
  );
};

export default Home;