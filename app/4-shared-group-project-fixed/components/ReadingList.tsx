//@ts-nocheck
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'react-feather';

import styles from './ReadingList.module.css';

export default function ReadingList({ books, handleRemoveBook }) {
  const [highlightedIndex, setHighlightedIndex] = React.useState(null);
  return (
    <>
      <div
        className={`${styles.wrapper} h-full`}
        onMouseLeave={() => {
          setHighlightedIndex(null);
        }}
      >
        <h2 className='text-sm font-bold'>Reading List</h2>
        <ol className={styles.books}>
          {books.map((book, bookIndex) => {
            // Lets get the number of books in the list and determine size
            const reverseBookIndex = books.length - bookIndex - 1;
            let clampHeight = Math.max(50 - reverseBookIndex * 5, 10);
            if (bookIndex === highlightedIndex) {
              clampHeight = 100;
            }
            return (
              <li
                key={book.isbn}
                style={{ height: clampHeight }}
                onMouseEnter={() => {
                  setHighlightedIndex(bookIndex);
                }}
              >
                {/* REPLICATE THE KEY CONFIGURATION IN THE OTHER LIST */}
                <motion.img
                  layoutId={`book-cover-${book.isbn}`}
                  alt={book.name}
                  src={book.coverSrc}
                  draggable={false}
                  className={styles.bookCover}
                  // Here we can have separate animations
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 60,
                  }}
                />
                {/* TOO ENSURE SIBLING ELEMENTS ANIMATE CORRECT, USE MOTION */}
                <motion.button
                  layout='position'
                  className={styles.deleteBtn}
                  onClick={() => handleRemoveBook(book)}
                  onFocus={() => {
                    setHighlightedIndex(bookIndex);
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 60,
                  }}
                >
                  <X />
                </motion.button>
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
}
