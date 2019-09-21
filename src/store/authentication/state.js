const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user, summaryBalance: {} }
  : { status: {}, user: null, summaryBalance: {} };

export default {
  ...initialState,
};
