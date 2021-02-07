const showInputError = (profileForm, inputElement, config) => {
    const error = profileForm.querySelector(`#${inputElement.id}-error`);
    error.textContent = inputElement.validationMessage;
    error.classList.add(config.errorClass);
    inputElement.classList.add(config.inputErrorClass);
};

const hideInputError = (profileForm, inputElement, config) => {
    const error = profileForm.querySelector(`#${inputElement.id}-error`);
    error.textContent = '';
    inputElement.classList.remove(config.errorClass);
    inputElement.classList.remove(config.inputErrorClass);
};

const disableValidation = (form, config) => {
    const inputsList = form.querySelectorAll(config.inputSelector);
    inputsList.forEach((inputElement) => {
        hideInputError(form, inputElement, config);
    });
};

const checkInputValidity = (profileForm, inputElement, config) => {
    if (!inputElement.validity.valid) {
      showInputError(profileForm, inputElement, config);
    } else {
      hideInputError(profileForm, inputElement, config);
    }
  };

const setButtonState = (button, formValid, config) => {
  if (formValid) {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
  } else {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
  }
};

function setEventListeners(profileForm, config) {
    const inputsList = profileForm.querySelectorAll(config.inputSelector);
    const submitButton = profileForm.querySelector(config.submitButtonSelector);
  
    inputsList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(profileForm, inputElement, config);
        setButtonState(submitButton, profileForm.checkValidity(), config);
      });
    });
  };

function enableValidation(config) {
  const formsElement = document.querySelectorAll(config.formSelector);
  formsElement.forEach((profileForm) => {
    setEventListeners(profileForm, config);
    profileForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    const submitButton = profileForm.querySelector(config.submitButtonSelector);
    setButtonState(submitButton, profileForm.checkValidity(), config)
  });
};

const validationConfig = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button-submit',
    inactiveButtonClass: 'form__button_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__error_visible'
  };
  
  enableValidation(validationConfig);