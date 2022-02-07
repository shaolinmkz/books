import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { GET_BOOK, GET_BOOKS } from "../../gql/queries";
import { IBooks } from "../../interfaces";
import backIcon from "../../assets/back.svg";
import cartWhite from "../../assets/cart-white.svg";
import peopleBlack from "../../assets/people-black.svg";
import likeBlack from "../../assets/like-black.svg";
import { BooksLoader } from "../../components/Loaders";
import { currencyFormatter, dateUtil, findBookMatch } from "../../utils";
import { extractAndMergeNames } from "../../utils/index";
import LikesAndRating from "../../components/LikesAndRating";
import { useAppData } from "../../hooks/useAppData";
import {
  ADD_TO_CART,
  GET_ALL_BOOKS,
  OPEN_CLOSE_CART,
} from "../../appContext/types";
import "./index.scss";

const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

const BookDetails = () => {
  const { goBack } = useHistory();
  const { dispatch, books } = useAppData();
  const { bookId } = useParams<{ bookId: string }>();
  const { loading: loadingAllBooks, data: bookResponse } = useQuery(GET_BOOKS, {
    variables: {
      limit: 50,
    },
  });
  const { loading, data } = useQuery(GET_BOOK, {
    variables: {
      id: bookId,
    },
  });

  const handleAddToCart = (book?: IBooks) => {
    dispatch({ type: ADD_TO_CART, payload: book });
    dispatch({ type: OPEN_CLOSE_CART, payload: true });
  };

  const bookData: IBooks = {
    ...data?.book,
    available_copies:
      findBookMatch(data?.book.id, books)?.available_copies ??
      data?.book?.available_copies,
  };

  useEffect(() => {
    if (bookResponse?.books && !loadingAllBooks && !books.length) {
      dispatch({ type: GET_ALL_BOOKS, payload: bookResponse?.books });
    }
  }, [bookResponse?.books, loadingAllBooks, dispatch, books.length]);

  return (
    <div className="book-details-container">
      <section className="back-btn-container">
        <button type="button" onClick={() => goBack()}>
          <img src={backIcon} alt="" />
          <span>Back</span>
        </button>
      </section>
      {loading ? (
        <>
          <BooksLoader />
          <BooksLoader />
          <BooksLoader />
        </>
      ) : (
        <div className="display-wrapper">
          <aside className="book-display">
            <img src={bookData?.image_url} alt="" />

            <p
              className={`available-copies ${
                !bookData?.available_copies ? "out-of-stock" : ""
              }`}
            >
              {bookData?.available_copies
                ? `${bookData?.available_copies} Copies Available`
                : "Out of stock"}
            </p>

            <p className="price">
              {currencyFormatter(bookData?.price, bookData?.currency)}
            </p>

            {!!bookData?.available_copies && (
              <button
                disabled={!bookData?.available_copies}
                type="button"
                onClick={() => handleAddToCart(bookData)}
              >
                <img src={cartWhite} alt="" />
                <span>Add to Cart</span>
              </button>
            )}
          </aside>

          <aside className="book-details">
            <h1 className="book-title">{`${bookData?.title}${
              bookData?.subtitle ? `: ${bookData?.subtitle}` : ""
            }`}</h1>
            <h4 className="author">
              {extractAndMergeNames(bookData?.authors)}
            </h4>
            <p className="year">
              {dateUtil(bookData?.published_at).getFullYear()}
            </p>

            <div className="book-info">
              <LikesAndRating
                peopleIcon={peopleBlack}
                likeIcon={likeBlack}
                book={bookData}
                starBackgroundColor="#ddd"
              />

              <section
                className="generic-book-info genre"
                title={extractAndMergeNames(bookData?.genres)}
              >
                <h4>Genre</h4>
                <p>
                  {extractAndMergeNames(bookData?.genres) || "Not Available"}
                </p>
              </section>

              <section
                className="generic-book-info tags"
                title={extractAndMergeNames(bookData?.tags)}
              >
                <h4>Tags</h4>
                <p>{extractAndMergeNames(bookData?.tags) || "Not Available"}</p>
              </section>

              <section className="generic-book-info publisher">
                <h4>Publisher</h4>
                <p>{bookData?.publisher || "Not Available"}</p>
              </section>

              <section className="generic-book-info released">
                <h4>Released</h4>
                <p>{`
                ${dateUtil(bookData?.release_date).getDate()}
                ${months[dateUtil(bookData?.release_date).getMonth() + 1]},
                ${dateUtil(bookData?.release_date).getFullYear()}`}</p>
              </section>
            </div>

            {!!bookData?.available_copies && (
              <div className="mobile-cart-btn-container">
                <button
                  type="button"
                  disabled={!bookData?.available_copies}
                  onClick={() => handleAddToCart(bookData)}
                >
                  <div>
                    <img src={cartWhite} alt="" />
                    <div
                      className={`cart-avail-copies ${
                        !bookData?.available_copies ? "out-of-stock" : ""
                      }`}
                    >
                      <p>Add to Cart</p>
                      <span>
                        {!!bookData?.available_copies
                          ? `${bookData?.available_copies} Copies Available`
                          : "Out of Stock"}
                      </span>
                    </div>
                  </div>
                  <p className="book-price">
                    {currencyFormatter(bookData?.price, bookData?.currency)}
                  </p>
                </button>
              </div>
            )}

            <div className="full_description">
              <p>
                {`${bookData?.full_description}`
                  .split("")
                  .map((pathDescription, index) =>
                    pathDescription === "\n" ? (
                      <br key={index} />
                    ) : (
                      pathDescription
                    )
                  )}
              </p>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
