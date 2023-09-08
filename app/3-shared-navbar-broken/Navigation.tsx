// @ts-nocheck
'use client';

import React from 'react';
import { motion } from 'framer-motion';

import './Navigation.css';

export default function Navigation() {
  const [hoveredNavItem, setHoveredNavItem] = React.useState(null);

  return (
    <nav onMouseLeave={() => setHoveredNavItem(null)}>
      <ul>
        {LINKS.map(({ slug, label, href }) => (
          <li key={slug}>
            {hoveredNavItem === slug && (
              <motion.div
                layoutId='hovered-backdrop'
                className='hovered-backdrop'
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
  },
  {
    slug: 'usage',
    label: 'Usage',
    href: '/usage',
  },
  {
    slug: 'integrations',
    label: 'Integrations',
    href: '/integrations',
  },
];
