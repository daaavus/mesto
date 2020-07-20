const validationConfig = {
  formElement: '.popup__container',
  inputElement: '.input',
  inputElementError: 'input_error_active',
  buttonElement: '.popup__save-button',
  buttonElementInactive: 'popup__save-button_disabled'
}

const showInputError = (config, formElement, inputElement, errorMessage) => {
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

enableValidation(validationConfig);
