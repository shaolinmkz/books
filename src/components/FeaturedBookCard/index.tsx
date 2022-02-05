import Stars from "../Stars";
import { IFeaturedBooks } from "../../interfaces";
import peopleWhite from "../../assets/people-white.svg";
import likeWhite from "../../assets/like-white.svg";
import "./index.scss";

interface IProps {
  book: IFeaturedBooks;
}

const FeaturedBookCard = ({ book }: IProps) => {

  const extractName = (data: { id: string, name: string }[]) => {
      return data.map(({ name }) => name).join(", ");
  }

  return (
    <div className="featured-book-card">
      <img alt="" src={book.image_url} />

      <div className="card-details">
        <span className="available">Available</span>

        <div className="author-info">
          <h3 className="book-title">{book.title}</h3>
          <p className="author">{extractName(book.authors)}</p>
          <span className="year">2016</span>
        </div>

        <div className="genre-info">
          <h4 className="sub-title">Genre</h4>
          <span className="genre">{extractName(book.genres)}</span>
        </div>

        <div className="tag-info">
          <h4 className="sub-title">Tags</h4>
          <span className="tags">{extractName(book.tags)}</span>
        </div>

        <div className="more-book-info">
          <div className="like-and-purchase">
            <div>
              <img src={peopleWhite} alt="" />
              <span className="user-purchase">{book.number_of_purchases}</span>
            </div>
            <div>
              <img src={likeWhite} alt="" />
              <span className="likes">{book.likes}</span>
            </div>
          </div>

          <div className="ratings">
            <div className="rating-info">
              <h4 className="sub-title">Ratings:</h4>
              <span>{book.rating}</span>
            </div>

            <Stars rating={book.rating} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBookCard;
