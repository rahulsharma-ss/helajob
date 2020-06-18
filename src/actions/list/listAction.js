import React from "react";
import { SERVER_URL, PROFILE_IMG_URL, qrUrl } from "../../constants/url";
import * as types from "../../actionTypes";
import { customPost, customGet } from "../../utilities/restClient";
import { Navigation } from "react-native-navigation";
import { RNToasty } from "react-native-toasty";
import idx from "idx";
import moment from "moment";
import { GoogleSignin } from "react-native-google-signin";
import { LoginManager } from "react-native-fbsdk";

import strings from "../../constants/language";

// Method for requesting all the services provided by application

export function getServices() {
  return (dispatch, getState) => {
    let token = getState().user.userData
      ? getState().user.userData.token
      : getState().signup.data && getState().signup.data.token;
    dispatch({ type: types.GET_SERVICES_REQUEST });
    fetch(`${SERVER_URL}service`, new customGet(token))
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.requestStatus == "success") {
          dispatch({
            type: types.GET_SERVICES_SUCCESS,
            payload: responseJson
          });
        } else {
          dispatch({ type: types.GET_SERVICES_FAIL });
        }
      })
      .catch(error => {
        dispatch({ type: types.GET_SERVICES_FAIL });
      });
  };
}

// Method for requesting all the sub categories provided by application
export function getSubCategories(id) {
  return (dispatch, getState) => {
    let token = idx(getState(), _ => _.user.userData.token)
      ? idx(getState(), _ => _.user.userData.token)
      : idx(getState(), _ => _.signup.data.token);
    dispatch({ type: types.GET_SUBCATEGORIES_REQUEST });
    fetch(`${SERVER_URL}service?id=${id}`, new customGet(token))
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.requestStatus == "success") {
          dispatch({
            type: types.GET_SUBCATEGORIES_SUCCESS,
            payload: responseJson
          });
        } else {
          dispatch({ type: types.GET_SUBCATEGORIES_FAIL });
        }
      })
      .catch(error => {
        dispatch({ type: types.GET_SUBCATEGORIES_FAIL });
        RNToasty.Error({
          title: `${error}`,
          withIcon: false
        });
      });
  };
}

// Method for verifying OTP
export function otpVerification(otp, componentId, value, cb) {
  return (dispatch, getState) => {
    let token = idx(getState(), _ => _.signup.data.token);
    let details = otp.email
      ? otp
      : {
          email: value
            ? idx(getState(), _ => _.user.userData.data.email)
            : getState().signup.email,
          otp: otp.otp
        };
    dispatch({ type: types.OTP_REQUEST });
    fetch(
      `${SERVER_URL}user/register/validate-otp`,
      new customPost(details, token)
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson, "responseJson");
        if (responseJson.requestStatus == "success") {
          dispatch(getUserDetails(res => {}));
          dispatch({
            type: types.OTP_SUCCESS,
            payload: responseJson
          });
          /* Navigate to services screen */
          setTimeout(() => {
            Navigation.push(componentId, {
              component: {
                name: "Services",
                options: {
                  statusBar: {},
                  topBar: {
                    visible: false,
                    height: 0
                  }
                },
                passProps: {
                  fromDashboard: false
                }
              }
            });
          }, 600);
          RNToasty.Success({
            title: `${responseJson.message}`,
            withIcon: false
          });
          cb(responseJson);
        } else if (responseJson.requestStatus == "error") {
          dispatch({ type: types.OTP_FAIL });
          RNToasty.Error({
            title: `${responseJson.message}`,
            withIcon: false
          });
          cb(responseJson);
        } else {
          dispatch({ type: types.OTP_FAIL });
          RNToasty.Error({
            title: strings.profile.something,
            withIcon: false
          });
          cb(responseJson);
        }
      })
      .catch(error => {
        dispatch({ type: types.OTP_FAIL });
        RNToasty.Error({
          title: `${error}`,
          withIcon: false
        });
        cb("ERROR");
      });
  };
}

// Method for resending OTP code
export function resendOtp(type) {
  return (dispatch, getState) => {
    let token =
      idx(getState(), _ => _.signup.data.token) ||
      idx(getState(), _ => _.user.userData.token);
    let id = {
      user_id:
        idx(getState(), _ => _.user.userData.data.id.toString()) ||
        idx(getState(), _ => _.signup.data.data.user_id.toString()),
      sent_to: type
    };
    dispatch({ type: types.RESEND_OTP_REQUEST });
    fetch(`${SERVER_URL}user/resend_OTP`, new customPost(id, token))
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.requestStatus == "success") {
          dispatch({
            type: types.RESEND_OTP_SUCCESS,
            payload: responseJson
          });
          RNToasty.Success({
            title: `${responseJson.message}`,
            withIcon: false
          });
        } else if (responseJson.requestStatus == "error") {
          dispatch({ type: types.RESEND_OTP_FAIL });
          RNToasty.Error({
            title: `${responseJson.message}`,
            withIcon: false
          });
        } else {
          dispatch({ type: types.RESEND_OTP_FAIL });
          RNToasty.Error({
            title: strings.profile.something,
            withIcon: false
          });
        }
      })
      .catch(error => {
        dispatch({ type: types.RESEND_OTP_FAIL });
        RNToasty.Error({
          title: `${error}`,
          withIcon: false
        });
      });
  };
}

// Method for setting location while making a request
export const setLocation = (
  formatted_lat,
  formatted_lng,
  formatted_address,
  cb
) => {
  return (dispatch, getState) => {
    let token =
      idx(getState(), _ => _.signup.data.token) ||
      idx(getState(), _ => _.user.userData.token);
    let user_id =
      idx(getState(), _ => _.user.userData.data.id) ||
      idx(getState(), _ => _.signup.data.data.user_id);
    dispatch({ type: types.UPDATE_LOCATION_REQUEST });
    latitude = (formatted_lat && formatted_lat.toString()) || 0;
    longitude = (formatted_lng && formatted_lng.toString()) || 0;

    fetch(
      `${SERVER_URL}user/updatelocationCustomer`,
      new customPost({ user_id, latitude, longitude, formatted_address }, token)
    )
      .then(response => {
        return response.json();
      })
      .then(response => {
        if (response.requestStatus === "success") {
          dispatch({ type: types.UPDATE_LOCATION_SUCCESS, payload: response });
          cb(1);
        } else {
          dispatch({ type: types.UPDATE_LOCATION_FAIL });
          cb(0);
        }
      })
      .catch(err => {
        dispatch({ type: types.UPDATE_LOCATION_FAIL });
        cb(0);
      });
  };
};

// Method for saving current coordinates
export const saveLocation = coords => {
  return dispatch => {
    dispatch({ type: "SAVE_LOCATION", payload: coords });
  };
};

