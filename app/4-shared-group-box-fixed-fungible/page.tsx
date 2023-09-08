'use client';

import React from 'react';
import BoxProcessor from './BoxProcessor';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-center w-full h-full'>
      <BoxProcessor total={12} />
    </main>
  );
}
