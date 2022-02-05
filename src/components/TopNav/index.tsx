import { Link } from "react-router-dom";
import "./index.scss";
import whiteLogoIcon from "../../assets/logo-white-bg.svg";
import blackLogoIcon from "../../assets/logo-black-bg.svg";
import cartIcon from "../../assets/cart.svg";
import SearchInput from "../SearchInput";

const TopNav = () => {

  return (
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

        <button type="button">
          <img alt="" src={cartIcon} />
          <span>3</span>
        </button>
      </div>
    </header>
  );
};

export default TopNav;
