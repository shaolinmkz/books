import { IBooks, IFeaturedBooks } from "../../interfaces";
import Stars from "../Stars";
import "./index.scss";

interface IProps {
  book?: IFeaturedBooks | IBooks;
  likeIcon: string;
  peopleIcon: string;
  starColor?: string;
  starBackgroundColor?: string;
}

function LikesAndRating({
  likeIcon,
  peopleIcon,
  book,
  starColor,
  starBackgroundColor,
}: IProps) {
  return (
    <div className="more-book-info">
      <div className="like-and-purchase">
        <div>
          <img src={peopleIcon} alt="" />
          <span className="user-purchase">{book?.number_of_purchases}</span>
        </div>
        <div>
          <img src={likeIcon} alt="" />
          <span className="likes">{book?.likes}</span>
        </div>
      </div>

      <div className="ratings">
        <div className="rating-info">
          <h4 className="sub-title">Ratings:</h4>
          <span>{book?.rating}</span>
        </div>

        <Stars
          rating={book?.rating}
          color={starColor}
          backgroundColor={starBackgroundColor}
        />
      </div>
    </div>
  );
}

export default LikesAndRating;
