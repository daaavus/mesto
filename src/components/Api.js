export default class Api {
  constructor({baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }
  checkResponce(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(res.status)
    }
  }
  getProfileInfo() {
    return fetch(`${this.baseUrl}/users/me` ,{
      headers: this.headers
    })
    .then(this.checkResponce)
  }
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards` , {
      headers: this.headers
    })
      .then((data) => {
        if(data.ok) {
          return data.json()
        } else {
          return Promise.reject(data.status)
        }
      })
  }
  updateProfileInfo(firstInput, secondInput) {
    return fetch(`${this.baseUrl}/users/me` , {
      method: 'PATCH',
      headers: {
        authorization: '9dc23caf-3e9f-4f59-bf1d-09412a94602c',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: firstInput.value,
        about: secondInput.value
      })
    })
    .then(this.checkResponce)
  }
  addCard(firstInput, secondInput) {
    return fetch(`${this.baseUrl}/cards` , {
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
    .then(this.checkResponce)
  }
  likeCard(id) {
    return fetch(`${this.baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this.headers
      })
      .then(this.checkResponce)
  }
  deleteLike(id) {
    return fetch(`${this.baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this.headers
      })
      .then(this.checkResponce)
  }
  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: '9dc23caf-3e9f-4f59-bf1d-09412a94602c',
        'Content-Type': 'application/json'
      },
    })
    .then(this.checkResponce)
  }
  updateAvatar(input) {
    return fetch(`${this.baseUrl}/users/me/avatar` , {
      method: 'PATCH',
      headers: {
        authorization: '9dc23caf-3e9f-4f59-bf1d-09412a94602c',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: input.value
      })
    })
    .then(this.checkResponce)
  }
}
