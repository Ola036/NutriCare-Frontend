export const USER_URL = process.env.REACT_APP_USER_URL;
export const RECIPES_URL = process.env.REACT_APP_RECIPES_URL;

console.log('USER_URL:', USER_URL);
console.log('RECIPES_URL:', RECIPES_URL);

export const ENDPOINTS = {
  USER: {
    AUTH: {
      LOGIN: USER_URL + '/login',
      LOGOUT: USER_URL + '/logout',
      REGISTER: USER_URL + '/register',
      FORGOT_PASSWORD: USER_URL + '/forgot',
      RESET_PASSWORD: USER_URL + '/reset',
    },
    PROFILE: USER_URL + '/profile',
    DATA: USER_URL + '/data',
    SETTINGS: USER_URL + '/settings',
  },
  RECIPES: {
    GENERATE: RECIPES_URL + '/recipes',
  },
};
