'use client';

import gsap from 'gsap';
import React, { useLayoutEffect, useRef } from 'react';

export default function SidebarMenu() {
  const root = useRef<HTMLElement>(null);
  let ctxRef = useRef<any>();

  useLayoutEffect(() => {
    ctxRef.current = gsap.context((self) => {
      // Provide a timeline for each link item
      const links = gsap.utils.toArray<HTMLAnchorElement>('li a');
      links.forEach((link, i) => {
        const linkTl = gsap.timeline({
          defaults: { duration: 0.5, ease: 'power3.inOut' },
        });

        const headingStart = link?.querySelector('.primary')!;
        const headingEnd = link?.querySelector('.secondary')!;
        const date = link?.querySelector('.date')!;
        const line = link?.querySelector('.line')!;

        linkTl.to([headingStart], { yPercent: -100 });
        linkTl.to([headingEnd], { yPercent: -100 }, '<');
        linkTl.to(line, { scaleX: 1 }, '<');
        linkTl.to(date, { y: 0 }, '<');
        linkTl.pause();

        self.add(`open-${i}`, () => linkTl.play());
        self.add(`close-${i}`, () => linkTl.reverse());
      });
    }, root.current?.parentNode!);

    return () => ctxRef.current.revert(); // Cleanup GSAP context
  }, []);

  return (
    <main className='flex place-items-center h-full w-full bg-gray-900'>
      <ul className='relative w-full max-w-2xl mr-auto rounded-r-lg shadow-md px-2 py-4 bg-gray-950'>
        <h1 className='absolute -top-3 -right-3 px-2 bg-yellow-500 text-gray-900 shadow-md rounded-full font-bold text-sm'>
          Europe FIA Formula 1 Schedule
        </h1>
        {europeRaces.map((item, i) => {
          return (
            <LineItem
              key={item.round}
              ctxRef={ctxRef}
              number={i}
              headingStart={item.name}
              headingEnd={item.circuit}
              date={item.date}
            />
          );
        })}
      </ul>
    </main>
  );
}

function LineItem({ ctxRef, number, headingStart, headingEnd, date }: any) {
  return (
    <li>
      <a
        href='#'
        onMouseEnter={() => {
          ctxRef.current[`open-${number}`]();
        }}
        onMouseLeave={() => {
          ctxRef.current[`close-${number}`]();
        }}
        className='relative flex justify-between items-center overflow-hidden'
      >
        <div className='heading-container h-11 ml-12'>
          <p className='primary text-gray-300 text-[clamp(1rem,2vw,4rem)]'>
            {headingStart}
          </p>
          <p className='secondary text-yellow-500 text-[clamp(1rem,2vw,4rem)]'>
            {headingEnd}
          </p>
        </div>

        <p className='date text-yellow-500 translate-y-[170%] uppercase'>
          {date}
        </p>
        <div className='line absolute w-[3%] origin-left border-b-yellow-500 border-b border-solid scale-x-0 left-0 top-2/4'></div>
      </a>
    </li>
  );
}

const europeRaces = [
  {
    round: 7,
    name: 'Grand Prix Romagna',
    date: '19 May 2024',
    city: 'Imola',
    circuit: 'Autodromo Enzo Dino Ferrari',
    country: 'Italy',
  },
  {
    round: 8,
    name: 'Grand Prix Monaco',
    date: '26 May 2024',
    city: 'Monte Carlo',
    circuit: 'Circuit de Monaco',
    country: 'Monaco',
  },
  {
    round: 10,
    name: 'Grand Prix Spain',
    date: '23 June 2024',
    city: 'Barcelona',
    circuit: 'Circuit de Barcelona-Catalunya',
    country: 'Spain',
  },
  {
    round: 11,
    name: 'Grand Prix Austria',
    date: '30 June 2024',
    city: 'Spielberg',
    circuit: 'Red Bull Ring',
    country: 'Austria',
  },
  {
    round: 12,
    name: 'Grand Prix Great Britain',
    date: '7 July 2024',
    city: 'Silverstone',
    circuit: 'Silverstone Circuit',
    country: 'United Kingdom',
  },
  {
    round: 13,
    name: 'Grand Prix Hungary',
    date: '21 July 2024',
    city: 'Budapest',
    circuit: 'Hungaroring',
    country: 'Hungary',
  },
  {
    round: 14,
    name: 'Grand Prix Belgium',
    date: '28 July 2024',
    city: 'Stavelot',
    circuit: 'Spa-Francorchamps',
    country: 'Belgium',
  },
  {
    round: 15,
    name: 'Grand Prix Netherlands',
    date: '25 August 2024',
    city: 'Zandvoort',
    circuit: 'Circuit Zandvoort',
    country: 'Netherlands',
  },
  {
    round: 16,
    name: 'Grand Prix Italy',
    date: '1 September 2024',
    city: 'Monza',
    circuit: 'Autodrome Nazionale Monza',
    country: 'Italy',
  },
];
