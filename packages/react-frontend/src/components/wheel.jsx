import React from 'react';
import { Wheel } from 'react-custom-roulette';
import restaurants from '../../../express-backend/models/restaurant';

const data = restaurants.restaurants_list.map((restaurant, index) => ({
  option: '',
  style: { backgroundColor: ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown'][index % 8] }
}));

const CustomWheel = ({ mustSpin, prizeNumber, onStopSpinning }) => (
  <Wheel
    mustStartSpinning={mustSpin}
    prizeNumber={prizeNumber}
    data={data}
    backgroundColors={['#3e3e3e', '#df3428']}
    textColors={['#ffffff']}
    onStopSpinning={onStopSpinning}
  />
);

export default CustomWheel;