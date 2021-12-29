import axios from 'axios';
import constants from './AuthContainerConstants';

export const loginUser = login => {
  return async dispatch => {
    try {
      const response = await axios.post('/api/v1/mern-shopping-cart/users/login', login);
      const { data } = response;

      return dispatch({
        type: constants.LOGIN,
        userData: data.data.results,
        status: data.status,
      });
    } catch (err) {
      const {
        response: { data },
      } = err;
      return dispatch({
        type: constants.LOGIN_ERROR,
        payload: {
          message: data.message,
          status: data.status,
        },
      });
    }
  };
};

export const loggedInUser = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/v1/mern-shopping-cart/users/getLoggedUser');
      const { data } = response;

      return dispatch({
        type: constants.LOGGED_IN_USER,
        userData: data.data.results,
        status: data.status,
      });
    } catch (err) {}
  };
};
