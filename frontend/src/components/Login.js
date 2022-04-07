import React, { useState } from 'react';

export default function Login({handleAuthorization}) {

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleAuthorization(data);
  };

  return (
    <form className="auth__form" onSubmit={handleSubmit}>
      <h2 className="auth__title">Вход</h2>
      <input
        className="auth__input"
        placeholder="Email"
        type="email"
        name="email"
        onChange={handleChange}>
      </input>
      <input
        className="auth__input"
        placeholder="Пароль"
        type="password"
        name="password"
        onChange={handleChange}>
      </input>
      <button type="submit" className="auth__submit-button">Войти</button>
    </form>
  )
}