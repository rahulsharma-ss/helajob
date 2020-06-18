// Push notifications for Customer app

import { Component } from "react";
import OneSignal from "react-native-onesignal";

export default class PushNotification extends Component {
  // Initializing notification
  initializeNotificationService = () => {
    OneSignal.setLogLevel(6, 0);
    OneSignal.init("db0bb78a-bf75-4844-9a1f-c68b1a0be2d2", {
      kOSSettingsKeyAutoPrompt: true,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSSettingsKeyPromptBeforeOpeningPushURL: true
    });

    //Calling listners
    OneSignal.inFocusDisplaying(2);
    OneSignal.setSubscription(true);
    OneSignal.setLogLevel(7, 0);
    OneSignal.setSubscription(true);
    OneSignal.enableSound(true);
    OneSignal.enableVibrate(true);
    OneSignal.configure();
  };

  // Called when a notification is received
  onReceivedNotification = cb => {
    OneSignal.addEventListener("received", data => {
      cb(data);
    });
  };

  // Called when a notification is opened
  onOpenNotification = cb => {
    OneSignal.addEventListener("opened", data => {
      cb(data);
    });
  };

  // Requesting a notification token
  onGetNotificationToken = cb => {
    OneSignal.addEventListener("ids", data => {
      cb(data);
    });
  };

  // Requesting a user details from token
  getUserNotificationsDetail = cb => {
    OneSignal.getPermissionSubscriptionState(response => {
      cb(response);
    });
  };

  // Removing listners
  removeNotifcationListeners = () => {
    OneSignal.removeEventListener("received");
    OneSignal.removeEventListener("opened");
    OneSignal.removeEventListener("ids");
  };
}
