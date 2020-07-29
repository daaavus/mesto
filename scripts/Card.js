import { openPopup } from './Utils.js'

export class Card {
  constructor (data, cardSelector) {
    this._text = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;

  }

  _getTemplate() {
    const cardElement = document
    .querySelector('#card-template')
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  _handleLikeClick () {
    this._element.querySelector('.element__heart').classList.toggle('element__heart_active');
  }

  _handleTrashClick () {
    this._element.remove();
  }

  _handleImageClick () {
    const imagePopup = document.querySelector('.image-popup');
    const imagePopupImage = imagePopup.querySelector('.image-popup__image');
    const imagePopupCaption = imagePopup.querySelector('.image-popup__caption');
    imagePopupImage.src = this._image
    imagePopupImage.alt = this._text
    imagePopupCaption.textContent = this._text
    openPopup(imagePopup);
  };

  _setEventListeners () {

    this._element.querySelector('.element__heart').addEventListener('click', () => {
      this._handleLikeClick();
    })

    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._handleTrashClick();
    })

    this._element.querySelector('.element__pic').addEventListener('click', () => {
      this._handleImageClick();
    })

  }

  generateCard () {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__pic').src = this._image;
    this._element.querySelector('.element__title').textContent = this._text;

    return this._element;
  }

}
