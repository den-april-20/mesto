//нахождение переменных для редактирования профиля
const buttonEditProfile = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup');
const buttonCloseProfile = document.querySelector('.popup__button-close');
const profileForm = document.querySelector('.form');
const nameInput = profileForm.querySelector('.form__input_profile_name');
const jobInput = profileForm.querySelector('.form__input_profile_profession');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__profession');

//функция открытия любого попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

//функция закрытия любого попапа
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

//функция открытия формы, редактирующий профиль
function openProfilePopup() {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    openPopup(profilePopup);
}

buttonEditProfile.addEventListener('click', openProfilePopup);

//функция зактрытия формы, редактирующий профиль
function closeProfilePopup() {
    closePopup(profilePopup);
}

buttonCloseProfile.addEventListener('click', closeProfilePopup);

//функия, меняющая значения профиля
function handleProfileSubmit(evt) {
    evt.preventDefault();
    
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;

    closeProfilePopup();
}

profileForm.addEventListener('submit', handleProfileSubmit);

//нахождение переменных формы для добавления карточек
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonClosePopupAddCard = document.querySelector('.popup__button-close_place_addcards');
const popupAddCard = document.querySelector('.popup_place_addcards');
const inputCardName = document.querySelector('.form__input_card_image-name');
const inputCardImage = document.querySelector('.form__input_card_image-link');

//функция открытия формы добавления карточек
function openPopupAddCard() {
    openPopup(popupAddCard);
}

buttonAddCard.addEventListener('click', openPopupAddCard);

//функция закрытия формы добавления карточек
function closePopupAddCard() {
    inputCardName.value = '';
    inputCardImage.value = '';
    closePopup(popupAddCard);
}

buttonClosePopupAddCard.addEventListener('click', closePopupAddCard);

//нахождение переменных для добавления начальных и новых карточек
const listItems = document.querySelector('.elements__items');
const templateElement = document.querySelector('.template');
const formAddCard = document.querySelector('.popup_place_addcards');
const newElementName = document.querySelector('.form__input_card_image-name');
const newElementPhoto = document.querySelector('.form__input_card_image-link');
//переменные для попапа с увеличением картинки
const popupPhoto = document.querySelector('.popup_place_image');
const buttonClosePopupPhoto = document.querySelector('.popup__button-close_place_image');
const textPopup = popupPhoto.querySelector('.popup__name');
const imagePopup = popupPhoto.querySelector('.popup__image');

//функция для лайка картинки
function handleLikeClick(event) {
    const eventTarget =event.target;
    eventTarget.classList.toggle('element__button-like_active');
}

//функия для удаления картинки
function handleRemoveCard(event) {
    const eventTarget = event.target;
    const targetElement = eventTarget.closest('.element');
    targetElement.remove();
}

//функция открытия попапа с увеличенной фотографией
function showPhoto(name, link) {

    textPopup.textContent = name;
    imagePopup.src = link;
    imagePopup.alt = `Фотография ${textPopup}`;

    popupPhoto.classList.add('overlay');
    openPopup(popupPhoto);
} 

//функция закрытия попапа с увеличенной фотографией
function closePopupPhoto() {
    popupPhoto.classList.remove('overlay');
    closePopup(popupPhoto);
}

buttonClosePopupPhoto.addEventListener('click', closePopupPhoto);

//функия создания начальных карточек
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

//функция добавления начальных карточек
function renderCards() {
    const newCards = initialCards.map(createCard);
    listItems.append(...newCards);
}

renderCards();

//функция создания новых карточек
function handleCardSubmit(evt) {
    evt.preventDefault();

    const newCart = createCard({name: newElementName.value, link: newElementPhoto.value});

    listItems.prepend(newCart);

    closePopupAddCard();
}

formAddCard.addEventListener('submit', handleCardSubmit);