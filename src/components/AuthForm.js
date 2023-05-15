import { Link } from "react-router-dom";

function AuthForm({
  value,
  handleChange,
  handleSubmit,
  title,
  buttonText,
  linkText,
}) {
  return (
    <section className="auth">
      <form
        className="auth__form"
        name="authForm"
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 className="auth__title">{title}</h2>
        <input
          type="email"
          id="authEmail"
          className="auth__input"
          name="authEmail"
          placeholder="Email"
          value={value.authEmail || ""}
          onChange={handleChange}
        />
        <input
          type="password"
          id="authPassword"
          className="auth__input"
          name="authPassword"
          placeholder="Пароль"
          value={value.authPassword || ""}
          onChange={handleChange}
        />
        <button className="auth__button-submit" type="submit">
          {buttonText}
        </button>
      </form>
      <Link to="/sign-in" className="auth__link-login">
        {linkText}
      </Link>
    </section>
  );
}

export default AuthForm;
