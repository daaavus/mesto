import Card from '../scripts/Card.js';
import { popup, imagePopup, elementsPopup, profileJob, profileName, nameInput, jobInput, imagePopupImage, imagePopupCaption, setValidityForm, validationConfig } from '../scripts/Utils.js';
import { FormValidator } from '../scripts/FormValidator.js'
import PopupWithImage from '../scripts/PopupWithImage.js'
import '../pages/index.css';
import Section from '../scripts/Section.js'
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';

const editBtn = document.querySelector('.profile__edit-button');
const cardsContainer = document.querySelector('.elements');
const mestoInput = elementsPopup.querySelector('.popup__mesto');
const addBtn = document.querySelector('.profile__add-button')
const linkInput = elementsPopup.querySelector('.popup__link');
const elementsPopupSave = elementsPopup.querySelector('.elements__popup-container');
const validationFormSelector = document.querySelector('.popup__container');
const imageValidationFormSelector = document.querySelector('.elements__popup-container');
const userInfo = new UserInfo({profileName, profileJob});
const formAddValidation = new FormValidator(validationConfig, validationFormSelector);
const formImageAddValidation = new FormValidator(validationConfig, imageValidationFormSelector);

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


function render(item) {
  const card = new Card(item, '#card-template', () => {
    const popupWithImage = new PopupWithImage(imagePopup, item)
    popupWithImage.open(item, imagePopupImage, imagePopupCaption)
    popupWithImage.setEventListeners()
  });
  const cardElement = card.generateCard();
  cardList.addItem(cardElement)
  }

function handleEditClick () {
  popupWithFormProfile.open();
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.info;
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    render(item)
  }
  },
cardsContainer
)

cardList.renderItems()

const popupWithFormProfile = new PopupWithForm(popup, {
  handleFormSubmit: () => {
    userInfo.setUserInfo(nameInput, jobInput);
    popupWithFormProfile.close();
  }
})

popupWithFormProfile.setEventListeners()

const popupWithFormCards = new PopupWithForm(elementsPopup, {
  handleFormSubmit: () => {
    const cardItem = {
      name: mestoInput.value,
      link: linkInput.value
    };
    render(cardItem);
  }
})

popupWithFormCards.setEventListeners()

formAddValidation.enableValidation();

formImageAddValidation.enableValidation();

addBtn.addEventListener('click', () => {
  popupWithFormCards.open()
})

addBtn.addEventListener('click', setValidityForm);

addBtn.addEventListener('click', () => {
  elementsPopupSave.reset();
});

editBtn.addEventListener('click', handleEditClick);
