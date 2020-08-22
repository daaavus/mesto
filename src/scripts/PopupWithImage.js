import Popup from './Popup.js'
import { imagePopupImage, imagePopupCaption } from './Utils.js'

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector)
  }

  open(data) {
    this._text = data.name;
    this._image = data.link;
    imagePopupImage.src = this._image
    imagePopupImage.alt = this._text
    imagePopupCaption.textContent = this._text
    this._popupSelector.classList.add('popup_opened')
    document.addEventListener('keydown', this._handleEscClose)
  }
}