export const addCard = (details, cb) => {
  return (dispatch, getState) => {
    let token = idx(getState(), _ => _.user.userData.token)
      ? idx(getState(), _ => _.user.userData.token)
      : idx(getState(), _ => _.signup.data.token);
    let user_id =
      idx(getState(), _ => _.user.userData.data.id.toString()) ||
      idx(getState(), _ => _.signup.data.data.user_id.toString());
    let cardDetails = {
      user_id: user_id,
      card_no: details.card_no,
      card_month: details.card_month,
      card_year: details.card_year,
      card_cvv: details.card_cvv,
      set_primary: 1
    };
    dispatch({ type: "ADD CARD REQ" });
    fetch(`${SERVER_URL}stripe/add-card`, new customPost(cardDetails, token))
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        console.log(cardDetails, "ADD CARD SUCC", responseJson);
        if (responseJson.requestStatus == "success") {
          dispatch({ type: "ADD CARD SUCC" });
          dispatch(getCards(cb => {}));
          RNToasty.Success({
            title: strings.rating.card,
            withIcon: false
          });
          cb(1);
        } else if (
          responseJson.requestStatus == "error" ||
          responseJson.requestStatus == "invalid"
        ) {
          dispatch({ type: "ADD CARD FAIL" });
          RNToasty.Error({
            title: `${responseJson.message}`,
            withIcon: false
          });
          cb(0);
        } else {
          dispatch({ type: "ADD CARD FAIL" });
          RNToasty.Error({
            title: strings.profile.something,
            withIcon: false
          });
          cb(0);
        }
      })
      .catch(err => {
        RNToasty.Error({
          title: strings.profile.something,
          withIcon: false
        });
        dispatch({ type: "ADD CARD FAIL" });
        cb(0);
      });
  };
};

// Method for requesting all credit cards added in application
export const getCards = cb => {
  return (dispatch, getState) => {
    let user_id = {
      user_id:
        idx(getState(), _ => _.user.userData.data.id.toString()) ||
        idx(getState(), _ => _.signup.data.data.user_id.toString())
    };
    let token = idx(getState(), _ => _.user.userData.token)
      ? idx(getState(), _ => _.user.userData.token)
      : idx(getState(), _ => _.signup.data.token);
    dispatch({ type: "REC CARD REQ" });
    fetch(`${SERVER_URL}stripe/cards`, new customPost(user_id, token))
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        if (responseJson.requestStatus == "success") {
          cb(responseJson);
          dispatch({ type: "REC CARD SUCC", payload: responseJson });
        } else if (responseJson.requestStatus == "error") {
          cb(responseJson);

          dispatch({ type: "REC CARD FAIL", payload: responseJson });
        } else {
          cb(responseJson);
          dispatch({ type: "REC CARD FAIL" });
        }
      })
      .catch(err => {
        dispatch({ type: "REC CARD FAIL" });
        cb({ requestStatus: "error" });
      });
  };
};

// Method for adding new locations
export const addAddress = details => {
  return (dispatch, getState) => {
    let user_id =
      idx(getState(), _ => _.user.userData.data.id.toString()) ||
      idx(getState(), _ => _.signup.data.data.user_id.toString());

    let token = idx(getState(), _ => _.user.userData.token)
      ? idx(getState(), _ => _.user.userData.token)
      : idx(getState(), _ => _.signup.data.token);

    let address = details.id
      ? {
          id: details.id,
          user_id: user_id,
          latitude: details.latitude,
          longitude: details.longitude,
          location_name: details.location_name,
          street_address: details.street_address,
          street_address1: details.street_address1,
          postal_code: details.postal_code,
          is_home: details.is_home,
          is_job: details.is_job,
          is_fav: details.is_fav
        }
      : {
          user_id: user_id,
          latitude: details.latitude,
          longitude: details.longitude,
          location_name: details.location_name,
          street_address: details.street_address,
          street_address1: details.street_address1,
          postal_code: details.postal_code,
          is_home: details.is_home,
          is_job: details.is_job,
          is_fav: details.is_fav
        };
    dispatch({ type: types.ADD_ADDRESS_REQUEST });
    fetch(`${SERVER_URL}user/addLocation`, new customPost(address, token))
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        RNToasty.Success({
          title: "Address added",
          withIcon: false
        });
        dispatch({ type: types.ADD_ADDRESS_SUCCESS });
        dispatch(getAllAdddress());
      })
      .catch(err => {
        RNToasty.Error({
          title: strings.profile.something,
          withIcon: false
        });
        dispatch({ type: types.ADD_ADDRESS_FAIL });
      });
  };
};

// Method for cancelling a service request
export const cancelRequest = details => {
  return (dispatch, getState) => {
    let token = idx(getState(), _ => _.user.userData.token)
      ? idx(getState(), _ => _.user.userData.token)
      : idx(getState(), _ => _.signup.data.token);
    dispatch({ type: types.CANCEL_REQUEST });
    fetch(`${SERVER_URL}service/cancelService`, new customPost(details, token))
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        dispatch(getScheduledservices());
        if (responseJson.requestStatus == "success") {
          dispatch({ type: types.CANCEL_SUCCESS });
        } else if (responseJson.code == "300") {
          dispatch({ type: types.CANCEL_SUCCESS });
          RNToasty.Error({
            title: responseJson.dev,
            withIcon: false
          });
        } else if (responseJson.requestStatus == "error") {
          dispatch({ type: types.CANCEL_SUCCESS });
        }
      })
      .catch(err => {
        dispatch({ type: types.CANCEL_FAIL });
      });
  };
};

// Method for requesting all the address added in application
export const getAllAdddress = () => {
  return (dispatch, getState) => {
    let id = {
      user_id:
        idx(getState(), _ => _.user.userData.data.id.toString()) ||
        idx(getState(), _ => _.signup.data.data.user_id.toString())
    };

    let token = idx(getState(), _ => _.user.userData.token)
      ? idx(getState(), _ => _.user.userData.token)
      : idx(getState(), _ => _.signup.data.token);

    dispatch({ type: types.ALL_ADDRESS_REQUEST });
    fetch(`${SERVER_URL}user/listLocations`, new customPost(id, token))
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        if (responseJson.requestStatus == "success") {
          dispatch({ type: types.ALL_ADDRESS_SUCCESS, payload: responseJson });
        } else {
          dispatch({ type: types.ALL_ADDRESS_FAIL });
        }
      })
      .catch(err => {
        dispatch({ type: types.ALL_ADDRESS_FAIL });
      });
  };
};

