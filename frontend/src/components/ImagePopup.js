import React from 'react';

function ImagePopup(props) {

  return (
    <section className={`popup popup-elements ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__elements-container">
        <button type="button" className="popup__button-clouse popup__elements-button-clouse" aria-label="Close" onClick={props.onClose}></button>
        <img className="popup__img-full-size" src={props.link} alt={props.name} />
        <p className="popup__img-subtitle">{props.name}</p>
      </div>
    </section>
  )
};

export default ImagePopup;