import React from "react";
import logoPath from "../images/mesto-logo.svg";
import { NavLink } from "react-router-dom";

function Header({ loggedIn, userEmail, signOut, onOpenMenu }) {

const [isMenuCliked, setIsMenuClicked] = React.useState(false);

function toggleMenu() {
  setIsMenuClicked(!isMenuCliked);
  onOpenMenu();
}

  function handleNavBar() {
    if (loggedIn) {
      return (
        <nav>
          <div className="header__menu">
            <span className="header__user">{userEmail}</span>
            <span className="header__button-exit" onClick={signOut}>
              Выйти
            </span>
          </div>
          <div className="header__mob-menu-icons">
            {!isMenuCliked && <span className="header__menu-icon" onClick={toggleMenu}></span>}
            {isMenuCliked && <span className="header__menu-close-icon" onClick={toggleMenu}></span>}            
          </div>
        </nav>
      );
    } else {
      return (
        <nav className="header__menu">
          <NavLink
            to="/sign-up"
            className={({ isActive }) =>
              `header__menu-item ${isActive ? "header__menu-item_active" : ""}`
            }
          >
            {" "}
            Регистрация
          </NavLink>
          <NavLink
            to="/sign-in"
            className={({ isActive }) =>
              `header__menu-item ${isActive ? "header__menu-item_active" : ""}`
            }
          >
            {" "}
            Войти
          </NavLink>
        </nav>
      );
    }
  }

  return (
    <header className="header">
      <div className="header__mob-menu">
        <span className="header__user-mob">{userEmail}</span>
        <span className="header__button-exit-mob" onClick={signOut}>Выйти</span>
        <div className="header__line"></div>
      </div>
      <div className="header__container">
        <img
          src={logoPath}
          className="header__logo"
          alt="Логотип сайта Mesto Russia"
        />
        {handleNavBar()}
      </div>
      <div className="header__line"></div>
    </header>
  );
}

export default Header;
