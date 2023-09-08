'use client';

import React from 'react';
import { motion } from 'framer-motion';
import './GettingStarted.css';

export default function GettingStarted() {
  const [isEnabled, setIsEnabled] = React.useState(true);

  return (
    <>
      <motion.div
        className='shadow-sm yellow ball '
        initial={false}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 25,
        }}
        animate={{
          y: isEnabled ? 60 : 0,
        }}
      />
      <button onClick={() => setIsEnabled(!isEnabled)}>Toggle</button>
    </>
  );
}
