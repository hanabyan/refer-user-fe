import axios from 'axios';

function getProduct() {
  return axios('/product')
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

function getFeaturedProduct() {
  return axios('/product/featured')
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

function getShareUrl(promoId, productId) {
  return axios(`/product/share?promo_id=${promoId}&product_id=${productId}`)
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

function getLanding(code) {
  return axios('/landing', { params: { code } })
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

function uploadStruk(payload) {
  return axios.post('/product/claim', payload)
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

function incrShareCount(id) {
  return axios.put(`/product/${id}`)
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

export const promoService = {
  getProduct,
  getFeaturedProduct,
  getShareUrl,
  getLanding,
  uploadStruk,
  incrShareCount,
};
