import { useEffect, useCallback } from "react";
import { useQuery } from "@apollo/client";
import { Link, useLocation, useHistory } from "react-router-dom";

import whiteLogoIcon from "../../assets/logo-white-bg.svg";
import blackLogoIcon from "../../assets/logo-black-bg.svg";
import cartIcon from "../../assets/cart.svg";
import SearchInput from "../SearchInput";
import { useAppData } from "../../hooks/useAppData";
import {
  ADD_TO_CART,
  OPEN_CLOSE_CART,
  SEARCH_BOOKS,
} from "../../appContext/types";
import { calculateCartSize, extractQueryValue } from "../../utils";
import "./index.scss";
import Cart from "../Cart";
import { GET_BOOKS } from "../../gql/queries";
import { IBooks } from "../../interfaces";
import BookCard from "../BookCard";

const TopNav = () => {
  const { search, pathname } = useLocation();
  const { push } = useHistory();
  const { dispatch, cart, searchedBooks } = useAppData();

  const { data } = useQuery(GET_BOOKS, {
    variables: {
      limit: 50,
    },
  });

  const findMatch = (data: { id: string; name: string }[], query: string) => {
    return data.find(({ name }) => name.toLowerCase().includes(query));
  };

  const combineBookSearch = useCallback(
    (books: IBooks[]): Promise<IBooks[] | []> => {
      return new Promise((resolve) => {
        const searchTerm = extractQueryValue(search).toLowerCase();
        const searchData = books.filter(({ title, authors, genres, tags }) => {
          const matchTitle = title.toLowerCase().includes(searchTerm);
          const matchAuthors = findMatch(authors, searchTerm);
          const matchGenres = findMatch(genres, searchTerm);
          const matchTags = findMatch(tags, searchTerm);

          return [
            matchTitle,
            !!matchAuthors,
            !!matchGenres,
            !!matchTags,
          ].includes(true);
        });

        resolve(searchData);
      });
    },
    [search]
  );

  const handleOpenCloseCart = (value: boolean) => {
    dispatch({ type: OPEN_CLOSE_CART, payload: value });
  };

  const handleClear = () => {
    push(pathname);
  };

  const triggerSearch = (searchTerm: string) => {
    if (!searchTerm) {
      handleClear();
    } else {
      push(`${pathname}?search=${searchTerm}`);
    }
  };

  const handleViewBook = (bookId: string) => {
    push(`/books/${bookId}`);
  };

  const handleAddToCart = (book: IBooks) => {
    dispatch({ type: ADD_TO_CART, payload: book });
    dispatch({ type: OPEN_CLOSE_CART, payload: true });
  };

  useEffect(() => {
    const ready = !!data?.books && !!extractQueryValue(search);

    if (ready) {
      combineBookSearch(data.books).then((books) => {
        dispatch({ type: SEARCH_BOOKS, payload: books });
      });
    }
  }, [combineBookSearch, data?.books, dispatch, search]);

  return (
    <>
      <header className="header">
        <Link to="/" className="logo-container">
          <img alt="" src={blackLogoIcon} />

          <div className="logo-text">
            <h2>Quidax Books</h2>
            <p>A flimsy book company</p>
          </div>
        </Link>

        <SearchInput
          onClear={handleClear}
          onChange={triggerSearch}
          value={extractQueryValue(search)}
        />

        <div className="cart-nav-icon-container">
          <button type="button">
            <img alt="" src={whiteLogoIcon} />
          </button>

          <button type="button" onClick={() => handleOpenCloseCart(true)}>
            <img alt="" src={cartIcon} />
            {!!cart.length && <span>{calculateCartSize(cart)}</span>}
          </button>
        </div>
      </header>
      <Cart />

      {!!extractQueryValue(search) && (
        <div className="search-display">
          <div className="search-info">
            <span>{`${searchedBooks.length} results `}</span>
            <span>found for</span>
            <span>{` \`${extractQueryValue(search)}\``}</span>
          </div>

          <div className="searched-books-wrapper">
            {searchedBooks.length ? (
              searchedBooks.map((book: IBooks) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onViewClick={() => handleViewBook(book.id)}
                  onAddToCartClick={() => handleAddToCart(book)}
                />
              ))
            ) : (
              <div className="no-books">
                <h2>No Book Found</h2>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TopNav;
