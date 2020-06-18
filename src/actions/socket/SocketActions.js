import * as types from "../../actionTypes/index";
import { Actions } from "react-native-gifted-chat";

/* Method for saving new request data to store */
export const newServiceRequest = data => {
  return async (dispatch, getState) => {
    dispatch({ type: types.NEW_SERVICE_REQUEST, payload: data });
  };
};

/* Method for saving new cancel request data to store */
export const declineServiceRequest = () => {
  return async (dispatch, getState) => {
    dispatch({ type: types.SERVICE_REQUEST_DECLINE });
  };
};

/* Method for saving status of request to store*/
export const serviceRequestAccepted = data => {
  return async (dispatch, getState) => {
    dispatch({ type: types.SERVICE_REQUEST_ACCEPT, payload: data });
  };
};

/* Method for saving status of request to store*/
export const serviceDetails = data => {
  return async (dispatch, getState) => {
    dispatch({ type: "SERVICE_DETAILS", payload: data });
  };
};

/* Method for saving coordinates of expert to store*/
export const trackExpertLocation = data => {
  return async (dispatch, getState) => {
    dispatch({ type: types.TRACKING_EXPERT, payload: data });
  };
};

/* Method for toggle notification dot over chat icon */
export const notificationDot = data => {
  return async (dispatch, getState) => {
    dispatch({ type: types.NOTIFICATION_DOT, payload: data });
  };
};

/* Method for saving new request data to store */
export const serviceRequestAccepted2 = data => {
  return async (dispatch, getState) => {
    dispatch({ type: types.SERVICE_REQUEST_ACCEPT2, payload: data });
  };
};
