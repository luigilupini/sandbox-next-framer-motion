'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
gsap.registerPlugin(ScrollTrigger);

import React, { useLayoutEffect, useRef } from 'react';

export default function ScrollBasics() {
  const root = useRef<HTMLElement>(null);
  const ctxRef = useRef<any>(null);
  let { current: ctx } = ctxRef;

  useLayoutEffect(() => {
    ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.middle',
          start: 'top 20%',
          end: 'bottom center',
          // markers: true, // toggle
          /* 
            The 4 states of Toggle Actions:
            onEnter - action occurs when you scroll into a specific section/element for the first time (scrolling down).
            onLeave - action occurs when you scroll out of a specific section/element for the first time (scrolling down).
            onEnterBack - action occurs when you scroll back into a specific section/element for the first time (scrolling up).
            onLeaveBack - action occurs when you scroll back out of a specific section/element for the first tim (scrolling up).
            
            Values: "play", "pause", "resume", "reset", "restart", "complete", "reverse", and "none"             
         */
          // toggleActions: 'play none none none', // 👈🏻 default configuration is for `onEnter` play and remaining set to none
          // toggleActions: 'play reverse none none', // reverse when we `onLeave` state
          // toggleActions: 'play reverse play none', // play when we `onEnterBack` state
          toggleActions: 'play reverse play reverse', // reverse when we `onLeaveBack` state
        },
      });
      // prettier-ignore
      timeline
        .from(['h2', 'h3', 'p'], {
          yPercent: 140,
          stagger: 0.1,
        })
        .from('.box',{
          scaleY: 0,
          ease: 'elastic.out(1, 0.5)',
          duration: 2,
          stagger: 0.3
        },'-=0.3');
    }, root.current?.parentNode!); // <- IMPORTANT! scopes selector
    return () => {
      ctx.revert();
      gsap.globalTimeline.clear(); // Clears all animations from the global timeline
      ScrollTrigger.getAll().forEach((st) => st.kill()); // Kills all ScrollTriggers
    };
  }, []);

  return (
    <section ref={root} className='w-full h-full text-white'>
      <header className='absolute top-2 left-2 flex gap-2 items-center justify-center'>
        <Image
          src='/lacoste-logo.png'
          height={100}
          width={100}
          alt='logo'
          className=''
        />
        <h1 className='text-xl font-bold'>LACOSTE</h1>
      </header>
      <section className='whitespace h-screen grid place-content-center text-lg font-light bg-[rgba(56,178,113,0.1)]'>
        hero area (scroll down)
      </section>

      <section className='middle h-screen flex items-start p-10 bg-[rgba(56,178,113,0.1)]'>
        <div className='mask overflow-hidden self-center flex-1'>
          <h2 className='font-black text-[5rem]'>lacoste</h2>
        </div>

        <div className='card card1 relative self-center flex-1 -mt-60 drop-shadow font-light'>
          <div className='mask overflow-hidden h-auto p-2'>
            <h3 className='text-[clamp(2rem,5vw,2.5rem)] leading-8 mt-24 text-right float-right'>
              classic
              <br />
              elegance
            </h3>
          </div>
          <div className='mask overflow-hidden h-auto p-2'>
            <p className='w-[70%] text-[clamp(0.85rem,5vw,1rem)] leading-4 text-right float-right'>
              classic designs that transcends time that embody French elegance
            </p>
          </div>
          <div className='box absolute w-56 h-full z-[-1] rounded-md right-[20%] top-12 bg-emerald-600/20 shadow-sm' />
        </div>

        <div className='card card2 relative self-center mt-[10rem] flex-1 drop-shadow font-light'>
          <div className='mask overflow-hidden h-auto p-2'>
            <h3 className='text-[clamp(2rem,5vw,2.5rem)] leading-8 mt-24'>
              inspired
              <br />
              sophistication
            </h3>
          </div>
          <div className='mask overflow-hidden h-auto p-2'>
            <p className='w-[70%] text-[clamp(0.85rem,5vw,1rem)] leading-4'>
              merging the worlds of sport and lifestyle in modern sportswear
            </p>
          </div>
          <div className='box absolute w-56 h-full z-[-1] rounded-md top-12 bg-emerald-600/30 shadow-sm left-[20%] right-0' />
        </div>
      </section>

      <section className='whitespace h-screen grid place-content-center text-lg font-light bg-[rgba(56,178,113,0.1)]'>
        footer area (scroll up)
      </section>
    </section>
  );
}
