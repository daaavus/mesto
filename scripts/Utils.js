const popup = document.querySelector('.popup');
const imagePopup = document.querySelector('.image-popup');
const elementsPopup = document.querySelector('.elements__popup');
const saveBtn = document.querySelector('.popup__save-button');
const nameInput = document.querySelector('.popup__name');
const jobInput = document.querySelector('.popup__info');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const closePopup = (popup) => {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePopupByEsc)
}

const openPopup = (popup) => {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupByEsc)
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

export { popup, openPopup, closePopupByEsc, imagePopup, elementsPopup,
   closePopup, saveBtn, openFirstPopup, savePopup }
