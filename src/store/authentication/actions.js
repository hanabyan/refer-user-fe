import { userService } from '../../_services';

export function login({ dispatch, commit }, { phone, password }) {
  commit('loginRequest', { phone });

  return userService.login(phone, password)
    .then(
      (user) => {
        commit('loginSuccess', user);
        dispatch('alert/clear', null, { root: true });
        this.$router.push('/');
      },
      (error) => {
        let errMsg;

        if (typeof error === 'string') {
          errMsg = error;
        }

        if (typeof error === 'object' && error.message) {
          errMsg = error.message;
        }

        commit('loginPurge');
        dispatch('alert/error', errMsg, { root: true });
        return Promise.reject(error);
      },
    );
}

export function logout({ commit }) {
  userService.logout();
  commit('loginPurge');
  this.$router.push('/sign/in');
}

export function updateStateUser({ commit }, payload) {
  const updatedUser = userService.updateStateUser(payload);

  commit('updateStateUser', updatedUser);
}

export function fetchSummaryBalance({ commit }) {
  return userService.getIncomeSummary()
    .then((summary) => {
      commit('updateSummaryBalance', summary);
    }, (err) => {
      console.log(err);
    });
}
