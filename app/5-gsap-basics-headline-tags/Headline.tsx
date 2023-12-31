'use client';

import gsap from 'gsap';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { X } from 'react-feather';

export default function Headline() {
  const [hasAnimated, setHasAnimated] = useState(false);

  const root = useRef<HTMLElement>(null);

  let ctx = gsap.context((self) => {
    if (hasAnimated) return;
    let timeline = gsap.timeline();
    // In GSAP, a Timeline is used to create sequences of animations that can be
    // controlled as a whole. When using a timeline, you can arrange tweens in a
    // sequence, overlap them, stagger them, and much more.
    self.add('onMouseEnter', () => {
      timeline
        .to('div.reveal', {
          scaleX: 1,
          // duration: 0.2,
          stagger: 0.2,
          transformOrigin: 'left',
        })
        .to(
          'span',
          {
            opacity: 1,
            // duration: 0.2,
            stagger: 0.2,
          },
          '-=0.3'
        ) // This will make the two animations happen simultaneously
        .to(
          'div.reveal',
          {
            transformOrigin: 'right',
            scaleX: 0,
            // delay: 0.3, // This delay gives the appearance effect before hiding again
          },
          '-=5'
        );
      setHasAnimated(true);
    });
  }, root.current?.parentNode!); // <- IMPORTANT! scopes selector

  return (
    <section
      ref={root}
      className='w-full h-full flex justify-center items-center bg-white'
    >
      <div className='flex gap-2 items-center rounded-xl shadow-md cursor-pointer bg-red-500/5 border-[0.8px] border-red-500 transform-gpu overflow-hidden hover:shadow-lg duration-300 transition-all ease-in-out'>
        <Image
          src='/airlines.svg'
          height={100}
          width={100}
          alt='logo'
          className='h-[62px] w-[62px] object-cover ml-2 p-1'
          priority
        />
        <article
          className='relative flex flex-col items-start justify-start gap-1 py-3 px-3 cursor-pointer border-l border-red-900/30'
          onMouseEnter={ctx.onMouseEnter}
        >
          <ul className='list-none flex gap-2 uppercase tracking-[0.2rem] text-[0.7rem] ml-[2px] m-0 p-0'>
            <li className='relative overflow-hidden'>
              <span className='opacity-0 text-gray-700'>Milano (MXP)</span>
              <div className='reveal absolute w-full h-full origin-left scale-x-0 left-0 top-0 bg-red-200 rounded-[1px] shadow'></div>
            </li>
            <li className='relative overflow-hidden'>
              <span className='opacity-0 text-gray-700'>to</span>
              <div className='reveal absolute w-full h-full origin-left scale-x-0 left-0 top-0 bg-red-200 rounded-[1px] shadow'></div>
            </li>
            <li className='relative overflow-hidden'>
              <span className='opacity-0 text-gray-700'>London (LHR)</span>
              <div className='reveal absolute w-full h-full origin-left scale-x-0 left-0 top-0 bg-red-200 rounded-[1px] shadow'></div>
            </li>
          </ul>

          <h1 className='text-[27px] pointer-events-none uppercase text-red-950'>
            Emirates flight EK573
          </h1>
          <X className='w-6 h-6 text-red-300 absolute top-2 right-2' />
        </article>
      </div>
    </section>
  );
}

/**
 * GSAP with React:
 *
 * - GSAP is framework-agnostic, meaning it can be used consistently across various frameworks/libraries including React.
 * - For animating elements upon mounting, React's useLayoutEffect() hook is ideal as it ensures animations run after all DOM mutations.
 * - Instead of targeting DOM nodes directly (like using querySelector), in React we use Refs. They provide a reliable and safe reference to DOM nodes.
 * - However, creating a ref for each element can become cumbersome, especially when dealing with multiple animated elements.
 * - To simplify, GSAP offers gsap.context() which allows:
 *     1. Scoped Selectors: By passing a ref to gsap.context(), any GSAP animations using selector strings inside this context will only target descendants of the ref. This provides a balance between the flexibility of selectors and the security of refs.
 *     2. Animation Cleanup: Any animations created inside the context are automatically recorded, allowing for easy cleanup when the component unmounts.
 * - In the provided code:
 *     1. We utilize gsap.context() to scope our animations to the descendants of the `root` ref.
 *     2. Animations are defined inside this context.
 *     3. Instead of creating a ref for every span element, we can use the selector string (like '.opacity-0') to target them, knowing they are scoped to our `root` component.
 *
 * Refs or Scoped Selectors?
 * - Using selector strings (like ".my-class") is much more convenient than creating individual refs for each animated element.
 * - This is why scoped selectors inside gsap.context() are recommended.
 * - However, a critical exception exists: If there are nested components and there's a risk of selector strings unintentionally targeting child components, then using refs becomes a safer choice.
 * - In scenarios where both methods are mixed (e.g., a main App animating a 'box' via a selector and a 'circle' via a ref), be aware: Nested components having the same selector (like '.box') can inadvertently be affected by the animation.
 *
 * Note: GSAP's context is different than React's Context API.
 */
