'use client';

import gsap from 'gsap';
import Image from 'next/image';
import React, { useLayoutEffect, useRef } from 'react';

export default function Stagger() {
  const root = useRef<HTMLElement>(null);
  const ctxRef = useRef<any>(null);
  let { current: ctx } = ctxRef;
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useLayoutEffect(() => {
    ctx = gsap.context(() => {
      gsap.set(imageRefs.current, {
        yPercent: -100,
      });
      gsap.set(textRefs.current, {
        opacity: 0,
      });
      gsap.to(imageRefs.current, {
        yPercent: 0,
        scale: 1.5,
        delay: 0.5,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power4.out',
        onComplete: animateTextAndScaleDown,
      });
    }, root.current?.parentNode!); // <- IMPORTANT! scopes selector
  }, []);

  const animateTextAndScaleDown = () => {
    gsap.to(imageRefs.current, {
      scale: 1,
      duration: 1,
    });
    gsap.to(textRefs.current, {
      opacity: 1,
      y: 20,
      duration: 1,
      stagger: 0.3,
    });
  };

  return (
    <section
      ref={root}
      className='w-full h-full flex items-center justify-between gap-4 p-10 bg-yellow-100'
    >
      {items.map((item, index) => (
        <div key={item.src} className='relative rounded-[2px] overflow-hidden'>
          <Image
            src={item.src}
            alt='photo'
            width={500}
            height={500}
            className='w-full h-[80vh] object-cover'
            ref={(el) => (imageRefs.current[index] = el)}
            priority
          />
          <CardTitle
            title={item.title}
            ref={(el) => (textRefs.current[index] = el)}
          />
        </div>
      ))}
    </section>
  );
}

const CardTitle = React.forwardRef(
  ({ title }: { title: string }, ref: React.Ref<HTMLParagraphElement>) => (
    <p
      ref={ref}
      className='absolute -translate-x-2/4 -translate-y-2/4 font-bold text-5xl m-0 left-2/4 top-2/4 text-white italic'
    >
      {title}
    </p>
  )
);

const items = [
  {
    src: '/photo-0.webp',
    title: 'living',
  },
  {
    src: '/photo-1.webp',
    title: 'in',
  },
  {
    src: '/photo-2.webp',
    title: 'abstraction',
  },
];
