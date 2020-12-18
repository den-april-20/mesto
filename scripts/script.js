const profileEditButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup#edit');
const popupInputPositionTopEdit = document.querySelector('.popup__input_position_top#edit_top');
const popupInputPositionBottomEdit = document.querySelector('.popup__input_position_bottom#edit_bottom');
const popupInputPositionTopAdd = document.querySelector('.popup__input_position_top#add_top');
const popupInputPositionBottomAdd = document.querySelector('.popup__input_position_bottom#add_bottom');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const popupCloseButtonEdit = document.querySelector('.popup__close-button#edit_close');
const popupAddButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup#add');
const popupCloseButtonAdd = document.querySelector('.popup__close-button#add_close');
const popupWindowEdit = document.querySelector('.popup__window#edit_window');
const popupWindowAdd = document.querySelector('.popup__window#add_window');
const elements = document.querySelector('.elements');
const popupCloseButtonGallery = document.querySelector('.popup__close-button_gallery');
const popupGallery = document.querySelector('.popup#gallery');


/* Функция открывает Edit Popup и переносит Имя и Профессию из профиля в поля Edit Popup */
function handlerProfileEditButtonClick(){
    popupEdit.classList.add('popup_visible');
    popupInputPositionTopEdit.value = profileName.textContent;
    popupInputPositionBottomEdit.value = profileProfession.textContent;
}
/* Функция сохраняет введенные в оба поля значения в профиль. */
function handlerPopupSaveButtonSubmit(event){
    event.preventDefault();
    profileName.textContent = popupInputPositionTopEdit.value;
    profileProfession.textContent = popupInputPositionBottomEdit.value;
    handlerPopupCloseButtonEditClick();
}

/* Функция закрывает Edit Popup */ 
function handlerPopupCloseButtonEditClick(){
    popupEdit.classList.remove('popup_visible');
}

/* Функция открывает Add Popup. */
function handlerAddButtonClick(){
    popupAdd.classList.add('popup_visible');
}

/* Функция закрывает Add Popup */ 
function handlerPopupCloseButtonAddClick(){
    popupAdd.classList.remove('popup_visible');
}

/* Создаем массив для elements. */
function renderList(){
    const elementsList = initialCards.map(composeElement);
    elements.append(...elementsList);
}

/* Шаблон для одного элемента для сецкии Elements. */
function composeElement(item){
    const elementItem = document.createElement('article');
    elementItem.classList.add('element');
    const elementImage = document.createElement('img');
    elementImage.classList.add('element__image');
    elementImage.setAttribute('src', item.link);
    const elementRemove = document.createElement('button');
    elementRemove.classList.add('element__remove');
    const elementRow = document.createElement('div');
    elementRow.classList.add('element__row');
    const elementNameItem = document.createElement('h2');
    elementNameItem.classList.add('element__name');
    elementNameItem.textContent = item.name; 
    const elementLike = document.createElement('button');
    elementLike.classList.add('element__like');

    elementRow.append(elementNameItem, elementLike) 
    elementItem.append(elementImage, elementRemove, elementRow) 
 
    elementRemove.addEventListener('click', removeElement); 
    elementLike.addEventListener('click', likeElement); 



    /* Функция берет значение src у element__image и отдает gallery__image. */
    function popupImageSrc(e){
        let elementImageSrc = e.target.closest('.element__image').getAttribute('src');
        let imageSetSrc = document.querySelector('.popup__image');
        imageSetSrc.setAttribute('src', elementImageSrc);
    }

    elementImage.addEventListener('click', galleryVisible); 
    elementImage.addEventListener('click', popupImageSrc); 
    popupCloseButtonGallery.addEventListener('click', handlerGalleryCloseButtonClick);

    return elementItem;
}

/* Функция открывает галлерею. */
function galleryVisible(){
    popupGallery.classList.add('popup_visible');
}

/* Функция закрывает галлерею. */
function handlerGalleryCloseButtonClick() {
    popupGallery.classList.remove('popup_visible');
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

/* При нажатии кнопки Сохранить в Add Popup, добавляется новый element в elements. */ 
function bindAddElementListener() { 
    popupWindowAdd.addEventListener('submit', (evt) => { 
        evt.preventDefault(); 
        addNewElement(); 
        handlerPopupCloseButtonAddClick(); 
    }) 
} 
 
/* Передаем значения из Названия и Ссылки на картинку. */ 
function addNewElement() { 
    const newElement = composeElement({ name: popupInputPositionTopAdd.value, link: popupInputPositionBottomAdd.value }) 
    elements.prepend(newElement); 
} 

    renderList(); 
    bindAddElementListener();

profileEditButton.addEventListener('click', handlerProfileEditButtonClick);
popupCloseButtonEdit.addEventListener('click', handlerPopupCloseButtonEditClick);
popupAddButton.addEventListener('click', handlerAddButtonClick);
popupCloseButtonAdd.addEventListener('click', handlerPopupCloseButtonAddClick);
popupWindowEdit.addEventListener('submit', handlerPopupSaveButtonSubmit);