import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";

function Login({loggedIn, onLogin}) {
  const { values, handleChange} = useForm();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedIn) {
      navigate("/", { replace: true });
    }
  }, [loggedIn, navigate])

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values.loginEmail, values.loginPassword);
  }

  return (
    <section className="login">
      <form className="login__form" name="loginForm" onSubmit={handleSubmit}>
        <h2 className="login__title">Вход</h2>
        <input
          type="email"
          id="loginEmail"
          className="login__input"
          name="loginEmail"
          placeholder="Email"
          value={values.loginEmail || ''}
          onChange={handleChange}
        />
        <input
          type="password"
          id="loginPassword"
          className="login__input"
          name="loginPassword"
          placeholder="Пароль"
          value={values.loginPassword || ''}
          onChange={handleChange}
        />
        <button className="login__button-submit" type="submit">
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
