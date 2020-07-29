import { Card } from './Card.js'

import { popup, openPopup, closePopupByEsc, imagePopup, elementsPopup, closePopup, saveBtn, openFirstPopup, savePopup } from './Utils.js'

import { FormValidator, validationConfig } from './FormValidator.js'

const editBtn = document.querySelector('.profile__edit-button');
const closeBtn = document.querySelector('.popup__close-button');
const cardsContainer = document.querySelector('.elements');
const addBtn = document.querySelector('.profile__add-button');
const closeElementsBtn = elementsPopup.querySelector('.popup__close-elements-button');
const mestoInput = elementsPopup.querySelector('.popup__mesto');
const linkInput = elementsPopup.querySelector('.popup__link');
const popupSave = popup.querySelector('.popup__container');
const elementsPopupSave = elementsPopup.querySelector('.elements__popup-container');
const imagePopupCloseBtn = imagePopup.querySelector('.image-popup__close-button');

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

editBtn.addEventListener("click", openFirstPopup)

closeBtn.addEventListener('click', () => closePopup(popup));

popupSave.addEventListener('submit', savePopup)

addBtn.addEventListener('click', () => openPopup(elementsPopup));

addBtn.addEventListener('click', () => {
  elementsPopupSave.reset();
});

closeElementsBtn.addEventListener('click', () => closePopup(elementsPopup));

function render(item) {
  const card = new Card(item);
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
}

const saveElementsPopup = (event) => {
  event.preventDefault();
  const cardItem = {
    name: mestoInput.value,
    link: linkInput.value
  };
  render(cardItem);
  closePopup(elementsPopup);
};

elementsPopupSave.addEventListener('submit', saveElementsPopup)

imagePopupCloseBtn.addEventListener('click', () => closePopup(imagePopup));

popup.addEventListener("click", function(event) {
  if (event.target == this) {
    closePopup(popup)
  }
});

elementsPopup.addEventListener("click", function(event) {
  if (event.target == this) {
    closePopup(elementsPopup)
  }
});

imagePopup.addEventListener("click", function(event) {
  if (event.target == this) {
    closePopup(imagePopup)
  }
});

initialCards.forEach((item) => {
  const card = new Card(item);
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
});
