'use client';

import gsap from 'gsap';
import React, { useLayoutEffect, useRef } from 'react';

export default function SportsLoader() {
  const root = useRef<HTMLElement>(null);
  const ctxRef = useRef<any>(null);
  let { current: ctx } = ctxRef;

  useLayoutEffect(() => {
    ctx = gsap.context(() => {
      gsap.set('.ball', {
        yPercent: -600,
        rotationZ: -295,
        top: '50%',
        left: '50%',
        xPercent: -50,
      });
      gsap.set('.heading', { yPercent: -100 });
      gsap.set('.loader', { scaleX: 0 });

      const tl = gsap.timeline({ repeat: 0, repeatDelay: 2 });
      tl.to('.ball', {
        yPercent: -50,
        rotationZ: 0,
        duration: 2,
        ease: 'bounce.out',
      })
        .to('.heading', {
          yPercent: 0,
          ease: 'power1.out',
        })
        .to(
          '.loader',
          {
            scaleX: 1,
            duration: 2,
            ease: 'power1.in',
          },
          '-=0.2' // offset the start of the tween by 0.2 seconds
        );
    }, root.current?.parentNode!); // <- IMPORTANT! scopes selector
    return () => ctx.revert(); // cleanup GSAP context
  }, []);

  return (
    <section
      ref={root}
      className='w-full h-full grid place-content-center bg-[#0F987F] text-[white]'
    >
      <div className='loader absolute -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4 w-full h-px bg-white'></div>
      <img
        src='/ball.svg'
        alt='ball'
        className='ball absolute drop-shadow-sm'
      />
      <div className='mask overflow-hidden'>
        <h1 className='heading text-center font-black text-lg -tracking-wider mt-0 mb-[20rem] mx-0 text-white'>
          welcome.
        </h1>
      </div>
    </section>
  );
}
