import * as types from "../../actionTypes";
import Immutable from "seamless-immutable";

const initialState = Immutable({
  loading: false,
  data: null,
  root: "login",
  email: null,
  letUserIn: false
});

export default function signup(state = initialState, action = {}) {
  switch (action.type) {
    case types.SIGNUP_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        email: action.email
      };
    case types.SIGNUP_FAIL:
      return {
        ...state,
        loading: false
      };
    case types.FORGOTPASS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.FORGOTPASS_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case types.FORGOTPASS_FAIL:
      return {
        ...state,
        loading: false
      };

    case types.SESSION_MANAGEMENT:
      return {
        ...state,
        loading: false,
        letUserIn: action.payload
      };

    case types.LOGOUT:
      return initialState;

    default:
      return state;
  }
}
