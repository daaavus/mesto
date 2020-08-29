export const popup = document.querySelector('.popup');
export const imagePopup = document.querySelector('.image-popup');
export const elementsPopup = document.querySelector('.elements__popup');
export const avatarPopup = document.querySelector('.avatar-popup')
export const saveBtn = document.querySelector('.popup__save-button');
export const nameInput = document.querySelector('.popup__name');
export const jobInput = document.querySelector('.popup__info');
export const profileName = document.querySelector('.profile__title');
export const profileJob = document.querySelector('.profile__subtitle');
export const imagePopupImage = imagePopup.querySelector('.image-popup__image');
export const imagePopupCaption = imagePopup.querySelector('.image-popup__caption');
export const avatarImg = document.querySelector('.profile__avatar')

export const validationConfig = {
  formElement: '#popupContainer',
  inputElement: '.input',
  inputElementError: 'input_error_active',
  buttonElement: '.popup__save-button',
  buttonElementInactive: 'popup__save-button_disabled'
}

export function setValidityForm () { //я тут присваиваю кнопке свойства при открытии второго попапа, это не валидация :)
  const elementsSaveBtn = document.querySelector('.popup__elements-save-button')
  elementsSaveBtn.setAttribute('disabled', true);
  elementsSaveBtn.classList.add('popup__save-button_disabled');
}
