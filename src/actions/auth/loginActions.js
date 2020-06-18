import React from "react";
import { SERVER_URL } from "../../constants/url";
import { Platform } from "react-native";
import * as types from "../../actionTypes";
import { Navigation } from "react-native-navigation";
import { customPostRequest } from "../../utilities/restClient";
import { RNToasty } from "react-native-toasty";
import { LoginManager } from "react-native-fbsdk";
import { notificationToken, getUserDetails } from "../list/listAction";
import idx from "idx";
import { GoogleSignin } from "react-native-google-signin";
import strings from "../../constants/language";

/* Method for login request */
export const login = (data, componentId, cb) => {
  return (dispatch, getState) => {
    dispatch({ type: types.LOGIN_REQUEST });
    fetch(`${SERVER_URL}user/login`, new customPostRequest(data))
      .then(res => {
        return res.json();
      })
      .then(response => {
        console.log(response, "responseresponse", `${SERVER_URL}user/login`);
        if (response.requestStatus == "success") {
          if (
            !response.data.status &&
            response.data.mobile_verified &&
            response.data.email_verified
          ) {
            dispatch({ type: types.LOGIN_FAIL });
            RNToasty.Error({
              title: strings.login.deactivate
            });
            cb(response);
          } else if (
            !response.data.mobile_verified &&
            !response.data.email_verified
          ) {
            dispatch({ type: types.LOGIN_SUCCESS, payload: response });
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
            /* Navigate to Verification code screen if code sent */
            Navigation.push(componentId, {
              component: {
                name: "VerificationCode",
                options: {
                  statusBar: {},
                  topBar: {
                    visible: false,
                    height: 0
                  }
                },
                passProps: {
                  fromLoginAction: true
                }
              }
            });
            cb(response);
          } else {
            dispatch({ type: types.LOGIN_SUCCESS, payload: response });
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
            /* Navigate to Services code screen if already logged in */
            Navigation.push(componentId, {
              component: {
                name: "Services",
                options: {
                  statusBar: {},
                  topBar: {
                    visible: false,
                    height: 0
                  }
                }
              }
            });
            cb(response);
          }
        } else if (response.requestStatus == "invalid") {
          dispatch({ type: types.LOGIN_FAIL });
          RNToasty.Error({
            title: `${response.message}`,
            withIcon: false
          });
          cb(response);
        } else if (response.requestStatus == "fail") {
          dispatch({ type: types.LOGIN_FAIL });

          RNToasty.Error({
            title: `${response.message}`,
            withIcon: false
          });
        } else {
          dispatch({ type: types.LOGIN_FAIL });
          RNToasty.Error({
            title: strings.profile.something,
            withIcon: false
          });
        }
      })
      .catch(err => {
        dispatch({ type: types.LOGIN_FAIL });
        RNToasty.Error({
          title: strings.profile.something,
          withIcon: false
        });
      });
    cb("ERROR");
  };
};

/* Method for logout request */
export const logout = componentId => {
  return dispatch => {
    dispatch({ type: types.LOGOUT });
    LoginManager.logOut();
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();

    setTimeout(() => {
      /* Navigate to signup screen */
      Navigation.setStackRoot(componentId, {
        component: {
          name: "SignIn",
          options: {
            statusBar: {},
            topBar: {
              visible: false,
              height: 0
            }
          }
        }
      });
    }, 300);
  };
};

/* Method for forgot password request */
export const forgotPassword = (email, componentId) => {
  return dispatch => {
    dispatch({ type: types.FORGOT_PASSWORD_REQUEST });
    fetch(`${SERVER_URL}user/forgot_password`, new customPostRequest(email))
      .then(res => {
        return res.json();
      })
      .then(response => {
        if (response.requestStatus == "success") {
          dispatch({ type: types.FORGOT_PASSWORD_SUCCESS, payload: response });
          /* Navigate to Signin  screen */
          Navigation.push(componentId, {
            component: {
              name: "SignIn",
              options: {
                statusBar: {},
                topBar: {
                  visible: false,
                  height: 0
                }
              }
            }
          });

          setTimeout(() => {
            RNToasty.Success({
              title: "Please check your email for reset password link.",
              withIcon: false
            });
          }, 300);
        } else if (response.requestStatus == "invalid") {
          dispatch({ type: types.FORGOT_PASSWORD_FAIL });
          RNToasty.Error({
            title:
              "Sorry. We cannot find any account associated with this email.",
            withIcon: false
          });
        } else {
          dispatch({ type: types.FORGOT_PASSWORD_FAIL });
          RNToasty.Error({
            title: "Something went wrong",
            withIcon: false
          });
        }
      })
      .catch(err => {
        RNToasty.Error({
          title: `${err}`
        });
        dispatch({ type: types.FORGOT_PASSWORD_FAIL });
      });
  };
};

/* Method for socail login request */
export const socialLogin = (data, cb, provider) => {
  return (dispatch, getState) => {
    dispatch({ type: types.SOCIAL_LOGIN_REQUEST, socialIs: provider });
    fetch(`${SERVER_URL}social-login`, new customPostRequest(data))
      .then(res => {
        return res.json();
      })
      .then(response => {
        if (
          (response.requestStatus == "success" && response.email_is == 1) ||
          (response.requestStatus == "success" && response.email_is == 2)
        ) {
          dispatch({
            type: types.SOCIAL_LOGIN_SUCCESS,
            payload: response,
            socialIs: provider
          });
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
          cb(response);
        } else if (
          response.requestStatus == "success" &&
          response.email_is == 0
        ) {
          dispatch({ type: types.SOCIAL_LOGIN_FAIL, socialIs: provider });
          cb(response);
        } else if (response.requestStatus == "error") {
          dispatch({ type: types.SOCIAL_LOGIN_FAIL, socialIs: provider });
          cb(response);
        } else {
          dispatch({ type: types.SOCIAL_LOGIN_FAIL, socialIs: provider });
          cb(response);
        }
      })
      .catch(err => {
        dispatch({ type: types.SOCIAL_LOGIN_FAIL, socialIs: provider });
        cb(response);
      });
  };
};
