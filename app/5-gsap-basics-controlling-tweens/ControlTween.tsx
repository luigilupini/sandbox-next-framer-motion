'use client';

import gsap from 'gsap';
import { useLayoutEffect, useRef } from 'react';

export default function ControlTween() {
  const root = useRef<HTMLElement>(null);
  const ctxRef = useRef<any>(null);

  useLayoutEffect(() => {
    ctxRef.current = gsap.context((self) => {
      // Initial setup
      gsap.set('.card', {
        borderRadius: '50%',
        width: '280px',
        height: '280px',
      });
      gsap.set('.title', {
        fontSize: 'clamp(10rem,5vw,17rem)',
        x: '30%',
      });
      gsap.set('.loader', { scaleX: 0 });

      // Custom methods
      self.add('handleMouseEnter', () => {
        gsap.to('.card', {
          borderRadius: '1%',
          width: '300px',
          height: '360px',
        });
        gsap.to('.title', {
          fontSize: 'clamp(5rem, 5vw, 10rem)',
          x: '0%',
        });
      });
      self.add('handleMouseLeave', () => {
        gsap.to('.card', {
          borderRadius: '50%',
          width: '280px',
          height: '280px',
        });
        gsap.to('.title', {
          fontSize: 'clamp(10rem,5vw,17rem)',
          x: '30%',
        });
      });
    }, root.current?.parentNode!);

    return () => ctxRef.current.revert(); // cleanup GSAP context
  }, []);

  return (
    <section
      ref={root}
      className='control h-full flex items-center justify-center text-[#f0f6ce] bg-[#f0f6ce]'
    >
      <div
        className='card flex w-[280px] h-[280px] justify-center items-center cursor-pointer rounded-[50%] bg-[#ce5700]'
        onMouseEnter={() => ctxRef.current?.handleMouseEnter()}
        onMouseLeave={() => ctxRef.current?.handleMouseLeave()}
      >
        <p className='title pointer-events-none text-[clamp(10rem,5vw,17rem)] translate-x-[30%]'>
          luxury
        </p>
      </div>
    </section>
  );
}

/*
 * Why useRef with GSAP in React?
 *
 * 1. Persistence Across Renders:
 *    - useRef retains its value across component re-renders, making it ideal for animation instances that should persist and not be re-created every time the component updates.
 *
 * 2. No Re-render Trigger:
 *    - Modifying the value of a useRef doesn't lead to component re-renders. This is optimal for animations as mere changes to animation references shouldn't necessitate UI updates.
 *
 * 3. Direct Manipulation:
 *    - GSAP animations often involve direct, imperative commands (e.g., play, pause, reverse). useRef provides direct access to the animation instance via its .current property, aligning well with this imperative approach.
 *
 * 4. Cleanup and Control:
 *    - When combined with React's effect hooks (like useEffect), useRef provides a convenient way to store GSAP instances for potential cleanup (like pausing or killing an animation when a component unmounts).
 *
 * While useRef is a common approach to manage GSAP animations in React, there are other methods and libraries, such as:
 * - useState for animation-related data (less common and potentially less performant for direct animation control).
 * - Custom hooks to encapsulate and reuse animation logic.
 * - Libraries like react-gsap that offer React-friendly components and hooks for GSAP integrations.
 *
 * In essence, useRef provides a straightforward and efficient way to integrate the imperative nature of GSAP with the reactive world of React.
 */
