const popup = document.querySelector('.popup');
const imagePopup = document.querySelector('.image-popup');
const elementsPopup = document.querySelector('.elements__popup');
const saveBtn = document.querySelector('.popup__save-button');
const nameInput = document.querySelector('.popup__name');
const jobInput = document.querySelector('.popup__info');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const imagePopupImage = imagePopup.querySelector('.image-popup__image');
const imagePopupCaption = imagePopup.querySelector('.image-popup__caption');

const closePopup = (popup) => {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePopupByEsc)
}

const openPopup = (popup) => {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupByEsc)
}

function setValidityForm () {
  const elementsSaveBtn = document.querySelector('.popup__elements-save-button')
  elementsSaveBtn.setAttribute('disabled', true);
  elementsSaveBtn.classList.add('popup__save-button_disabled');
}

const closePopupByEsc = (event) => {
  if (event.key === 'Escape') {
    closePopup(popup);
    closePopup(elementsPopup);
    closePopup(imagePopup);
  }
}

function openFirstPopup(){
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popup);
  saveBtn.classList.remove('popup__save-button_disabled')
}

function savePopup(event){
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popup);
}

export { popup, openPopup, closePopupByEsc, imagePopup, elementsPopup, setValidityForm,
   closePopup, saveBtn, openFirstPopup, savePopup, imagePopupImage, imagePopupCaption }
