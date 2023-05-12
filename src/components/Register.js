import { Link } from "react-router-dom";

function Register() {
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
