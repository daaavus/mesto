const popup = document.querySelector('.popup');
const editBtn = document.querySelector('.profile__edit-button');
const closeBtn = document.querySelector('.popup__close-button');
const saveBtn = document.querySelector('.popup__save-button');
const elementsPopup = document.querySelector('.elements__popup');
const cardsContainer = document.querySelector('.elements');
const saveElementBtn = elementsPopup.querySelector('.popup__elements-save-button');
const addBtn = document.querySelector('.profile__add-button');
const closeElementsBtn = elementsPopup.querySelector('.popup__close-elements-button');
const mestoInput = elementsPopup.querySelector('.popup__mesto');
const linkInput = elementsPopup.querySelector('.popup__link');
const popupSave = popup.querySelector('.popup__container');
const elementsPopupSave = elementsPopup.querySelector('.elements__popup-container');
const input = document.querySelector('.input')

const imagePopup = document.querySelector('.image-popup');
const imagePopupCloseBtn = imagePopup.querySelector('.image-popup__close-button');
const imagePopupImage = imagePopup.querySelector('.image-popup__image');
const imagePopupCaption = imagePopup.querySelector('.image-popup__caption');
const imagePopupContainer = imagePopup.querySelector('.image-popup__container');

const nameInput = document.querySelector('.popup__name');
const jobInput = document.querySelector('.popup__info');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

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

function togglePopup(popup){
  popup.classList.toggle("popup_opened");
  document.addEventListener('keydown', function(event){
    if(event.key = 'Escape'){
      popup.classList.remove('popup_opened')
    }
  })
}

function openPopup(){
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  togglePopup(popup);
}

editBtn.addEventListener("click", openPopup)

closeBtn.addEventListener('click', () => togglePopup(popup));

function savePopup(event){
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  togglePopup(popup);
}

popupSave.addEventListener('submit', savePopup)

addBtn.addEventListener('click', () => togglePopup(elementsPopup));

closeElementsBtn.addEventListener('click', () => togglePopup(elementsPopup));

function likeCard(event){
  event.target.classList.toggle('element__heart_active');
};

function deleteCard (event) {
  const element = event.target.closest('.element');
  element.remove();
};

function renderCard(item) {
  imagePopupImage.src = item.link;
  imagePopupImage.alt = item.name;
  imagePopupCaption.textContent = item.name;
  togglePopup(imagePopup);
};

const cardTemplate = document.querySelector('#card-template').content;

function addCard(item){
  const card = cardTemplate.cloneNode(true);
  const elementPic = card.querySelector('.element__pic')
  elementPic.src = item.link;
  card.querySelector('.element__title').textContent = item.name;
  card.querySelector('.element__heart').addEventListener('click', likeCard);
  card.querySelector('.element__musorka').addEventListener('click', deleteCard);

  elementPic.addEventListener('click', () => renderCard(item))

  return card;
}

function render(item) {
  const card = addCard(item);
  cardsContainer.prepend(card);
}

initialCards.forEach(item => {
  render(item);
});

elementsPopupSave.addEventListener('submit', event => {
  event.preventDefault();
  const cardItem = {
    name: mestoInput.value,
    link: linkInput.value
  };
  render(cardItem);
  togglePopup(elementsPopup);
});

imagePopupCloseBtn.addEventListener('click', () => togglePopup(imagePopup));

popup.addEventListener("click", function(event) {
  if (event.target == this) {
    togglePopup(popup)
  }
});

elementsPopup.addEventListener("click", function(event) {
  if (event.target == this) {
    togglePopup(elementsPopup)
  }
});

imagePopup.addEventListener("click", function(event) {
  if (event.target == this) {
    togglePopup(imagePopup)
  }
});
