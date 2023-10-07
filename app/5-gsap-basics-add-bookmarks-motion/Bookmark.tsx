'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Plus } from 'react-feather';
import { motion, useAnimation } from 'framer-motion';

export default function Bookmark() {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const controls = useAnimation();

  const circleVariants = {
    hover: { scale: 1.1 },
    unhover: { scale: 0 },
  };

  const maskVariants = {
    hover: { y: '0%' },
    unhover: { y: '-100%' },
  };

  const handleMouseEnter = () => controls.start('hover');
  const handleMouseLeave = () => controls.start('unhover');

  return (
    <section className='wrapper h-full w-full flex items-center justify-center'>
      <div
        className='p-10 absolute'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link
          href='/'
          ref={linkRef}
          className='p-2 bg-blue-100/5 rounded-xl shadow-lg flex gap-[0.5em] no-underline items-center'
        >
          <div className='outer-circle p-2 w-[4em] h-[4em] relative rounded-[50%]'>
            <motion.div
              initial='unhover'
              animate={controls}
              variants={circleVariants}
              className='inner-circle absolute w-full h-full z-[-1] origin-center rounded-[50%] scale-0 left-0 top-0 bg-white/10'
            ></motion.div>
            <Plus className='h-full w-full text-white/80 object-cover' />
          </div>
          <div className='mask overflow-hidden'>
            <motion.span
              initial='unhover'
              animate={controls}
              variants={maskVariants}
              className='text-[1.2rem] font-normal text-[white] translate-y-[-200%] block z-50'
            >
              Add to Bookmark
            </motion.span>
          </div>
        </Link>
      </div>
    </section>
  );
}
