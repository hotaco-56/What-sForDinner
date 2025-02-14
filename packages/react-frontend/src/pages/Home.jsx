import React, { useState } from 'react';
import CustomWheel from '../components/Wheel';

const Home = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const items = ['Popeyes', 'Santa Cruz Taqueria', 'Jack In The Box', 'Quesedilla Gorilla'];

  const handleSpinClick = () => {
    const randomIndex = Math.floor(Math.random() * items.length);
    setPrizeNumber(randomIndex);
    setMustSpin(true);
  };

  const handleStopSpinning = () => {
    setMustSpin(false);
    setSelectedItem(items[prizeNumber]);
  };

  return (
    <div>
      <h1>Home Page</h1>
      <CustomWheel mustSpin={mustSpin} prizeNumber={prizeNumber} />
      <button onClick={handleSpinClick}>Spin the Wheel</button>
      {selectedItem && <p>Selected Restaurant: {selectedItem}</p>}
    </div>
  );
};

export default Home;