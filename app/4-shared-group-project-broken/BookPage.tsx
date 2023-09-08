//@ts-nocheck
'use client';

import React from 'react';

import DATA from './data/data';

import BookGrid from './components/BookGrid';
import ReadingList from './components/ReadingList';

export default function BookPage() {
  const [books, setBooks] = React.useState(DATA);

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
  // Important: Start here!
  // If you want to animate this transition between the two lists, you going to
  // have to make use of the layoutId prop, essentially telling Framer motion
  // that the individual items are the same, and exist in both arrays. We can
  // animate between the two components, not just swap out suddenly.
  const selectedBooks = books.filter((book) => book.selected);
  const unselectedBooks = books.filter((book) => !book.selected);

  return (
    <div className='flex min-h-screen overflow-hidden'>
      <BookGrid
        className='flex-1'
        books={unselectedBooks}
        handleSelectBook={toggleBook}
      />
      {selectedBooks.length > 0 && (
        <ReadingList books={selectedBooks} handleRemoveBook={toggleBook} />
      )}
    </div>
  );
}
