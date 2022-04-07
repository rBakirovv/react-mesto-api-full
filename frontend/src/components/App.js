import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import '../index.css'
import Main from './Main';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import success from '../images/succses.png';
import unsuccess from '../images/unsuccses.png';
import InfoTooltip from './InfoTooltip';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';
import AddPlacePopup from './AddPlacePopup';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [infoImage, setInfoImage] = useState('');
  const [infoTitle, setInfoTitle] = useState('');

  const [loggedIn, setLoggedIn] = useState(false);

  const [email, setEmail] = useState('');

  const history = useHistory();

  useEffect(() => {
    api
      .getUserInfo()
      .then(({ user }) => {
        if (user._id) {
          setLoggedIn(true);
          setEmail(user.email);
          history.push('/');
        }
      })
      .catch(() => {
        setLoggedIn(false);
      });
  }, [history]);

  useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
        .then(({ user }) => {
          setCurrentUser({
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            _id: user._id,
          })
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      api.getInitialCards()
        .then((card) => {
          setCards(card.reverse())
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn]);

  function handleRegistration(data) {
    auth
      .register(data.password, data.email)
      .then(() => {
        setInfoImage(success);
        setInfoTitle('Вы успешно зарегистрировались!');
        openTooltip();
        history.push("/sign-in");
      })
      .catch((err) => {
        setInfoImage(unsuccess);
        setInfoTitle('Что-то пошло не так! Попробуйте ещё раз.');
        openTooltip();
        console.log(err)
      });
  };

  function handleAuthorization(data) {
    auth
      .authorize(data.password, data.email)
      .then(() => {
        setEmail(data.email)
        setLoggedIn(true)
        history.push("/");
      })
      .catch((err) => {
        setInfoImage(unsuccess);
        setInfoTitle('Что-то пошло не так! Попробуйте ещё раз.');
        openTooltip();
        console.log(err)
      });
  };

  function handleLogOut() {
    auth.logOut();
    setLoggedIn(false);
    history.push("/");
  };

  const [selectedCard, setSelectedCard] = useState({
    isImageOpen: false,
    link: '',
    name: '',
  });

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  function openTooltip() {
    setIsInfoTooltipOpen(!isInfoTooltipOpen);
  };

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({ isImageOpen: false, link: '', name: '' })
  };

  function handleCardClick(card) {
    const { link, name } = card
    setSelectedCard({ isImageOpen: true, link: link, name: name })
  }

  function handleCardLike(card) {

    const isLiked = card.likes.some(owner => owner === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((c) => c._id !== card._id));
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleUpdateUser(data) {
    api.setUserInfo(data)
      .then((updatedUserData) => {
        setCurrentUser(updatedUserData);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleUpdateAvatar(data) {
    api.setUserAvatar(data)
      .then((updatedUserData) => {
        setCurrentUser(updatedUserData);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleAddPlaceSubmit(data) {
    api.createNewCard(data)
      .then((updatedCardsData) => {
        setCards([updatedCardsData, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body__container">
        <Header
          loggedIn={loggedIn}
          onLogOut={handleLogOut}
          userEmail={email}
        />
        <Switch>
          <ProtectedRoute
            exact path={'/'}
            loggedIn={loggedIn}
          >
            <Main
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
            />
          </ProtectedRoute>
          <Route path="/sign-up">
            <Register handleRegistration={handleRegistration} />
          </Route>
          <Route path="/sign-in">
            <Login handleAuthorization={handleAuthorization} />
          </Route>
        </Switch>
        <Footer />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <PopupWithForm
          name='confirm'
          title='Вы уверены?'
          buttonText='Да'
        />
        <ImagePopup
          name={selectedCard.name}
          link={selectedCard.link}
          isOpen={selectedCard.isImageOpen}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          name='infotooltip'
          image={infoImage}
          title={infoTitle}
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
