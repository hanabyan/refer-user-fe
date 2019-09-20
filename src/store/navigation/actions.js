export function setParamCode({ commit }, paramCode) {
  commit('setCode', paramCode);
}

export function clearParamCode({ commit }) {
  commit('clearCode');
}

export function toggleProfile({ commit }) {
  commit('toggleProfile');
}
