'use client';

import React from 'react';
import { motion } from 'framer-motion';

import styles from './Toasty.module.css';
import Image from 'next/image';

export default function Toasty() {
  const [isShown, setIsShown] = React.useState(false);

  const wrapperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // An observer is a function that is called whenever an element is scrolled into view.
    // It takes an array of entries, which are objects that contain information about the element.
    // Below we use the `ref` to get the element and then we call observe on it when in view.
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setIsShown(entry.isIntersecting);
    });
    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }
  }, []);

  const translateX = isShown ? '-20%' : '100%';

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <motion.div
        className={styles.character}
        // ..without framer motion:
        // style={{
        //   transition: 'transform 200ms',
        //   transform: `translateX(${translateX})`,
        // }}
        initial={false}
        transition={{
          type: 'spring',
          // https://chenglou.me/react-motion/demos/demo5-spring-parameters-chooser/
          stiffness: isShown ? 300 : 600,
          damping: isShown ? 70 : 40,
          restDelta: 0.01, // This is where animation ends as percentage (default 0.5).
        }}
        animate={{
          x: translateX,
        }}
      >
        {/* 🍞 */}
        <Image
          src='/msg.png'
          width={100}
          height={100}
          alt='Toasty'
          className='w-full h-full shadow-sm yellow ball'
          priority
        />
      </motion.div>
    </div>
  );
}
