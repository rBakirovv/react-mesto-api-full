import React from 'react';
import { Route, Link } from "react-router-dom";

function Header(props) {
    return (
        <header className="header">
            <div className="header__logo"></div>
            <div className="header__login-container">
                {props.loggedIn && (
                    <>
                        <p className="header__user-mail">{props.userEmail}</p>
                        <Link to="/sign-in" className="header__logout-link" onClick={props.onLogOut}>Выйти</Link>
                    </>
                )}
                <Route path="/sign-in">
                    <Link to="/sign-up" className="header__link">
                        Регистрация
                    </Link>
                </Route>
                <Route path="/sign-up">
                    <Link to="/sign-in" className="header__link">
                        Войти
                    </Link>
                </Route>
            </div>
        </header>
    )
}

export default Header;