'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import './styles.css';

import React, { useLayoutEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import Image from 'next/image';

export default function ScrollScrub() {
  const root = useRef<HTMLElement>(null);
  const ctxRef = useRef<any>(null);
  let { current: ctx } = ctxRef;

  useLayoutEffect(() => {
    ctx = gsap.context(() => {
      /* PINNED - A pin property "pins" an element in place while you scrolling
      until a defined endpoint (often determined by `end` or endTrigger). During
      this period, any animations you've defined will play out. Once you scroll
      past a pinned section, it "unpins" and natural scroll of the page continues.

      When you set pin: true, the triggered element itself will be pinned. If
      you specify a string as the value of pin (like pin: ".elementToPin"), then
      that specific element will be pinned instead.

      Pinning is commonly used for scroll-based storytelling or to focus the
      viewer's attention on a particular section of a page as they scroll. */
      const pinTl = gsap.timeline({
        scrollTrigger: {
          pin: true, // 👈🏻 toggle to observe effect
          trigger: '.primary',
          start: 'top 10%',
          end: 'bottom center',
          toggleActions: 'play reverse restart reverse',
        },
        defaults: {
          ease: 'power3.out',
          duration: 1,
        },
      });
      pinTl
        .from('aside h1', { yPercent: 100 })
        .from('aside p', { yPercent: 140 }, '-=0.8')
        .from('.content', { yPercent: 210, opacity: 0 }, '-=1');

      /* SCRUB - The scrub property makes the animation timeline play in sync
      with a scrollbar position. Essentially, it binds animation to scroll
      position. If you've ever seen an animation on a website where elements
      move, transform, or change based on how far you've scrolled, it's often
      achieved with scrubbing. When you set scrub: true, the animation will
      smoothly follow the scroll position.

      If you set scrub to a numerical value, this determines the lag/smoothing
      effect. For example, scrub: 0.5 will make the animation catch up to the
      scroll position in 0.5 seconds, creating a slightly delayed effect. */
      const scrubTl = gsap.timeline({
        scrollTrigger: {
          scrub: true, // 👈🏻 toggle to observe effect
          trigger: '.primary',
          start: 'top 30%',
          end: '40% top',
        },
      });
      scrubTl
        .from('.line', { scaleY: 0 })
        .from('.watermark', { x: 0, yPercent: 0 }, '-=1');
    }, root.current?.parentNode!); // <- IMPORTANT! scopes selector

    // Introduce Lenis for smoother scrolling
    const lenis = new Lenis({ duration: 6, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      ctx.revert();
      gsap.globalTimeline.clear(); // Clears all animations from the global timeline
      ScrollTrigger.getAll().forEach((st) => st.kill()); // Kills all ScrollTriggers
      lenis.destroy();
    };
  }, []);

  return (
    <section ref={root} className='w-full h-full text-white'>
      <header className='absolute top-2 left-2 flex gap-2 items-center justify-center'>
        <Image
          src='/adidas-logo.png'
          height={150}
          width={150}
          alt='logo'
          priority
        />
      </header>
      <section className='whitespace h-screen w-screen grid place-content-center text-lg font-light'>
        hero area (scroll down)
      </section>

      <section className='primary relative h-screen flex items-center gap-36 overflow-hidden mx-auto'>
        <aside className='flex-[0.7]'>
          <div className='mask overflow-hidden drop-shadow'>
            <h1 className='text-7xl pt-1 pb-8 pr-1 text-[gold]'>dynamic</h1>
          </div>
          <div className='mask overflow-hidden -mt-[74px]'>
            <p className='font-light text-[35px] pt-6 pb-6 pr-1 text-[gold] opacity-40'>
              performance
            </p>
          </div>
        </aside>
        <main className='flex-1'>
          <div className='mask overflow-hidden'>
            <p className='content leading-7 text-lg'>
              <strong className='text-[gold]'>Adidas</strong> powers every
              stride, leap, and turn with dynamic technology.
              <br />
              Experience the pinnacle of sport performance today.
            </p>
          </div>
        </main>

        <div className='line absolute h-2/3 border border-gray-500 left-[40%]'></div>
        <span className='watermark absolute'>adidas</span>
      </section>

      <section className='whitespace h-screen grid place-content-center text-lg font-light'>
        footer area (scroll up)
      </section>
    </section>
  );
}
