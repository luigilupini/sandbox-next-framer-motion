'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import { useLayoutEffect, useRef } from 'react';

import './styles.css';
import Lenis from '@studio-freight/lenis';
import Image from 'next/image';

export default function HorizontalScroll() {
  // ... useRef setups and context setup:
  const root = useRef<HTMLElement>(null);
  const ctxRef = useRef<any>(null);
  let { current: ctx } = ctxRef;

  // Additional Refs:
  const sliderRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const fishesRef = useRef<HTMLImageElement[]>([]);
  const addToSections = (el: HTMLElement) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };
  const addToFishes = (el: HTMLImageElement) => {
    if (el && !fishesRef.current.includes(el)) {
      fishesRef.current.push(el);
    }
  };

  useLayoutEffect(() => {
    // Initializing a GSAP context to control or adjust animations
    ctx = gsap.context((self) => {
      // STEP 1: Create a new GSAP timeline instance.
      // A timeline lets you group multiple tween(s) together and controls them as a whole.
      const timeline = gsap.timeline({
        defaults: {
          // 'none' means no easing, just linear transitions.
          ease: 'none',
        },
        // STEP 2: The reference element that triggers the scroll animation!
        scrollTrigger: {
          trigger: sliderRef.current,
          // This "pins" the triggered element (the slider) during the animation.
          pin: true,
          // Makes the animation smooth and links it's progress to the scroll position.
          // With 2 this indicates a lag of 2 seconds.
          scrub: 2,
          // Dynamic calculation for the `end` of the scroll.
          // This ensures that the animation takes the slider's `width` into account.
          // Minus `window.innerWidth` so that we don't scroll past a final slide.
          end: () => `+=${sliderRef.current?.offsetWidth! - window.innerWidth}`,
        },
      });

      // STEP 3: The actual animation for the timeline.
      // As it translates (moving) the `slider` horizontally we reveal the slide <section>.
      // This is the essence of the horizontal scrolling effect.
      // The '-200vw' means we moving it left by two times the viewport width, showing the each slide.
      timeline.to(sliderRef.current, { x: '-200vw' });

      // Optional: Here we animate the content
      sectionsRef.current.forEach((el, i) => {
        // We use the `timeline` instance we created above.
        // prettier-ignore
        timeline
          .from(el.querySelector('.content'), {
            yPercent: -50,
            opacity: 0,
            scrollTrigger: {
              trigger: el.querySelector('.content'),
              start: 'left center',
              end: 'center center',
              containerAnimation: timeline,
              scrub: true,
              //horizontal: true
            },
          })
          .from(el.querySelector('img'), {
            xPercent: 40,
            yPercent: -240,
            ease: 'elastic.out(1, 1)',
            scrollTrigger: {
              trigger: el.querySelector('.content'),
              scrub: 2,
              //horizontal: true,
              containerAnimation: timeline,
            },
          }, '<' );
      });

      // Fish animations using data prop `data-distance`
      fishesRef.current.forEach((fish, i) => {
        gsap.from(fish, {
          xPercent: fish.dataset.distance,
          scrollTrigger: {
            scrub: 0.3,
          },
        });
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
      className='root text-white bg-transparent overflow-hidden scrollbar-hide'
    >
      <div className='outer overflow-x-hidden'>
        {/* We use 300% because each slide is 100% in viewport width */}
        <div ref={sliderRef} className='slider flex w-[300vw]'>
          {/* SLIDE 1 */}
          <section
            ref={addToSections}
            className='slide h-screen w-screen flex items-center justify-center'
          >
            <div className='inner relative flex h-[calc(100%-14rem)] items-end mx-28'>
              <Image
                src='/fish1.png'
                alt='fish'
                width={800}
                height={800}
                className='absolute w-4/5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                priority
              />
              <div className='content flex-grow'>
                <h1 className='uppercase text-xl font-bold mb-2'>
                  Mystirelia Glowlite
                </h1>
                <p className='w-1/2 leading-relaxed font-extralight'>
                  A mesmerizing deep-sea jellyfish with tendrils radiating
                  colors. Its internal light attracts prey and displays a
                  hypnotic dance, making it a luminescent beacon in the abyssal
                  realm.
                </p>
              </div>
            </div>
          </section>

          {/* SLIDE 2 */}
          <section
            ref={addToSections}
            className='slide h-screen w-screen flex items-center justify-center'
          >
            <div className='inner relative flex h-[calc(100%-14rem)] items-end mx-28'>
              <Image
                src='/fish2.png'
                alt='fish'
                width={800}
                height={800}
                className='absolute w-4/5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                priority
              />
              <div className='content flex-grow'>
                <h1 className='uppercase text-xl font-bold mb-2'>
                  Coralen Whiskerfin
                </h1>
                <p className='w-1/2 leading-relaxed font-extralight'>
                  Recognized by its whisker-like fins, this fish navigates coral
                  mazes with grace. Its shimmering silver body, adorned with
                  bursts of color, playfully darts through vibrant reefs.
                </p>
              </div>
            </div>
          </section>

          {/* SLIDE 3 */}
          <section
            ref={addToSections}
            className='slide h-screen w-screen flex items-center justify-center'
          >
            <div className='inner relative flex h-[calc(100%-14rem)] items-end mx-28'>
              <Image
                src='/fish3.png'
                alt='fish'
                width={800}
                height={800}
                className='absolute w-4/5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                priority
              />
              <div className='content flex-grow'>
                <h1 className='uppercase text-xl font-bold mb-2'>
                  Vortexa Spiralis
                </h1>
                <p className='w-1/2 leading-relaxed font-extralight'>
                  Resembling a luminescent snail, this mollusk's spiral shell
                  glows to attract mates and deter foes. Unique to the deep, it
                  "sings" melodiously, resonating in the vast blue depths.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className='fish-container fixed top-0 left-0 w-full h-screen z-[-1]'>
        <Image
          ref={addToFishes}
          className='absolute opacity-10'
          src='/fish4.png'
          width={400}
          height={400}
          alt='small-fish'
          data-distance='80'
        />
        <Image
          ref={addToFishes}
          className='absolute opacity-10'
          src='/fish4.png'
          width={400}
          height={400}
          alt='small-fish'
          data-distance='200'
        />
        <Image
          ref={addToFishes}
          className='absolute opacity-10'
          src='/fish4.png'
          width={400}
          height={400}
          alt='small-fish'
          data-distance='300'
        />
        <Image
          ref={addToFishes}
          className='absolute opacity-10'
          src='/fish4.png'
          width={400}
          height={400}
          alt='small-fish'
          data-distance='140'
        />
        <Image
          ref={addToFishes}
          className='absolute opacity-10'
          src='/fish4.png'
          width={400}
          height={400}
          alt='small-fish'
          data-distance='40'
        />
        <Image
          ref={addToFishes}
          className='absolute opacity-10'
          src='/fish4.png'
          width={400}
          height={400}
          alt='small-fish'
          data-distance='210'
        />
        <Image
          ref={addToFishes}
          className='absolute opacity-10'
          src='/fish4.png'
          width={400}
          height={400}
          alt='small-fish'
          data-distance='190'
        />
        <Image
          ref={addToFishes}
          className='absolute opacity-10'
          src='/fish4.png'
          width={400}
          height={400}
          alt='small-fish'
          data-distance='155'
        />
        <Image
          ref={addToFishes}
          className='absolute opacity-10'
          src='/fish4.png'
          width={400}
          height={400}
          alt='small-fish'
          data-distance='80'
        />
        <Image
          ref={addToFishes}
          className='absolute opacity-10'
          src='/fish4.png'
          width={400}
          height={400}
          alt='small-fish'
          data-distance='58'
        />
        <Image
          ref={addToFishes}
          className='absolute opacity-10'
          src='/fish4.png'
          width={400}
          height={400}
          alt='small-fish'
          data-distance='227'
        />
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
