import React from 'react';
import { Wheel } from 'react-custom-roulette';

const data = [
  { option: 'Restaurant A', style: { backgroundColor: 'green', textColor: 'black' } },
  { option: 'Restaurant B', style: { backgroundColor: 'white' } },
  { option: 'Restaurant C' },
  { option: 'Restaurant D' },
];

const CustomWheel = ({ mustSpin, prizeNumber }) => (
  <Wheel
    mustStartSpinning={mustSpin}
    prizeNumber={prizeNumber}
    data={data}
    backgroundColors={['#3e3e3e', '#df3428']}
    textColors={['#ffffff']}
  />
);

export default CustomWheel;