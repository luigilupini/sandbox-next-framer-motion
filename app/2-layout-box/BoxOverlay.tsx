import React from 'react';
import { motion } from 'framer-motion';
import './BoxOverlay.css';

export default function BoxOverlay() {
  const [isMaximized, setIsMaximized] = React.useState(false);
  return (
    <>
      <motion.div
        layout={true}
        transition={SPRING}
        className={`wrapper ${isMaximized ? 'maximized' : ''}`}
      >
        <motion.p layout='position' transition={SPRING}>
          Hello world
        </motion.p>
      </motion.div>

      <button onClick={() => setIsMaximized(!isMaximized)}>Toggle</button>
    </>
  );
}

const SPRING = {
  type: 'spring',
  stiffness: 200,
  damping: 40,
};
