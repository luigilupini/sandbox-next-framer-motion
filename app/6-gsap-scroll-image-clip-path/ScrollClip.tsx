'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import React, { useLayoutEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import Image from 'next/image';

export default function ScrollClip() {
  const root = useRef<HTMLElement>(null);
  const ctxRef = useRef<any>(null);
  let { current: ctx } = ctxRef;

  useLayoutEffect(() => {
    ctx = gsap.context((self) => {
      // Provide a timeline for each link item
      const images = gsap.utils.toArray<HTMLAnchorElement>('.art');
      gsap.set('.art', {
        clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
      });
      gsap.set('.border', {
        scaleX: 0,
      });
      gsap.set('.text', {
        yPercent: 120,
      });
      const galleryTl = gsap.timeline({
        scrollTrigger: {
          // pin: true, // 👈🏻 toggle to observe effect
          trigger: '.gallery',
          start: 'top 20%',
          end: 'bottom top',
          toggleActions: 'play none none reverse',
        },
        defaults: {
          ease: 'power4.inOut',
        },
      });
      // prettier-ignore
      galleryTl
      .from('.card', {
        y: -100,
        stagger: .1
      })
      .to('.art', {
          clipPath: 'polygon(0% 95%, 100% 49%, 100% 100%, 0 100%)'
      }, "<")
      .to('.art', {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
      }, "-=0.5")
      .to('.border', {
          scaleX: 1
      }, "-=0.5")
      .to('.text', {
          yPercent: 0,
          stagger: 0.1
      }, "-=0.5")

      images.forEach((img) => {
        img.addEventListener('mouseenter', () => {
          gsap.to(img, {
            clipPath: 'polygon(0% 13%, 100% 0%, 100% 87%, 0% 100%)',
          });
        });
        img.addEventListener('mouseleave', () => {
          gsap.to(img, {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          });
        });
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
    <section ref={root} className='w-full h-full text-gray-900 bg-white'>
      <section className='whitespace h-screen w-screen grid place-content-center text-lg font-light'>
        hero area (scroll down)
      </section>

      <section className='gallery text-gray-900 bg-white'>
        <ul className='h-screen w-screen px-4 flex items-center justify-center gap-[3%]'>
          <li className='card'>
            <a href='#'>
              <Image
                src='/art1.avif'
                width={400}
                height={400}
                alt='Syntholtic'
                className='art w-full object-cover rounded-[2px]'
                priority
              />

              <div className='border mt-2 h-px origin-left border-gray-900/60'></div>

              <div className='info flex items-center justify-between overflow-hidden'>
                <span className='text text-xl font-bold'>01</span>
                <p className='text uppercase text-sm'>Syntholtic</p>
              </div>
            </a>
          </li>
          <li className='card'>
            <a href='#'>
              <Image
                src='/art2.avif'
                width={400}
                height={400}
                alt='Bumblebee'
                className='art w-full object-cover rounded-[2px]'
                priority
              />

              <div className='border mt-2 h-px origin-left border-gray-900/60'></div>

              <div className='info flex items-center justify-between overflow-hidden'>
                <span className='text text-xl font-bold'>02</span>
                <p className='text uppercase text-sm'>Bumblebee</p>
              </div>
            </a>
          </li>
          <li className='card'>
            <a href='#'>
              <Image
                src='/art3.avif'
                width={400}
                height={400}
                alt='Smorg'
                className='art w-full object-cover rounded-[2px]'
                priority
              />

              <div className='border mt-2 h-px origin-left border-gray-900/60'></div>

              <div className='info flex items-center justify-between overflow-hidden'>
                <span className='text text-xl font-bold'>03</span>
                <p className='text uppercase text-sm'>Smorg</p>
              </div>
            </a>
          </li>
          <li className='card'>
            <a href='#'>
              <Image
                src='/art4.avif'
                width={400}
                height={400}
                alt='Violeta'
                className='art w-full object-cover rounded-[2px]'
                priority
              />
              <div className='border mt-2 h-px origin-left border-gray-900/60'></div>

              <div className='info flex items-center justify-between overflow-hidden'>
                <span className='text text-xl font-bold'>04</span>
                <p className='text uppercase text-sm'>Violeta</p>
              </div>
            </a>
          </li>
        </ul>
      </section>
    </section>
  );
}
