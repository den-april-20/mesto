//Нахождение переменных для редактирования профиля
const buttonEditProfile = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup');
const profilePopupAll = document.querySelectorAll('.popup');
const buttonCloseProfile = document.querySelector('.popup__button-close');
const profileForm = document.querySelector('.form');
const nameInput = profileForm.querySelector('.form__input_profile_name');
const jobInput = profileForm.querySelector('.form__input_profile_profession');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__profession');
const formButtonSubmit = profileForm.querySelector('.form__button-submit');

//Функция закрытия любого попапа
function closePopup(popup) {
    const popupClose = document.querySelector('.popup_opened');
    popupClose.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
}

function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
      closePopup();
    }
  }

profilePopupAll.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup);
    }
    if (evt.target.classList.contains('popup__button-close')) {
        closePopup(popup)
    }
    })
})

//Функция открытия любого попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
}

//Функция открытия формы, редактирующий профиль
function openProfilePopup() {
    openPopup(profilePopup);
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    disableValidation(profileForm, validationConfig);
    setButtonState(formButtonSubmit, profileForm.checkValidity(), validationConfig);
}

buttonEditProfile.addEventListener('click', openProfilePopup);

//Функция зактрытия формы, редактирующий профиль
function closeProfilePopup() {
    closePopup(profilePopup);
}

buttonCloseProfile.addEventListener('click', closeProfilePopup);

//Функия, меняющая значения профиля
function handleProfileSubmit(evt) {
    evt.preventDefault();
    
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;

    closeProfilePopup();
}

profileForm.addEventListener('submit', handleProfileSubmit);

//Нахождение переменных формы для добавления карточек
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonClosePopupAddCard = document.querySelector('.popup__button-close_place_addcards');
const popupAddCard = document.querySelector('.popup_place_addcards');
const inputCardName = document.querySelector('.form__input_card_image-name');
const inputCardImage = document.querySelector('.form__input_card_image-link');

//Функция открытия формы добавления карточек
function openPopupAddCard() {
    openPopup(popupAddCard);
    reset();
    disableValidation(imageForm, validationConfig);
};

function reset() {
    newElementName.value = '';
    newElementPhoto.value = '';
}

buttonAddCard.addEventListener('click', openPopupAddCard);

//Функция закрытия формы добавления карточек
function closePopupAddCard() {
    inputCardName.value = '';
    inputCardImage.value = '';
    closePopup(popupAddCard);
}

buttonClosePopupAddCard.addEventListener('click', closePopupAddCard);

//Нахождение переменных для добавления начальных и новых карточек
const listItems = document.querySelector('.elements__items');
const templateElement = document.querySelector('.template');
const formAddCard = document.querySelector('.popup_place_addcards');
const imageForm = formAddCard.querySelector('.form');
const newElementName = document.querySelector('.form__input_card_image-name');
const newElementPhoto = document.querySelector('.form__input_card_image-link');
//Переменные для попапа с увеличением картинки
const popupPhoto = document.querySelector('.popup_place_image');
const buttonClosePopupPhoto = document.querySelector('.popup__button-close_place_image');
const textPopup = popupPhoto.querySelector('.popup__name');
const imagePopup = popupPhoto.querySelector('.popup__image');

//Функция для лайка картинки
function handleLikeClick(event) {
    const eventTarget =event.target;
    eventTarget.classList.toggle('element__button-like_active');
}

//Функия для удаления картинки
function handleRemoveCard(event) {
    const eventTarget = event.target;
    const targetElement = eventTarget.closest('.element');
    targetElement.remove();
}

//Функция открытия попапа с увеличенной фотографией
function showPhoto(name, link) {

    textPopup.textContent = name;
    imagePopup.src = link;
    imagePopup.alt = `Фотография ${textPopup}`;

    popupPhoto.classList.add('overlay');
    openPopup(popupPhoto);
} 

//Функция закрытия попапа с увеличенной фотографией
function closePopupPhoto() {
    popupPhoto.classList.remove('overlay');
    closePopup(popupPhoto);
}

buttonClosePopupPhoto.addEventListener('click', closePopupPhoto);

//Функция создания начальных карточек
function createCard({name, link}) {
    const newElement = templateElement.content.cloneNode(true);
    const nameCard = newElement.querySelector('.element__name');
    const imageCard = newElement.querySelector('.element__image');
    const buttonLike = newElement.querySelector('.element__button-like');
    const buttonRemove = newElement.querySelector('.element__button-remove');

    nameCard.textContent = name;
    imageCard.src = link;
    imageCard.alt = `Фотография ${name}`;

    buttonLike.addEventListener('click',  handleLikeClick);
    buttonRemove.addEventListener('click', handleRemoveCard);
    imageCard.addEventListener('click', () => {
        showPhoto(nameCard.textContent, imageCard.src);
    });
    return newElement;
}

//Функция добавления начальных карточек
function renderCards() {
    const newCards = initialCards.map(createCard);
    listItems.append(...newCards);
}

renderCards();

//Функция создания новых карточек
function handleCardSubmit(evt) {
    evt.preventDefault();

    const newCart = createCard({name: newElementName.value, link: newElementPhoto.value});

    listItems.prepend(newCart);

    closePopupAddCard();
}

formAddCard.addEventListener('submit', handleCardSubmit);