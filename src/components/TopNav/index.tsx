import { useEffect } from "react";
import { Link } from "react-router-dom";

import whiteLogoIcon from "../../assets/logo-white-bg.svg";
import blackLogoIcon from "../../assets/logo-black-bg.svg";
import cartIcon from "../../assets/cart.svg";
import SearchInput from "../SearchInput";
import { useAppData } from "../../hooks/useAppData";
import {
  OPEN_CLOSE_CART,
} from "../../appContext/types";
import {
  calculateCartSize,
} from "../../utils";
import "./index.scss";
import Cart from "../Cart";

const TopNav = () => {
  const { dispatch, isCartOpen, cart } = useAppData();

  const handleOpenCloseCart = (value: boolean) => {
    dispatch({ type: OPEN_CLOSE_CART, payload: value });
  };

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isCartOpen]);

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
      <Cart />

    </>
  );
};

export default TopNav;
