import * as types from "../../actionTypes";
import Immutable from "seamless-immutable";


const initialState = Immutable({
  root: "login", // 'login' / 'after-login'
});

export default function app(state = initialState, action = {}) {
  switch (action.type) {
    case types.ROOT_CHANGED:
      return {
        ...state,
        root: action.root
      };
    default:
      return state;
  }
}
