// TODO: error handler
import { regionService } from '../../_services';

export function actFetchProvince({ commit }) {
  regionService.getProvinces()
    .then(
      (provinces) => {
        commit('setProvinces', provinces);
      },
      err => console.log(err),
    );
}

export function actFetchCity({ commit }, provinceId = null) {
  regionService.getCities(provinceId)
    .then(
      (cities) => {
        commit('setCities', cities);
      },
      err => console.log(err),
    );
}
