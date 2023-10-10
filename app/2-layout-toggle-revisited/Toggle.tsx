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
      style={{
        // Lets switch from working with animated values to working with layout
        // We are modifying the flex layout on how the ball (span) is positioned
        // The layout prop on the span is handling the CSS transforms for us
        // The benefit is that it does not depend on any explicit ratios
        // So you can change the width here, layout will transform accordingly
        display: 'flex',
        justifyContent: value ? 'flex-end' : 'flex-start',
        width: '50%',
      }}
    >
      <motion.span
        className={styles.ball}
        initial={false} // disable enter animation
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 40,
        }}
        // FROM THIS:
        // animate={{
        //   x: value ? '100%' : '0%',
        // }}
        // TO THIS:
        layout={true}
      />
    </button>
  );
}
