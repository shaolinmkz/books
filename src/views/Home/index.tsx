import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { GET_BOOKS } from "../../gql/queries";
import { IBooks } from "../../interfaces";
import BookCarousel from "../../components/BookCarousel";
import { BooksLoader } from "../../components/Loaders";
import BookCard from "../../components/BookCard";
import "./index.scss";
import { useAppData } from "../../hooks/useAppData";
import { ADD_TO_CART, OPEN_CLOSE_CART, GET_ALL_BOOKS } from "../../appContext/types";

const Home = () => {
  const { push } = useHistory();
  const { loading, data } = useQuery(GET_BOOKS);
  const { dispatch, books } = useAppData();

  useEffect(() => {
    if(data?.books && !loading) {
      dispatch({ type: GET_ALL_BOOKS, payload: data.books });
    }
  }, [data?.books, dispatch, loading]);

  const handleViewBook = (bookId: string) => {
    push(`/books/${bookId}`);
  };

  const handleAddToCart = (book: IBooks) => {
    dispatch({ type: ADD_TO_CART, payload: book });
    dispatch({ type: OPEN_CLOSE_CART, payload: true });
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
            <BooksLoader />
          </>
        ) : (
          books.map((book: IBooks) => (
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
