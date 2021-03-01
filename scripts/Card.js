export default class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._cardSelector = cardSelector;
        this._name = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
        this._alt = data.alt;
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

    _setListeners() {
        this._element.querySelector('.element__button-remove').addEventListener('click', () => {
            this._handleRemoveCard();
        });

        this._element.querySelector('.element__button-like').addEventListener('click', () => {
            this._handleLikeClick();
        });

        this._element.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
          });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setListeners();
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__image').alt = this._alt;
        this._element.querySelector('.element__name').textContent = this._name;

        return this._element;
    }
}