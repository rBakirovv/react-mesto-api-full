class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  };

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkResponse);
  };

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include', 
      method: 'GET',    
      headers: this._headers
    })
      .then(this._checkResponse);
  };

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(this._checkResponse);
  };

  setUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      credentials: 'include', 
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(this._checkResponse);
  };

  createNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include', 
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._checkResponse);
  };

  deleteCard(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}`, {
      credentials: 'include', 
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._checkResponse);
  };

  changeLikeCardStatus(_id, isLiked) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      credentials: 'include', 
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: this._headers,
    })
      .then(this._checkResponse);
  };

  getAppInfo() {
    return Promise.all([
      this.getInitialCards(),
      this.getUserInfo()
    ]);
  };

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    };
  };
};

const api = new Api({
  baseUrl: 'https://api.bakirov.students.nomoredomains.work',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;