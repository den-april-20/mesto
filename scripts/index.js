import { validationConfig } from './FormValidator.js';
import { initialCards } from './initialCards.js';
import FormValidator from './FormValidator.js';
import Card from './Card.js';

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddProfile = document.querySelector('.profile__add-button');
const popupPlaceAddcards = document.querySelector('.popup_place_addcards');
const profilePopup = document.querySelector('.popup');
const profilePopupAll = document.querySelectorAll('.popup');
const buttonCloseProfile = document.querySelector('.popup__button-close');
const profileForm = document.querySelector('.form');
const nameInput = profileForm.querySelector('.form__input_profile_name');
const jobInput = profileForm.querySelector('.form__input_profile_profession');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__profession');
const formButtonSubmit = profileForm.querySelector('.form__button-submit');
const formPlaceAddcards = document.querySelector('.form_place_addcards');
const elementsItems = document.querySelector('.elements__items');
const addName = document.querySelector('.form__input_card_image-name');
const addLink = document.querySelector('.form__input_card_image-link');


function createNewElementClassCard(item) {
    const addCard = new Card(item, 'template', handleCardClick);
    return addCard.generateCard();
}

function renderDefaultCard() {
    initialCards.forEach(function(item) {
        elementsItems.append(createNewElementClassCard(item));
    })
}

//Функция закрытия попапа
function closePopup() {
    const popupClose = document.querySelector('.popup_opened');
    popupClose.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
    document.removeEventListener('click', closePopupOverlay);
}

//Функция закрытия попапа по нажатию Escape
function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
      closePopup();
    }
  }

  //Фунция закрытия попапа по нажатию на оверлей
function closePopupOverlay(evt) {
        if (evt.target.classList.contains('popup_opened') || 
        evt.target.classList.contains('popup__image-close')) {
            closePopup();
        }
}

//Функция открытия любого попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
    document.addEventListener('click', closePopupOverlay);
}

const newValidClassProfileForm = new FormValidator(validationConfig, profileForm);
newValidClassProfileForm.enableValidation();

//Функция открытия формы, редактирующий профиль
function openProfilePopup() {
    openPopup(profilePopup);
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    newValidClassProfileForm.quickValidationCheck();
}


//Функия, меняющая значения профиля
function handleProfileSubmit(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup(profilePopup);
}

function handleCardClick(name, link) {
        const imagePopup = document.querySelector('.popup_place_image');
        imagePopup.querySelector('.popup__image').src = link;
        imagePopup.querySelector('.popup__name').textContent = name;
        openPopup(imagePopup);
  }

const newValidClassImgForm = new FormValidator(validationConfig, formPlaceAddcards);
newValidClassImgForm.enableValidation();

//Функция открытия формы добавления карточек
function openPopupAddCard() {
    openPopup(popupPlaceAddcards);
    formPlaceAddcards.reset();
    newValidClassImgForm.quickValidationCheck();
};

function addNewCard(elm) {
    elementsItems.prepend(elm);
}

function handlerCreateNewCard() {
    const item = {
        name: addName.value,
        link: addLink.value
    }
    addNewCard(createNewElementClassCard(item));
    closePopup();
}

profileForm.addEventListener('submit', handleProfileSubmit);
formPlaceAddcards.addEventListener('submit', () => {
    handlerCreateNewCard();
});

buttonEditProfile.addEventListener('click', openProfilePopup);
buttonAddProfile.addEventListener('click', openPopupAddCard)
buttonCloseProfile.addEventListener('click', closePopup);


renderDefaultCard();