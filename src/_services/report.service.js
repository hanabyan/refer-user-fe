import axios from 'axios';

function get() {
  return axios('/report')
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

export const reportService = {
  get,
};
