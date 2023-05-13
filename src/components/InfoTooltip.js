import React from "react";
import unionDonePath from "../images/union-done.svg";
import unionErrPath from "../images/union-err.svg";

function InfoTooltip({ isOpen, onClose, onEsc, isRegistered }) {
  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", onEsc);
      return () => document.removeEventListener("keydown", onEsc);
    }
  }, [isOpen, onEsc]);

  return (
    <section
      className={`info-tooltip popup ${isOpen && "popup_opened"}`}
      onClick={onClose}
    >
      <div className="info-tooltip__container">
        <div
          className="info-tooltip__union"
          style={
            isRegistered
              ? { backgroundImage: `url(${unionDonePath})` }
              : { backgroundImage: `url(${unionErrPath})` }
          }
        ></div>

        <span className="info-tooltip__text">
          {isRegistered
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </span>

        <button className="popup__close" type="button"></button>
      </div>
    </section>
  );
}

export default InfoTooltip;
