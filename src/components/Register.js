import { useNavigate } from "react-router-dom";
import React from "react";
import { useForm } from "../hooks/useForm";
import AuthForm from "./AuthForm";

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
    onRegister(values.authEmail, values.authPassword);
  }

  return (
    <AuthForm
      value={values}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      title={"Регистрация"}
      buttonText={"Зарегистрироваться"}
      linkText={"Уже зарегистрированы? Войти"}
    />   
  );
}

export default Register;
