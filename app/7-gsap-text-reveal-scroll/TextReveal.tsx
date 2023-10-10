'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import React, { useLayoutEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import Image from 'next/image';
import SplitType from 'split-type';

export default function TextReveal() {
  const root = useRef<HTMLElement>(null);
  const ctxRef = useRef<any>(null);
  let { current: ctx } = ctxRef;

  useLayoutEffect(() => {
    ctx = gsap.context((self) => {
      // Provide a timeline for each link item
      // const images = gsap.utils.toArray<HTMLAnchorElement>('.art');
      const texts = gsap.utils.toArray<HTMLAnchorElement>('.content');

      texts.forEach((text) => {
        const img = text.nextElementSibling as HTMLImageElement;
        const splitType = new SplitType(text);
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: text,
            start: 'top 80%',
            end: 'bottom center',
            toggleActions: 'play play none reverse',
            // scrub: true, // 👈🏻 toggle to observe effect
          },
          defaults: {
            ease: 'power4.inOut',
          },
        });
        // prettier-ignore
        timeline
          .from(splitType.chars, {
            duration: 1,
            y: 50,
            opacity: 0,
            stagger: 0.005,
            ease: 'power2.out',
          })
          .from(img, {
            opacity: 0,
            y: 100,
            duration: 2,
          }, '<');
      });
    }, root.current?.parentNode!);

    // Introduce Lenis for smoother scrolling
    const lenis = new Lenis({ duration: 8, smoothWheel: true });
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
    <section
      ref={root}
      className='w-full h-full min-w-[1000px] max-w-[1000px] mx-auto'
    >
      <section className='relative grid place-content-center mx-48 h-screen'>
        <span className='text-[4rem] font-bold opacity-30'>001</span>
        <p className='content text-[clamp(1em,5vw,1.2em)] leading-[clamp(0.9em,5vw,1.8em)]'>
          Frontend design acts as the bridge between a brand's vision and its
          audience. It's the first touch point for users, setting the tone for
          their entire interaction. An intuitive and aesthetically pleasing
          design can enhance user engagement, making them feel valued and
          understood.
        </p>
        <Image
          src='/art1.avif'
          width={800}
          height={800}
          alt='supporting image'
          className='art absolute w-[30vw] object-cover rounded-[2px] z-[-1] -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4 drop-shadow-lg'
        />
      </section>
      <section className='relative grid place-content-center mx-48 h-screen'>
        <span className='text-[4rem] font-bold opacity-30'>002</span>
        <p className='content text-[clamp(1em,5vw,1.2em)] leading-[clamp(0.9em,5vw,1.8em)]'>
          The responsiveness of a website is a testament to its frontend
          prowess. It ensures that every user, regardless of their device,
          receives the same exceptional experience. As devices evolve, frontend
          design remains the key to inclusively.
        </p>
        <Image
          src='/art2.avif'
          width={800}
          height={800}
          alt='supporting image'
          className='art absolute w-[30vw] object-cover rounded-[2px] z-[-1] -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4 drop-shadow-lg'
        />
      </section>
      <section className='relative grid place-content-center mx-48 h-screen'>
        <span className='text-[4rem] font-bold opacity-30'>003</span>
        <p className='content text-[clamp(1em,5vw,1.2em)] leading-[clamp(0.9em,5vw,1.8em)]'>
          The amalgamation of design aesthetics with functionality defines the
          modern web. Frontend design is not just about appealing visuals but
          also about reducing load times, ensuring efficient data delivery, and
          optimizing overall performance.
        </p>
        <Image
          src='/art4.avif'
          width={800}
          height={800}
          alt='supporting image'
          className='art absolute w-[30vw] object-cover rounded-[2px] z-[-1] -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4 drop-shadow-lg'
        />
      </section>
    </section>
  );
}
