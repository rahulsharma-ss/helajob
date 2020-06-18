import * as types from "../../actionTypes";
import Immutable from "seamless-immutable";

const initialState = Immutable({
  loading: false,
  root: "login"
});

export default function login(state = initialState, action = {}) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case types.LOGIN_FAIL:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
}
