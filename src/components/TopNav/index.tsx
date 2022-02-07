import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Link, useLocation, useHistory } from "react-router-dom";

import whiteLogoIcon from "../../assets/logo-white-bg.svg";
import blackLogoIcon from "../../assets/logo-black-bg.svg";
import backIcon from "../../assets/back.svg";
import searchIcon from "../../assets/search.svg";
import cartIcon from "../../assets/cart.svg";
import SearchInput from "../SearchInput";
import { useAppData } from "../../hooks/useAppData";
import {
  ADD_TO_CART,
  GET_ALL_BOOKS,
  OPEN_CLOSE_CART,
  SEARCH_BOOKS,
  SEARCH_INPUT_OPEN,
} from "../../appContext/types";
import {
  calculateCartSize,
  extractQueryValue,
  combineBookSearch,
  ternaryResolver,
} from "../../utils";
import "./index.scss";
import Cart from "../Cart";
import { GET_BOOKS } from "../../gql/queries";
import { IBooks } from "../../interfaces";
import BookCard from "../BookCard";
import { BooksLoader } from "../Loaders";

const TopNav = () => {
  const { search, pathname } = useLocation();
  const { push } = useHistory();
  const {
    dispatch,
    cart,
    searchedBooks,
    searchInputOpen: inputOpen,
    books: allBooks,
  } = useAppData();

  const { data, loading } = useQuery(GET_BOOKS, {
    variables: {
      limit: 50,
    },
  });

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

  const showSearchInput = (value: boolean) => {
    dispatch({ type: SEARCH_INPUT_OPEN, payload: value });
  };

  useEffect(() => {
    const ready = !!data?.books && !!extractQueryValue(search);

    if (ready) {
      dispatch({ type: GET_ALL_BOOKS, payload: data.books });

      combineBookSearch(allBooks, search).then((books) => {
        dispatch({ type: SEARCH_BOOKS, payload: books });
      });
    }
  }, [allBooks, data?.books, dispatch, search]);

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

        <div className="desktop">
          <SearchInput
            onClear={handleClear}
            onChange={triggerSearch}
            value={extractQueryValue(search)}
          />
        </div>

        {inputOpen && (
          <div
            className={
              !!extractQueryValue(search)
                ? "mobile mobile-modal searching"
                : "mobile mobile-modal"
            }
            onClick={() => showSearchInput(false)}
          >
            <div
              className="search-modal-header"
              onClick={(event) => event.stopPropagation()}
            >
              <section className="mobile-search-wrapper">
                <button
                  type="button"
                  className="back-search-btn"
                  onClick={() => showSearchInput(false)}
                >
                  <img alt="" src={backIcon} />
                </button>

                <SearchInput
                  onClear={handleClear}
                  onChange={triggerSearch}
                  value={extractQueryValue(search)}
                />
              </section>
            </div>
          </div>
        )}

        <button
          type="button"
          className="mobile-search-btn"
          onClick={() => showSearchInput(true)}
        >
          <img alt="" src={searchIcon} />
        </button>

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
            {searchedBooks.length
              ? searchedBooks.map((book: IBooks) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onViewClick={() => handleViewBook(book.id)}
                    onAddToCartClick={() => handleAddToCart(book)}
                  />
                ))
              : ternaryResolver(
                  loading,
                  <>
                    <BooksLoader />
                    <BooksLoader />
                  </>,
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
