class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  //  this._headers = options.headers;
  }

  _renderResult(res) {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards(token) {
    return fetch(this._baseUrl + '/cards', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(this._renderResult);
  }

  getUserProfile(token) {
    return fetch(this._baseUrl + '/users/me', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(this._renderResult);
  }

  patchUserInfo(info, token) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: info.name,
        about: info.about
      })
    })
    .then (this._renderResult);
  }

  postNewCard(info, token) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: info.name,
        link: info.link
      })
    })
    .then(this._renderResult);
  }

  deleteCard(id, token) {
    return fetch(this._baseUrl + '/cards/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then (this._renderResult);
  }

  patchUserAvatar(url, token) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: url
      })
    })
    .then(this._renderResult);
  }

  changeCardLike(id, isLiked, token) {
    let method = isLiked ? 'DELETE' : 'PUT';

    return fetch(this._baseUrl + '/cards/' + id + '/likes', {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then (this._renderResult);
  }
}

const api = new Api({
  baseUrl: 'https://api.vinodarya.mesto.nomoredomains.sbs',
 /* headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  }*/
});

export default api;
