class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _renderResult(res) {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers 
    })
      .then(this._renderResult);
  }

  getUserProfile() {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers
    })
    .then(this._renderResult);
  }

  patchUserInfo(info) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: info.name,
        about: info.about
      })
    })
    .then (this._renderResult);
  }

  postNewCard(info) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: info.name,
        link: info.link
      })
    })
    .then(this._renderResult);
  }

  deleteCard(id) {
    return fetch(this._baseUrl + '/cards/' + id, {
      method: 'DELETE',
      headers: this._headers
    })
    .then (this._renderResult);
  }

  patchUserAvatar(url) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: url
      })
    })
    .then(this._renderResult);
  }

  changeCardLike(id, isLiked) {
    let method = isLiked ? 'DELETE' : 'PUT';

    return fetch(this._baseUrl + '/cards/' + id + '/likes', {
      method: method,
      headers: this._headers
    })
    .then (this._renderResult);
  }
}

const api = new Api({
  baseUrl: 'https://api.vinodarya.mesto.nomoredomains.sbs',
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  }
});

export default api;
