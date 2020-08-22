const popup = document.querySelector('.popup');
const imagePopup = document.querySelector('.image-popup');
const elementsPopup = document.querySelector('.elements__popup');
const saveBtn = document.querySelector('.popup__save-button');
const nameInput = document.querySelector('.popup__name');
const jobInput = document.querySelector('.popup__info');
export const profileName = document.querySelector('.profile__title');
export const profileJob = document.querySelector('.profile__subtitle');
const imagePopupImage = imagePopup.querySelector('.image-popup__image');
const imagePopupCaption = imagePopup.querySelector('.image-popup__caption');

function setValidityForm () {
  const elementsSaveBtn = document.querySelector('.popup__elements-save-button')
  elementsSaveBtn.setAttribute('disabled', true);
  elementsSaveBtn.classList.add('popup__save-button_disabled');
}

export { popup, imagePopup, elementsPopup, setValidityForm, saveBtn,
   imagePopupImage, imagePopupCaption, nameInput, jobInput }
