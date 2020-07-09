let popup = document.querySelector('.popup');
let editBtn = document.querySelector('.profile__edit-button');
let closeBtn = document.querySelector('.popup__close-button');
let saveBtn = document.querySelector('.popup__save-button');
const elementsPopup = document.querySelector('.elements__popup');
const cardsContainer = document.querySelector('.elements');
const saveElementBtn = elementsPopup.querySelector('.popup__elements-save-button');
const addBtn = document.querySelector('.profile__add-button');
const closeElementsBtn = elementsPopup.querySelector('.popup__close-elements-button');
const mestoInput = elementsPopup.querySelector('.popup__mesto');
const linkInput = elementsPopup.querySelector('.popup__link');
const elementsPopupSave = elementsPopup.querySelector('.popup__container');
const imagePopup = document.querySelector('.image-popup');
const imagePopupCloseBtn = imagePopup.querySelector('.image-popup__close-button');
const imagePopupImage = imagePopup.querySelector('.image-popup__image');
const imagePopupCaption = imagePopup.querySelector('.image-popup__caption');
const imagePopupContainer = imagePopup.querySelector('.image-popup__container');

let nameInput = document.getElementById('nameInput');
let jobInput = document.getElementById('jobInput');

let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');

function openPopup(event){
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  event.preventDefault();
  popup.classList.add("popup_opened");
}

editBtn.addEventListener("click", openPopup)

function closePopup(event){
  event.preventDefault();
  popup.classList.remove("popup_opened");
}

closeBtn.addEventListener("click", closePopup);

function savePopup(event){
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popup.classList.remove("popup_opened");
}

saveBtn.addEventListener("click", savePopup);

function toggleElementsPopup(event){
  event.preventDefault();
  elementsPopup.classList.toggle("popup_opened");
}

addBtn.addEventListener("click", toggleElementsPopup)

closeElementsBtn.addEventListener("click", toggleElementsPopup);

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function likeCard(event){
  event.target.classList.toggle('element__heart_active');
};

function deleteCard (event) {
  const element = event.target.closest('.element');
  element.remove();
};

function toggleImagePopup(){
  imagePopup.classList.toggle('popup_opened');
};

function addCard(item){
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.element__title').textContent = item.name;
  card.querySelector('.element__pic').src = item.link;
  card.querySelector('.element__heart').addEventListener('click', likeCard);
  card.querySelector('.element__musorka').addEventListener('click', deleteCard);
  card.querySelector('.element__pic').addEventListener('click', function (event) {
    event.target.closest('.popup__img');
    imagePopupImage.src = item.link;
    imagePopupImage.alt = item.name;
    imagePopupCaption.textContent = item.name;
    toggleImagePopup();
  });

  cardsContainer.prepend(card);
}

initialCards.forEach(item => {
  addCard(item);
});

elementsPopupSave.addEventListener('submit', event => {
  event.preventDefault();
  const cardItem = {
    name: mestoInput.value,
    link: linkInput.value
  };
  addCard(cardItem);
  toggleElementsPopup(event);
});

imagePopupCloseBtn.addEventListener('click', toggleImagePopup)

