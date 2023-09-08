'use client';

import React from 'react';
import Toggle from './Toggle';

export default function Home() {
  const [isEnabled, setIsEnabled] = React.useState(false);
  return (
    <main className='flex flex-col items-center justify-center w-full h-full'>
      <Toggle value={isEnabled} onChange={setIsEnabled} />
    </main>
  );
}
