import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useForm } from "../hooks/useForm";

function Register({ loggedIn, onRegister }) {
  const navigate = useNavigate();
  const { values, handleChange} = useForm();

  React.useEffect(() => {
    if (loggedIn) {
      navigate("/", { replace: true });
    }
  }, [loggedIn, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values.registerEmail, values.registerPassword);
  }

  return (
    <section className="register">
      <form
        className="register__form"
        name="registerForm"
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 className="register__title">Регистрация</h2>
        <input
          type="email"
          id="registerEmail"
          className="register__input"
          name="registerEmail"
          placeholder="Email"
          value={values.registerEmail || ""}
          onChange={handleChange}
        />
        <input
          type="password"
          id="registerPassword"
          className="register__input"
          name="registerPassword"
          placeholder="Пароль"
          value={values.registerPassword || ""}
          onChange={handleChange}
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
