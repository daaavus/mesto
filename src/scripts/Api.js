import Section from './Section.js';

export default class Api {
  constructor({baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }
  getProfileInfo() {
    return fetch(`${this.baseUrl}/users/me` ,{
      headers: this.headers
    })
      .then(res => res.json())
  }
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards` , {
      headers: this.headers
    })
      .then(data => data.json())
  }
  updateProfileInfo(firstInput, secondInput) {
    fetch(`${this.baseUrl}/users/me` , {
      method: 'PATCH',
      headers: {
        authorization: '9dc23caf-3e9f-4f59-bf1d-09412a94602c',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: firstInput.value,
        about: secondInput.value
      })
    });
  }
  addCard(firstInput, secondInput) {
    fetch(`${this.baseUrl}/cards` , {
      method: 'POST',
      headers: {
        authorization: '9dc23caf-3e9f-4f59-bf1d-09412a94602c',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: firstInput.value,
        link: secondInput.value
      })
    })
  }
  likeCard(id) {
    return fetch(`${this.baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this.headers
      })
      .catch(err => {`Что-то пошло не так ヾ(。＞＜)シ${console.log(err)}`})
  }
  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: '9dc23caf-3e9f-4f59-bf1d-09412a94602c',
        'Content-Type': 'application/json'
      },
    })
    .then((err) => {console.log(err)})
  }
}
