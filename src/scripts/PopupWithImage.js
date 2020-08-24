import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector)
  }

  open(data, image, imageCaption) {
    super.open()
    this._text = data.name;
    this._image = data.link;
    image.src = this._image
    image.alt = this._text
    imageCaption.textContent = this._text
  }
}