// Method for requesting all the scheduled services
export const getScheduledservices = () => {
  return (dispatch, getState) => {
    let user_id =
      idx(getState(), _ => _.user.userData.data.id.toString()) ||
      idx(getState(), _ => _.signup.data.data.user_id.toString());

    let token = idx(getState(), _ => _.user.userData.token)
      ? idx(getState(), _ => _.user.userData.token)
      : idx(getState(), _ => _.signup.data.token);

    let data = {
      user_id: user_id,
      page: "1",
      limit: "100"
    };
    dispatch({ type: types.SCHEDULED_SERVICES_REQUEST });
    fetch(`${SERVER_URL}servicesListingCustomer`, new customPost(data, token))
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        if (responseJson.requestStatus == "success") {
          dispatch({
            type: types.SCHEDULED_SERVICES_SUCCESS,
            payload: responseJson
          });
        } else {
          dispatch({ type: types.SCHEDULED_SERVICES_FAIL });
        }
      })
      .catch(err => {
        dispatch({ type: types.SCHEDULED_SERVICES_FAIL });
      });
  };
};

// Method for requesting the QR code
export const requestQr = (details, type) => {
  let QR_URL = qrUrl(type);

  return (dispatch, getState) => {
    let token = idx(getState(), _ => _.user.userData.token)
      ? idx(getState(), _ => _.user.userData.token)
      : idx(getState(), _ => _.signup.data.token);

    dispatch({ type: types.QR_REQUEST });
    fetch(`${SERVER_URL}${QR_URL}`, new customPost(details, token))
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        if (responseJson.requestStatus == "success") {
          dispatch({
            type: types.QR_SUCCESS,
            payload: responseJson
          });
        } else if (responseJson.requestStatus == "invalid") {
        } else {
          dispatch({ type: types.QR_FAIL });
        }
      })
      .catch(err => {
        dispatch({ type: types.QR_FAIL });
      });
  };
};

// Method for requesting expert details
export const getExpertDetails = details => {
  return (dispatch, getState) => {
    let token = idx(getState(), _ => _.user.userData.token)
      ? idx(getState(), _ => _.user.userData.token)
      : idx(getState(), _ => _.signup.data.token);

    dispatch({ type: types.EXPERT_DETAILS_REQUEST });
    fetch(`${SERVER_URL}getExpertDetail`, new customPost(details, token))
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        if (responseJson.requestStatus == "success") {
          dispatch({
            type: types.EXPERT_DETAILS_SUCCESS,
            payload: responseJson
          });
        } else {
          dispatch({ type: types.EXPERT_DETAILS_FAIL });
        }
      })
      .catch(err => {
        dispatch({ type: types.EXPERT_DETAILS_FAIL });
      });
  };
};

// Method for requesting user details
export const getUserDetails = res => {
  return (dispatch, getState) => {
    let token = idx(getState(), _ => _.user.userData.token)
      ? idx(getState(), _ => _.user.userData.token)
      : idx(getState(), _ => _.signup.data.token);

    let userId = {
      user_id:
        idx(getState(), _ => _.user.userData.data.id.toString()) ||
        idx(getState(), _ => _.signup.data.data.user_id.toString())
    };

    dispatch({ type: types.USER_DETAILS_REQUEST });
    fetch(`${SERVER_URL}getUserDetail`, new customPost(userId, token))
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        if (responseJson.requestStatus == "success") {
          dispatch({
            type: types.USER_DETAILS_SUCCESS,
            payload: responseJson
          });
          res(responseJson.data[0]);
        } else {
          dispatch({ type: types.USER_DETAILS_FAIL });
        }
      })
      .catch(err => {
        dispatch({ type: types.USER_DETAILS_FAIL });
      });
  };
};

// Method for requesting all the schats initiated by a customer
export const chatList = () => {
  return (dispatch, getState) => {
    let token = idx(getState(), _ => _.user.userData.token)
      ? idx(getState(), _ => _.user.userData.token)
      : idx(getState(), _ => _.signup.data.token);

    let user_id =
      idx(getState(), _ => _.user.userData.data.id.toString()) ||
      idx(getState(), _ => _.signup.data.data.user_id.toString());

    let chatData = {
      user_id: user_id,
      page: "1",
      limit: "100"
    };
    dispatch({ type: types.CHAT_DETAILS_REQUEST });
    fetch(`${SERVER_URL}listChat`, new customPost(chatData, token))
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        if (responseJson.requestStatus == "success") {
          dispatch({
            type: types.CHAT_DETAILS_SUCCESS,
            payload: responseJson
          });
        } else {
          dispatch({ type: types.CHAT_DETAILS_FAIL });
        }
      })
      .catch(err => {
        dispatch({ type: types.CHAT_DETAILS_FAIL });
      });
  };
};

// Method for requesting all the messages of a customer
export const getMessages = chatData => {
  return (dispatch, getState) => {
    let token = idx(getState(), _ => _.user.userData.token)
      ? idx(getState(), _ => _.user.userData.token)
      : idx(getState(), _ => _.signup.data.token);

    dispatch({ type: types.ALL_CHAT_DETAILS_REQUEST });
    fetch(`${SERVER_URL}listMessages`, new customPost(chatData, token))
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        if (responseJson.requestStatus == "success") {
          responseJson.data.map(item => {
            let newUser = {
              avatar:
                item.user && item.user.avatar
                  ? `${PROFILE_IMG_URL}${item.user.avatar}`
                  : "https://placeimg.com/140/140/any",
              name: item.user && item.user.name ? item.user.name : "",
              _id: item.user && item.user.id ? item.user.id : 0
            };
            delete item.user;
            return (item.user = newUser);
          });
          dispatch({
            type: types.ALL_CHAT_DETAILS_SUCCESS,
            payload: responseJson.data
          });
        } else {
          dispatch({ type: types.ALL_CHAT_DETAILS_FAIL });
        }
      })
      .catch(err => {
        RNToasty.Error({
          title: strings.profile.something
        });
        dispatch({ type: types.ALL_CHAT_DETAILS_FAIL });
      });
  };
};

// Method for sending the device token to DB
export const notificationToken = data => {
  return (dispatch, getState) => {
    let token = idx(getState(), _ => _.user.userData.token)
      ? idx(getState(), _ => _.user.userData.token)
      : idx(getState(), _ => _.signup.data.token);

    dispatch({ type: types.NOTIFICATION_REQUEST });
    fetch(`${SERVER_URL}updateDeviceToken`, new customPost(data, token))
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        console.log(responseJson, "responseJsonresponseJsonresponseJson", data);
        if (responseJson.requestStatus == "success") {
          dispatch({
            type: types.NOTIFICATION_SUCCESS,
            payload: data
          });
        } else {
          dispatch({ type: types.NOTIFICATION_FAIL });
        }
      })
      .catch(err => {
        dispatch({ type: types.NOTIFICATION_FAIL });
      });
  };
};

