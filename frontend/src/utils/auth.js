export const BASE_URL = 'https://api.bakirov.students.nomoredomains.work';

const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    credentials: 'include',
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({password, email})
  })
  .then(checkResponse)
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    credentials: 'include',
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ password, email })
  })
    .then(checkResponse)
};

export const logOut = () => {
  return fetch(`${BASE_URL}/signout`, {
    credentials: 'include',
    method: 'DELETE',
    headers: HEADERS,
  })
    .then(checkResponse)
};

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  };
};