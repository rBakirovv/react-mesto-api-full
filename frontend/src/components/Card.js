import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some((owner) => owner === currentUser._id);

  const cardDeleteButtonClassName = `elements__trash-button ${isOwn ? ' ' : 'elements__trash-button_hiden'}`;

  const cardLikeButtonClassName = `elements__like-button ${isLiked ? 'elements__like-button_active' : ''}`;

  function handleCardClick() {
    props.onCardClick(props.card);
  };

  function handleLikeClick() {
    props.onCardLike(props.card)
  };

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  };

  return (
    <div className="elements__item">
      <button type="button" className={cardDeleteButtonClassName} aria-label="Delete" onClick={handleDeleteClick}></button>
      <img className="elements__photo" src={props.card.link} alt={props.card.name} onClick={handleCardClick} />
      <div className="elements__item-container">
        <h2 className="elements__title">{props.card.name}</h2>
        <div className="elements__like-container">
          <button type="button" className={cardLikeButtonClassName} aria-label="Like" onClick={handleLikeClick}></button>
          <span className="elements__like-number">{props.card.likes.length}</span>
        </div>
      </div>
    </div>
  )
};

export default Card;