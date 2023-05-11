import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useForm } from "../hooks/useForm";
import { useValidation } from "../hooks/useValidation";
import { useFormErrors } from "../hooks/useFormErrors";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading, onEsc }) {
  const currentUser = React.useContext(CurrentUserContext);

  const { values, handleChange, setValues } = useForm();
  const { errors, setErrors } = useFormErrors();

  const userNameValidationResult = useValidation(values.name, "name");
  const userAboutValidationResult = useValidation(values.about, "about");

  const isUserNameInvalid = Object.values(errors.name).some(Boolean);
  const isUserAboutInvalid = Object.values(errors.about).some(Boolean);
  const isFormInvalid = isUserNameInvalid || isUserAboutInvalid;

  const userNameErrorClassName = `popup__input popup__input_type_error ${
    isUserNameInvalid && "popup__error_visible"
  }`;

  const userAboutErrorClassName = `popup__input popup__input_type_error ${
    isUserAboutInvalid && "popup__error_visible"
  }`;

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }

  React.useEffect(() => {
    setValues({
      name: currentUser.name,
      about: currentUser.about,
    });
  }, [currentUser, isOpen, setValues]);

  React.useEffect(() => {
    setErrors({
      name: userNameValidationResult,
      about: userAboutValidationResult,
    });
  }, [userNameValidationResult, userAboutValidationResult, setErrors]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      onEsc={onEsc}
      isInvalid={isFormInvalid}
    >
      <input
        type="text"
        id="name-input"
        className="popup__input popup-profile__input"
        name="name"
        placeholder="Введите своё имя"
        value={values.name || ""}
        onChange={handleChange}
      />
      <span className={userNameErrorClassName}>
        {errors.name.required && errors.name.minLenght && "Заполните это поле."}
        {!errors.name.required && errors.name.minLenght && "Текст должен быть не короче 2 симв."}
        {errors.name.maxLength && "Текст должен быть не длинее 40 симв."}
      </span>
      <input
        type="text"
        id="about-input"
        className="popup__input popup-profile__input"
        name="about"
        placeholder="Напишите о себе"
        value={values.about || ""}
        onChange={handleChange}
      />
      <span className={userAboutErrorClassName}>
        {errors.about.required && errors.about.minLenght && "Заполните это поле."}
        {!errors.about.required && errors.about.minLenght && "Текст должен быть не короче 2 симв."}
        {errors.about.maxLength && "Текст должен быть не длинее 200 симв."}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