// Method for requesting customer job history
export const customerInvoice = () => {
  return (dispatch, getState) => {
    let token = idx(getState(), _ => _.user.userData.token)
      ? idx(getState(), _ => _.user.userData.token)
      : idx(getState(), _ => _.signup.data.token);

    let user_id =
      idx(getState(), _ => _.user.userData.data.id.toString()) ||
      idx(getState(), _ => _.signup.data.data.user_id.toString());

    let customerHistory = {
      user_id: user_id,
      page: "1",
      limit: "100"
    };
    dispatch({ type: types.USER_HISTORY_REQUEST });
    fetch(
      `${SERVER_URL}listCustomerInvoice`,
      new customPost(customerHistory, token)
    )
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        if (responseJson.requestStatus == "success") {
          dispatch({
            type: types.USER_HISTORY_SUCCESS,
            payload: responseJson
          });
        } else {
          dispatch({ type: types.USER_HISTORY_FAIL });
        }
      })
      .catch(err => {
        dispatch({ type: types.USER_HISTORY_FAIL });
      });
  };
};

// Method for saving service type to store
export const serviceType = data => {
  return async (dispatch, getState) => {
    dispatch({ type: "SERVICE_TYPE", payload: data });
  };
};

// Method for saving service type to store
export const serviceType1 = data => {
  return async (dispatch, getState) => {
    dispatch({ type: "SERVICE_TYPE", payload: data });
  };
};

// Method for saving notification details to store

export const setNotificationDetails = data => {
  return async (dispatch, getState) => {
    dispatch({ type: "NOTIFICATION_DETAIL", payload: data });
  };
};

// Method for saving coordinates to store

export const myLatLong = data => {
  return async (dispatch, getState) => {
    dispatch({ type: "MY_COORDS", payload: data });
  };
};

// Method for requesting total wallet amount
export const getWalletAmount = cb => {
  return (dispatch, getState) => {
    let token = idx(getState(), _ => _.user.userData.token)
      ? idx(getState(), _ => _.user.userData.token)
      : idx(getState(), _ => _.signup.data.token);

    let id = {
      user_id:
        idx(getState(), _ => _.user.userData.data.id.toString()) ||
        idx(getState(), _ => _.signup.data.data.user_id.toString())
    };

    dispatch({ type: types.WALLET_REQUEST });
    fetch(`${SERVER_URL}listWalletAmount`, new customPost(id, token))
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        if (responseJson.requestStatus) {
          dispatch({
            type: types.WALLET_SUCCESS,
            payload: responseJson
          });
          cb(responseJson);
        } else {
          dispatch({ type: types.WALLET_FAIL });
        }
      })
      .catch(err => {
        dispatch({ type: types.WALLET_FAIL });
      });
  };
};

// Method for coupon code verification from job finish screen

export const couponVerification = (code, cb) => {
  return (dispatch, getState) => {
    let token = idx(getState(), _ => _.user.userData.token)
      ? idx(getState(), _ => _.user.userData.token)
      : idx(getState(), _ => _.signup.data.token);

    user_id =
      idx(getState(), _ => _.user.userData.data.id.toString()) ||
      idx(getState(), _ => _.signup.data.data.user_id.toString());

    data = {
      user_id: user_id,
      coupon: code
    };

    dispatch({ type: types.COUPON_REQUEST });
    fetch(`${SERVER_URL}applyCouponCode`, new customPost(data, token))
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        if (responseJson.requestStatus == "true") {
          dispatch({
            type: types.COUPON_SUCCESS,
            payload: responseJson
          });
          RNToasty.Success({
            title: strings.profile.coupon,
            withIcon: false
          });
          cb(responseJson);
        } else {
          dispatch({ type: types.COUPON_FAIL });
          RNToasty.Error({
            title: strings.profile.invalid,
            withIcon: false
          });
          cb(0);
        }
      })
      .catch(err => {
        RNToasty.Error({
          title: strings.profile.something,
          withIcon: false
        });
        dispatch({ type: types.COUPON_FAIL });
        cb(0);
      });
  };
};

// Method for coupon verification fron add money screen

export const couponVerification1 = (code, cb) => {
  return (dispatch, getState) => {
    let token = idx(getState(), _ => _.user.userData.token)
      ? idx(getState(), _ => _.user.userData.token)
      : idx(getState(), _ => _.signup.data.token);

    user_id =
      idx(getState(), _ => _.user.userData.data.id.toString()) ||
      idx(getState(), _ => _.signup.data.data.user_id.toString());

    data = {
      user_id: user_id,
      coupon: code
    };

    dispatch({ type: types.COUPON_REQUEST1 });
    fetch(`${SERVER_URL}verifyCouponCode`, new customPost(data, token))
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        if (responseJson.requestStatus == "true") {
          dispatch({
            type: types.COUPON_SUCCESS1,
            payload: responseJson
          });
          RNToasty.Success({
            title: strings.profile.coupon,
            withIcon: false
          });
          cb(responseJson);
        } else {
          dispatch({ type: types.COUPON_FAIL1 });
          RNToasty.Error({
            title: strings.profile.invalid,
            withIcon: false
          });
          cb(0);
        }
      })
      .catch(err => {
        RNToasty.Error({
          title: strings.profile.something,
          withIcon: false
        });
        dispatch({ type: types.COUPON_FAIL1 });
        cb(0);
      });
  };
};

// Method for adding money to wallet amount

export const addMoney = (card_Id, amount, cb) => {
  return (dispatch, getState) => {
    let token = idx(getState(), _ => _.user.userData.token)
      ? idx(getState(), _ => _.user.userData.token)
      : idx(getState(), _ => _.signup.data.token);

    user_id =
      idx(getState(), _ => _.user.userData.data.id.toString()) ||
      idx(getState(), _ => _.signup.data.data.user_id.toString());

    let data = {
      user_id: user_id,
      card_id: card_Id,
      amount: amount
    };
    dispatch({ type: types.ADD_MONEY_REQUEST });
    fetch(`${SERVER_URL}addMoneyToWallet`, new customPost(data, token))
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        console.log("RESPONSE", responseJson);
        if (responseJson.requestStatus == "success") {
          dispatch({
            type: types.ADD_MONEY_SUCCESS,
            payload: responseJson
          });
          dispatch(getWalletAmount(cb => {}));
          cb(responseJson);
        } else if (responseJson.requestStatus == "invalid") {
          RNToasty.Error({
            title: `${responseJson.message}`,
            withIcon: false
          });
          dispatch({ type: types.ADD_MONEY_FAIL });
        } else {
          dispatch({ type: types.ADD_MONEY_FAIL });
        }
      })
      .catch(err => {
        dispatch({ type: types.ADD_MONEY_FAIL });
      });
  };
};

// Method controlling payment modal

export const setSuccessModal = data => {
  return async (dispatch, getState) => {
    dispatch({ type: "SUCCESS_MADAL", payload: data });
  };
};

// Method for requesting chat id for initiating chat

