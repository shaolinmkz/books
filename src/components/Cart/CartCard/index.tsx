import { currencyFormatter, extractAndMergeNames } from "../../../utils";
import { ICartBook } from "../../../interfaces";
import "./index.scss";

interface IProps {
  onCartRemove: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
  item: ICartBook;
}

const Cart = ({ item, onCartRemove, onIncrement, onDecrement }: IProps) => {
  return (
    <div className="cart-card">
      <div className="book-cover">
        <img src={item.image_url} alt="" />
      </div>

      <div className="book-info">
        <div className="author-title-remove">
          <section className="author-title">
            <h4 className="truncate">{item.title}</h4>
            <p className="truncate">{extractAndMergeNames(item.authors)}</p>
          </section>
          <button type="button" onClick={onCartRemove}>
            Remove
          </button>
        </div>

        <div className="price-and-actions">
          <p className="price">
            <span>{currencyFormatter(item.price, item.currency)}</span>
          </p>
          <section className="increment-decrement">
            <div className="btn-collection">
              <button type="button" className="decrement" onClick={onDecrement}>
                -
              </button>
              <span>{item.count}</span>
              <button type="button" className="increment" onClick={onIncrement}>
                +
              </button>
            </div>
          </section>
          <h4 className="sub-price">
            {currencyFormatter(item.count * item.price, item.currency)}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Cart;
