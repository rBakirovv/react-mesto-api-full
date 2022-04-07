import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile">
                <div className="profile__container">
                    <img src={currentUser.avatar} className="profile__avatar" alt="Аватар" />
                    <button type="button" aria-label="Edit" className="profile__avatar-button" onClick={props.onEditAvatar}></button>
                    <div className="profile__info">
                        <div className="profile__edit">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button type="button" aria-label="Edit" className="profile__edit-button" onClick={props.onEditProfile}></button>
                            <p className="profile__status">{currentUser.about}</p>
                        </div>
                    </div>
                    <button type="button" aria-label="Add" className="profile__add-button" onClick={props.onAddPlace}></button>
                </div>
            </section>
            <section className="elements"> 
                {props.cards.map((card) => <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />)}
            </section>
        </main>
    )
};

export default Main;