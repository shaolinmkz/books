import { Link } from "react-router-dom";

import { IFeaturedBooks } from "../../interfaces";
import peopleWhite from "../../assets/people-white.svg";
import likeWhite from "../../assets/like-white.svg";
import { extractAndMergeNames, dateUtil } from "../../utils";
import LikesAndRating from "../LikesAndRating";
import "./index.scss";

interface IProps {
  book: IFeaturedBooks;
}

const FeaturedBookCard = ({ book }: IProps) => {
  return (
    <Link to={`/books/${book.id}`}>
      <div className="featured-book-card">
        <img alt="" src={book.image_url} />

        <div className="card-details">
          <span className="available">Available</span>

          <div className="author-info">
            <h3 className="book-title">{book.title}</h3>
            <p className="author">{extractAndMergeNames(book.authors)}</p>
            <span className="year">
              {dateUtil(book.release_date).getFullYear()}
            </span>
          </div>

          <div className="genre-info">
            <h4 className="sub-title">Genre</h4>
            <span className="genre">{extractAndMergeNames(book.genres)}</span>
          </div>

          <div className="tag-info">
            <h4 className="sub-title">Tags</h4>
            <span className="tags">{extractAndMergeNames(book.tags)}</span>
          </div>

          <LikesAndRating
            peopleIcon={peopleWhite}
            likeIcon={likeWhite}
            book={book}
          />
        </div>
      </div>
    </Link>
  );
};

export default FeaturedBookCard;
