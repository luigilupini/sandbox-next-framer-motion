//@ts-nocheck
'use client';

import { motion } from 'framer-motion';

function BookGrid({ books, handleSelectBook, ...delegated }) {
  return (
    <motion.section layout {...delegated}>
      <ul
        className={`grid content-start h-full w-full gap-2 p-4 list-none bg-white/5 rounded-lg
        grid-cols-[repeat(auto-fill,minmax(80px,1fr))]`}
      >
        {books.map((book) => (
          <li key={book.isbn}>
            <button
              className='relative block cursor-pointer aspect-[7.25_/_11] p-0 border-[none]'
              onClick={() => handleSelectBook(book)}
            >
              {/* REPLICATE THE KEY CONFIGURATION IN THE OTHER LIST */}
              <motion.img
                layoutId={`book-cover-${book.isbn}`}
                alt={book.name}
                src={book.coverSrc}
                className='block object-cover w-full h-full max-w-xs rounded select-none will-change-transform'
                draggable={false}
                // Here we can have separate animations
                // transition={{ duration: 0.2 }}
              />
            </button>
          </li>
        ))}
      </ul>
    </motion.section>
  );
}

export default BookGrid;
