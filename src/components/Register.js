import { Link, useNavigate } from "react-router-dom";
import React from "react";

function Register({ loggedIn }) {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedIn) {
      navigate("/", { replace: true });
    }
  }, [loggedIn, navigate]);

  return (
    <section className="register">
      <form className="register__form" name="registerForm">
        <h2 className="register__title">Регистрация</h2>
        <input
          type="email"
          id="registerEmail"
          className="register__input"
          name="registerEmail"
          placeholder="Email"
          // value={""}
          // onChange={""}
        />
        <input
          type="password"
          id="registerPassword"
          className="register__input"
          name="registerPassword"
          placeholder="Пароль"
          // value={""}
          // onChange={""}
        />
        <button className="register__button-submit" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <Link to="/sign-in" className="register__link-login">
        Уже зарегистрированы? Войти
      </Link>
    </section>
  );
}

export default Register;
