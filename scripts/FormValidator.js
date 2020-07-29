const validationConfig = {
  formElement: '.popup__container',
  inputElement: '.input',
  inputElementError: 'input_error_active',
  buttonElement: '.popup__save-button',
  buttonElementInactive: 'popup__save-button_disabled'
}

class FormValidator {
  constructor (config, formElement) {
    this._formElement = config.formElement;
    this._inputElement = config.inputElement;
    this._inputElementError = config.inputElementError;
    this._buttonElement = config.buttonElement;
    this._buttonElementInacvtive = config.buttonElementInacvtive;
  }

  _showInputError (config, formElement, inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${this._inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._inputElementError);
  };

  _hideInputError (config, formElement, inputElement) {
    const errorElement = this._formElement.querySelector(`#${this._inputElement.id}-error`);
    errorElement.classList.remove(this._inputElementError);
    errorElement.textContent = '';
  };

  _checkInputValidity (config, formElement, inputElement) {
    if (!this._inputElement.validity.valid) {
      _showInputError(config, formElement, inputElement, inputElement.validationMessage);
    } else {
      _hideInputError(config, formElement, inputElement);
    }
  };

  _toggleButtonState(config, inputList, buttonElement){
    if (this._hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.buttonElementInactive);
    buttonElement.setAttribute('disabled', true)
    } else {
    buttonElement.classList.remove(config.buttonElementInactive);
    buttonElement.removeAttribute('disabled')
    }
  }

  _setEventListeners (config, formElement) {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputElement));

    const buttonElement = this_.formElement.querySelector(this._buttonElement);

    this._toggleButtonState(config, inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        this._checkInputValidity(config, formElement, inputElement);
        this._toggleButtonState(config, inputList, buttonElement);
      });
    });
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  enableValidation (config) {
    const formList = Array.from(document.querySelectorAll(this._formElement));
    formList.forEach((formElement) => {
      this._formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      this._setEventListeners(config, formElement)
    });
  };
}

export { FormValidator, validationConfig };

/*const showInputError = (config, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.inputElementError);
};

const hideInputError = (config, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.classList.remove(config.inputElementError);
  errorElement.textContent = '';
};

const checkInputValidity = (config, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(config, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(config, formElement, inputElement);
  }
};

const setEventListeners = (config, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputElement));

  const buttonElement = formElement.querySelector(config.buttonElement);

  toggleButtonState(config, inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(config, formElement, inputElement);
      toggleButtonState(config, inputList, buttonElement);
    });
  });
};

function toggleButtonState(config, inputList, buttonElement){
  if (hasInvalidInput(inputList)) {
  buttonElement.classList.add(config.buttonElementInactive);
  buttonElement.setAttribute('disabled', true)
  } else {
  buttonElement.classList.remove(config.buttonElementInactive);
  buttonElement.removeAttribute('disabled')
  }
}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formElement));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(config, formElement)
  });
};

 function hasInvalidInput (inputList){
   return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
  });
}

enableValidation(validationConfig);*/
