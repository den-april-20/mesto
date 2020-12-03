let profileEditButtonNode = document.querySelector('.profile__edit-button');
let popupNode = document.querySelector('.popup');
let popupCloseButtonNode = document.querySelector('.popup__close-button');
let profileNameNode = document.querySelector('.profile__name');
let profileProfessionNameNode = document.querySelector('.profile__profession');
let popupNameNode = document.querySelector('.popup__input_position_top');
let popupProfessionNode = document.querySelector('.popup__input_position_bottom');
let popupWindow = document.querySelector('.popup__window')



/* При нажатии кнопки EditButton появляется Popup. Также имя и профессия из профиля копируются в поля для ввода в Popup. */
function handlerProfileEditButtonClick () {
    popupNode.classList.add('popup_visible');
    popupNameNode.value = profileNameNode.textContent;
    popupProfessionNode.value = profileProfessionNameNode.textContent;
}

/* При нажатии кнопки CloseButton закрывается Popup */
function handlerPopupCloseButtonClick () {
    popupNode.classList.remove('popup_visible');
}

/* При нажатии в Popoup кнопку Сохранить, введенные нами имя и профессия будут отправлены в профиль */
function handlerWindowSubmit (event) {
    event.preventDefault();
    profileNameNode.textContent = popupNameNode.value;
    profileProfessionNameNode.textContent = popupProfessionNode.value;
    handlerPopupCloseButtonClick();
}

profileEditButtonNode.addEventListener('click', handlerProfileEditButtonClick);
popupCloseButtonNode.addEventListener('click', handlerPopupCloseButtonClick);
popupWindow.addEventListener('submit', handlerWindowSubmit);