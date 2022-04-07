import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleInputChange(e) {
    e.target.name === 'name'
      ? setName(e.target.value)
      : setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateUser({
      name: name,
      about: description,
    });
  } 

  return (
    <PopupWithForm
      name='edit'
      title='Редактировать профиль'
      buttonText='Сохранить'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input className="popup__field popup__field-name" id="popup__field-name" name="name" type="text" required
            minLength="2" maxLength="40" placeholder="Имя" onChange={handleInputChange} value={name || " "} />
          <span id="popup__field-name-error" className="popup__error"></span>
          <input className="popup__field popup__field-status" id="popup__field-status" name="about" type="text" required
            minLength="2" maxLength="200" placeholder="О себе" onChange={handleInputChange} value={description || " "}/>
          <span id="popup__field-status-error" className="popup__error"></span>
        </>
      }
    />
  )
};

export default EditProfilePopup