export const getChatId = (expertId, cb) => {
  return (dispatch, getState) => {
    let token = idx(getState(), _ => _.user.userData.token)
      ? idx(getState(), _ => _.user.userData.token)
      : idx(getState(), _ => _.signup.data.token);

    let user_id =
      idx(getState(), _ => _.user.userData.data.id) ||
      idx(getState(), _ => _.signup.data.data.user_id);

    let data = {
      sender: Number(user_id),
      receiver: expertId
    };

    dispatch({ type: types.CHAT_ID_REQUEST });
    fetch(`${SERVER_URL}getChatID`, new customPost(data, token))
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        if (responseJson.requestStatus == "success") {
          cb(responseJson.data);
          dispatch({
            type: types.CHAT_ID_SUCCESS,
            payload: responseJson
          });
        } else {
          dispatch({ type: types.CHAT_ID_FAIL });
        }
      })
      .catch(err => {
        dispatch({ type: types.CHAT_ID_FAIL });
      });
  };
};

// Method for clear user session from devicce

export const clearSession = () => {
  return (dispatch, getState) => {
    let token = idx(getState(), _ => _.user.userData.token)
      ? idx(getState(), _ => _.user.userData.token)
      : idx(getState(), _ => _.signup.data.token);

    user_id =
      idx(getState(), _ => _.user.userData.data.id.toString()) ||
      idx(getState(), _ => _.signup.data.data.user_id.toString());

    let data = { token: token, user_id: user_id };

    dispatch({ type: types.CLEAR_SESSION_REQUEST });
    fetch(`${SERVER_URL}logout`, new customPost(data, token))
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        console.log("CLEAR_SESSION_SUCCESS", responseJson);
        if (responseJson.success == true) {
          dispatch({
            type: types.CLEAR_SESSION_SUCCESS,
            payload: responseJson
          });
        } else {
          dispatch({ type: types.CLEAR_SESSION_FAIL });
        }
      })
      .catch(err => {
        dispatch({ type: types.CLEAR_SESSION_FAIL });
      });
  };
};

// Method for updating user profile

export function updateProfile(picture, firstName, lastName, password) {
  return (dispatch, getState) => {
    user_id =
      idx(getState(), _ => _.user.userData.data.id.toString()) ||
      idx(getState(), _ => _.signup.data.data.user_id.toString());
    let token = idx(getState(), _ => _.user.userData.token)
      ? idx(getState(), _ => _.user.userData.token)
      : idx(getState(), _ => _.signup.data.token);

    var profile_image = {
      uri: (picture && picture.uri) || picture,
      type: "image/jpeg",
      name: "image.jpg"
    };

    var data = new FormData();
    data.append("profile_image", profile_image);
    data.append("firstname", firstName);
    data.append("lastname", lastName);
    data.append("password", password);
    data.append("user_id", user_id);
    dispatch({ type: types.UPDATE_PROFILE_REQUEST });
    fetch(`${SERVER_URL}updateCustomerProfile`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      },
      body: data
    })
      .then(response => response.json())
      .then(responseJson => {
        dispatch({
          type: types.UPDATE_PROFILE_SUCCESS,
          payload: responseJson
        });
        dispatch(getUserDetails(res => {}));
        RNToasty.Success({
          title: strings.profile.success,
          withIcon: false
        });
      })
      .catch(err => {
        dispatch({ type: types.UPDATE_PROFILE_FAIL });
        dispatch(getUserDetails(res => {}));
      });
  };
}

// Method for requesting total time and break time for a service

export const getFinshTime = (data, cb) => {
  return (dispatch, getState) => {
    let token = idx(getState(), _ => _.user.userData.token)
      ? idx(getState(), _ => _.user.userData.token)
      : idx(getState(), _ => _.signup.data.token);

    dispatch({ type: types.JOB_INFO_REQUEST });
    fetch(`${SERVER_URL}finishJobCustomer`, new customPost(data, token))
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        if (responseJson.requestStatus == "success") {
          dispatch({
            type: types.JOB_INFO_SUCCESS,
            payload: responseJson.data
          });
          cb(responseJson.data);
        } else {
          dispatch({ type: types.JOB_INFO_FAIL });
        }
      })
      .catch(err => {
        dispatch({ type: types.JOB_INFO_FAIL });
      });
  };
};

// Method for manging countdown timer
export const manageTimer = data => {
  return async (dispatch, getState) => {
    dispatch({ type: types.MANAGE_TIMER, payload: data });
  };
};

// Method for manging countdown timer
export const setPauseTimer = data => {
  return async (dispatch, getState) => {
    dispatch({ type: "SET_TIMER", payload: data });
  };
};

// Method forremoving already added address
export const deleteAddress = data => {
  return (dispatch, getState) => {
    let token = idx(getState(), _ => _.user.userData.token)
      ? idx(getState(), _ => _.user.userData.token)
      : idx(getState(), _ => _.signup.data.token);

    dispatch({ type: types.DELETE_ADDRESS_REQUEST });
    fetch(`${SERVER_URL}user/deleteLocations`, new customPost(data, token))
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        if (responseJson.requestStatus == "success") {
          dispatch({
            type: types.DELETE_ADDRESS_SUCCESS,
            payload: responseJson.data
          });
          dispatch(getAllAdddress());
        } else {
          dispatch({ type: types.DELETE_ADDRESS_FAIL });
        }
      })
      .catch(err => {
        RNToasty.Error({
          title: strings.profile.something,
          withIcon: false
        });
        dispatch({ type: types.DELETE_ADDRESS_FAIL });
      });
  };
};

// Method for paying money for a service
export const payMoney = (data, cb) => {
  return (dispatch, getState) => {
    let token = idx(getState(), _ => _.user.userData.token)
      ? idx(getState(), _ => _.user.userData.token)
      : idx(getState(), _ => _.signup.data.token);

    dispatch({ type: types.PAYMENT_REQUEST });
    fetch(`${SERVER_URL}makePaymentForService`, new customPost(data, token))
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        console.log(data, "PAYMENT SUCCESSFUL", responseJson);
        if (responseJson.requestStatus == "success") {
          dispatch({
            type: types.PAYMENT_SUCCESS,
            payload: responseJson.data
          });
          cb(true);
        } else if (responseJson.requestStatus == "fail") {
          dispatch({ type: types.PAYMENT_FAIL });
          RNToasty.Error({
            title: responseJson.message,
            withIcon: false
          });

          cb(false);
        } else if (
          responseJson.requestStatus == "invalid" &&
          responseJson.code == 300
        ) {
          dispatch({ type: types.PAYMENT_FAIL });
          RNToasty.Error({
            title: strings.payment.error,
            withIcon: false
          });
          cb(false);
        } else {
          dispatch({ type: types.PAYMENT_FAIL });
          RNToasty.Error({
            title: strings.payment.error1,
            withIcon: false
          });
          cb(false);
        }
      })
      .catch(err => {
        console.log(data, "PAYMENT SUCCESSFUL ERRRR", err);
        RNToasty.Error({
          title: strings.profile.something,
          withIcon: false
        });
        dispatch({ type: types.PAYMENT_FAIL });
        cb(false);
      });
  };
};

