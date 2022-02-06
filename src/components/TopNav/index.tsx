import { useEffect } from "react";
import { Link } from "react-router-dom";

import whiteLogoIcon from "../../assets/logo-white-bg.svg";
import blackLogoIcon from "../../assets/logo-black-bg.svg";
import cartIcon from "../../assets/cart.svg";
import backIcon from "../../assets/back.svg";
import cartWhiteIcon from "../../assets/cart-white.svg";
import SearchInput from "../SearchInput";
import { useAppData } from "../../hooks/useAppData";
import {
  OPEN_CLOSE_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from "../../appContext/types";
import {
  calculateCartSize,
  calculateSubtotal,
  currencyFormatter,
  extractAndMergeNames,
  ternaryResolver,
} from "../../utils";
import "./index.scss";

const TopNav = () => {
  const { dispatch, isCartOpen, cart } = useAppData();

  const handleOpenCloseCart = (value: boolean) => {
    dispatch({ type: OPEN_CLOSE_CART, payload: value });
  };

  useEffect(() => {
    if(isCartOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [isCartOpen])

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

        <SearchInput onChange={() => {}} />

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
                <div className="cart-card" key={item.id}>
                  <div className="book-cover">
                    <img src={item.image_url} alt="" />
                  </div>

                  <div className="book-info">
                    <div className="author-title-remove">
                      <section className="author-title">
                        <h4 className="truncate">{item.title}</h4>
                        <p className="truncate">
                          {extractAndMergeNames(item.authors)}
                        </p>
                      </section>
                      <button type="button">Remove</button>
                    </div>

                    <div className="price-and-actions">
                      <p className="price">
                        <span>
                          {currencyFormatter(item.price, item.currency)}
                        </span>
                      </p>
                      <section className="increment-decrement">
                        <div className="btn-collection">
                          <button
                            type="button"
                            className="decrement"
                            onClick={() =>
                              dispatch({
                                type: REMOVE_FROM_CART,
                                payload: item,
                              })
                            }
                          >
                            -
                          </button>
                          <span>{item.count}</span>
                          <button
                            type="button"
                            className="increment"
                            onClick={() =>
                              dispatch({
                                type: ADD_TO_CART,
                                payload: item,
                              })
                            }
                          >
                            +
                          </button>
                        </div>
                      </section>
                      <h4 className="sub-price">
                        {currencyFormatter(
                          item.count * item.price,
                          item.currency
                        )}
                      </h4>
                    </div>
                  </div>
                </div>
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
    </>
  );
};

export default TopNav;
