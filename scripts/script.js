let profileEditButtonNode = document.querySelector('.profile__edit-button');
let popupNode = document.querySelector('.popup');
let popupCloseButtonNode = document.querySelector('.popup__close-button');
let profileNameNode = document.querySelector('.profile__name');
let profileProfessionNameNode = document.querySelector('.profile__profession');
let popupNameNode = document.querySelector('.popup__input_position_top');
let popupProfessionNode = document.querySelector('.popup__input_position_bottom');
let popupWindow = document.querySelector('.popup__window');
let popupPlaceNode = document.querySelector('.popup-place');
let popupPlaceCloseButtonNode = document.querySelector('.popup-place__close-button');
let profileAddButtonNode = document.querySelector('.profile__add-button');
let popupPlaceName = document.querySelector('.popup-place__input_position_top');
let popupPlaceSrc = document.querySelector('.popup-place__input_position_bottom');
let popupPlaceSaveButton = document.querySelector('.popup-place__save-button');
let popupPlaceWindow = document.querySelector('.popup-place__window');
let removeButton = document.querySelector('.element__remove');
let popupGalleryCloseButton = document.querySelector('.popup-gallery__close-button');
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
]; 
const listContainerElement = document.querySelector('.elements');


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

/* При нажатии кнопки AddButton появляется Popup-place. Также имя и профессия из профиля копируются в поля для ввода в Popup-place. */
function handlerProfileAddButtonClick () {
    popupPlaceNode.classList.add('popup-place_visible');
    popupNameNode.value = profileNameNode.textContent;
    popupProfessionNode.value = profileProfessionNameNode.textContent;
}

/* При нажатии кнопки CloseButton закрывается Popup-place */
function handlerPopupPlaceCloseButtonClick () {
    popupPlaceNode.classList.remove('popup-place_visible');
}

/* Создаем массив для elements. */
function renderList(){
    const listElements = initialCards.map(composeElement);
    listContainerElement.append(...listElements);
}

/* Шаблон одного элемента для секции elements.*/
function composeElement(item){
    const elementItem = document.createElement('article')
    elementItem.classList.add('element')
    const elementImage = document.createElement('img')
    elementImage.classList.add('element__image')
    elementImage.setAttribute('src', item.link)
    const elementRemove = document.createElement('button')
    elementRemove.classList.add('element__remove')
    const elementRow = document.createElement('div')
    elementRow.classList.add('element__row')
    const elementNameItem = document.createElement('h2')
    elementNameItem.classList.add('element__name')
    elementNameItem.textContent = item.name;
    const elementLike = document.createElement('button')
    elementLike.classList.add('element__like')

    elementRow.append(elementNameItem, elementLike)
    elementItem.append(elementImage, elementRemove, elementRow)

    elementRemove.addEventListener('click', removeElement);
    elementLike.addEventListener('click', likeElement);

    let popupGallery = document.querySelector('.popup-gallery');

/* Функция открываетс popup-gallery при нажатии на картинку. */
function popupGalleryVisible() {
     popupGallery.classList.add('popup-gallery_visible');
}

function popupGalleryImageSrc(e) {
    let imageGetSrc = e.target.closest('.element__image').getAttribute('src');
    console.log(imageGetSrc);
    let imageSetSrc = document.querySelector('.popup-gallery__image');
    console.log(imageSetSrc);
    imageSetSrc.setAttribute('src', imageGetSrc);
}

/* Функция закрывает popup-gallery при нажатии на close-button. */
function popupGalleryClose() {
    popupGallery.classList.remove('popup-gallery_visible');
}
        
    elementImage.addEventListener('click', popupGalleryVisible);
    elementImage.addEventListener('click', popupGalleryImageSrc);
    popupGalleryCloseButton.addEventListener('click', popupGalleryClose,);

    return elementItem
}

/* Функция удаляет конкретный элемент. */
function removeElement(e){
    const targetItem = e.target.closest('.element');
    targetItem.remove();
}

/* Функция ставит и снимает лайк. */
function likeElement(event){
    const targetLike = event.target.closest('.element__like');
    targetLike.classList.toggle('element__like_active');
}

/* При нажатии кнопки Сохранить в Popup-place, добавляется новый element в elements. */
function bindAddElementListener() {
    popupPlaceWindow.addEventListener('submit', (evt) => {
        evt.preventDefault();
        addNewElement();
        handlerPopupPlaceCloseButtonClick();
    })
}

/* Передаем значения из Названия и Ссылки на картинку. */
function addNewElement() {
    const inputPlaceName = popupPlaceName.value;
    const inputPlaceSrc = popupPlaceSrc.value;
    const newElement = composeElement({ name: inputPlaceName, link: inputPlaceSrc })
    listContainerElement.prepend(newElement);
}

renderList();
bindAddElementListener();

profileEditButtonNode.addEventListener('click', handlerProfileEditButtonClick);
popupCloseButtonNode.addEventListener('click', handlerPopupCloseButtonClick);
popupWindow.addEventListener('submit', handlerWindowSubmit);
profileAddButtonNode.addEventListener('click', handlerProfileAddButtonClick);
popupPlaceCloseButtonNode.addEventListener('click', handlerPopupPlaceCloseButtonClick);