//@ts-nocheck
'use client';

import React from 'react';
import { LayoutGroup, motion } from 'framer-motion';
import range from 'lodash.range';

import './BoxProcessor.css';
import { Minus, Plus } from 'react-feather';

// > INTRO: BOX PROCESSOR (NON-FUNGIBLE)
// Something non-fungible has unique properties and isn't on a one-to-one basis
// interchangeable with any other item. This component is designed to manage a
// set of boxes that either "processed" or "unprocessed". However each box has a
// unique ID and a status. The boxes can be moved between "inbox" (unprocessed)
// and "outbox" (processed) status by clicking on them, toggling that status.

// The boxes are non-fungible because each box has a unique ID. When a box is
// moved 'filtered', its specific identity retained. Meaning that the boxes are
// distinct and not treated as identical. We just flip their status.
const initialState = range(8).map(() => ({
  id: crypto.randomUUID(),
  status: 'unprocessed',
}));

export default function BoxProcessor() {
  // Initialize the boxes with unique IDs and set their status to 'unprocessed'
  const [boxes, setBoxes] = React.useState(initialState);

  // Function to toggle the status of a box between 'processed' and 'unprocessed'
  const toggleBoxStatus = (id) => {
    const updatedBoxes = boxes.map((box) => {
      if (box.id !== id) return box;
      return {
        ...box,
        status: box.status === 'unprocessed' ? 'processed' : 'unprocessed',
      };
    });
    setBoxes(updatedBoxes);
  };

  // Filter the boxes based on their status
  const unprocessedBoxes = boxes.filter((box) => box.status === 'unprocessed');
  const processedBoxes = boxes.filter((box) => box.status === 'processed');
  console.log('Initial state: ', boxes);
  console.log({ unprocessedBoxes, processedBoxes });

  return (
    <LayoutGroup>
      <main className='flex flex-col gap-10'>
        {/* INBOX CONTAINER - Displays boxes that are unprocessed */}
        <div className='relative inbox'>
          {unprocessedBoxes.map((box) => (
            <motion.button
              layoutId={box.id}
              key={box.id}
              className='box'
              onClick={() => toggleBoxStatus(box.id)}
            >
              <Minus />
            </motion.button>
          ))}
          <p className='cursor-not-allowed absolute bottom-0 px-1 py-[2px] text-[11px] font-bold text-pink-600 -right-0'>
            unprocessed
          </p>
        </div>

        {/* OUTBOX CONTAINER - Displays boxes that are processed */}
        <div className='relative outbox'>
          {processedBoxes.map((box) => (
            <motion.button
              layoutId={box.id}
              key={box.id}
              className='box'
              onClick={() => toggleBoxStatus(box.id)}
            >
              <Plus />
            </motion.button>
          ))}
          <p className='cursor-not-allowed absolute bottom-0 px-1 py-[2px] text-[11px] font-bold text-pink-600 -right-0'>
            processed
          </p>
        </div>
      </main>
    </LayoutGroup>
  );
}
