import axios from 'axios';

function claim(data) {
  return axios.post('/reward', data)
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

function updateClaim(data, id) {
  return axios.put(`/reward/${id}`, data)
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

function get() {
  return axios('/reward')
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

export const rewardService = {
  claim,
  updateClaim,
  get,
};
