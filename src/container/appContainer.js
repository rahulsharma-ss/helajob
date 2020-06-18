import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  ActivityIndicator
} from "react-native";
import Socket from "../utilities/Socket";
import idx from "idx";
import { connect } from "react-redux";
import SplashScreen from "react-native-splash-screen";
import OneSignal from "react-native-onesignal";
import PushNotifications from "../components/common/pushNotifications";
import { notificationToken } from "../actions/list/listAction";
import { notificationDot } from "../actions/socket/SocketActions";
import { trackExpertLocation } from "../actions/socket/SocketActions";
import { setNotificationDetails } from "../actions/list/listAction";

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    socket = new Socket();
    notification = new PushNotifications();
  }

  componentDidMount() {
    notification.initializeNotificationService();
    socket.initalizeSocket(cb => {
      setTimeout(() => {
        this.addIdtoSocket();
      }, 100);
    });

    SplashScreen.hide();
    socket.liveTrackingExpert(response => {
      this.props.trackExpertLocation(response);
    });

    socket.onRequestAccept(response => {
      this.props.trackExpertLocation(response);
    });

    socket.messageReceived(response => {
      this.props.notificationDot(true);
    });

    notification.getUserNotificationsDetail(userDetails => {
      setTimeout(() => {
        this.setUserDetails(userDetails);
        this.props.setNotificationDetails(userDetails);
      }, 100);
    });

    notification.onOpenNotification(notification => {
      if (
        notification &&
        notification.notification &&
        notification.notification.payload &&
        notification.notification.payload.additionalData
      ) {
        let data = notification.notification.payload.additionalData;
      }
    });
  }

  componentWillUnmount() {}

  setUserDetails = async data => {
    this.props.notificationToken({
      user_id: await this.props.userId,
      device_type: Platform.OS === "android" ? "ANDROID" : "IOS",
      device_token: data.pushToken,
      player_id: data.userId
    });
  };

  addIdtoSocket = async () => {
    let id = await this.props.userId;
    socket.onSocketConnect(id || 0);
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor="#1F5BA8" barStyle="dark-content" />
        <View style={styles.container}>
          <ActivityIndicator size="large" color={"#1F5BA8"} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 28
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

function mapStateToProps(state) {
  return {
    userId:
      idx(state.user, _ => _.userData.data.id) ||
      idx(state.signup, _ => _.data.data.user_id)
  };
}

export default connect(
  mapStateToProps,
  {
    notificationToken,
    trackExpertLocation,
    setNotificationDetails,
    notificationDot
  }
)(AppContainer);
