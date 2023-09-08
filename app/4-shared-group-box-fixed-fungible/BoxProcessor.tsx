//@ts-nocheck
'use client';

import React from 'react';
import { ChevronDown, ChevronUp } from 'react-feather';
import { LayoutGroup, motion } from 'framer-motion';
import range from 'lodash.range';
// range(12) => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ,10 ,11]

import './BoxProcessor.css';

// > INTRO: BOX PROCESSOR (FUNGIBLE)
// Something is fungible if individual units of it are interchangeable. This
// component is designed to manage a set of interchangeable boxes that either
// move into a "inbox" (unmoved) or "outbox" (moved) array based on a counter.
// Each box does'nt have unique identifiers and are treated as identical.

// The boxes are fungible because they don't have unique identities themselves.
// When a box is moved from inbox to outbox, it doesn't matter which specific
// box was moved. They're all treated as identical and interchangeable. Their
// movement is based on a unmovedCount, individual status aren't considered.
export default function BoxProcessor({ total }) {
  // An identifier for this component instance
  const id = React.useId();

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
  // Generate a consistent list of boxes, each with a unique layoutId
  const boxes = range(total).map((itemNum) => {
    const layoutId = `${id}-${itemNum}`;
    return (
      <motion.div layoutId={layoutId} key={layoutId} className='box'>
        {itemNum}
      </motion.div>
    );
  });

  // Split the boxes between "inbox" and "outbox" arrays
  const inboxArray = boxes.slice(0, unmovedCount); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ,10 ,11]
  const outboxArray = boxes.slice(unmovedCount); // [] 👈🏻 at first render

  console.log('Current unmoved counter: ', total - unmovedCount);
  console.log({ inboxArray, outboxArray });

  return (
    <LayoutGroup>
      <main className='flex flex-col gap-10'>
        {/* INBOX CONTAINER - Displays boxes that haven't moved yet */}
        <div className='inbox'>{inboxArray}</div>

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
        <div className='outbox'>{outboxArray}</div>
      </main>
    </LayoutGroup>
  );
}
