'use client';

import gsap from 'gsap';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { Plus } from 'react-feather';

export default function Bookmark() {
  // create a ref for the root level element (for scoping)
  const root = useRef<HTMLElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  // Your Context object itself is passed to the function so you can reference
  // it easily like gsap.context((self) => { ... self.add(...) })
  const ctx = gsap.context((self) => {
    self.add('onMouseEnter', () => {
      if (linkRef.current) {
        gsap.to(linkRef.current.querySelector('.inner-circle'), {
          scale: 1,
          duration: 0.3,
          ease: 'back.out(1.7)',
        });
        gsap.to(linkRef.current.querySelector('.mask span'), {
          // target the span inside .mask
          y: '0%',
          duration: 0.3,
          ease: 'ease.in',
        });
      }
    });
    // Add method for mouse leave
    self.add('onMouseLeave', () => {
      if (linkRef.current) {
        gsap.to(linkRef.current.querySelector('.inner-circle'), {
          scale: 0,
          duration: 0.3,
          ease: 'back.in(1.7)',
        });
        gsap.to(linkRef.current.querySelector('.mask span'), {
          // target the span inside .mask
          y: '-200%', // Explicitly set back CSS value to -200%
          duration: 0.3,
          ease: 'ease.in',
        });
      }
    });
  });

  useEffect(() => {
    // Cleanup function
    return () => ctx.revert();
  }, [ctx]);

  return (
    <section
      ref={root}
      className='wrapper h-full w-full flex items-center justify-center'
    >
      <div
        className='p-10 absolute'
        onMouseEnter={ctx.onMouseEnter}
        onMouseLeave={ctx.onMouseLeave}
      >
        <Link
          href='/'
          ref={linkRef}
          className='p-2 bg-blue-100/5 rounded-xl shadow-lg flex gap-[0.5em] no-underline items-center'
        >
          <div className='outer-circle p-2 w-[4em] h-[4em] relative rounded-[50%]'>
            <div className='inner-circle absolute w-full h-full z-[-1] origin-center rounded-[50%] scale-0 left-0 top-0 bg-white/10'></div>
            <Plus className='h-full w-full text-white/80 object-cover' />
          </div>
          <div className='mask overflow-hidden'>
            <span className='text-[1.2rem] font-normal text-[white] translate-y-[-200%] block'>
              Add to Bookmark
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