// Method for checking for card or wallet amount before service request
export const checkPaymentMethod = amount => {
  return (dispatch, getState) => {
    let token = idx(getState(), _ => _.user.userData.token)
      ? idx(getState(), _ => _.user.userData.token)
      : idx(getState(), _ => _.signup.data.token);

    user_id =
      idx(getState(), _ => _.user.userData.data.id.toString()) ||
      idx(getState(), _ => _.signup.data.data.user_id.toString());

    let details = {
      user_id: user_id,
      amount: amount
    };
    dispatch({ type: types.CHECK_PAYMENT_REQUEST });
    fetch(`${SERVER_URL}checkCreditCard`, new customPost(details, token))
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        if (responseJson.requestStatus == "success") {
          dispatch({
            type: types.CHECK_PAYMENT_SUCCESS,
            payload: responseJson.data
          });
        } else {
          dispatch({ type: types.CHECK_PAYMENT_FAIL });
        }
      })
      .catch(err => {
        dispatch({ type: types.CHECK_PAYMENT_FAIL });
      });
  };
};

// Method for rating an expert
export const rateToExpert = (data, cb) => {
  return (dispatch, getState) => {
    let token = idx(getState(), _ => _.user.userData.token)
      ? idx(getState(), _ => _.user.userData.token)
      : idx(getState(), _ => _.signup.data.token);

    dispatch({ type: types.RATE_REQUEST });
    fetch(`${SERVER_URL}serviceRating`, new customPost(data, token))
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        if (responseJson.requestStatus == "success") {
          dispatch({
            type: types.RATE_SUCCESS,
            payload: responseJson.data
          });
          dispatch(clearCoupon());

          RNToasty.Success({
            title: strings.rating.rating,
            withIcon: false
          });
          cb(responseJson);
        } else {
          dispatch(clearCoupon());
          dispatch(customerInvoice());
          dispatch({ type: types.RATE_FAIL });
          cb(responseJson);
        }
      })
      .catch(err => {
        RNToasty.Error({
          title: strings.profile.something,
          withIcon: false
        });
        dispatch({ type: types.RATE_FAIL });
        cb(responseJson);
      });
  };
};

// Method for listin all the customer transactions
export const listRecentTransactions = data => {
  return (dispatch, getState) => {
    let token = idx(getState(), _ => _.user.userData.token)
      ? idx(getState(), _ => _.user.userData.token)
      : idx(getState(), _ => _.signup.data.token);

    let id = {
      user_id:
        idx(getState(), _ => _.user.userData.data.id.toString()) ||
        idx(getState(), _ => _.signup.data.data.user_id.toString())
    };

    dispatch({ type: types.TRANSACTION_REQUEST });
    fetch(`${SERVER_URL}listCustomerTransection`, new customPost(id, token))
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        if (responseJson.requestStatus == "success") {
          console.log(responseJson, "responseJson");

          let scheduledServices = responseJson.data.filter(item =>
            moment(item.service_end_time).format("YYYY-MM-DD")
          );

          let sectionData = [];
          scheduledServices &&
            scheduledServices.map(item => {
              let dateAdded = sectionData.find(
                o =>
                  moment(o.title).format("YYYY-MM-DD") ===
                  moment(item.booking_date).format("YYYY-MM-DD")
              );

              sectionData.push({
                title: dateAdded ? null : item.booking_date,
                data: [
                  {
                    service: { service: item.service && item.service.service },
                    expert: { fullname: item.expert && item.expert.fullname },
                    status: item.status,
                    booking_date: item.booking_date,
                    id: item.id,
                    ref_number: item.ref_number,
                    sub_total:
                      (item.service_payment &&
                        item.service_payment.total_price) ||
                      0,
                    customer_closing_balance:
                      item.service_payment &&
                      item.service_payment.customer_closing_balance,
                    expert_id: item.expert_id
                  }
                ]
              });
            });
          dispatch({
            type: types.TRANSACTION_SUCCESS,
            payload: sectionData
          });
        } else {
          dispatch({ type: types.TRANSACTION_FAIL });
        }
      })
      .catch(err => {
        console.log(err, "responseJson");

        dispatch({ type: types.TRANSACTION_FAIL });
      });
  };
};

// Method for listing all the history for a particular expert
export const listExpertHistoryForCustomer = (expertId, request_id) => {
  return (dispatch, getState) => {
    let token = idx(getState(), _ => _.user.userData.token)
      ? idx(getState(), _ => _.user.userData.token)
      : idx(getState(), _ => _.signup.data.token);

    let user_id =
      idx(getState(), _ => _.user.userData.data.id.toString()) ||
      idx(getState(), _ => _.signup.data.data.user_id.toString());

    let data = {
      user_id: user_id,
      expert_id: expertId,
      request_id: request_id
    };
    dispatch({ type: types.EXPERT_HISTORY_REQUEST });
    fetch(
      `${SERVER_URL}listExpertHistoryForCustomer`,
      new customPost(data, token)
    )
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        if (responseJson.requestStatus == "success") {
          dispatch({
            type: types.EXPERT_HISTORY_SUCCESS,
            payload: responseJson.data
          });
        } else {
          dispatch({ type: types.EXPERT_HISTORY_FAIL });
        }
      })
      .catch(err => {
        RNToasty.Error({
          title: strings.profile.something,
          withIcon: false
        });
        dispatch({ type: types.EXPERT_HISTORY_FAIL });
      });
  };
};

// Method for deductiong money right before a job request
export const deductMoney = (value, cb) => {
  console.log("DEDUCT MONEY 1", value);
  return (dispatch, getState) => {
    let token = idx(getState(), _ => _.user.userData.token)
      ? idx(getState(), _ => _.user.userData.token)
      : idx(getState(), _ => _.signup.data.token);
    // let id = {
    //   request_id: request_id
    // };
    dispatch({ type: types.DEDUCT_MONEY_REQUEST });
    fetch(
      `${SERVER_URL}deductJobPriceAndAddToWallet`,
      new customPost(value, token)
    )
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        console.log("==============>", responseJson);
        if (responseJson.requestStatus == "success") {
          cb(false);
          dispatch({
            type: types.DEDUCT_MONEY_SUCCESS
          });
          dispatch(getWalletAmount(response => {}));
        } else {
          cb(true);
          dispatch({ type: types.DEDUCT_MONEY_FAIL });
        }
      })
      .catch(err => {
        cb(true);
        dispatch({ type: types.DEDUCT_MONEY_FAIL });
      });
  };
};

// Method for manging searching modal
export const searchingModalStatus = data => {
  return async (dispatch, getState) => {
    dispatch({ type: "SEARCH_MODAL_IS", payload: data });
  };
};

