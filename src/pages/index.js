import Card from '../components/Card.js';
import { popup, imagePopup, elementsPopup, profileJob, profileName, nameInput,
        jobInput,imagePopupImage, imagePopupCaption, avatarImg,avatarPopup,
        deletePopup, cardTemplate, avatarInput, avatarPopupOpenImage,editBtn,
        cardsContainer, mestoInput, addBtn, linkInput, elementsPopupSave,
        validationFormSelector, imageValidationFormSelector,
} from '../utils/constants.js';

import { setValidityForm, renderLoading, validationConfig } from '../utils/Utils.js'

import { FormValidator } from '../components/FormValidator.js'
import PopupWithImage from '../components/PopupWithImage.js'
import '../pages/index.css';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js'
import Section from '../components/Section.js';
import PopupDeleteCard from '../components/PopupDeleteCard.js';
import AvatarPopup from '../components/AvatarPopup.js'

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

const changeAvatarPopup = new AvatarPopup(avatarPopup, {
  handleFormSubmit: () => {
    renderLoading(true)
    avatarImg.src = avatarInput.value;
    api.updateAvatar(avatarInput)
      .catch(err => {`Что-то пошло не так ヾ(。＞＜)シ${console.log(err)}`})
      .finally(() => {renderLoading(false)})
  }
})
changeAvatarPopup.setEventListeners()

avatarPopupOpenImage.addEventListener('click', () => {changeAvatarPopup.open()})

const deleteCardPopup = new PopupDeleteCard(deletePopup, {
  handleFormSubmit: () => {
    avatarImg.src = avatarInput.value;
    api.updateAvatar(avatarInput)
      .catch(err => {`Что-то пошло не так ヾ(。＞＜)シ${console.log(err)}`})
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
        cardTemplate)
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
