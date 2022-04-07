import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup(props) {

    const userAvatar = React.useRef();

    React.useEffect(() => {
        
        userAvatar.current.value = '';
    }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: userAvatar.current.value,
        });
    }

    return (
        <PopupWithForm
            name='avatar'
            title='Обновить аватар'
            buttonText='Сохранить'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            children={
                <>
                    <input className="popup__field popup__field-link-avatar" id="popup__field-link-avatar" name="avatar" type="url"
                        placeholder="Ссылка на картинку" required ref={userAvatar} />
                    <span id="popup__field-link-avatar-error" className="popup__error"></span>
                </>
            }
        />
    )
};