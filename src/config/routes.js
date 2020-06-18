// Routes of application

import { Navigation } from "react-native-navigation";
export const registerScreens = (store, Provider) => {
  // Loader Stack
  Navigation.registerComponentWithRedux(
    "Loader",
    () => require("../container/appContainer").default,
    Provider,
    store
  );

  // Auth stack
  Navigation.registerComponentWithRedux(
    "SignIn",
    () => require("../container/auth/signIn").default,
    Provider,
    store
  );
  // Navigation.registerComponentWithRedux(
  //   "SignUp",
  //   () => require("../container/auth/signUp").default,
  //   Provider,
  //   store
  // );
//   Navigation.registerComponentWithRedux(
//     "VerificationCode",
//     () => require("../container/other/verificationCode").default,
//     Provider,
//     store
//   );
//   Navigation.registerComponentWithRedux(
//     "ForgotPassword",
//     () => require("../container/other/forgotPassword").default,
//     Provider,
//     store
//   );

//   Navigation.registerComponentWithRedux(
//     "TermsAndConditions",
//     () => require("../container/other/termsAndConditions").default,
//     Provider,
//     store
//   );
//   Navigation.registerComponentWithRedux(
//     "PrivacyPolicy",
//     () => require("../container/other/privacyPolicy").default,
//     Provider,
//     store
//   );
//   // Dashboard Stack
//   Navigation.registerComponentWithRedux(
//     "Dashboard",
//     () => require("../container/dashboard/dashboard").default,
//     Provider,
//     store
//   );
//   Navigation.registerComponentWithRedux(
//     "Home",
//     () => require("../container/dashboard/home/home").default,
//     Provider,
//     store
//   );
//   Navigation.registerComponent(
//     "History",
//     () => require("../container/dashboard/history/history").default
//   );
//   Navigation.registerComponent(
//     "Profile",
//     () => require("../container/dashboard/profile/profile").default
//   );

//   Navigation.registerComponentWithRedux(
//     "Services",
//     () => require("../container/other/services").default,
//     Provider,
//     store
//   );

//   Navigation.registerComponentWithRedux(
//     "StartService",
//     () => require("../container/dashboard/home/startService").default,
//     Provider,
//     store
//   );

//   Navigation.registerComponentWithRedux(
//     "ExtendHire",
//     () => require("../container/dashboard/home/extendHire").default,
//     Provider,
//     store
//   );

//   Navigation.registerComponentWithRedux(
//     "Reviews",
//     () => require("../container/dashboard/profile/reviews").default,
//     Provider,
//     store
//   );

//   Navigation.registerComponentWithRedux(
//     "HelpCenter",
//     () => require("../container/dashboard/profile/helpCenter").default,
//     Provider,
//     store
//   );

//   Navigation.registerComponentWithRedux(
//     "Notifications",
//     () => require("../container/dashboard/profile/notifications").default,
//     Provider,
//     store
//   );

//   Navigation.registerComponentWithRedux(
//     "ExpandHistory",
//     () => require("../container/dashboard/history/expandHistory").default,
//     Provider,
//     store
//   );

//   Navigation.registerComponentWithRedux(
//     "ScheduledServices",
//     () => require("../container/dashboard/home/scheduledServices").default,
//     Provider,
//     store
//   );

//   Navigation.registerComponentWithRedux(
//     "JobRating",
//     () => require("../container/dashboard/home/jobRating").default,
//     Provider,
//     store
//   );

//   //Profile stack
//   Navigation.registerComponentWithRedux(
//     "Payment",
//     () => require("../container/dashboard/profile/payment").default,
//     Provider,
//     store
//   );

//   Navigation.registerComponentWithRedux(
//     "AddPaymentMethod",
//     () => require("../container/dashboard/profile/addPaymentMethod").default,
//     Provider,
//     store
//   );

//   Navigation.registerComponentWithRedux(
//     "Locations",
//     () => require("../container/dashboard/profile/locations").default,
//     Provider,
//     store
//   );
//   Navigation.registerComponentWithRedux(
//     "AddAddress",
//     () => require("../container/dashboard/profile/addAddress").default,
//     Provider,
//     store
//   );
//   Navigation.registerComponentWithRedux(
//     "EditProfile",
//     () => require("../container/dashboard/profile/editProfile").default,
//     Provider,
//     store
//   );

//   Navigation.registerComponentWithRedux(
//     "AddMoney",
//     () => require("../container/dashboard/profile/addMoney").default,
//     Provider,
//     store
//   );

//   Navigation.registerComponentWithRedux(
//     "RecentTransactions",
//     () => require("../container/dashboard/profile/recentTransactions").default,
//     Provider,
//     store
//   );

//   Navigation.registerComponentWithRedux(
//     "HelpDetail",
//     () => require("../container/dashboard/profile/helpDetail").default,
//     Provider,
//     store
//   );
//   Navigation.registerComponentWithRedux(
//     "AppSettings",
//     () => require("../container/dashboard/profile/appSettings").default,
//     Provider,
//     store
//   );

//   Navigation.registerComponentWithRedux(
//     "SupportTicket",
//     () => require("../components/supportTicket").default,
//     Provider,
//     store
//   );
//   Navigation.registerComponentWithRedux(
//     "TicketHistory",
//     () => require("../container/dashboard/profile/ticketHistory").default,
//     Provider,
//     store
//   );

//   //Chat Stack
//   Navigation.registerComponentWithRedux(
//     "UserChat",
//     () => require("../container/dashboard/chat/userChat").default,
//     Provider,
//     store
//   );

//   //Other Stack
//   Navigation.registerComponentWithRedux(
//     "CurrentLocation",
//     () => require("../container/other/currentLocation").default,
//     Provider,
//     store
//   );
//   Navigation.registerComponentWithRedux(
//     "LiveTracking",
//     () => require("../container/other/liveTracking").default,
//     Provider,
//     store
//   );

//   Navigation.registerComponentWithRedux(
//     "ExpertProfile",
//     () => require("../container/other/expertProfile").default,
//     Provider,
//     store
//   );

//   Navigation.registerComponentWithRedux(
//     "Policy",
//     () => require("../container/other/policy").default,
//     Provider,
//     store
//   );

//   Navigation.registerComponentWithRedux(
//     "Faq",
//     () => require("../container/other/faq").default,
//     Provider,
//     store
//   );

//   Navigation.registerComponentWithRedux(
//     "UnderDevelopment",
//     () => require("../container/other/underDevelopment").default,
//     Provider,
//     store
//   );
 }
