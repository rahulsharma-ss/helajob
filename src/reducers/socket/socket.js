import * as types from "../../actionTypes/index";
const INITIAL_STATE = {
  newServiceData: null,
  serviceRequestAccepted: null,
  expertCoords: null,
  serviceModal: false,
  notificationsAre: false,
  newServiceDetails: null
};

function socket(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.NEW_SERVICE_REQUEST:
      return Object.assign({}, state, {
        newServiceData: action.payload,
        newServiceRequest: true
      });
    case types.SERVICE_REQUEST_DECLINE:
      return Object.assign({}, state, {
        newServiceRequest: false,
        serviceModal: false
      });
    case types.SERVICE_REQUEST_ACCEPT:
      return Object.assign({}, state, {
        serviceRequestAccepted: action.payload,
        serviceModal: true
      });

    case types.SERVICE_REQUEST_ACCEPT2:
      return Object.assign({}, state, {
        serviceRequestAccepted: action.payload
      });

    case types.TRACKING_EXPERT:
      return Object.assign({}, state, {
        expertCoords: action.payload
      });

    case types.NOTIFICATION_DOT:
      return Object.assign({}, state, {
        notificationsAre: action.payload
      });

    case "SERVICE_DETAILS":
      return Object.assign({}, state, {
        newServiceDetails: action.payload
      });

    default:
      return state;
  }
}

export default socket;
