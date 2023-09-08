// @ts-nocheck
'use client';

import React from 'react';
import { motion } from 'framer-motion';

import styles from './FlexDemo.module.css';

export default function FlexDemo() {
  const [flexDirection, setFlexDirection] = React.useState('row');
  const [justifyContent, setJustifyContent] = React.useState('flex-start');
  const [alignItems, setAlignItems] = React.useState('stretch');

  return (
    <section className={styles.wrapper}>
      {/* DEMO AREA (FLEX CONTAINER) */}
      <div
        // Flex container here (parent)
        // Keep in mind we not changing the layout of the parent
        className={styles.demoArea}
        style={{
          display: 'flex', // 👈🏻 here
          flexDirection: flexDirection,
          justifyContent: justifyContent,
          alignItems: alignItems,
        }}
      >
        {ITEMS.map((item) => (
          // We changing the layout position of each flex item (children)
          // So we need to set layout={true} on each item within the container
          <motion.article
            layout={true} // 👈🏻 here
            key={item.id}
            className={styles.flexItem}
          >
            <motion.div layout='position'>{item.label}</motion.div>
          </motion.article>
        ))}
      </div>

      {/* CONTROL PANEL */}
      <ControlPanel
        flexDirection={flexDirection}
        setFlexDirection={setFlexDirection}
        justifyContent={justifyContent}
        setJustifyContent={setJustifyContent}
        alignItems={alignItems}
        setAlignItems={setAlignItems}
      />
    </section>
  );
}

function ControlPanel({
  flexDirection,
  setFlexDirection,
  justifyContent,
  setJustifyContent,
  alignItems,
  setAlignItems,
}) {
  return (
    <div className={styles.controls}>
      <SelectControl
        label='flex-direction'
        value={flexDirection}
        onChange={(e) => setFlexDirection(e.target.value)}
      >
        <option value='row'>row</option>
        <option value='column'>column</option>
      </SelectControl>
      <SelectControl
        label='justify-content'
        value={justifyContent}
        onChange={(e) => setJustifyContent(e.target.value)}
      >
        <option value='flex-start'>flex-start</option>
        <option value='flex-end'>flex-end</option>
        <option value='center'>center</option>
        <option value='space-between'>space-between</option>
        <option value='space-around'>space-around</option>
        <option value='space-evenly'>space-evenly</option>
      </SelectControl>
      <SelectControl
        label='align-items'
        value={alignItems}
        onChange={(e) => setAlignItems(e.target.value)}
      >
        <option value='stretch'>stretch</option>
        <option value='flex-start'>flex-start</option>
        <option value='flex-end'>flex-end</option>
        <option value='center'>center</option>
      </SelectControl>
    </div>
  );
}

function SelectControl({ label, value, onChange, ...delegated }) {
  const id = React.useId();
  return (
    <div className={styles.selectControl}>
      <label htmlFor={id}>{label}</label>
      <select
        className={styles.select}
        value={value}
        onChange={onChange}
        {...delegated}
      />
    </div>
  );
}

const ITEMS = [
  {
    id: '001',
    label: 'Hello',
  },
  {
    id: '002',
    label: 'flexbox',
  },
  {
    id: '003',
    label: 'demo',
  },
  {
    id: '004',
    label: ':)',
  },
];
