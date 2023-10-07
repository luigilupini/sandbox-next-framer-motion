'use client';

import gsap from 'gsap';
import React, { useLayoutEffect, useRef } from 'react';

export default function OceanHero() {
  const root = useRef<HTMLElement>(null);
  const ctxRef = useRef<any>(null);
  let { current: ctx } = ctxRef;

  useLayoutEffect(() => {
    ctx = gsap.context(() => {
      gsap.set(['.fade1', '.fade2', '.fade3'], {
        scaleY: 0,
        transformOrigin: 'top',
      });
      const timeline = gsap.timeline({
        defaults: {
          duration: 0.4,
          ease: 'power4.inOut',
        },
      });
      // prettier-ignore
      timeline
        .to(['.fade1', '.fade2', '.fade3'], {
          scaleY: 1,
          stagger: 0.2,
        })
        .to('.title', {
          x: 0,
          duration: 2,
          ease: 'elastic.out(1, 0.5)',
        }, '-=0.5')
        .to('.fade1', {
          border: 'none',
          scaleY: 0,
        })
        .to('.fade3', {
          border: 'none',
          scaleY: 0,
          transformOrigin: 'bottom',
        }, '-=0.5')
        .to('.fade2', {
          height: '100vh',
        }, '-=0.5')
        .to('.title', {
          scale: 0.6,
        }, '-=0.5')
    }, root.current?.parentNode!); // <- IMPORTANT! scopes selector
    return () => ctx.revert(); // cleanup GSAP context
  }, []);

  return (
    <section ref={root} className='w-full h-full text-[white] bg-white'>
      <div className='fade-container grid grid-rows-[repeat(3,1fr)] grid-cols-[1fr] h-screen'>
        <div className='fade1 bg-[#C9D6EA] blur-[1px] border border-solid border-[#5E9EFF]'></div>
        <div className='fade2 bg-[#5E9EFF] blur-[1px] border border-solid border-[#2C80FF]'></div>
        <div className='fade3 bg-[#2C80FF] blur-[1px] border border-solid border-[#0F62FE]'></div>
      </div>

      <div className='mask p-4 overflow-hidden absolute -translate-x-2/4 -translate-y-2/4 z-[1] left-2/4 top-2/4'>
        <h1 className='title drop-shadow-sm text-[7rem] font-black tracking-[-0.08em] z-[1] translate-x-[-110%] m-0'>
          Oceana.
        </h1>
      </div>
    </section>
  );
}
