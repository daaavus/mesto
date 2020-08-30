import Popup from './Popup.js'

export default class AvatarPopup extends Popup {
  constructor (popupSelector, {handleFormSubmit}) {
    super(popupSelector)
    this._handleFormSubmit = handleFormSubmit;
  }
  setEventListeners() {
    super.setEventListeners()
    this._form = this._popupSelector.querySelector('.avatar__popup-container');

    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit();
      this.close()
    })
  }
}
