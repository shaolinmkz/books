import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { GET_BOOKS } from "../../gql/queries";
import { IBooks } from "../../interfaces";
import BookCarousel from "../../components/BookCarousel";
import { BooksLoader } from "../../components/Loaders";
import BookCard from "../../components/BookCard";
import "./index.scss";

const Home = ({}) => {
  const { push } = useHistory();
  const { loading, data } = useQuery(GET_BOOKS);

  useEffect(() => {}, []);

  const handleViewBook = (bookId: string) => {
    push(`/books/${bookId}`);
  };

  const handleAddToCart = (book: IBooks) => {
    console.log(book)
  };

  return (
    <div className="home-container">
      <h3>Featured Books</h3>
      <BookCarousel />
      <h3>All Books</h3>
      <div className="all-books-wrapper">
        {loading ? (
          <>
            <BooksLoader />
            <BooksLoader />
          </>
        ) : (
          data?.books.map((book: IBooks) => (
            <BookCard
              key={book.id}
              book={book}
              onViewClick={() => handleViewBook(book.id)}
              onAddToCartClick={() => handleAddToCart(book)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;