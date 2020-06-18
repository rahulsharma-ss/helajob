import * as types from "../../actionTypes/index";

const initialState = {
  isLoggedIn: false,
  userData: null,
  loading: false,
  loaderIs: null
};

export default (user = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        userData: null
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        isLoggedIn: true
      };
    case types.LOGIN_FAIL:
      return {
        ...state,
        userData: null
      };
    case types.LOGIN:
      return { ...state, isLoggedIn: true };

    case types.SOCIAL_LOGIN_REQUEST:
      return {
        ...state,
        userData: null,
        loading: true,
        loaderIs: action.socialIs
      };
    case types.SOCIAL_LOGIN_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        loading: false,
        loaderIs: action.socialIs
      };
    case types.SOCIAL_LOGIN_FAIL:
      return {
        ...state,
        userData: null,
        loading: false,
        loaderIs: action.socialIs
      };

    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
});
