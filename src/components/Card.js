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
  updateLikes(item){
    this._element.querySelectorAll('.element__like-count').textContent = item.likes.length
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

  _getTemplate() {
    const cardElement = (this._cardSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element.querySelector('.element__heart').addEventListener('click', this._handleLikeClick)
    this._element.querySelector('.element__pic').addEventListener('click', this._handleCardClick)
    this._element.querySelector('.element__trash').addEventListener('click', this._handleTrashClick)
  }

  generateCard () {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__pic').src = this._image;
    this._element.querySelector('.element__title').textContent = this._text;
    const cardLikes = this._element.querySelector('.element__like-count');
    cardLikes.textContent = this._likes.length;
    if(this._ownerID === this._userID) {
      this._element.querySelector('.element__trash').classList.remove('hidden')
    }
    return this._element;
  }

}
