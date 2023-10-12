'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import { useLayoutEffect, useRef } from 'react';

import Lenis from '@studio-freight/lenis';
import Image from 'next/image';

import Link from 'next/link';

export default function HorizontalScroll() {
  // ... useRef setups and context setup:
  const root = useRef<HTMLElement>(null);
  const ctxRef = useRef<any>(null);
  let { current: ctx } = ctxRef;

  // Additional Refs:
  const sliderRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const addToSections = (el: HTMLElement) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  useLayoutEffect(() => {
    ctx = gsap.context((self) => {
      // Create a new GSAP timeline
      let timeline = gsap.timeline({
        // Setting default properties for all tween's added to the timeline
        defaults: {
          ease: 'none', // Ensures animations run at a consistent speed without any acceleration or deceleration.
        },
        // Set up the scroll interactions for the timeline
        scrollTrigger: {
          trigger: sliderRef.current, // The element watched for scroll changes
          pin: true, // Pins the trigger element in place when it reaches the start position
          scrub: 1, // Makes the animations in the timeline smoothly follow the scroll position
          end: () => '+=' + sliderRef.current?.offsetWidth, // Dynamically calculates the end point of the scroll trigger based on the width of the sliderRef
        },
      });

      // Looping through each section to add animations to the timeline
      sectionsRef.current.forEach((section, index) => {
        // prettier-ignore
        timeline
          // Animation to move the sections horizontally
          .to(sectionsRef.current, {
            // Calculates the horizontal movement based on the section index
            xPercent: -(100 * index),
            duration: index,
            scrollTrigger: {
              // Creates a paginated effect by ensuring animations snap into place when scrolling
              snap: 1 / (sectionsRef.current.length - 1),
            },
          }, '<') // This makes sure the new animation starts at the same time as the previous one
          // ...
          // [Other animations for headers, paragraphs, images, etc. are added to the timeline here]
          // ...
          .to('.inner', {
            scaleX: 1,
            scrollTrigger: {
              scrub: 0.3333
            }
          })
          .from(section.querySelector('h1'), {
            yPercent: 135,
            stagger: 0.04,
            ease: 'power4.inOut'
          })
          .from(section.querySelector('p'), {
            opacity: 0,
            yPercent: 50,
          }, '<')
          .from(section.querySelector('img'), {
            opacity: 0,
            y: 50
          }, '<')
          .to('.root', {
            backgroundColor: section.dataset.bgColor
          })
          .from(section.querySelector(".right-col"), {
            scaleY: 0,
            transformOrigin: 'bottom'
          })
      });
    }, root.current?.parentNode!);

    // Introduce Lenis for smoother scrolling
    const lenis = new Lenis({ duration: 4, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      ctx.revert();
      gsap.globalTimeline.clear(); // Clears all animations from global timeline
      ScrollTrigger.getAll().forEach((st) => st.kill()); // Kills all ScrollTriggers
      // lenis.destroy();
    };
  }, []);

  return (
    <section
      ref={root}
      className='root text-[#1c1c1c] bg-white overflow-hidden scrollbar-hide'
    >
      <Link
        href='#'
        className='logo uppercase text-gray-900 font-bold fixed z-[999] m-32'
      >
        SPACE LOCKER
      </Link>

      {/* We use 300% because each slide is 100% in viewport width */}
      <div className='slider flex w-[300vw]' ref={sliderRef}>
        {/* SLIDE 1 */}
        <section
          className='slide h-screen flex'
          ref={addToSections}
          data-bg-color='hsl(198, 93%, 90%)'
        >
          <main className='left-col px-32 flex-1 flex flex-col items-start justify-center'>
            <div className='content'>
              <div className='mask overflow-hidden'>
                <h1 className='uppercase font-bold text-[clamp(0.85rem,1.5vw,1rem)]'>
                  Shoes X100
                </h1>
              </div>
              <p className='w-[80%] text-[clamp(0.85rem,1.5vw,0.95rem)] leading-8'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                atque nihil veniam consectetur repudiandae labore similique odit
                doloribus laborum incidunt? Necessita voluptatum consequatur
                incidunt libero
              </p>
            </div>
          </main>
          <main className='right-col flex-[0.7] w-full h-screen bg-gradient-to-r from-sky-400/50 to-blue-500/50'></main>
          <Image
            src='/shoe1.png'
            height={600}
            width={600}
            alt='shoe'
            className='absolute w-2/5 right-10 top-1/2'
            style={{ transform: 'translateY(-50%) scaleX(-1)' }}
            priority
          />
        </section>

        {/* SLIDE 2 */}
        <section
          className='slide h-screen flex'
          ref={addToSections}
          data-bg-color='hsl(234, 89%, 90%)'
        >
          <main className='left-col px-32 flex-1 flex flex-col items-start justify-center'>
            <div className='content'>
              <div className='mask overflow-hidden'>
                <h1 className='uppercase font-bold text-[clamp(0.85rem,1.5vw,1rem)]'>
                  Shoes X500
                </h1>
              </div>
              <p className='w-[80%] text-[clamp(0.85rem,1.5vw,0.95rem)] leading-8'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                atque nihil veniam consectetur repudiandae labore similique odit
                doloribus laborum incidunt? Necessita voluptatum consequatur
                incidunt libero
              </p>
            </div>
          </main>
          <main className='right-col flex-[0.7] w-full h-screen bg-gradient-to-r from-indigo-400/50 to-purple-500/50'></main>
          <Image
            src='/shoe2.png'
            height={600}
            width={600}
            alt='shoe'
            className='absolute w-2/5 right-10 top-1/2'
            style={{ transform: 'translateY(-50%) scaleX(-1)' }}
            priority
          />
        </section>

        {/* SLIDE 3 */}
        <section
          className='slide h-screen flex'
          ref={addToSections}
          data-bg-color='hsl(46, 100%, 90%)'
        >
          <main className='left-col px-32 flex-1 flex flex-col items-start justify-center'>
            <div className='content'>
              <div className='mask overflow-hidden'>
                <h1 className='uppercase font-bold text-[clamp(0.85rem,1.5vw,1rem)]'>
                  Shoes X300
                </h1>
              </div>
              <p className='w-[80%] text-[clamp(0.85rem,1.5vw,0.95rem)] leading-8'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                atque nihil veniam consectetur repudiandae labore similique odit
                doloribus laborum incidunt? Necessita voluptatum consequatur
                incidunt libero
              </p>
            </div>
          </main>
          <main className='right-col flex-[0.7] w-full h-screen  bg-gradient-to-r from-yellow-500/50 to-amber-500/50'></main>
          <Image
            src='/shoe3.png'
            height={600}
            width={600}
            alt='shoe'
            className='absolute w-2/5 right-10 top-1/2'
            style={{ transform: 'translateY(-50%) scaleX(-1)' }}
            priority
          />
        </section>
      </div>

      <div className='progress fixed h-[6px] w-[35%] z-50 left-32 bottom-32 rounded-full overflow-hidden bg-black/10'>
        <div className='inner h-full w-full origin-left scale-x-0 bg-gradient-to-r from-sky-400 via-indigo-400 to-yellow-400'></div>
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
