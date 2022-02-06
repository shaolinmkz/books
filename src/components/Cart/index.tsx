import { useEffect } from "react";

import cartIcon from "../../assets/cart.svg";
import backIcon from "../../assets/back.svg";
import cartWhiteIcon from "../../assets/cart-white.svg";
import { useAppData } from "../../hooks/useAppData";
import {
  OPEN_CLOSE_CART,
  ADD_TO_CART,
  DECREMENT_CART_ITEM,
  REMOVE_FROM_CART,
} from "../../appContext/types";
import {
  calculateSubtotal,
  currencyFormatter,
  disableBodyScroll,
  ternaryResolver,
} from "../../utils";
import "./index.scss";
import { ICartBook } from "../../interfaces";
import CartCard from "./CartCard";

const Cart = () => {
  const { dispatch, isCartOpen, cart } = useAppData();

  const handleOpenCloseCart = (value: boolean) => {
    dispatch({ type: OPEN_CLOSE_CART, payload: value });
  };

  const handleRemove = (item: ICartBook) => {
    dispatch({ type: REMOVE_FROM_CART, payload: item });
  };

  const handleIncrement = (item: ICartBook) => {
    dispatch({ type: ADD_TO_CART, payload: item });
  };

  const handleDecrement = (item: ICartBook) => {
    dispatch({ type: DECREMENT_CART_ITEM, payload: item });
  };

  useEffect(() => {
    disableBodyScroll(isCartOpen);
  }, [isCartOpen]);

  return (
    <div
      className={`cart-modal ${
        isCartOpen
          ? "fade-in"
          : ternaryResolver(isCartOpen === false, "fade-out", "default-state")
      }`}
      onClick={() => handleOpenCloseCart(false)}
    >
      <section
        onClick={(event) => event.stopPropagation()}
        className={`cart-container ${
          isCartOpen
            ? "slide-in"
            : ternaryResolver(
                isCartOpen === false,
                "slide-out",
                "default-state"
              )
        }`}
      >
        <header className="cart-header">
          <button
            type="button"
            className="back-btn"
            onClick={() => handleOpenCloseCart(false)}
          >
            <img src={backIcon} alt="" />
            <span>Back</span>
          </button>

          <div className="cart-icon">
            <span>Your Cart</span>
            <img src={cartIcon} alt="" />
          </div>
        </header>

        <section className="wrapper">
          {cart.length ? (
            cart.map((item) => (
              <CartCard
                key={item.id}
                item={item}
                onCartRemove={() => handleRemove(item)}
                onDecrement={() => handleDecrement(item)}
                onIncrement={() => handleIncrement(item)}
              />
            ))
          ) : (
            <div className="empty-cart">
              <p>Empty Cart</p>
            </div>
          )}
        </section>

        <section className="wrapper">
          <div className="sub-total">
            <span className="price-label">Subtotal</span>
            <span className="price">
              {currencyFormatter(calculateSubtotal(cart), "USD")}
            </span>
          </div>
        </section>

        <section className="wrapper">
          <div className="btn-container">
            <button type="button">
              <img src={cartWhiteIcon} alt="" />
              <span>Proceed to Checkout</span>
            </button>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Cart;
