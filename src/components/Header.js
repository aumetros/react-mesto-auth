import logoPath from "../images/mesto-logo.svg";

function Header({ loggedIn }) {
  function handleNavBar() {
    if (loggedIn) {
      return (
        <div>
          <span className="header__user">email@mail.com</span>
          <span className="header__button-exit">Выйти</span>
        </div>
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
