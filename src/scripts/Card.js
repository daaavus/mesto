export default class Card {
  constructor ({data, myID, handleCardClick, handleLikeClick, handleTrashClick}, cardSelector) {
    this._text = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._ownerID = data.owner._id;
    this._cardID = data._id;
    this._userID = myID;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleTrashClick = handleTrashClick;
  }

  addLike(item) {
    this._element.querySelector('.element__like-count').textContent = (item.likes.length+=1)
  }

  removeLike(item) {
    this._element.querySelector('.element__like-count').textContent = (item.likes.length-=1)
  }

  likeCard () {
    this._element.querySelector('.element__heart').classList.toggle('element__heart_active');
  }

  updateLikes(newLikes) {
    return this._likes = newLikes;
  }

  isLiked() {
    return !!this._likes.find(like => like._id === this._userId);
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element.querySelector('.element__heart').addEventListener('click', this._handleLikeClick)
    this._element.querySelector('.element__trash').addEventListener('click', this._handleTrashClick)
    this._element.querySelector('.element__pic').addEventListener('click', this._handleCardClick)
  }

  generateCard () {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__pic').src = this._image;
    this._element.querySelector('.element__title').textContent = this._text;

    return this._element;
  }

}
