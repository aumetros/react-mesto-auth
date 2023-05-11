import logoPath from "../images/mesto-logo.svg";

function Header() {
  return (
    <header className="header">
      <img
        src={logoPath}
        className="header__logo"
        alt="Логотип сайта Mesto Russia"
      />
      <div className="header__line"></div>
    </header>
  );
}

export default Header;
