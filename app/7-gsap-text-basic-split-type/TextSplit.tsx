'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import Lenis from '@studio-freight/lenis';
import { useLayoutEffect, useRef } from 'react';

import SplitType from 'split-type';
import './styles.css';

export default function TextSplit() {
  const root = useRef<HTMLElement>(null);
  const ctxRef = useRef<any>(null);
  let { current: ctx } = ctxRef;

  useLayoutEffect(() => {
    ctx = gsap.context((self) => {
      const text = new SplitType('.heading');
      // Provide a timeline for each link item
      const timeline = gsap.timeline({ defaults: { ease: 'power4.inOut' } });

      gsap.set('h1', { autoAlpha: 1 });

      timeline
        // // Option 1: (each char)
        .from(text.chars, {
          y: 40,
          opacity: 0,
          skewX: 30,
          stagger: 0.03,
          duration: 1,
        });
      // // Option 2: (each word)
      // .from(text.words, {
      //   y: 40,
      //   opacity: 0,
      //   skewX: 30,
      //   stagger: 0.03,
      //   duration: 1,
      // });
      // // Option 3: (per line)
      // .from(text.lines, {
      //   y: 40,
      //   opacity: 0,
      //   skewX: 30,
      //   stagger: 0.03,
      //   duration: 1,
      // });
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
    <section ref={root} className='w-full h-full grid place-content-center'>
      <h1 className='heading text-[calc(2rem_+_5vw)] drop-shadow-md'>
        Gsap &amp; Frontend
      </h1>
    </section>
  );
}
