const popup = document.querySelector('.popup');
const editBtn = document.querySelector('.profile__edit-button');
const closeBtn = document.querySelector('.popup__close-button');
const saveBtn = document.querySelector('.popup__save-button');
const elementsPopup = document.querySelector('.elements__popup');
const cardsContainer = document.querySelector('.elements');
const addBtn = document.querySelector('.profile__add-button');
const closeElementsBtn = elementsPopup.querySelector('.popup__close-elements-button');
const mestoInput = elementsPopup.querySelector('.popup__mesto');
const linkInput = elementsPopup.querySelector('.popup__link');
const popupSave = popup.querySelector('.popup__container');
const elementsPopupSave = elementsPopup.querySelector('.elements__popup-container');
const elementsSaveBtn = elementsPopup.querySelector('.popup__elements-save-button')

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

const closePopupByEsc = (event) => {
  if (event.key === 'Escape') {
    closePopup(popup);
    closePopup(elementsPopup);
    closePopup(imagePopup);
  }
}

const openPopup = (popup) => {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupByEsc)
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePopupByEsc)
}

function openFirstPopup(){
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popup);
  saveBtn.classList.remove('popup__save-button_disabled')
  popupSave.addEventListener('submit', savePopup)
}

editBtn.addEventListener("click", openFirstPopup)

closeBtn.addEventListener('click', () => closePopup(popup));

function savePopup(event){
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popup);
}

addBtn.addEventListener('click', () => openPopup(elementsPopup));
addBtn.addEventListener('click', () => {
  elementsPopupSave.reset();
  elementsPopupSave.removeEventListener('submit', saveElementsPopup)
  elementsSaveBtn.classList.add('popup__save-button_disabled')
});

closeElementsBtn.addEventListener('click', () => closePopup(elementsPopup));

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
  openPopup(imagePopup);
};

const cardTemplate = document.querySelector('#card-template').content;

function addCard(item){
  const card = cardTemplate.cloneNode(true);
  const elementPic = card.querySelector('.element__pic')
  elementPic.src = item.link;
  card.querySelector('.element__title').textContent = item.name;
  card.querySelector('.element__heart').addEventListener('click', likeCard);
  card.querySelector('.element__trash').addEventListener('click', deleteCard);

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

const saveElementsPopup = (event) => {
  event.preventDefault();
  const cardItem = {
    name: mestoInput.value,
    link: linkInput.value
  };
  render(cardItem);
  closePopup(elementsPopup);
};

elementsPopupSave.addEventListener('submit', saveElementsPopup)

imagePopupCloseBtn.addEventListener('click', () => closePopup(imagePopup));

popup.addEventListener("click", function(event) {
  if (event.target == this) {
    closePopup(popup)
  }
});

elementsPopup.addEventListener("click", function(event) {
  if (event.target == this) {
    closePopup(elementsPopup)
  }
});

imagePopup.addEventListener("click", function(event) {
  if (event.target == this) {
    closePopup(imagePopup)
  }
});
