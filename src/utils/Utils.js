import { saveBtn, elementsSaveBtn, avatarSaveBtn } from './constants.js'

export const validationConfig = {
  formElement: '#popupContainer',
  inputElement: '.input',
  inputElementError: 'input_error_active',
  buttonElement: '.popup__save-button',
  buttonElementInactive: 'popup__save-button_disabled'
}

export const renderLoading = (isLoading) => {
  if(isLoading) {
    saveBtn.textContent = 'Сохранение...'
    elementsSaveBtn.textContent = 'Сохранение...'
    avatarSaveBtn.textContent = 'Сохранение...'
  } else {
    saveBtn.textContent = 'Сохранить'
    elementsSaveBtn.textContent = 'Сохранить'
    avatarSaveBtn.textContent = 'Сохранить'
  }
}

export function setValidityForm () {
  const elementsSaveBtn = document.querySelector('.popup__elements-save-button')
  elementsSaveBtn.setAttribute('disabled', true);
  elementsSaveBtn.classList.add(validationConfig.buttonElementInactive);
}
