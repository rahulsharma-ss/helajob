import * as types from "../../actionTypes";

export const setMylanguage = language => {
  return dispatch => {
    dispatch({ type: types.MY_LANGUAGE, payload: language });
  };
};
