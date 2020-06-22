let popup = document.querySelector('.popup');
let editBtn = document.querySelector('.profile__edit-button');
let closeBtn = document.querySelector('.popup__close-button');
let saveBtn = document.querySelector('.popup__save-button');

let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__rank');

let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');

editBtn.addEventListener("click", function(event){
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  event.preventDefault();
  popup.classList.remove("popup__hidden");
});

closeBtn.addEventListener("click", function(event){
  event.preventDefault();
  popup.classList.add("popup__hidden");
});

saveBtn.addEventListener("click", function(event){
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popup.classList.add("popup__hidden");
});
