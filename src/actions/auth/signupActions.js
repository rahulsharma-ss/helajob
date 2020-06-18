import { SERVER_URL } from "../../constants/url";
import * as types from "../../actionTypes";
import { Navigation } from "react-native-navigation";
import { customPostRequest } from "../../utilities/restClient";
import { RNToasty } from "react-native-toasty";
import { notificationToken } from "../list/listAction";
import idx from "idx";
import { Platform } from "react-native";

/* Method for signup request */

export const signup = (data, componentId, email) => {
  return (dispatch, getState) => {
    dispatch({ type: types.SIGNUP_REQUEST });
    fetch(`${SERVER_URL}user/register`, new customPostRequest(data))
      .then(response => response.json())
      .then(response => {
        if (response.requestStatus == "success") {
          dispatch({ type: types.SIGNUP_SUCCESS, payload: response, email });
          dispatch({ type: "SAVE_SIGNUP_ID", payload: response });
          dispatch(
            notificationToken({
              user_id:
                idx(getState(), _ => _.user.userData.data.id.toString()) ||
                idx(getState(), _ => _.signup.data.data.user_id.toString()),
              device_type: Platform.OS === "android" ? "ANDROID" : "IOS",
              device_token: idx(
                getState(),
                _ => _.notifications.notificationDetails.pushToken
              ),
              player_id: idx(
                getState(),
                _ => _.notifications.notificationDetails.userId
              )
            })
          );
          Navigation.push(componentId, {
            /* Navigate to Verification code screen if code sent */
            component: {
              name: "VerificationCode",
              passProps: {
                number: data.mobile_number,
                email: data.email,
                fromLoginAction: false
              },
              options: {
                statusBar: {},
                topBar: {
                  visible: false,
                  height: 0
                }
              }
            }
          });
          RNToasty.Success({
            title: `${response.message}`,
            withIcon: false
          });
        } else if (response.requestStatus == "invalid") {
          dispatch({ type: types.SIGNUP_FAIL });
          RNToasty.Error({
            title: `${response.message}`,
            withIcon: false
          });
        } else if (response.requestStatus == "error") {
          dispatch({ type: types.SIGNUP_FAIL });
          RNToasty.Error({
            title: `${response.message}`,
            withIcon: false
          });
        } else {
          dispatch({ type: types.SIGNUP_FAIL });
        }
      })
      .catch(err => {
        dispatch({ type: types.SIGNUP_FAIL });
      });
  };
};

/* Method for session management of app */

export const sessionManagement = value => {
  return dispatch => {
    dispatch({ type: types.SESSION_MANAGEMENT, payload: value });
  };
};
