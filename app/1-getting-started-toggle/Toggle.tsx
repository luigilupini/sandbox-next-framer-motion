'use client';

import React from 'react';
import { motion } from 'framer-motion';

import styles from './Toggle.module.css';

interface Props {
  value: boolean;
  onChange: (value: boolean) => void;
}

export default function Toggle({ value, onChange, ...delegated }: Props) {
  return (
    <button
      type='button'
      role='switch'
      aria-checked={value}
      className={styles.wrapper}
      onClick={() => onChange(!value)}
      {...delegated}
    >
      {/* <span
        className={styles.ball}
        style={{
          transition: 'transform 300ms',
          transform: `translateX(${value ? '100%' : '0%'})`,
        }}
      /> */}
      <motion.span
        className={styles.ball}
        initial={false} // disable enter animation
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 40,
        }}
        animate={{
          x: value ? '100%' : '0%',
        }}
      />
    </button>
  );
}
