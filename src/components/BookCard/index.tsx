import LikesAndRating from "../LikesAndRating";
import peopleBlack from "../../assets/people-black.svg";
import cartIcon from "../../assets/cart.svg";
import likeBlack from "../../assets/like-black.svg";
import { extractAndMergeNames, dateUtil, currencyFormatter } from "../../utils";
import { IBooks } from "../../interfaces";
import { SEARCH_INPUT_OPEN } from "../../appContext/types";
import { useAppData } from '../../hooks/useAppData';
import "./index.scss";

interface IProps {
  book: IBooks;
  onViewClick: () => void;
  onAddToCartClick: () => void;
}

const BookCard = ({ book, onViewClick, onAddToCartClick }: IProps) => {
  const { dispatch } = useAppData();

  return (
    <div className="book-card" onClick={() => {
      onViewClick();
      dispatch({ type: SEARCH_INPUT_OPEN, payload: false });
    }}>
      <img src={book.image_url} alt="" />
      <div className="book-card-info">
        <h4>{book.title}</h4>
        <div className="author-genre">
          <p>{`${extractAndMergeNames(book.authors)} - ${dateUtil(
            book.release_date
          ).getFullYear()}`}</p>
          <p>{extractAndMergeNames(book.genres)}</p>
        </div>

        <LikesAndRating
          peopleIcon={peopleBlack}
          likeIcon={likeBlack}
          book={book}
          starBackgroundColor="#ddd"
        />

        <div className="price-available-copies">
          <span className="price">
            {currencyFormatter(book.price, book.currency)}
          </span>
          <span
            className={`available-copies ${
              !book.available_copies ? "out-of-stock" : ""
            }`}
          >
            {book.available_copies
              ? `${book.available_copies} Copies Available`
              : "Out of stock"}
          </span>
        </div>

        <button
          className="add-to-cart"
          disabled={!book.available_copies}
          onClick={(event) => {
            event.stopPropagation();
            onAddToCartClick();
          }}
        >
          <img src={cartIcon} alt="" /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default BookCard;
