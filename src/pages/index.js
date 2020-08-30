import Card from '../scripts/Card.js';
import { popup, imagePopup, elementsPopup, profileJob, profileName, nameInput, jobInput, imagePopupImage,
  imagePopupCaption, setValidityForm, validationConfig, avatarImg, avatarPopup, deletePopup, saveBtn } from '../scripts/Utils.js';
import { FormValidator } from '../scripts/FormValidator.js'
import PopupWithImage from '../scripts/PopupWithImage.js'
import '../pages/index.css';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';
import Api from '../scripts/Api.js'
import Section from '../scripts/Section.js';
import PopupDeleteCard from '../scripts/PopupDeleteCard.js';
import AvatarPopup from '../scripts/AvatarPopup.js'

const avatarInput = document.querySelector('.popup__avatar-link')
const avatarPopupOpenImage = document.querySelector('.profile__avatar-container');
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
const popupWithImage = new PopupWithImage(imagePopup)
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: '9dc23caf-3e9f-4f59-bf1d-09412a94602c'
  }
})

const renderLoading = (isLoading) => {
  if(isLoading) {
    saveBtn.textContent = 'Сохранение...'

  } else {

  }
}

const changeAvatarPopup = new AvatarPopup(avatarPopup, {
  handleFormSubmit: () => {
    renderLoading(true)
    avatarImg.src = avatarInput.value;
    api.updateAvatar(avatarInput)
      .finally(() => {renderLoading(false)})
  }
})
changeAvatarPopup.setEventListeners()

avatarPopupOpenImage.addEventListener('click', () => {changeAvatarPopup.open()})

const deleteCardPopup = new PopupDeleteCard(deletePopup, {
  handleFormSubmit: () => {
    avatarImg.src = avatarInput.value;
    api.updateAvatar(avatarInput)
  }
})
deleteCardPopup.setEventListeners()

function handleEditClick () {
  popupWithFormProfile.open();
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.info;
}

const popupWithFormProfile = new PopupWithForm(popup, {
  handleFormSubmit: () => {
    renderLoading(true)
    userInfo.setUserInfo(nameInput, jobInput);
    api.updateProfileInfo(nameInput, jobInput);
    popupWithFormProfile.close();
    renderLoading(false)
  }
})

Promise.all([
  api.getProfileInfo(),
  api.getInitialCards()
])
  .then(
    json => {
      const [profileInfo, cards] = json;
      avatarImg.src = profileInfo.avatar;
      profileName.textContent = profileInfo.name;
      profileJob.textContent = profileInfo.about;
      const cardList = new Section({
        items: cards,
        renderer: (item) => {
          render(item)
        }
      }, cardsContainer)

      const render = (item) => {
        const card = new Card({
          data: item,
          myID: profileInfo._id,
          handleCardClick: () => {
            popupWithImage.open(item, imagePopupImage, imagePopupCaption)
          },
          handleLikeClick: (event) => {
            if(event.target.classList.contains('element__heart_active')) {
              api.deleteLike(item._id)
                .then(() => {card.likeCard()})
                .then(() => {card.removeLike(item)})
                .catch(err => {`Что-то пошло не так ヾ(。＞＜)シ${console.log(err)}`})
            } else {
              api.likeCard(item._id)
              .then(() => {card.likeCard()})
              .then(() => {card.addLike(item)})
              .catch(err => {`Что-то пошло не так ヾ(。＞＜)シ${console.log(err)}`})
            }
          },
          handleTrashClick: () => {
            deleteCardPopup.open()
            deleteCardPopup.setSubmitHandler = () => {
              api.deleteCard(item._id)
                .then(() => {
                  card.removeCard()
                  deleteCardPopup.close()
                })
                .catch(err => {`Что-то пошло не так ヾ(。＞＜)シ${console.log(err)}`})
            }
          }
        },
        '#card-template')
        cardList.addItem(card.generateCard())
      }
      cardList.renderItems()

      const popupWithFormCards = new PopupWithForm(elementsPopup, {
        handleFormSubmit: () => {
          renderLoading(true)
          api.addCard(mestoInput, linkInput)
          .then((item) => {
            render(item);
          })
          .catch(err => {`Что-то пошло не так ヾ(。＞＜)シ${console.log(err)}`})
          .finally(() => {renderLoading(false)})
        }
      })
      popupWithFormCards.setEventListeners()
      addBtn.addEventListener('click', () => {
        popupWithFormCards.open()
      })

      popupWithImage.setEventListeners()
      popupWithFormProfile.setEventListeners()

      formAddValidation.enableValidation();
      formImageAddValidation.enableValidation();


      addBtn.addEventListener('click', setValidityForm);
      addBtn.addEventListener('click', () => {
        elementsPopupSave.reset();
      });
      editBtn.addEventListener('click', handleEditClick);
    })
