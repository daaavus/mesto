const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add('input_error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.classList.remove('input_error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.input'));
  const buttonElement = document.querySelector('.popup__save-button');
  const elementsButtonElement = document.querySelector('.popup__elements-save-button')

  toggleButtonState(inputList, buttonElement, elementsButtonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement, elementsButtonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__container'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll('.popup__content'));
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet)
    })
  });
};

 function hasInvalidInput (inputList){
   return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, elementsButtonElement){
  if (hasInvalidInput(inputList)) {
  buttonElement.classList.add('popup__save-button_disabled');
  elementsButtonElement.classList.add('popup__save-button_disabled')
  } else {
  buttonElement.classList.remove('popup__save-button_disabled');
  elementsButtonElement.classList.remove('popup__save-button_disabled')
  }
}

enableValidation();
