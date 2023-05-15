import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import AuthForm from "./AuthForm";

function Login({ loggedIn, onLogin }) {
  const { values, handleChange } = useForm();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedIn) {
      navigate("/", { replace: true });
    }
  }, [loggedIn, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values.authEmail, values.authPassword);
  }

  return (
    <AuthForm
      value={values}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      title={"Вход"}
      buttonText={"Войти"}
      linkText={""}
    />
  );
}

export default Login;
