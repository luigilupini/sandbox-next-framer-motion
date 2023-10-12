'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import { useLayoutEffect, useRef } from 'react';

import Lenis from '@studio-freight/lenis';
import Image from 'next/image';

export default function HorizontalScroll() {
  const root = useRef<HTMLElement>(null);
  const ctxRef = useRef<any>(null);
  let { current: ctx } = ctxRef;

  // Additional Refs:
  const scrollerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const addToSections = (el: HTMLElement) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  useLayoutEffect(() => {
    ctx = gsap.context((self) => {
      // A tween is essentially a single animation or a sequence of animations.
      // It allows us to create an animation timeline that we can control (pause, reverse, etc.).
      // Here the `scrollTween` animating the horizontal movement of the `sections`.
      let scrollTween = gsap.to(sectionsRef.current, {
        // Moving horizontal as many times as the number of sections, minus one each time.
        // xPercent sets the horizontal position as a percentage of the element's in width.
        xPercent: -100 * (sectionsRef.current.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: scrollerRef.current,
          pin: true, // pins the .scroll container
          scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
          snap: 1 / (sectionsRef.current.length - 1), // snap to the closest section!
          // The end position is dynamically calculated based on the width of the scroller.
          // The end value is based on the width of the scroller container.
          // It determines a total scroll length based on its width.
          end: '+=' + (scrollerRef.current?.offsetWidth ?? 0),
        },
      });

      // For each section, create a ScrollTrigger animation
      sectionsRef.current.forEach((section) => {
        // Here, we're animating the H1 of each section upon entering the viewport
        gsap.from(section.querySelector('h1'), {
          opacity: 0,
          y: -100,
          scrollTrigger: {
            containerAnimation: scrollTween, // this ensures this animation is linked to the above scrollTween
            trigger: section.querySelector('h1'),
            start: 'left center',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, root.current?.parentNode!);

    // Introduce Lenis for smoother scrolling
    const lenis = new Lenis({ duration: 10, smoothWheel: true });
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
      className='outer bg-gray-100 text-[#1c1c1c] overflow-hidden'
    >
      <div className='relative h-screen w-screen grid place-content-center text-lg font-light border-2 border-black rounded-md'>
        hero area (scroll down)
        <header className='absolute top-10 left-10 flex flex-col items-center justify-center'>
          <Image
            src='/newyorktimes1.png'
            height={150}
            width={150}
            alt='logo'
            priority
          />
        </header>
      </div>
      {/* We use 300% because each slide is 100% in viewport width */}
      <div ref={scrollerRef} className='scroll flex w-[300%]'>
        <article
          ref={addToSections}
          className='slide h-screen w-full grid place-content-center bg-gradient-to-r from-sky-400/20 to-blue-500/20 border-2 border-blue-500 rounded-md'
        >
          <h1>We sliding horizontal here (slide 1)</h1>
        </article>
        <article
          ref={addToSections}
          className='slide h-screen w-full grid place-content-center bg-gradient-to-r from-indigo-400/20 to-purple-500/20 border-2 border-purple-500 rounded-md'
        >
          <h1>We sliding horizontal here (slide 2)</h1>
        </article>
        <article
          ref={addToSections}
          className='slide h-screen w-full grid place-content-center bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-2 border-amber-500 rounded-md'
        >
          <h1>We sliding horizontal here (slide 3)</h1>
        </article>
      </div>

      <div className='relative h-screen w-screen grid place-content-center text-lg font-light border-2 border-black rounded-md'>
        footer area (scroll up)
        <div className='absolute bottom-40 w-screen border border-black/80'></div>
        <header className='absolute bottom-6 right-6 flex flex-col items-center justify-center gap-2'>
          <Image
            src='/newyorktimes2.png'
            height={60}
            width={60}
            alt='logo'
            priority
          />
          <h1 className='text-sm'>Contact the times</h1>
        </header>
      </div>
    </section>
  );
}

/* 
===============================================================
GSAP: Tweens vs Timelines
===============================================================

### Tweens:
- Tween stands for "in-betweening", a term from classic animation.
- It represents the intermediary frames between two keyframes.
- In GSAP, a tween is essentially a single animation of one or more properties over time.
- It's an animation instance targeting a particular object or set of objects.
- They are changing specified properties over a duration.
- Examples of GSAP tweens include `gsap.to()`, `gsap.from()`, and `gsap.fromTo()`.

Example:
// Animates the opacity of an element with ID "box" from 0 to 1 over 2 seconds.
gsap.to("#box", {duration: 2, opacity: 1});

### Timelines:
- A timeline is like a container where you can place multiple tweens (and even other timelines)
- This timeline is a place that we sequence or even overlap animation.
- It provides much more control compared to standalone tweens.
- You can control the entire sequence of animations as a single unit
- We can pause it, reverse it, speed it up, slow it down, etc.
- Timelines allow for intricate choreography by making it easy to set up sequences of animations.
- You can apply precise control over the timing and order of each tween.
- `gsap.timeline()` is the method to create a new timeline.

Example:
const tl = gsap.timeline();
tl.to("#box1", {duration: 2, x: 100})
  .to("#box2", {duration: 1, y: 50}, "<")
  .to("#box3", {duration: 3, rotation: 360});

### Key Differences:
1. Granularity:
A tween is for a single animation on one or more properties.
While a timeline is a container for a sequence or group of tweens and nested timelines.

2. Control:
Timelines provide controls like `pause()`, `resume()`, `reverse()`, and more. 
They affect all nested tweens and timelines.

3. Placement:
With timelines, you can control the start and end times of tweens, overlap them, stagger them, etc.

4. Relative Timing:
Timelines allow for relative positioning of tweens using labels and offsets.
That is not possible with standalone tweens.

Summary: While tweens and timelines in GSAP can sometimes seem to achieve similar tasks,
timelines provide a higher level of control and organization, especially for complex animations and sequences.
*/

/*
-----------------------------------
ScrollTrigger with Tweens and Timelines
-----------------------------------

Basics:
- ScrollTrigger is an extension of GSAP that provides scroll-based interactions.
- Both tweens and timelines to create scroll-driven animations and effects.

With Tweens:
- It determines when a tween starts, progress, and when it ends, based on scroll position.
Example:
gsap.from(".element", {
  duration: 2,
  x: 100,
  scrollTrigger: {
    trigger: ".element",
    start: "top center", 
    end: "+=500",
    scrub: true
  }
});

With Timelines:
- ScrollTrigger can control an entire animation sequence (timeline) based on scroll position.
- This of course is affecting all tweens within this timeline container.
Example:
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".container",
    start: "top top",
    end: "bottom bottom",
    scrub: 1
  }
});
tl.to(".element1", {x: 100})
  .to(".element2", {y: 50})
  .to(".element3", {rotation: 360});

Key Points:
1. Flexibility: Can be applied to individual tweens or entire timelines.
2. Scrubbing: Allows the animation to progress "Scrub/Stick" in tandem with scroll position.
3. Pinning: "Pin" an element in place during a specified duration of scroll.
4. Debugging: Display markers in the browser for start and end trigger points for easier setup and debugging.

In conclusion: ScrollTrigger enhances GSAP's capabilities.
It offering a consistent interface and functionality for creating scroll-driven animations. */
