export default class FormValidator {
    constructor(config, form) {
        this._config = config;
        this._form = form;
    }

    _showInputError(inputElement) {
        const error = this._form.querySelector(`#${inputElement.id}-error`);
        error.textContent = inputElement.validationMessage;
        error.classList.add(this._config.errorClass);
        inputElement.classList.add(this._config.inputErrorClass);
    }

    _hideInputError(inputElement) {
        const error = this._form.querySelector(`#${inputElement.id}-error`);
        error.textContent = '';
        inputElement.classList.remove(this._config.errorClass);
        inputElement.classList.remove(this._config.inputErrorClass);
    }

    _disableValidation() {
        this._inputsList.forEach((inputElement) => {
            this._hideInputError(inputElement)
        });
    }

    _checkInputValidity(inputElement) {
        if(!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _setButtonState(formValid) {
        if (formValid) {
            this._button.classList.remove(this._config.inactiveButtonClass);
            this._button.disabled = false
        } else {
            this._button.classList.add(this._config.inactiveButtonClass);
            this._button.disabled = true;
        }
    }

    _setEventListeners() {
        this._inputsList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
        this._button = this._form.querySelector(this._config.submitButtonSelector);

        this._inputsList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._setButtonState(this._form.checkValidity())
            });
        });
    }

    quickValidationCheck() {
        this._disableValidation()
        this._setButtonState(this._form.checkValidity())
    }

    enableValidation() {
        this._setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
    }
}

export const validationConfig = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button-submit',
    inactiveButtonClass: 'form__button_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__error_visible'
  };