//@ts-nocheck
'use client';

function BookGrid({ books, handleSelectBook, ...delegated }) {
  return (
    <section {...delegated}>
      <ul
        className={`grid content-start min-h-full gap-2 p-4 list-none bg-white rounded-lg
        grid-cols-[repeat(auto-fill,minmax(70px,1fr))]`}
      >
        {books.map((book) => (
          <li key={book.isbn}>
            <button
              className='relative block cursor-pointer aspect-[7.25_/_11] p-0 border-[none]'
              onClick={() => handleSelectBook(book)}
            >
              <img
                alt={book.name}
                src={book.coverSrc}
                className='block object-cover w-full h-full rounded will-change-transform'
                draggable={false}
              />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default BookGrid;
