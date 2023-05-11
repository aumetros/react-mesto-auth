import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../hooks/useForm";
import { useValidation } from "../hooks/useValidation";
import { useFormErrors } from "../hooks/useFormErrors";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading, onEsc }) {
  const { values, handleChange, setValues } = useForm();
  const { errors, setErrors } = useFormErrors();

  const placeNameValidationResult = useValidation(values.placeName, "placeName");
  const placeLinkValidationResult = useValidation(values.placeLink, "placeLink");

  const isPlaceNameInvalid = Object.values(errors.placeName).some(Boolean);
  const isPlaceLinkInvalid = Object.values(errors.placeLink).some(Boolean);
  const isFormInvalid = isPlaceNameInvalid || isPlaceLinkInvalid;

  const [visibilityValidate, setVisibilityValidate] = React.useState({
    placeName: false,
    placeLink: false,
  });

  const placeNameErrorClassName = `popup__input popup__input_type_error ${
    visibilityValidate.placeName && isPlaceNameInvalid && "popup__error_visible"
  }`;

  const placeLinkErrorClassName = `popup__input popup__input_type_error ${
    visibilityValidate.placeLink && isPlaceLinkInvalid && "popup__error_visible"
  }`;

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: values.placeName,
      link: values.placeLink,
    });
  }

  function handleFocusInput(e) {
    setVisibilityValidate({ ...visibilityValidate, [e.target.name]: true });
  }

  function showPlaceNameErrors() {
    if (visibilityValidate.placeName) {
      return (
        <>
          {errors.placeName.required && errors.placeName.minLenght && "Заполните это поле."}
          {!errors.placeName.required && errors.placeName.minLenght && "Текст должен быть не короче 2 симв."}
          {errors.placeName.maxLength && "Текст должен быть не длинее 30 симв."}
        </>
      );
    }
  }

  function showPlaceLinkErrors() {
    if (visibilityValidate.placeLink) {
      return (
        <>
          {errors.placeLink.required && errors.placeLink.url && "Заполните это поле."}
          {!errors.placeLink.required && errors.placeLink.url && "Введите URL."}
        </>
      );
    }
  }

  React.useEffect(() => {
    setValues({ placeName: "", placeLink: "" });
    setVisibilityValidate({ placeName: false, placeLink: false });
  }, [isOpen, setValues, setVisibilityValidate]);

  React.useEffect(() => {
    setErrors({
      placeName: placeNameValidationResult,
      placeLink: placeLinkValidationResult,
    });
  }, [placeNameValidationResult, placeLinkValidationResult, setErrors]);

  return (
    <PopupWithForm
      title="Новое место"
      name="newcard"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      onEsc={onEsc}
      isInvalid={isFormInvalid}
    >
      <input
        type="text"
        id="placeName"
        className="popup__input popup-newcard__input"
        name="placeName"
        placeholder="Название"
        value={values.placeName || ""}
        onChange={handleChange}
        onFocus={handleFocusInput}
      />
      <span className={placeNameErrorClassName}>{showPlaceNameErrors()}</span>
      <input
        type="url"
        id="placeLink"
        className="popup__input popup-newcard__input"
        name="placeLink"
        placeholder="Ссылка на картинку"
        value={values.placeLink || ""}
        onChange={handleChange}
        onFocus={handleFocusInput}
      />
      <span className={placeLinkErrorClassName}>{showPlaceLinkErrors()}</span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
