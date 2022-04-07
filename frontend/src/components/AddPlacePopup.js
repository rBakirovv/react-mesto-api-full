import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup(props) {

    const cardName = React.useRef();
    const cardLink = React.useRef();

    React.useEffect(() => {

        cardName.current.value = '';
        cardLink.current.value = '';
    }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: cardName.current.value,
            link: cardLink.current.value,
        });
    }

    return (
        <PopupWithForm
            name='add'
            title='Новое место'
            buttonText='Создать'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            children={
                <>
                    <input className="popup__field popup__field-mesto" id="popup__field-mesto" name="name" type="text"
                        placeholder="Название" required minLength="2" maxLength="30" ref={cardName} />
                    <span id="popup__field-mesto-error" className="popup__error"></span>
                    <input className="popup__field popup__field-link-mesto" id="popup__field-link-mesto" name="link" type="url"
                        placeholder="Ссылка на картинку" required ref={cardLink} />
                    <span id="popup__field-link-mesto-error" className="popup__error"></span>
                </>
            }
        />
    )
};