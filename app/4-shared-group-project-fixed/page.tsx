//@ts-nocheck
'use client';

import React from 'react';
import BookPage from './BookPage';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-center w-full h-full'>
      <BookPage />
    </main>
  );
}
