let popup = document.querySelector('.popup');
let editBtn = document.querySelector('.profile__edit-button');
let closeBtn = document.querySelector('.popup__close-button');
let saveBtn = document.querySelector('.popup__save-button');

let nameInput = document.getElementById('nameInput');
let jobInput = document.getElementById('jobInput');

let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');

function openPopup(event){
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  event.preventDefault();
  popup.classList.add("popup__opened");
}

editBtn.addEventListener("click", openPopup)

closeBtn.addEventListener("click", function(event){
  event.preventDefault();
  popup.classList.remove("popup__opened");
});

saveBtn.addEventListener("click", function(event){
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popup.classList.remove("popup__opened");
});
