/* При нажатии на EditButton открывается Popup  */
const popupNode = document.querySelector('.popup');
const editButtonNode = document.querySelector('.profile__edit-button');

editButtonNode.addEventListener('click', handlerEditButtonClick);

function handlerEditButtonClick () {
    popupNode.classList.add('popup__visible');
}


/* При нажатии на CloseButton закрывается Popup */
const closeButtonNode = document.querySelector('.popup__close-button');

closeButtonNode.addEventListener('click', handlerCloseButtonClick);

function handlerCloseButtonClick () {
    popupNode.classList.remove('popup__visible');
}


/* При нажатии кнопки "Сохранить" в Popup, имя и профессия сохраняются на главной странице */
const infoNameNode = document.querySelector('.profile__name');
const infoProfessionNode = document.querySelector('.profile__info_profession')
const inputNameNode = document.querySelector('.popup__information_input_name');
const inputProfessionNode = document.querySelector('.popup__information_input_profession')
const saveButtonNode = document.querySelector('.popup__information_input_save-button');

saveButtonNode.addEventListener('click', handlerSaveButtonNode);

function handlerSaveButtonNode () {
    if (inputNameNode.value != ('') && inputProfessionNode.value !=('')) {
    infoNameNode.textContent = inputNameNode.value;
    infoProfessionNode.textContent = inputProfessionNode.value;
    popupNode.classList.remove('popup__visible');
    inputNameNode.value = ('');
    inputProfessionNode.value = ('');
    } else if (inputNameNode.value != ('') && inputProfessionNode.value == ('')) {
        infoNameNode.textContent = inputNameNode.value;
        popupNode.classList.remove('popup__visible');
        inputNameNode.value = ('');
        inputProfessionNode.value = ('');
    } else if (inputNameNode.value == ('') && inputProfessionNode.value != ('')) {
        infoProfessionNode.textContent = inputProfessionNode.value;
        popupNode.classList.remove('popup__visible');
        inputNameNode.value = ('');
        inputProfessionNode.value = ('');
    } else {
        popupNode.classList.remove('popup__visible');
        inputNameNode.value = ('');
        inputProfessionNode.value = ('');
    }
}


/* При нажатии лайка, он меняет цвет с прозрачного на черный и обратно. Понял как сделать только для первой карточки. Как сделать 
для остальных... есть мысли, например с помощью присвоения уникального ID каждому классу element__like. Но написать этот цикл, пока, 
не хватает знаний. В интернете ничего путного не нашел */
const likeNode = document.querySelector('.element__like');

likeNode.addEventListener('click', handlerLikeClick);

function handlerLikeClick () {
    likeNode.classList.toggle('element__like-active');
}
