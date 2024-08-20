import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import Auth from '../utils/auth';

const SavedBooks = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removeBook, { error }] = useMutation(REMOVE_BOOK);

  const userData = data?.me || {};

  const handleDeleteBook = async (bookId) => {
    try {
      const { data } = await removeBook({
        variables: { bookId },
      });

      if (error) {
        throw new Error('Something went wrong!');
      }

      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h2>Viewing saved books!</h2>
      {userData.savedBooks.length ? (
        <div>
          {userData.savedBooks.map((book) => (
            <div key={book.bookId}>
              <img src={book.image} alt={`The cover for ${book.title}`} />
              <h3>{book.title}</h3>
              <p>{book.authors}</p>
              <p>{book.description}</p>
              <a href={book.link} target="_blank" rel="noopener noreferrer">
                More Info
              </a>
              <button onClick={() => handleDeleteBook(book.bookId)}>
                Remove This Book
              </button>
            </div>
          ))}
        </div>
      ) : (
        <h3>You have no saved books!</h3>
      )}
    </div>
  );
};

export default SavedBooks;