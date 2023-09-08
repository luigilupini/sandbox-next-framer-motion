//@ts-nocheck
'use client';
import React from 'react';
import range from 'lodash.range';
import { motion } from 'framer-motion';

import styles from './CoinSorter.module.css';

const NUM_OF_BOXES = 4;

export default function CoinSorter({ numOfCoins }) {
  const [selectedBox, setSelectedBox] = React.useState(0);
  const gridTemplateColumns = '2fr 3fr 4fr';
  const gridTemplateRows = '4fr 5fr';
  return (
    <main
      className={`${styles.wrapper} grid grid-gap-4 grid-cols-3 grid-rows-2 gap-1`}
      style={{ gridTemplateColumns, gridTemplateRows }}
    >
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

          {selectedBox === boxIndex ? (
            range(numOfCoins).map((coinIndex) => {
              return (
                <span key={coinIndex} className={styles.coin}>
                  {coinIndex}
                </span>
              );
            })
          ) : (
            <span className='text-xs'>Empty</span>
          )}
        </button>
      ))}
    </main>
  );
}
