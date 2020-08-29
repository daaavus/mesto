import Card from '../scripts/Card.js';
import { popup, imagePopup, elementsPopup, profileJob, profileName, nameInput, jobInput, imagePopupImage,
  imagePopupCaption, setValidityForm, validationConfig, avatarImg, avatarPopup, saveBtn, } from '../scripts/Utils.js';
import { FormValidator } from '../scripts/FormValidator.js'
import PopupWithImage from '../scripts/PopupWithImage.js'
import '../pages/index.css';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';
import Api from '../scripts/Api.js'
import PopupDeleteCard from '../scripts/PopupDeleteCard.js'
import Section from '../scripts/Section.js';

const editBtn = document.querySelector('.profile__edit-button');
const cardsContainer = document.querySelector('.elements');
const mestoInput = elementsPopup.querySelector('.popup__mesto');
const addBtn = document.querySelector('.profile__add-button')
const linkInput = elementsPopup.querySelector('.popup__link');
const elementsPopupSave = elementsPopup.querySelector('.elements__popup-container');
const validationFormSelector = document.querySelector('.popup__container');
const imageValidationFormSelector = document.querySelector('.elements__popup-container');
const avatarValidationFormSelector = document.querySelector('.avatar__popup-container')
const userInfo = new UserInfo({profileName, profileJob});
const formAddValidation = new FormValidator(validationConfig, validationFormSelector);
const formImageAddValidation = new FormValidator(validationConfig, imageValidationFormSelector);
const deletePopup = document.querySelector('.delete-popup')

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

const popupDeleteCard = new PopupDeleteCard(deletePopup)
popupDeleteCard.setEventListeners()
const popupWithImage = new PopupWithImage(imagePopup)
popupWithImage.setEventListeners()

const render = (item) => {
  const card = new Card({
    data: item,
    myID: "f93f5c05e813ba9459ed9d0e",
    handleCardClick: () => {
      popupWithImage.open(item, imagePopupImage, imagePopupCaption)
    },
    handleLikeClick: () => {
      const isLiked = card.isLiked()
      if(isLiked) {
        api.deleteLike(item._id)
          .then(item => card.updateLikes(item.likes))
          .then(e.target.classList.remove('element__heart_active'))
          .catch(err => {`Что-то пошло не так ヾ(。＞＜)シ${console.log(err)}`})
      } else {
        api.likeCard(item._id)
        .then(item => card.updateLikes(item.likes))
        .then(e.target.classList.add('element__heart_active'))
        .catch(err => {`Что-то пошло не так ヾ(。＞＜)シ${console.log(err)}`})
      }
    },
    handleTrashClick: () => {
      popupDeleteCard.open()
      popupDeleteCard.setSubmitHandler(() => {
        api.deleteCard(item._id)
          .then(() => {
            card.removeCard()
            popupDeleteCard.close()
          })
          .catch(err => {`Что-то пошло не так ヾ(。＞＜)シ${console.log(err)}`})
          .finally(() => renderLoading(false))
      })
    }
  })
  api.getInitialCards(render)
}

function handleEditClick () {
  popupWithFormProfile.open();
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.info;
}

const popupWithFormProfile = new PopupWithForm(popup, {
  handleFormSubmit: () => {
    userInfo.setUserInfo(nameInput, jobInput);
    api.updateProfileInfo(nameInput, jobInput);
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

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: '9dc23caf-3e9f-4f59-bf1d-09412a94602c'
  }
})

Promise.all([
  api.getInitialCards(render),
  api.getProfileInfo(avatarImg, profileName, profileJob)
])
  .then(main)
  .catch((err) => {`Что-то пошло не так ヾ(。＞＜)シ${console.log(err)}`})

const main = ([userID, cards]) => {

}
