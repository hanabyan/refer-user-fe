import axios from 'axios';

function logout() {
  localStorage.removeItem('user');
}

function login(phone, password) {
  return axios('/auth/login', {
    method: 'post',
    data: { phone, password },
  })
    .then((response) => {
      if (response && response.data && response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    })
    .catch((err) => {
      logout();
      return Promise.reject(err.response.data);
    });
}

function register(payload) {
  return axios('/register', {
    method: 'post',
    data: payload,
  })
    .then(response => response.data)
    .catch(err => Promise.reject(err.response.data));
}

export const userService = {
  login,
  logout,
  register,
};