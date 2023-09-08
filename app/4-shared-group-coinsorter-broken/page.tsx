//@ts-nocheck
'use client';

import React from 'react';
import CoinSorter from './CoinSorter';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-center w-full h-full'>
      <CoinSorter numOfCoins={6} />
    </main>
  );
}
