export default class Card {
    constructor(data, cardSelector, openPopup) {
        this._cardSelector = cardSelector;
        this._name = data.name;
        this._link = data.link;
        this._openPopup = openPopup;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);

        return cardElement;
    }

    _handleRemoveCard() {
        this._element.closest('.element').remove();
    }

    _handleLikeClick() {
        this._element.querySelector('.element__button-like').classList.toggle('element__button-like_active');
    }

    _showPhoto() {
        const imagePopup = document.querySelector('.popup_place_image');
        imagePopup.querySelector('.popup__image').src = this._link;
        imagePopup.querySelector('.popup__name').textContent = this._name;
        this._openPopup(imagePopup);
    }

    _setListeners() {
        this._element.querySelector('.element__button-remove').addEventListener('click', () => {
            this._handleRemoveCard();
        });

        this._element.querySelector('.element__button-like').addEventListener('click', () => {
            this._handleLikeClick();
        });

        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._showPhoto();
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setListeners();
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__name').textContent = this._name;

        return this._element;
    }
}