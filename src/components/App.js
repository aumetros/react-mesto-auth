import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import Login from "./Login";
import Register from "./Register";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import InfoTooltip from "./InfoTooltip";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRouteElement from "./ProtectedRoute";
import * as auth from "../utils/auth.js";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [cardToDelete, setCardToDelete] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isRegistered, setIsRegistered] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then((res) => {
        setCurrentUser(res[0]);
        setCards(res[1]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleDeleteClick(card) {
    setIsConfirmDeletePopupOpen(!isConfirmDeletePopupOpen);
    setCardToDelete(card);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({});
  }

  function handleEscClose(evt) {
    if (evt.key === "Escape") {
      closeAllPopups();
    }
  }

  function handleClosePopup(e) {
    const closeClassNames = ["popup_opened", "popup__close"];
    if (
      closeClassNames.some((className) =>
        e.target.classList.contains(className)
      )
    ) {
      closeAllPopups();
    }
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete() {
    setIsLoading(true);
    api
      .deleteCard(cardToDelete._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardToDelete._id));
        closeAllPopups();
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .editProfile(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatarLink) {
    setIsLoading(true);
    api
      .editAvatar(avatarLink)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleInfoPopupClose(e) {
    if (isLoggedIn) {
      handleClosePopup(e);
      navigate("/", { replace: true });
      return;
    }
    if (isRegistered) {
      handleClosePopup(e);
      navigate("/sign-in", { replace: true });
    }
  }

  function handleInfoEscClose(e) {
    if (isLoggedIn) {
      handleEscClose(e);
      navigate("/", { replace: true });
      return;
    }
    if (isRegistered) {
      handleEscClose(e);
      navigate("/sign-in", { replace: true });
    }
  }

  function handleRegisterSubmit(email, password) {
    auth.register(email, password).then((res) => {
      if (res.data) {
        setIsRegistered(true);
        setIsInfoTooltipPopupOpen(true);
      } else {
        console.log(res.error);
      }
    });
  }

  function handleLoginSubmit(email, password) {
    auth.autorize(email, password).then((res) => {
      if (res.token) {
        setIsLoggedIn(true);
        localStorage.setItem("jwt", res.token);
        setIsInfoTooltipPopupOpen(true);
      } else {
        console.log(res.error);
      }
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header loggedIn={isLoggedIn} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                loggedIn={isLoggedIn}
                element={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onDeleteClick={handleDeleteClick}
                onCardLike={handleCardLike}
                initialCards={cards}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register
                loggedIn={isLoggedIn}
                onRegister={handleRegisterSubmit}
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login loggedIn={isLoggedIn} onLogin={handleLoginSubmit} />
            }
          />
        </Routes>

        {isLoggedIn && <Footer />}

        <ImagePopup
          card={selectedCard}
          onEsc={handleEscClose}
          onClose={handleClosePopup}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={handleClosePopup}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
          onEsc={handleEscClose}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={handleClosePopup}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
          onEsc={handleEscClose}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={handleClosePopup}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
          onEsc={handleEscClose}
        />

        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={handleClosePopup}
          onConfirmDelete={handleCardDelete}
          isLoading={isLoading}
          onEsc={handleEscClose}
        />

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={handleInfoPopupClose}
          onEsc={handleInfoEscClose}
          isRegistered={isRegistered}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
