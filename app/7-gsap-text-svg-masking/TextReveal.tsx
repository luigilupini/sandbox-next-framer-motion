'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import Lenis from '@studio-freight/lenis';
import { useLayoutEffect, useRef } from 'react';

import './styles.css';
import Image from 'next/image';

export default function TextReveal() {
  const root = useRef<HTMLElement>(null);
  const ctxRef = useRef<any>(null);
  let { current: ctx } = ctxRef;

  useLayoutEffect(() => {
    ctx = gsap.context((self) => {
      gsap.from('text', {
        scrollTrigger: {
          trigger: 'svg',
          start: 'top center',
          end: 'bottom 20%',
          scrub: 2,
        },
        scale: 0.5,
        opacity: 0,
        transformOrigin: 'center',
        duration: 2,
        ease: 'power4.out',
      });
    }, root.current?.parentNode!);

    // Introduce Lenis for smoother scrolling
    const lenis = new Lenis({ duration: 2, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      ctx.revert();
      gsap.globalTimeline.clear(); // Clears all animations from global timeline
      ScrollTrigger.getAll().forEach((st) => st.kill()); // Kills all ScrollTriggers
      lenis.destroy();
    };
  }, []);

  return (
    <section ref={root} className='w-full h-full bg-white'>
      <section className='relative h-screen w-screen grid place-content-center text-lg font-light'>
        hero area (scroll down)
        <header className='absolute top-10 left-8 flex flex-col items-center justify-center'>
          <Image
            src='/netflix-logo.svg'
            height={150}
            width={150}
            alt='logo'
            priority
          />
          <h1 className='text-gray-900 text-sm'>Drive to Survive</h1>
        </header>
      </section>
      <article>
        <video
          autoPlay
          playsInline
          muted
          loop
          preload='auto'
          poster='/f1image.jpeg'
          className='max-w-xl min-w-[500px] absolute z-[-1] -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4'
        >
          <source src='/f1video.mp4' />
        </video>

        <svg
          viewBox='0 0 285 80'
          preserveAspectRatio='xMidYMid slice'
          className='absolute top-0 left-0 h-full w-full'
        >
          <defs>
            <mask
              id='mask'
              x='0'
              y='0'
              width='100%'
              height='100%'
              className='grid place-content-center h-screen'
            >
              <rect x='0' y='0' width='100%' height='100%' />
              <text className='font-bold text-[0.75rem] tracking-[-0.15rem] translate-x-[39.9%] translate-y-[49%]'>
                FORMULA
              </text>
              <text className='font-bold text-[0.72rem] tracking-[-0.20rem] translate-x-[39.9%] translate-y-[60%]'>
                ONE/2023
              </text>
            </mask>
          </defs>

          <rect x='0' y='0' width='100%' height='100%' />
        </svg>
      </article>
    </section>
  );
}
