'use client';

import gsap from 'gsap';
import { useLayoutEffect, useRef } from 'react';

export function GettingStarted() {
  // create a ref for the root level element (for scoping)
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    // Create our context. This functions invoked immediately so all gsap
    // animations and scroll triggers are created during the execution of this
    // function get recorded so we can revert() (cleanup) them later.
    let ctx = gsap.context(() => {
      gsap.to('.progress', {
        duration: 1,
        width: '100%',
        ease: 'power1.inOut',
        delay: 1,
      });
      gsap.from('h1', {
        y: -200,
        duration: 2,
        ease: 'elastic.out(1, 0.6)',
      });
      gsap.to('.progress', {
        duration: 1,
        height: '100%',
        top: 0,
        backgroundColor: 'gold',
        width: '100%',
        ease: 'power1.inOut',
        delay: 2,
      });
    }, root.current?.parentNode!); // <- IMPORTANT! scopes selector

    return () => ctx.revert(); // cleanup
  }, []); // <- empty dependency Array so it doesn't re-run on every render

  return (
    <section
      ref={root}
      className='wrapper w-full h-full flex flex-col gap-4 items-center justify-center'
    >
      <h1 className='heading text-yellow-600 font-extrabold text-6xl z-50 drop-shadow-sm'>
        GOLD RUSH
      </h1>
      <div className='progress absolute shadow-md bg-yellow-400 h-1'></div>
    </section>
  );
}

/*
 * Why useLayoutEffect?
 *
 * 1. Timing:
 *    - useEffect runs asynchronously and triggers after the browser has painted post-render.
 *    - useLayoutEffect runs synchronously after React's DOM mutations but before browser paint.
 *    - This ensures changes made within it are flushed before the browser paints.
 *
 * 2. Use Cases for useLayoutEffect:
 *    a) Avoiding Flickering: Prevent visible flickers/jumps in rendering. If you're measuring an element's position and then updating it, using useEffect might cause visible flicker due to post-paint execution.
 *    b) Synchronous Updates: Ensures effects are executed in the order they're called due to synchronous execution.
 *    c) Animations: Ideal for animations that must start immediately post-render/update.
 *
 * 3. Caveats:
 *    a) Server Rendering: useLayoutEffect doesn't run during server-side rendering. React warns against its use with SSR. You might need useEffect as an SSR fallback.
 *    b) Performance: Overusing useLayoutEffect can impact performance since it's synchronous and blocks browser paint. Use judiciously.
 *
 * Default to useEffect unless there's a specific reason to use useLayoutEffect. The distinction is nuanced, but vital in performance-critical situations or when requiring precise DOM update control.
 */

/*
 * useRef (Direct DOM Reference) vs. CSS Selectors in React with GSAP:
 *
 * useRef (Direct DOM Reference):
 * Advantages:
 * 1. Explicitness: Directly ties your JavaScript logic to a specific DOM element. No ambiguity about which element you're targeting.
 * 2. Decoupling from Styling: Your animation logic is decoupled from your CSS. You can change class names without affecting the animation logic.
 * 3. Performance: Direct DOM reference can be more performant as you're accessing the element directly.
 * Drawbacks:
 * 1. Verbosity: Can get verbose with many elements since you'd need a ref for each.
 * 2. Limited Scope: Refs are specific to a single element. For multiple elements of the same type, you'd need multiple refs.
 *
 * CSS Selectors:
 * Advantages:
 * 1. Conciseness: Useful when targeting multiple elements. For instance, animating all elements with a certain class.
 * 2. Familiarity: Intuitive for those with a web development background.
 * Drawbacks:
 * 1. Potential Ambiguity: If class names change (e.g., during refactoring), animations might break. Overly generic selectors might target unwanted elements.
 * 2. Performance: Querying the DOM might have a tiny overhead, especially with a large DOM tree.
 *
 * Recommendation:
 * 1. Single Elements: For single, specific elements, useRef is more explicit.
 * 2. Multiple Elements: For animating multiple elements, CSS selector is more concise.
 * 3. Dynamic Elements: For dynamically added/removed elements, CSS selectors can be adaptive.
 * 4. Maintainability: With frequent structural or style changes, useRef makes the code more resilient.
 *
 * Both methods are valid. Your choice should depend on the specific requirements and coding preferences.
 */
