const validationConfig = {
  formElement: '.popup__container',
  inputElement: '.input',
  inputElementError: 'input_error_active',
  buttonElement: '.popup__save-button',
  buttonElementInactive: 'popup__save-button_disabled'
}

class FormValidator {
  constructor(config, formElement){
    this._formElement = formElement;
    this._inputElement = config.inputElement;
    this._inputElementError = config.inputElementError;
    this._buttonElement = config.buttonElement;
    this._buttonElementInactive = config.buttonElementInactive;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._inputElementError);
  }

  _hideInputError(inputElement){
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.remove(this._inputElementError);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement){
    if (!inputElement.validity.valid){
      this._showInputError(inputElement, inputElement.validationMessage);
    }else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList){
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement){
    if (this._hasInvalidInput(inputList)){
      buttonElement.classList.add(this._buttonElementInactive);
      buttonElement.setAttribute('disabled', true)
      } else {
      buttonElement.classList.remove(this._buttonElementInactive);
      buttonElement.removeAttribute('disabled')
      }
  }

  _setEventListeners(){
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputElement))

    const buttonElement = this._formElement.querySelector(this._buttonElement)

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation(){
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    this._setEventListeners()
  }
}

export { validationConfig, FormValidator }
