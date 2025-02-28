import React from 'react';
import { Wheel } from 'react-custom-roulette';

const data = [
  { option: 'Popeyes', style: { backgroundColor: 'red', textColor: 'black' } },
  { option: 'Santa Cruz Taqueria', style: { backgroundColor: 'blue' } },
  { option: 'Jack In The Box' },
  { option: 'Quesedilla Gorilla' },
];

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