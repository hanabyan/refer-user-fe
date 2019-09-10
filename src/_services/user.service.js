import axios from 'axios';

function logout() {
  localStorage.removeItem('user');
}

function login(mobile, password) {
  return axios('/auth/login', {
    method: 'post',
    data: { mobile, password },
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

export const userService = {
  login,
  logout,
};
