// @ts-nocheck

import React from 'react';
import { ChevronDown, ChevronUp } from 'react-feather';

import range from 'lodash.range';
// range(12) => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ,10 ,11]

import './BoxProcessor.css';

export default function BoxProcessor({ total }) {
  // State to track the number of boxes that remain in the inbox
  // Then we keep track of the number moved to the outbox container
  const [unmovedCount, setUnmovedCount] = React.useState(total);
  const movedCount = total - unmovedCount;

  // Function to decrease the count of unmoved boxes (moving them to the outbox)
  const handleMoveBox = () => {
    if (unmovedCount > 0) setUnmovedCount(unmovedCount - 1);
  };
  // Function to increase the count of unmoved boxes (reverting them back to the inbox)
  const handleRevertBox = () => {
    if (movedCount > 0) setUnmovedCount(unmovedCount + 1);
  };

  return (
    <main className='flex flex-col gap-10'>
      {/* INBOX CONTAINER - Displays boxes that haven't moved yet */}
      <div className='inbox'>
        {range(unmovedCount).map((itemNum) => {
          console.log('inbox', range(unmovedCount));
          return (
            <div key={itemNum} className='box'>
              {itemNum}
            </div>
          );
        })}
      </div>

      {/* CONTROLS - Buttons to move or revert boxes placement */}
      <div className='actions'>
        <button onClick={handleMoveBox}>
          <ChevronDown />
        </button>
        <button onClick={handleRevertBox}>
          <ChevronUp />
        </button>
      </div>

      {/* OUTBOX CONTAINER - Displays boxes that have been moved */}
      <div className='outbox'>
        {range(movedCount).map((itemNum) => {
          console.log('outbox', range(movedCount));
          return (
            <div key={itemNum} className='box'>
              {itemNum}
            </div>
          );
        })}
      </div>
    </main>
  );
}
