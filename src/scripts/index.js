import Card from './Card.js';

import { popup, imagePopup, elementsPopup, setValidityForm, profileJob, profileName, nameInput, jobInput } from './Utils.js';

import { validationConfig, FormValidator } from './FormValidator.js'

import PopupWithImage from './PopupWithImage.js'

import '../pages/index.css';

import Section from './Section.js'

import Popup from './Popup.js';

import PopupWithForm from './PopupWithForm.js';

import UserInfo from './UserInfo.js';
import { name } from 'file-loader';

const editBtn = document.querySelector('.profile__edit-button');
const closeBtn = document.querySelector('.popup__close-button');
const cardsContainer = document.querySelector('.elements');
const closeElementsBtn = elementsPopup.querySelector('.popup__close-elements-button');
const mestoInput = elementsPopup.querySelector('.popup__mesto');
const addBtn = document.querySelector('.profile__add-button')
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

addBtn.addEventListener('click', setValidityForm);

addBtn.addEventListener('click', () => {
  elementsPopupSave.reset();
});

function render(item) {
  const card = new Card(item, '#card-template');
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
  //тут должен закрываться второй попап;
};

elementsPopupSave.addEventListener('submit', saveElementsPopup)

const validationFormSelector = document.querySelector('.popup__container')
const imageValidationFormSelector = document.querySelector('.elements__popup-container')

const formAddValidation = new FormValidator(validationConfig, validationFormSelector)
formAddValidation.enableValidation()

const formImageAddValidation = new FormValidator(validationConfig, imageValidationFormSelector)
formImageAddValidation.enableValidation()

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#card-template', () => {
      const popupWithImage = new PopupWithImage(imagePopup, item)
      popupWithImage.open(item)
      popupWithImage.setEventListeners()
    });
    const cardElement = card.generateCard();
    cardList.addItem(cardElement)
    }
  },
cardsContainer
)

cardList.renderItems()

const userInfo = new UserInfo({profileName, profileJob})

export const popupWithFormProfile = new PopupWithForm(popup, {
  handleFormSubmit: () => {
    userInfo.setUserInfo(nameInput, jobInput);
    popupWithFormProfile.close();
  }
})

popupWithFormProfile.setEventListeners()

function handleEditClick () {
  popupWithFormProfile.open();
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.info;
}

editBtn.addEventListener('click', handleEditClick)

const popupWithFormCards = new PopupWithForm(elementsPopup, {
  handleFormSubmit: () => {

  }
})

popupWithFormCards.setEventListeners()

addBtn.addEventListener('click', () => {
  popupWithFormCards.open()
})
