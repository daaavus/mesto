import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector)
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.input');
    this._inputInfoArray = {};

    this._inputList.forEach((item) => {
      this._inputInfoArray[item.name] = item.value;
    });

    return this._inputInfoArray;
  }

  setEventListeners() {
    super.setEventListeners()
    this._form = this._popupSelector.querySelector('.popup__container');

    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = this._getInputValues()
      this._handleFormSubmit(data);
      this.close()
    })
  }

  close() {
    super.close()
    this._form.reset()
    this._form.querySelectorAll('.input_error_active').forEach((item) => item.textContent = '')
  }
}
