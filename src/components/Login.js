function Login() {
  return (
    <section className="login">
      <form className="login__form" name="loginForm">
        <h2 className="login__title">Вход</h2>
        <input
          type="email"
          id="loginEmail"
          className="login__input"
          name="loginEmail"
          placeholder="Email"
          // value={""}
          // onChange={""}
        />
        <input
          type="password"
          id="loginPassword"
          className="login__input"
          name="loginPassword"
          placeholder="Пароль"
          // value={""}
          // onChange={""}
        />
        <button className="login__button-submit" type="submit">
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
