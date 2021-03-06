export default class Popup {
  constructor (popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add('popup_opened')
    document.addEventListener('keydown', this._handleEscClose)
  }

  close() {
    this._popupSelector.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._handleEscClose)
  }

  _handleEscClose = (event) => {
    if (event.key === 'Escape') {
      this.close()
    }
  }

  _handleOverlayClose = (event) => {
    if (event.target.classList.contains('popup_opened')) {
      this.close()
    }
  }

  setEventListeners() {
    this._popupSelector.querySelector('#popup_close').addEventListener('click', () => {
      this.close()
    })
    this._popupSelector.addEventListener('click', this._handleOverlayClose)
  }
}
