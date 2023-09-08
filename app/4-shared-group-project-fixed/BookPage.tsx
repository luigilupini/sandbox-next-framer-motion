//@ts-nocheck
'use client';

import React from 'react';

import DATA from './data/data';

import { motion } from 'framer-motion';

import BookGrid from './components/BookGrid';
import ReadingList from './components/ReadingList';

export default function BookPage() {
  const [books, setBooks] = React.useState(DATA);

  // Here the order by the array position remains the same when toggled.
  const toggleBook = (toggledBook) => {
    const nextBooks = books.map((book) => {
      // If the book is not the one we're toggling, just return it
      if (book.isbn !== toggledBook.isbn) return book; // exit early if not toggled
      // Otherwise, return and spread new object and append a selected property
      return {
        ...book,
        selected: !book.selected,
      };
    });
    setBooks(nextBooks);
  };
  // Or we can filter and append the toggled book to the end of the array:
  const filterBooks = (toggledBook) => {
    // Here we collect all books other than the one we're toggling:
    const nextBooks = books.filter((book) => book.isbn !== toggledBook.isbn);
    nextBooks.push({
      ...toggledBook,
      selected: !toggledBook.selected,
    });
    setBooks(nextBooks);
  };

  // Important: Start here!
  // If you want to animate this transition between the two lists, you going to
  // have to make use of the layoutId prop, essentially telling Framer motion
  // that the individual items are the same, and exist in both arrays. We can
  // animate between the two components, not just swap out suddenly.
  const selectedBooks = books.filter((book) => book.selected);
  const unselectedBooks = books.filter((book) => !book.selected);

  return (
    <motion.div
      className='flex w-full h-full overflow-hidden'
      layout
      transition={{ duration: 0.3 }}
    >
      <BookGrid
        className='flex-1'
        books={unselectedBooks}
        handleSelectBook={filterBooks}
      />
      {selectedBooks.length > 0 && (
        <ReadingList books={selectedBooks} handleRemoveBook={filterBooks} />
      )}
    </motion.div>
  );
}
