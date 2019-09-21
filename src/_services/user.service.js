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

function claim(redeemCode) {
  return axios('/claim', {
    method: 'post',
    code: redeemCode,
  })
    .then((response) => {
      console.log(response);
    })
    .catch(err => Promise.reject(err.response.data));
}

function verifyAccount(id, payload) {
  return axios.put(`/register/verify/${id}`, payload)
    .then(response => response.data)
    .catch(err => Promise.reject(err.response.data));
}

function updateStateUser(payload) {
  const user = JSON.parse(localStorage.getItem('user'));

  if (payload) {
    if (payload.name) {
      user.name = payload.name;
    }

    if (payload.phone) {
      user.phone = payload.phone;
    }

    if (payload.is_profile_completed) {
      user.is_profile_completed = payload.is_profile_completed;
    }
  }

  localStorage.setItem('user', JSON.stringify(user));
  return user;
}

function getProfile() {
  return axios('/profile')
    .then(response => response.data)
    .catch(err => Promise.reject(err.response.data));
}

function updateProfile(payload) {
  return axios('/profile', {
    method: 'put',
    data: payload,
  })
    .then(response => response.data)
    .catch(err => Promise.reject(err.response.data));
}

function getIncomeList() {
  return axios('/withdraw')
    .then(response => response.data)
    .catch(err => Promise.reject(err.response.data));
}

function withdraw(payload) {
  return axios('/withdraw', {
    method: 'post',
    data: payload,
  })
    .then(response => response.data)
    .catch(err => Promise.reject(err.response.data));
}

function getIncomeSummary() {
  return axios('/withdraw/summary')
    .then(response => response.data)
    .catch(err => Promise.reject(err.response.data));
}

export const userService = {
  login,
  logout,
  register,
  claim,
  verifyAccount,
  updateStateUser,
  getProfile,
  updateProfile,
  getIncomeList,
  withdraw,
  getIncomeSummary,
};
