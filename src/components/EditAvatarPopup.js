import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../hooks/useForm";
import { useValidation } from "../hooks/useValidation";
import { useFormErrors } from "../hooks/useFormErrors";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading, onEsc }) {
  const { values, handleChange, setValues } = useForm();
  const { errors, setErrors } = useFormErrors();
  const avatarLinkValidationResult = useValidation(values.avatarLink, "avatarLink");

  const [visibilityValidate, setVisibilityValidate] = React.useState(false);

  const isAvatarLinkInvalid = Object.values(errors.avatarLink).some(Boolean);
  const isFormInvalid = isAvatarLinkInvalid;

  const avatarLinkErrorClassName = `popup__input popup__input_type_error ${
    visibilityValidate && isAvatarLinkInvalid && "popup__error_visible"
  }`;

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(values.avatarLink);
  }

  function handleFocusInput() {
    setVisibilityValidate(true);
  }

  function showAvatarLinkErrors() {
    if (visibilityValidate) {
      return (
        <>
          {errors.avatarLink.required && errors.avatarLink.url && "Заполните это поле."}
          {!errors.avatarLink.required && errors.avatarLink.url && "Введите URL."}
        </>
      );
    }
  }

  React.useEffect(() => {
    setValues({ avatarLink: "" });
    setVisibilityValidate(false);
  }, [isOpen, setValues]);

  React.useEffect(() => {
    setErrors({ avatarLink: avatarLinkValidationResult });
  }, [avatarLinkValidationResult, setErrors]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="edit-avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      onEsc={onEsc}
      isInvalid={isFormInvalid}
    >
      <input
        type="url"
        id="avatarLink"
        className="popup__input popup-edit-avatar__input"
        name="avatarLink"
        placeholder="Введите cсылку на новый аватар"
        value={values.avatarLink || ""}
        onChange={handleChange}
        onFocus={handleFocusInput}
      />
      <span className={avatarLinkErrorClassName}>{showAvatarLinkErrors()}</span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
