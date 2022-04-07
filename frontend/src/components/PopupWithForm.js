import React from 'react';

function PopupWithForm(props) {
    return (
        <section className={`popup popup__${props.name} ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button type="button" className="popup__button-clouse" aria-label="Close" onClick={props.onClose}></button>
                <h2 className="popup__title">{props.title}</h2>
                <form className="popup__form popup__avatar-form" name={`${props.name}-form`} onSubmit={props.onSubmit}>
                    {props.children}
                    <button className="popup__button-save" type="submit">{props.buttonText}</button>
                </form>
            </div>
        </section>
    )
};

export default PopupWithForm;