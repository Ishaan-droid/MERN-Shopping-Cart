import constants from './AuthContainerConstants';
const initialState = {
  userData: {},
  loginError: '',
  status: '',
  wait: true,
  loader: false,
  modalClose: false,
  modalOpen: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.LOGIN:
      return {
        ...state,
        userData: action.userData,
        status: action.status,
        loader: false,
      };
    case constants.LOGGED_IN_USER:
      return {
        userData: action.userData,
        status: action.status,
      };
    case constants.LOGIN_ERROR:
      return {
        ...state,
        loginError: action.payload.message,
        status: action.payload.status,
        loader: false,
      };
    case constants.CLOSE_MODAL:
      return {
        ...state,
        modalOpen: false,
        modalClose: true,
      };
    case constants.SHOW_MODAL:
      return {
        ...state,
        modalOpen: true,
        modalClose: false,
      };
    case constants.LOADER:
      return {
        loader: true,
      };
    default:
      return state;
  }
};

export default authReducer;
