import * as types from "../../actionTypes";

const INITIAL_STATE = {
  notificationDetails: "",
  notificationData: null
};

function socket(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "NOTIFICATION_DETAIL":
      return {
        ...state,
        notificationDetails: action.payload
      };
    case types.NOTIFICATION_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        notificationData: action.payload
      };
    case types.NOTIFICATION_FAIL:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
}

export default socket;