// Method for manging payment modal
export const paymentSuccessModal = data => {
  return async (dispatch, getState) => {
    dispatch({ type: "PAYMENT_MODAL_IS", payload: data });
  };
};

// Method for manging card added  modal
export const addCardModal = data => {
  return async (dispatch, getState) => {
    dispatch({ type: "ADD_CARD_MODAL_IS", payload: data });
  };
};

// Method for getting all reviews received by Customer
export const getMyReviews = () => {
  return (dispatch, getState) => {
    let token = idx(getState(), _ => _.user.userData.token)
      ? idx(getState(), _ => _.user.userData.token)
      : idx(getState(), _ => _.signup.data.token);

    let user_id =
      idx(getState(), _ => _.user.userData.data.id.toString()) ||
      idx(getState(), _ => _.signup.data.data.user_id.toString());
    let data = {
      user_id: user_id,
      user_type: "1"
    };
    dispatch({ type: types.REVIEW_REQUEST });
    fetch(`${SERVER_URL}listReviews`, new customPost(data, token))
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        if (responseJson.requestStatus == "success") {
          dispatch({
            type: types.REVIEW_SUCCESS,
            payload: responseJson.data
          });
        } else {
          dispatch({ type: types.REVIEW_FAIL });
        }
      })
      .catch(err => {
        dispatch({ type: types.REVIEW_FAIL });
      });
  };
};

// Method for getting job details for a particular job
export const jobDetails = (price, sub, cat) => {
  let subCategoryData = {
    price: price,
    service: sub,
    categoryName: cat
  };
  return async (dispatch, getState) => {
    dispatch({ type: "JOB_DETAILS", payload: subCategoryData });
  };
};

// Method for getting notification status of app
export const getNotificationStatus = cb => {
  return (dispatch, getState) => {
    let token = idx(getState(), _ => _.user.userData.token)
      ? idx(getState(), _ => _.user.userData.token)
      : idx(getState(), _ => _.signup.data.token);

    let user_id =
      idx(getState(), _ => _.user.userData.data.id.toString()) ||
      idx(getState(), _ => _.signup.data.data.user_id.toString());
    let data = {
      user_id: user_id
    };
    dispatch({ type: types.GET_NOTIFICATION_REQUEST });
    fetch(`${SERVER_URL}expert/getNotification`, new customPost(data, token))
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        if (responseJson.requestStatus == "success") {
          dispatch({
            type: types.GET_NOTIFICATION_SUCCESS,
            payload: responseJson.data
          });
          cb(responseJson.data);
        } else {
          dispatch({ type: types.GET_NOTIFICATION_FAIL });
        }
      })
      .catch(err => {
        dispatch({ type: types.GET_NOTIFICATION_FAIL });
      });
  };
};

// Method for settingnotification status of app
export const setNotificationStatus = (status, type, service) => {
  return (dispatch, getState) => {
    let token = idx(getState(), _ => _.user.userData.token)
      ? idx(getState(), _ => _.user.userData.token)
      : idx(getState(), _ => _.signup.data.token);

    let user_id =
      idx(getState(), _ => _.user.userData.data.id.toString()) ||
      idx(getState(), _ => _.signup.data.data.user_id.toString());
    let data = {
      status: status,
      user_id: user_id,
      type: type,
      notification_for: service
    };
    dispatch({ type: types.SET_NOTIFICATION_REQUEST });
    fetch(`${SERVER_URL}expert/setNotification`, new customPost(data, token))
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        if (responseJson.requestStatus == "success") {
          dispatch({
            type: types.SET_NOTIFICATION_SUCCESS
          });
          dispatch(getNotificationStatus(cb => {}));
        } else {
          dispatch({ type: types.SET_NOTIFICATION_FAIL });
        }
      })
      .catch(err => {
        RNToasty.Error({
          title: strings.profile.something,
          withIcon: false
        });
        dispatch({ type: types.SET_NOTIFICATION_FAIL });
      });
  };
};

// Method for rescheduling service
export const rescheduleService = (data, cb) => {
  return (dispatch, getState) => {
    let token = idx(getState(), _ => _.user.userData.token)
      ? idx(getState(), _ => _.user.userData.token)
      : idx(getState(), _ => _.signup.data.token);

    dispatch({ type: types.RESCHEDULE_REQUEST });
    fetch(`${SERVER_URL}reshceduleService`, new customPost(data, token))
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        if (responseJson.requestStatus == "success") {
          dispatch({
            type: types.RESCHEDULE_SUCCESS
          });
          dispatch(getScheduledservices());
          cb(responseJson);
        } else {
          dispatch({ type: types.RESCHEDULE_FAIL });
        }
      })
      .catch(err => {
        RNToasty.Error({
          title: strings.profile.something,
          withIcon: false
        });
        dispatch({ type: types.RESCHEDULE_FAIL });
      });
  };
};

// Method for stting notification sound
export const notificationSound = data => {
  return (dispatch, getState) => {
    let token = idx(getState(), _ => _.user.userData.token)
      ? idx(getState(), _ => _.user.userData.token)
      : idx(getState(), _ => _.signup.data.token);

    dispatch({ type: types.SAVE_NOTIFICATION_SOUND_REQUEST });
    fetch(`${SERVER_URL}saveNotificationSound`, new customPost(data, token))
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        if (responseJson.requestStatus == "success") {
          dispatch({
            type: types.SAVE_NOTIFICATION_SOUND_SUCCESS
          });
        } else {
          dispatch({ type: types.SAVE_NOTIFICATION_SOUND_FAIL });
        }
      })
      .catch(err => {
        RNToasty.Error({
          title: strings.profile.something,
          withIcon: false
        });
        dispatch({ type: types.SAVE_NOTIFICATION_SOUND_FAIL });
      });
  };
};

// Method for deleting User account
export const deleteAccount = componentId => {
  return (dispatch, getState) => {
    let token = idx(getState(), _ => _.user.userData.token)
      ? idx(getState(), _ => _.user.userData.token)
      : idx(getState(), _ => _.signup.data.token);

    let user_id =
      idx(getState(), _ => _.user.userData.data.id.toString()) ||
      idx(getState(), _ => _.signup.data.data.user_id.toString());

    let data = {
      user_id: user_id
    };
    dispatch({ type: types.DELETE_ACCOUNT_REQUEST });
    fetch(`${SERVER_URL}deleteAccount`, new customPost(data, token))
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        if (responseJson.requestStatus == "success") {
          dispatch({
            type: types.DELETE_ACCOUNT_SUCCESS
          });
          dispatch({ type: types.LOGOUT });
          LoginManager.logOut();
          GoogleSignin.revokeAccess();
          GoogleSignin.signOut();
          Navigation.popToRoot(componentId);
        } else {
          dispatch({ type: types.DELETE_ACCOUNT_FAIL });
        }
      })
      .catch(err => {
        dispatch({ type: types.DELETE_ACCOUNT_FAIL });
      });
  };
};

