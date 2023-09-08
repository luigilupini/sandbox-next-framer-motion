//@ts-nocheck
'use client';
import React from 'react';
import range from 'lodash.range';
import { LayoutGroup, motion } from 'framer-motion';

import styles from './CoinSorter.module.css';

const NUM_OF_BOXES = 4;

const gridTemplate = {
  columns: '2fr 3fr 4fr',
  rows: '4fr 5fr',
};

// > INTRO: COIN SORTER (MIXED)
// Something is fungible if individual units of it are interchangeable. This
// component manages a set of boxes, where each box can either display a set
// of coins or remain empty. The coins within a box are fungible, as they are
// identical to each other and don't have distinct characteristics that go
// beyond their count. However, the boxes are non-fungible in this context as
// each box has a unique state (either displays coins or is empty), and only
// one box can display the coins at a given time.
export default function CoinSorter({ numOfCoins }) {
  const id = React.useId();
  // State to track the currently selected box's index
  const [selectedBox, setSelectedBox] = React.useState(0);
  const { columns, rows } = gridTemplate;
  return (
    <LayoutGroup>
      <main
        className={`${styles.wrapper} grid grid-gap-4 grid-cols-3 grid-rows-2 gap-1`}
        style={{ gridTemplateColumns: columns, gridTemplateRows: rows }}
      >
        {/* ITERATE INTO GRID CONTAINER GRID ITEMS (BOXES) */}
        {range(NUM_OF_BOXES).map((boxIndex) => (
          <button
            key={boxIndex}
            className={`${styles.box} ${
              // A selected box gets selected styles otherwise no additional classes
              selectedBox === boxIndex ? styles.selected : ''
            }`}
            onClick={() => setSelectedBox(boxIndex)}
          >
            <span className='absolute bottom-0 text-[11px] rounded-full left-1 text-white/50'>
              Index: {boxIndex}
            </span>

            {/* DISPLAY COINS ONLY IF SELECTED IN GRID ITEM (BOX) */}
            {selectedBox === boxIndex ? (
              range(numOfCoins).map((coinIndex) => {
                return (
                  <motion.div
                    // 1) Problem with zero index item as its falsy
                    // layoutId={coinIndex} // 👈🏻 toggle to see the problem :)
                    // 2) Solution but a problem if component is instantiated more than once
                    // layoutId={`coin-${coinIndex}`} // 👈🏻 toggle to see the problem :)
                    // 3) Solution with React.useId and unique id 🎉
                    layoutId={`${id}-${coinIndex}`}
                    key={coinIndex}
                    className={styles.coin}
                    // 👇🏻 Comment out the transition to see default behavior
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 30 + coinIndex * 10,
                    }}
                  >
                    {coinIndex}
                  </motion.div>
                );
              })
            ) : (
              <span className='text-xs'>Empty</span>
            )}
          </button>
        ))}
      </main>
    </LayoutGroup>
  );
}
