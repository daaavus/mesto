import Popup from './Popup.js'

export default class PopupDeleteCard extends Popup {
  constructor (popupSelector) {
    super(popupSelector)
  }
  setEventListeners() {
    super.setEventListeners()
    this._form = this._popupSelector.querySelector('.delete-popup__container');

    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.setSubmitHandler();
    })
  }
}
