import axios from 'axios';

function getProvinces() {
  return axios('/province')
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

function getCities(id = null) {
  return axios(`/city${id ? `/${id}` : ''}`)
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

export const regionService = {
  getProvinces,
  getCities,
};
