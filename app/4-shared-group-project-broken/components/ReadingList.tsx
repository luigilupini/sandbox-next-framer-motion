//@ts-nocheck
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'react-feather';

import styles from './ReadingList.module.css';

export default function ReadingList({ books, handleRemoveBook }) {
  return (
    <>
      <div className={styles.wrapper}>
        <h2>Reading List</h2>
        <ol className={styles.books}>
          {books.map((book, bookIndex) => {
            return (
              <li key={book.isbn}>
                <img
                  alt={book.name}
                  src={book.coverSrc}
                  draggable={false}
                  className={styles.bookCover}
                />
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleRemoveBook(book)}
                >
                  <X />
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
}
