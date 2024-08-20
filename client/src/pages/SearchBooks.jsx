import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from '../utils/mutations';
import Auth from '../utils/auth';

const SearchBooks = () => {
  const [searchInput, setSearchInput] = useState('');
  const [saveBook, { error }] = useMutation(SAVE_BOOK);
  const [searchedBooks, setSearchedBooks] = useState([]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}`);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const { items } = await response.json();
      const bookData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author available'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail || '',
        link: book.volumeInfo.infoLink,
      }));

      setSearchedBooks(bookData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveBook = async (bookId) => {
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

    try {
      const { data } = await saveBook({
        variables: { bookData: { ...bookToSave } },
      });

      if (error) {
        throw new Error('Something went wrong!');
      }

      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Search for a book"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <div>
        {searchedBooks.map((book) => (
          <div key={book.bookId}>
            <img src={book.image} alt={`The cover for ${book.title}`} />
            <h3>{book.title}</h3>
            <p>{book.authors}</p>
            <p>{book.description}</p>
            <a href={book.link} target="_blank" rel="noopener noreferrer">
              More Info
            </a>
            {Auth.loggedIn() && (
              <button onClick={() => handleSaveBook(book.bookId)}>
                Save This Book!
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBooks;