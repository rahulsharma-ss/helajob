import * as types from "../../actionTypes";

const INITIAL_STATE = {
  loading: false,
  services: [],
  subCategories: [],
  otpVerification: "",
  listData: [],
  loadingR: false,
  loadingC: false,
  previousLocation: null,
  cards: null,
  allCards: null,
  allAddress: null,
  scheduledServices: null,
  qrCode: "",
  expertDetails: "",
  chatDetails: "",
  allChatDetails: "",
  loadingChat: false,
  serviceType: "",
  userHistory: [],
  userDetails: [],
  myCoords: "",
  walletDetails: "",
  couponDetails: "",
  successModal: false,
  chatId: null,
  jobInfo: "",
  timerStatus: false,
  timerValue: 0,
  paymentPossible: false,
  paymentLoading: false,
  updatingProfile: false,
  recentTransactions: "",
  moneyLoader: false,
  expertHistory: "",
  searchingModal: false,
  paymentModal: false,
  cardAdded: false,
  myReviews: null,
  couponDetails1: "",
  subCategoryData: "",
  notificationStatus: "",
  setNotificationStatus: "",
  loadingSub: false,
  policyStatus: false,
  signUpTrue: null,
  loadingServices: false,
  commissionPercent: 0,
  userLoader: false,
  serviceAvailability: false,
  deductMoney: null,
  arrivalTime: null,
  notificationData: null
};

function listReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case types.GET_SERVICES_REQUEST:
      return Object.assign({}, state, { loading: true });
    case types.GET_SERVICES_SUCCESS:
      return Object.assign({}, state, {
        listData: action.payload.data,
        loading: false
      });
    case types.GET_SERVICES_FAIL:
      return Object.assign({}, state, {
        loading: false
      });
    case types.GET_SUBCATEGORIES_REQUEST:
      return Object.assign({}, state, { loadingSub: true });
    case types.GET_SUBCATEGORIES_SUCCESS:
      return Object.assign({}, state, {
        subCategories: action.payload,
        loadingSub: false
      });
    case types.GET_SUBCATEGORIES_FAIL:
      return Object.assign({}, state, {
        loadingSub: false
      });

    case types.OTP_REQUEST:
      return Object.assign({}, state, { loading: true });
    case types.OTP_SUCCESS:
      return Object.assign({}, state, {
        otpVerification: action.payload,
        loading: false
      });
    case types.OTP_FAIL:
      return Object.assign({}, state, {
        loading: false
      });
    case types.FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case types.FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        loading: false
      };

    case types.RESEND_OTP_REQUEST:
      return {
        ...state,
        loadingR: true
      };
    case types.RESEND_OTP_SUCCESS:
      return {
        ...state,
        loadingR: false
      };
    case types.RESEND_OTP_FAIL:
      return {
        ...state,
        loadingR: false
      };

    case types.ADD_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.ADD_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case types.ADD_ADDRESS_FAIL:
      return {
        ...state,
        loading: false
      };

    case types.ALL_ADDRESS_REQUEST:
      return {
        ...state
      };
    case types.ALL_ADDRESS_SUCCESS:
      return {
        ...state,
        allAddress: action.payload
      };
    case types.ALL_ADDRESS_FAIL:
      return {
        ...state
      };

    case types.SCHEDULED_SERVICES_REQUEST:
      return {
        ...state,
        loadingServices: true
      };
    case types.SCHEDULED_SERVICES_SUCCESS:
      return {
        ...state,
        scheduledServices: action.payload,
        loadingServices: false
      };
    case types.SCHEDULED_SERVICES_FAIL:
      return {
        ...state,
        loadingServices: false
      };

    case types.QR_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.QR_SUCCESS:
      return {
        ...state,
        loading: false,
        qrCode: action.payload
      };
    case types.QR_FAIL:
      return {
        ...state,
        loading: false
      };

    case types.EXPERT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.EXPERT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        expertDetails: action.payload
      };
    case types.EXPERT_DETAILS_FAIL:
      return {
        ...state,
        loading: false
      };

    case types.CHAT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.CHAT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        chatDetails: action.payload
      };
    case types.CHAT_DETAILS_FAIL:
      return {
        ...state,
        loading: false
      };

    case types.ALL_CHAT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.ALL_CHAT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        allChatDetails: action.payload
      };
    case types.ALL_CHAT_DETAILS_FAIL:
      return {
        ...state,
        loading: false
      };

    case "SAVE_LOCATION":
      return {
        ...state,
        previousLocation: action.payload
      };

    case "ADD CARD REQ":
      return {
        ...state,
        loadingC: true
      };
    case "ADD CARD SUCC":
      return {
        ...state,
        loadingC: false,
        cards: action.payload
      };
    case "ADD CARD FAIL":
      return {
        ...state,
        loadingC: false
      };

    case "REC CARD REQ":
      return {
        ...state,
        loadingR: true
      };
    case "REC CARD SUCC":
      return {
        ...state,
        loadingR: false,
        allCards: action.payload
      };
    case "REC CARD FAIL":
      return {
        ...state,
        loadingR: false
      };

    case "SERVICE_TYPE":
      return {
        ...state,
        serviceType: action.payload
      };

    case types.USER_HISTORY_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.USER_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        userHistory: action.payload
      };
    case types.USER_HISTORY_FAIL:
      return {
        ...state,
        loading: false
      };

    case types.USER_DETAILS_REQUEST:
      return {
        ...state
      };
    case types.USER_DETAILS_SUCCESS:
      return {
        ...state,
        userDetails: action.payload
      };
    case types.USER_DETAILS_FAIL:
      return {
        ...state
      };

    case types.REFRESH_USER_DETAILS_REQUEST:
      return {
        ...state,
        userLoader: true
      };
    case types.REFRESH_USER_DETAILS_SUCCESS:
      return {
        ...state,
        userLoader: false,
        userDetails: action.payload
      };
    case types.REFRESH_USER_DETAILS_FAIL:
      return {
        ...state,
        userLoader: false
      };

    case types.WALLET_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.WALLET_SUCCESS:
      return {
        ...state,
        loading: false,
        walletDetails: action.payload
      };
    case types.WALLET_FAIL:
      return {
        ...state,
        loading: false
      };

    case types.COUPON_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.COUPON_SUCCESS:
      return {
        ...state,
        loading: false,
        couponDetails: action.payload
      };
    case types.COUPON_FAIL:
      return {
        ...state,
        loading: false
      };

    case types.COUPON_REQUEST1:
      return {
        ...state,
        loading: true
      };
    case types.COUPON_SUCCESS1:
      return {
        ...state,
        loading: false,
        couponDetails1: action.payload
      };
    case types.COUPON_FAIL1:
      return {
        ...state,
        loading: false
      };

    case "SUCCESS_MADAL":
      return {
        ...state,
        loading: false,
        successModal: action.payload
      };

    case "MY_COORDS":
      return {
        ...state,
        loading: false,
        myCoords: action.payload
      };

    case types.CHAT_ID_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.CHAT_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        chatId: action.payload
      };
    case types.CHAT_ID_FAIL:
      return {
        ...state,
        loading: false
      };

    case types.JOB_INFO_REQUEST:
      return {
        ...state
      };
    case types.JOB_INFO_SUCCESS:
      return {
        ...state,
        jobInfo: action.payload
      };
    case types.JOB_INFO_FAIL:
      return {
        ...state
      };

    case types.CHECK_PAYMENT_REQUEST:
      return {
        ...state
      };
    case types.CHECK_PAYMENT_SUCCESS:
      return {
        ...state,
        paymentPossible: action.payload
      };
    case types.CHECK_PAYMENT_FAIL:
      return {
        ...state
      };

    case types.PAYMENT_REQUEST:
      return {
        ...state,
        paymentLoading: true
      };
    case types.PAYMENT_SUCCESS:
      return {
        ...state,
        paymentPossible: action.payload,
        paymentLoading: false
      };
    case types.PAYMENT_FAIL:
      return {
        ...state,
        paymentLoading: false
      };

    case types.MANAGE_TIMER:
      return {
        ...state,
        timerStatus: action.payload
      };

    case types.UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        updatingProfile: true
      };
    case types.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        updatingProfile: false
      };
    case types.UPDATE_PROFILE_FAIL:
      return {
        ...state,
        updatingProfile: false
      };

    case types.TRANSACTION_REQUEST:
      return {
        ...state
      };
    case types.TRANSACTION_SUCCESS:
      return {
        ...state,
        recentTransactions: action.payload
      };
    case types.TRANSACTION_FAIL:
      return {
        ...state
      };

    case types.ADD_MONEY_REQUEST:
      return {
        ...state,
        moneyLoader: true
      };
    case types.ADD_MONEY_SUCCESS:
      return {
        ...state,
        moneyLoader: false
      };
    case types.ADD_MONEY_FAIL:
      return {
        ...state,
        moneyLoader: false
      };

    case types.EXPERT_HISTORY_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.EXPERT_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        expertHistory: action.payload
      };
    case types.EXPERT_HISTORY_FAIL:
      return {
        ...state,
        loading: false
      };

    case types.REVIEW_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        myReviews: action.payload
      };
    case types.REVIEW_FAIL:
      return {
        ...state,
        loading: false
      };

    case types.GET_NOTIFICATION_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.GET_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        notificationStatus: action.payload
      };
    case types.GET_NOTIFICATION_FAIL:
      return {
        ...state,
        loading: false
      };

    case types.SET_NOTIFICATION_REQUEST:
      return {
        ...state
      };
    case types.SET_NOTIFICATION_SUCCESS:
      return {
        ...state,
        setNotificationStatus: action.payload
      };
    case types.SET_NOTIFICATION_FAIL:
      return {
        ...state
      };

    case types.GET_POLICY_REQUEST:
      return {
        ...state
      };
    case types.GET_POLICY_SUCCESS:
      return {
        ...state,
        policyStatus: action.payload
      };
    case types.GET_POLICY_FAIL:
      return {
        ...state
      };

    case "SET_TIMER":
      return {
        ...state,
        timerValue: action.payload
      };

    case "SEARCH_MODAL_IS":
      return {
        ...state,
        searchingModal: action.payload
      };

    case "PAYMENT_MODAL_IS":
      return {
        ...state,
        paymentModal: action.payload
      };

    case "ADD_CARD_MODAL_IS":
      return {
        ...state,
        cardAdded: action.payload
      };
    case "JOB_DETAILS":
      return {
        ...state,
        subCategoryData: action.payload
      };
    case "SAVE_SIGNUP_ID":
      return {
        ...state,
        signUpTrue: action.payload
      };

    case "COMMISSION_REQUEST":
      return {
        ...state
      };
    case "COMMISSION_SUCCESS":
      return {
        ...state,
        commissionPercent: action.payload
      };
    case "COMMISSION_FAIL":
      return {
        ...state
      };

    case "AVAILABILITY_REQUEST":
      return {
        ...state
      };
    case "AVAILABILITY_SUCCESS":
      return {
        ...state,
        serviceAvailability: action.payload
      };
    case "AVAILABILITY_FAIL":
      return {
        ...state
      };

    case types.DEDUCT_MONEY_REQUEST:
      return {
        ...state,
        deductMoney: false
      };
    case types.DEDUCT_MONEY_SUCCESS:
      return {
        ...state,
        deductMoney: true
      };
    case types.DEDUCT_MONEY_FAIL:
      return {
        ...state,
        deductMoney: false
      };

    case "ARRIVAL_TIME":
      return {
        ...state,
        arrivalTime: action.payload
      };

    case "NOTIFICATION_DETAIL":
      return {
        ...state,
        notificationData: action.payload
      };

    case types.LOGOUT:
      return INITIAL_STATE;

    default:
      return state;
  }
}

export default listReducer;
