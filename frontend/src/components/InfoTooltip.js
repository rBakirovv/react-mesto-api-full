import React from 'react';

function InfoTooltip(props) {
  return (
    <section className={`popup popup__${props.name} ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button type="button" className="popup__button-clouse" aria-label="Close" onClick={props.onClose}></button>
        <img className="popup__image" src={props.image} alt="Information" />
        <h2 className="popup__title popup__title-tooltip">{props.title}</h2>
      </div>
    </section>
  )
};

export default InfoTooltip;