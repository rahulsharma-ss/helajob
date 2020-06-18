import { SERVER_URL } from "../../constants/url";
import { RNToasty } from "react-native-toasty";
import idx from "idx";
import { getUserDetails } from "../../actions/list/listAction";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { moderateScale } from "../../utilities/ResponsiveFonts";
import {
  customPost,
  customGet,
  zendeskGet,
  zendeskPost
} from "../../utilities/restClient";

const ZENDESK_AUTH_TOKEN =
  "c2F1cmFiaC5jaGF1aGFuQHNtYXJ0ZGF0YWluYy5uZXQvdG9rZW46Wnk1WVlSUXhpYVBQa2dkdzhNRmhzTk5GbmZWWU43Z1R4SFFHTzNlVQ==";

const ZENDESK_SUBDOMAIN = "helajob";
const ZENDESK_USERNAME = "saurabh.chauhan@smartdatainc.net";
const ZENDESK_TOKEN = "Zy5YYRQxiaPPkgdw8MFhsNNFnfVYN7gTxHQGO3eU";

/* Method for creating a new zendesk user */
export function createZendeskUser(data) {
  return (dispatch, getState) => {
    dispatch({ type: "CREATE_ZENDESK_USER_REQUEST" });

    fetch(
      `https://${ZENDESK_SUBDOMAIN}.zendesk.com/api/v2/users.json`,
      new zendeskPost(data, ZENDESK_AUTH_TOKEN)
    )
      .then(res => {
        return res.json();
      })
      .then(response => {
        dispatch({ type: "CREATE_ZENDESK_USER_SUCCESS", payload: response });
        dispatch(
          assignZendeskIdtoUser(response && response.user && response.user.id)
        );
      })
      .catch(err => {
        dispatch({ type: "CREATE_ZENDESK_USER_FAIL" });
      });
  };
}

/* Method for creating a new zendesk user Id*/
export function assignZendeskIdtoUser(id) {
  return (dispatch, getState) => {
    let token =
      idx(getState(), _ => _.user.userData.token) ||
      idx(getState(), _ => _.signup.data.token);

    let user_id =
      idx(getState(), _ => _.user.userData.data.id.toString()) ||
      idx(getState(), _ => _.signup.data.data.user_id.toString());

    let data = { user_id: user_id, zenddesk_id: id };

    dispatch({ type: "ASSIGN_ZENDESK_ID_TO_USER_REQUEST" });

    fetch(`${SERVER_URL}updateZendeskID`, new customPost(data, token))
      .then(res => {
        return res.json();
      })
      .then(response => {
        dispatch({
          type: "ASSIGN_ZENDESK_ID_TO_USER_SUCCESS",
          payload: response
        });
        dispatch(getUserDetails(res => {}));
      })
      .catch(err => {
        RNToasty.Error({
          title: "Something went wrong. Please try again later.",
          withIcon: false
        });
        dispatch({ type: "ASSIGN_ZENDESK_ID_TO_USER_FAIL" });
      });
  };
}

/* Method for creating a new zendesk ticket */
export function createZendeskTicket(data, cb) {
  return (dispatch, getState) => {
    dispatch({ type: "CREATE_ZENDESK_TICKET_REQUEST" });
    fetch(
      `https://${ZENDESK_SUBDOMAIN}.zendesk.com/api/v2/tickets.json`,
      new zendeskPost(data, ZENDESK_AUTH_TOKEN)
    )
      .then(res => {
        return res.json();
      })
      .then(response => {
        console.log(response, "responseresponseresponse");
        dispatch({ type: "CREATE_ZENDESK_TICKET_SUCCESS", payload: response });
        cb(response);
      })
      .catch(err => {
        cb(err);
        RNToasty.Error({
          title: "Something went wrong. Please try again later.",
          withIcon: false
        });
        dispatch({ type: "CREATE_ZENDESK_TICKET_FAIL" });
      });
  };
}

/* Method for displaying zendesk tickets */
export function listZendeskTickets(id) {
  return (dispatch, getState) => {
    dispatch({ type: "LIST_ZENDESK_TICKET_REQUEST" });

    fetch(
      `https://${ZENDESK_SUBDOMAIN}.zendesk.com/api/v2/tickets.json?external_id=${id}`,
      new zendeskGet(ZENDESK_AUTH_TOKEN)
    )
      .then(res => {
        return res.json();
      })
      .then(response => {
        dispatch({ type: "LIST_ZENDESK_TICKET_SUCCESS", payload: response });
      })
      .catch(err => {
        dispatch({ type: "LIST_ZENDESK_TICKET_FAIL" });
      });
  };
}

/* Method for updating zendesk ticket status */
export function updateZendeskTicket(data, id, cb) {
  return (dispatch, getState) => {
    dispatch({ type: "UPDATE_ZENDESK_TICKET_REQUEST" });

    fetch(
      `https://${ZENDESK_SUBDOMAIN}.zendesk.com/api/v2/tickets/${id}.json`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Basic ${ZENDESK_AUTH_TOKEN}`
        },
        body: JSON.stringify(data)
      }
    )
      .then(res => {
        return res.json();
      })
      .then(response => {
        dispatch({ type: "UPDATE_ZENDESK_TICKET_SUCCESS", payload: response });
        cb(response);
      })
      .catch(err => {
        cb(err);

        RNToasty.Error({
          title: "Something went wrong. Please try again later.",
          withIcon: false
        });
        dispatch({ type: "UPDATE_ZENDESK_TICKET_FAIL" });
      });
  };
}

/* Method for getting all FAQ questions categories */
export function getFAQCategory(cb) {
  return (dispatch, getState) => {
    let token =
      idx(getState(), _ => _.user.userData.token) ||
      idx(getState(), _ => _.signup.data.token);
    dispatch({ type: "GET_FAQ_CATEGORIES_REQUEST" });

    fetch(`${SERVER_URL}getFAQCategory`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        return res.json();
      })
      .then(response => {
        if (response.requestStatus === "success") {
          dispatch({
            type: "GET_FAQ_CATEGORIES_SUCCESS",
            payload: response.data
          });
          dispatch(listFAQ());
          cb(response.data[0].id);
        } else {
          dispatch({ type: "GET_FAQ_CATEGORIES_FAIL" });
        }
      })
      .catch(err => {
        dispatch({ type: "GET_FAQ_CATEGORIES_FAIL" });
      });
  };
}

/* Method for getting all FAQ questions */
export function listFAQ() {
  return (dispatch, getState) => {
    let token =
      idx(getState(), _ => _.user.userData.token) ||
      idx(getState(), _ => _.signup.data.token);
    dispatch({ type: "LIST_FAQ_REQUEST" });

    fetch(`${SERVER_URL}listFAQ`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        return res.json();
      })
      .then(response => {
        if (response.requestStatus === "success") {
          dispatch({ type: "LIST_FAQ_SUCCESS", payload: response.data });
        } else {
          dispatch({ type: "LIST_FAQ_FAIL" });
        }
      })
      .catch(err => {
        dispatch({ type: "LIST_FAQ_FAIL" });
      });
  };
}

export const disputeTicket = user_id => {
  let data = {
    request_id: user_id
  };
  return (dispatch, getState) => {
    let token =
      idx(getState(), _ => _.user.userData.token) ||
      idx(getState(), _ => _.signup.data.token);
    fetch(`${SERVER_URL}holdPayment`, new customPost(data, token))
      .then(response => response.json())
      .then(responseJson => {});
  };
};
