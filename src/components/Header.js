import React from "react";
import logoPath from "../images/mesto-logo.svg";
import { NavLink } from "react-router-dom";

function Header({ loggedIn }) {
  function handleNavBar() {
    if (loggedIn) {
      return (
        <nav className="header__menu">
          <span className="header__user">email@mail.com</span>
          <span className="header__button-exit">Выйти</span>
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
          > Регистрация
          </NavLink>
          <NavLink
            to="/sign-in"
            className={({ isActive }) =>
              `header__menu-item ${isActive ? "header__menu-item_active" : ""}`
            }
          > Войти
          </NavLink>
        </nav>
      );
    }
  }

  return (
    <header className="header">
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
