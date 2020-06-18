import * as types from "../../actionTypes";
import Immutable from "seamless-immutable";

const initialState = Immutable({
  language: {
    title: "english",
    code: "en"
  }
});

export default function language(state = initialState, action = {}) {
  switch (action.type) {
    case types.MY_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };

    default:
      return state;
  }
}