// Method for manging card added  modal
export const clearCoupon = () => {
  return async (dispatch, getState) => {
    dispatch({ type: "COUPON_SUCCESS1", payload: "" });
    dispatch({ type: "COUPON_SUCCESS", payload: "" });
  };
};

export const getPolicyStatus = () => {
  return (dispatch, getState) => {
    let token = idx(getState(), _ => _.user.userData.token)
      ? idx(getState(), _ => _.user.userData.token)
      : idx(getState(), _ => _.signup.data.token);

    let user_id =
      idx(getState(), _ => _.user.userData.data.id.toString()) ||
      idx(getState(), _ => _.signup.data.data.user_id.toString());

    let data = {
      user_id: user_id
    };
    dispatch({ type: types.GET_POLICY_REQUEST });
    fetch(`${SERVER_URL}getFourHrPolicyStatus`, new customPost(data, token))
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        if (responseJson.requestStatus == "success") {
          dispatch({
            type: types.GET_POLICY_SUCCESS,
            payload: responseJson.data
          });
        } else {
          dispatch({ type: types.GET_POLICY_FAIL });
        }
      })
      .catch(err => {
        RNToasty.Error({
          title: strings.profile.something,
          withIcon: false
        });
        dispatch({ type: types.GET_POLICY_FAIL });
      });
  };
};

export const setPolicyStatus = (data, cb) => {
  return (dispatch, getState) => {
    let token = idx(getState(), _ => _.user.userData.token)
      ? idx(getState(), _ => _.user.userData.token)
      : idx(getState(), _ => _.signup.data.token);

    dispatch({ type: types.SET_POLICY_REQUEST });
    fetch(`${SERVER_URL}setFourHrPolicyStatus`, new customPost(data, token))
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        if (responseJson.requestStatus == "success") {
          dispatch({
            type: types.SET_POLICY_SUCCESS
          });
          cb(responseJson);
          dispatch(getPolicyStatus());
        } else {
          dispatch({ type: types.SET_POLICY_FAIL });
        }
      })
      .catch(err => {
        dispatch({ type: types.SET_POLICY_FAIL });
      });
  };
};

export const getCommission = () => {
  return (dispatch, getState) => {
    let token = idx(getState(), _ => _.user.userData.token)
      ? idx(getState(), _ => _.user.userData.token)
      : idx(getState(), _ => _.signup.data.token);

    dispatch({ type: "COMMISSION_REQUEST" });
    fetch(`${SERVER_URL}getAdminCommission`, new customPost("", token))
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        console.log("COMMISSION_REQUEST", responseJson);
        if (responseJson.requestStatus == "success") {
          dispatch({
            type: "COMMISSION_SUCCESS",
            payload: responseJson.data
          });
        } else {
          dispatch({ type: "COMMISSION_FAIL" });
        }
      })
      .catch(err => {
        dispatch({ type: "COMMISSION_FAIL" });
      });
  };
};

export const serviceAvailability = (data, cb) => {
  return (dispatch, getState) => {
    let token = idx(getState(), _ => _.user.userData.token)
      ? idx(getState(), _ => _.user.userData.token)
      : idx(getState(), _ => _.signup.data.token);

    dispatch({ type: "AVAILABILITY_REQUEST" });
    fetch(`${SERVER_URL}matchLocation`, new customPost(data, token))
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        if (responseJson.requestStatus == "success") {
          dispatch({
            type: "AVAILABILITY_SUCCESS",
            payload: responseJson.res
          });

          cb(responseJson.res);
        } else {
          dispatch({ type: "AVAILABILITY_FAIL" });
          cb(false);
        }
      })
      .catch(err => {
        dispatch({ type: "AVAILABILITY_FAIL" });
        cb(false);
      });
  };
};

export const introductionStatus = () => {
  return (dispatch, getState) => {
    let data = {
      user_id:
        idx(getState(), _ => _.user.userData.data.id.toString()) ||
        idx(getState(), _ => _.signup.data.data.user_id.toString())
    };
    let token = idx(getState(), _ => _.user.userData.token)
      ? idx(getState(), _ => _.user.userData.token)
      : idx(getState(), _ => _.signup.data.token);

    fetch(`${SERVER_URL}changeUserOld`, new customPost(data, token))
      .then(response => response.json())
      .then(responseJson => {
        dispatch(getUserDetails(res => {}));
      });
    // dispatch({type:types.INTRODUCTION});
  };
};

export const refreshUserDetails = () => {
  return (dispatch, getState) => {
    let token = idx(getState(), _ => _.user.userData.token)
      ? idx(getState(), _ => _.user.userData.token)
      : idx(getState(), _ => _.signup.data.token);

    let userId = {
      user_id:
        idx(getState(), _ => _.user.userData.data.id.toString()) ||
        idx(getState(), _ => _.signup.data.data.user_id.toString())
    };

    dispatch({ type: types.REFRESH_USER_DETAILS_REQUEST });
    fetch(`${SERVER_URL}getUserDetail`, new customPost(userId, token))
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        if (responseJson.requestStatus == "success") {
          dispatch({
            type: types.REFRESH_USER_DETAILS_SUCCESS,
            payload: responseJson
          });
        } else {
          dispatch({ type: types.REFRESH_USER_DETAILS_FAIL });
        }
      })
      .catch(err => {
        dispatch({ type: types.REFRESH_USER_DETAILS_FAIL });
      });
  };
};

export const notifiyMe = city => {
  return (dispatch, getState) => {
    let token = idx(getState(), _ => _.user.userData.token)
      ? idx(getState(), _ => _.user.userData.token)
      : idx(getState(), _ => _.signup.data.token);

    let data = {
      user_id:
        idx(getState(), _ => _.user.userData.data.id.toString()) ||
        idx(getState(), _ => _.signup.data.data.user_id.toString()),
      city: city
    };

    dispatch({ type: types.NOTIFY_ME_REQUEST });
    fetch(`${SERVER_URL}set_region_sendinblue`, new customPost(data, token))
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        if (responseJson.requestStatus == "success") {
          dispatch({
            type: types.NOTIFY_ME_SUCCESS,
            payload: responseJson
          });
          dispatch(getUserDetails(res => {}));
          RNToasty.Success({
            title: strings.currentLocation.notify,
            withIcon: false
          });
        } else {
          dispatch({ type: types.NOTIFY_ME_FAIL });
        }
      })
      .catch(err => {
        dispatch({ type: types.NOTIFY_ME_FAIL });
      });
  };
};

export const arrivalTime = data => {
  return async (dispatch, getState) => {
    dispatch({ type: "ARRIVAL_TIME", payload: data });
  };
};

export const introDone = data => {
  return async (dispatch, getState) => {
    dispatch({ type: "INTRODUCTION_TOGGLE", payload: data });
  };
};
