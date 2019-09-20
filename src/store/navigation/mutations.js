export function setCode(state, paramCode) {
  state.paramCode = paramCode;
}

export function clearCode(state) {
  state.paramCode = null;
}

export function toggleProfile(state) {
  state.isShowProfile = !state.isShowProfile;
}
