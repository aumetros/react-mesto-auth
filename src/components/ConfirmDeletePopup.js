import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup({ isOpen, onClose, onConfirmDelete, isLoading, onEsc }) {
  function handleSubmit(e) {
    e.preventDefault();
    onConfirmDelete();
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="confirm-delete"
      isOpen={isOpen}
      onClose={onClose}
      isDisabled={false}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      textButton="Удалить"
      textSpinner="Удаление..."
      onEsc={onEsc}
    />
  );
}

export default ConfirmDeletePopup;
