import { useParams, useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { GET_BOOK } from "../../gql/queries";
import { IBooks } from "../../interfaces";
import backIcon from "../../assets/back.svg";
import cartWhite from "../../assets/cart-white.svg";
import peopleBlack from "../../assets/people-black.svg";
import likeBlack from "../../assets/like-black.svg";
import { BooksLoader } from "../../components/Loaders";
import { currencyFormatter, dateUtil } from "../../utils";
import { extractAndMergeNames } from "../../utils/index";
import LikesAndRating from "../../components/LikesAndRating";
import "./index.scss";
import { useAppData } from "../../hooks/useAppData";
import { ADD_TO_CART, OPEN_CLOSE_CART } from "../../appContext/types";

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
  const { dispatch } = useAppData();
  const { bookId } = useParams<{ bookId: string }>();
  const { loading, data } = useQuery<{ book: IBooks }>(GET_BOOK, {
    variables: {
      id: bookId,
    },
  });

  const handleAddToCart = (book?: IBooks) => {
    dispatch({ type: ADD_TO_CART, payload: book });
    dispatch({ type: OPEN_CLOSE_CART, payload: true });
  };

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
            <img src={data?.book.image_url} alt="" />

            <p
              className={`available-copies ${
                !data?.book.available_copies ? "out-of-stock" : ""
              }`}
            >
              {data?.book.available_copies
                ? `${data?.book.available_copies} Copies Available`
                : "Out of stock"}
            </p>

            <p className="price">
              {currencyFormatter(data?.book.price, data?.book.currency)}
            </p>

            <button type="button" onClick={() => handleAddToCart(data?.book)}>
              <img src={cartWhite} alt="" />
              <span>Add to Cart</span>
            </button>
          </aside>

          <aside className="book-details">
            <h1 className="book-title">{`${data?.book.title}: ${
              data?.book.subtitle || ""
            }`}</h1>
            <h4 className="author">
              {extractAndMergeNames(data?.book.authors)}
            </h4>
            <p className="year">
              {dateUtil(data?.book.published_at).getFullYear()}
            </p>

            <div className="book-info">
              <LikesAndRating
                peopleIcon={peopleBlack}
                likeIcon={likeBlack}
                book={data?.book}
                starBackgroundColor="#ddd"
              />

              <section
                className="generic-book-info"
                title={extractAndMergeNames(data?.book.genres)}
              >
                <h4>Genre</h4>
                <p>
                  {extractAndMergeNames(data?.book.genres) || "Not Available"}
                </p>
              </section>

              <section
                className="generic-book-info"
                title={extractAndMergeNames(data?.book.tags)}
              >
                <h4>Tags</h4>
                <p>
                  {extractAndMergeNames(data?.book.tags) || "Not Available"}
                </p>
              </section>

              <section className="generic-book-info">
                <h4>Publisher</h4>
                <p>{data?.book.publisher || "Not Available"}</p>
              </section>

              <section className="generic-book-info">
                <h4>Released</h4>
                <p>{`
                ${dateUtil(data?.book.release_date).getDate()}
                ${months[dateUtil(data?.book.release_date).getMonth() + 1]},
                ${dateUtil(data?.book.release_date).getFullYear()}`}</p>
              </section>
            </div>

            <div className="full_description">
              <p>
                {`${data?.book.full_description}`
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
