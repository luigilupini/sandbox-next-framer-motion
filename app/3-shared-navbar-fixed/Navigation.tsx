// @ts-nocheck
'use client';

import React, { useId } from 'react';
import { motion } from 'framer-motion';

import './Navigation.css';

export default function Navigation() {
  const [hoveredNavItem, setHoveredNavItem] = React.useState(null);
  const id = useId();

  return (
    <nav onMouseLeave={() => setHoveredNavItem(null)}>
      <ul>
        {LINKS.map(({ slug, label, bg, href }) => (
          <li
            key={slug}
            style={{
              zIndex: hoveredNavItem === slug ? 1 : 2,
            }}
          >
            {hoveredNavItem === slug && (
              <motion.div
                layoutId={id}
                className='hovered-backdrop'
                initial={{
                  borderRadius: 8,
                }}
                style={{
                  backgroundColor: bg,
                }}
              />
            )}

            <a href={href} onMouseEnter={() => setHoveredNavItem(slug)}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const LINKS = [
  {
    slug: 'home',
    label: 'Home',
    href: '/',
    bg: 'hsl(250deg 100% 45%)',
  },
  {
    slug: 'usage',
    label: 'Usage',
    href: '/usage',
    bg: 'hsl(50deg 100% 35%)',
  },
  {
    slug: 'integrations',
    label: 'Integrations',
    href: '/integrations',
    bg: 'hsl(350deg 100% 40%)',
  },
];
