// Container to display current notification status

import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Switch,
  Image
} from "react-native";
import { moderateScale } from "../../../utilities/ResponsiveFonts";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";
import { fonts, colors } from "../../../constants/theme";
import {
  getNotificationStatus,
  setNotificationStatus,
  notificationSound
} from "../../../actions/list/listAction";
import idx from "idx";
import strings from "../../../constants/language";

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    const bookingConfirmedSms = idx(this.props, _ =>
      _.notificationStatus.find(
        o =>
          o.notification_for === "booking_confirmed" &&
          o.type == "2" &&
          o.status == 0
      )
        ? false
        : true
    );
    const bookingDeclinedSms = idx(this.props, _ =>
      _.notificationStatus.find(
        o =>
          o.notification_for === "booking_cancelled" &&
          o.type == "2" &&
          o.status == 0
      )
        ? false
        : true
    );
    const expertChatSms = idx(this.props, _ =>
      _.notificationStatus.find(
        o =>
          o.notification_for === "expert_chat" && o.type == "2" && o.status == 0
      )
        ? false
        : true
    );
    const bookingConfirmedEmail = idx(this.props, _ =>
      _.notificationStatus.find(
        o =>
          o.notification_for === "booking_confirmed" &&
          o.type == "1" &&
          o.status == 0
      )
        ? false
        : true
    );

    const bookingDeclinedEmail = idx(this.props, _ =>
      _.notificationStatus.find(
        o =>
          o.notification_for === "booking_declined" &&
          o.type == "1" &&
          o.status == 0
      )
        ? false
        : true
    );

    const expertChatEmail = idx(this.props, _ =>
      _.notificationStatus.find(
        o =>
          o.notification_for === "expert_chat" && o.type == "1" && o.status == 0
      )
        ? false
        : true
    );
    this.state = {
      bookingConfirmed: bookingConfirmedSms,
      bookingDeclined: bookingDeclinedSms,
      expertChat: expertChatSms,
      bookingConfirmedMail: bookingConfirmedEmail,
      bookingDeclinedMail: bookingDeclinedEmail,
      expertChatMail: expertChatEmail,
      messageSound: "Ding",
      emailSound: "Pop"
    };
  }

  componentDidMount() {
    // Getting notification status
    this.props.getNotificationStatus(response => {
      let bookingConfirmed = idx(response, _ =>
        _.find(
          o =>
            o.notification_for === "booking_confirmed" &&
            o.type == "2" &&
            o.status == 0
        )
          ? false
          : true
      );

      let bookingDeclined = idx(response, _ =>
        _.find(
          o =>
            o.notification_for === "booking_cancelled" &&
            o.type == "2" &&
            o.status == 0
        )
          ? false
          : true
      );
      let expertChat = idx(response, _ =>
        _.find(
          o =>
            o.notification_for === "expert_chat" &&
            o.type == "2" &&
            o.status == 0
        )
          ? false
          : true
      );
      let bookingConfirmedMail = idx(response, _ =>
        _.find(
          o =>
            o.notification_for === "booking_confirmed" &&
            o.type == "1" &&
            o.status == 0
        )
          ? false
          : true
      );
      let bookingDeclinedMail = idx(response, _ =>
        _.find(
          o =>
            o.notification_for === "booking_declined" &&
            o.type == "1" &&
            o.status == 0
        )
          ? false
          : true
      );
      let expertChatMail = idx(response, _ =>
        _.find(
          o =>
            o.notification_for === "expert_chat" &&
            o.type == "1" &&
            o.status == 0
        )
          ? false
          : true
      );
      this.setState({
        bookingConfirmed: bookingConfirmed,
        bookingDeclined: bookingDeclined,
        expertChat: expertChat,
        bookingConfirmedMail: bookingConfirmedMail,
        bookingDeclinedMail: bookingDeclinedMail,
        expertChatMail: expertChatMail
      });
    });
  }
  setStatus = (status, notificationType, service) => {
    this.props.setNotificationStatus(status, notificationType, service);
  };

  // Navigate to dashboard
  goToDashboard = () => {
    Navigation.pop(this.props.componentId);
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <View
            style={{
              flexDirection: "row",
              flex: 0.13,
              justifyContent: "center",
              paddingTop: moderateScale(5)
            }}
          >
            <TouchableOpacity
              style={{
                flex: 0.15,
                alignItems: "center",
                justifyContent: "center"
              }}
              onPress={this.goToDashboard}
            >
              <Image
                source={require("../../../assets/img/back.png")}
                resizeMode={"contain"}
                style={{
                  height: moderateScale(20),
                  width: moderateScale(20)
                }}
              />
            </TouchableOpacity>
            <View
              style={{
                flex: 0.7,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.LATOBOLD,
                  fontSize: moderateScale(18),
                  color: "#000000"
                }}
              >
                {strings.profile.notifications}
              </Text>
            </View>
            <View
              style={{
                flex: 0.15,
                alignItems: "center",
                justifyContent: "center"
              }}
            />
          </View>
          <View style={{ flex: 0.87, paddingHorizontal: moderateScale(23) }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text
                style={{
                  fontFamily: fonts.LATOBOLD,
                  fontSize: moderateScale(18),
                  color: colors.BLUE,
                  paddingVertical: moderateScale(20)
                }}
              >
                {strings.notification.message}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  paddingBottom: moderateScale(15),
                  borderBottomColor: "#dadada",
                  borderBottomWidth: 1
                }}
              >
                <View style={{ flex: 0.8, alignItems: "flex-start" }}>
                  <Text
                    style={{
                      fontSize: moderateScale(16),
                      fontFamily: fonts.LATOREGULAR,
                      color: "#888888"
                    }}
                  >
                    {strings.notification.bookingC}{" "}
                  </Text>
                </View>
                <View style={{ flex: 0.2, alignItems: "flex-end" }}>
                  <Switch
                    value={this.state.bookingConfirmed}
                    onValueChange={bookingConfirmed =>
                      this.setState({ bookingConfirmed }, () => {
                        this.setStatus(
                          this.state.bookingConfirmed,
                          2,
                          "booking_confirmed"
                        );
                      })
                    }
                    disabled={false}
                    thumbColor={colors.BLUE}
                    tintColor={"#DCEBFF"}
                    onTintColor={"#DCEBFF"}
                  />
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  paddingVertical: moderateScale(15),
                  borderBottomColor: "#dadada",
                  borderBottomWidth: 1
                }}
              >
                <View style={{ flex: 0.8, alignItems: "flex-start" }}>
                  <Text
                    style={{
                      fontSize: moderateScale(16),
                      fontFamily: fonts.LATOREGULAR,
                      color: "#888888"
                    }}
                  >
                    {strings.notification.bookingD}{" "}
                  </Text>
                </View>
                <View style={{ flex: 0.2, alignItems: "flex-end" }}>
                  <Switch
                    value={this.state.bookingDeclined}
                    onValueChange={bookingDeclined =>
                      this.setState({ bookingDeclined }, () => {
                        this.setStatus(
                          this.state.bookingDeclined,
                          2,
                          "booking_cancelled"
                        );
                      })
                    }
                    disabled={false}
                    thumbColor={colors.BLUE}
                    tintColor={"#DCEBFF"}
                    onTintColor={"#DCEBFF"}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingVertical: moderateScale(15),
                  borderBottomColor: "#dadada",
                  borderBottomWidth: 1
                }}
              >
                <View style={{ flex: 0.8, alignItems: "flex-start" }}>
                  <Text
                    style={{
                      fontSize: moderateScale(16),
                      fontFamily: fonts.LATOREGULAR,
                      color: "#888888"
                    }}
                  >
                    {strings.notification.expertChat}{" "}
                  </Text>
                </View>
                <View style={{ flex: 0.2, alignItems: "flex-end" }}>
                  <Switch
                    value={this.state.expertChat}
                    onValueChange={expertChat =>
                      this.setState({ expertChat }, () => {
                        this.setStatus(this.state.expertChat, 2, "expert_chat");
                      })
                    }
                    disabled={false}
                    thumbColor={colors.BLUE}
                    tintColor={"#DCEBFF"}
                    onTintColor={"#DCEBFF"}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingVertical: moderateScale(15),
                  borderBottomColor: "#dadada",
                  borderBottomWidth: 1
                }}
              >
                <View
                  style={{
                    flex: 0.8,
                    alignItems: "flex-start",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    style={{
                      fontSize: moderateScale(15),
                      fontFamily: fonts.LATOREGULAR,
                      color: "#888888"
                    }}
                  >
                    {strings.notification.notification}{" "}
                  </Text>

                  <Text
                    style={{
                      fontSize: moderateScale(16),
                      fontFamily: fonts.LATOBOLD,
                      color: "#888888"
                    }}
                  >
                    {strings.notification.ding}
                  </Text>
                </View>
                <View style={{ flex: 0.2, alignItems: "flex-end" }} />
              </View>

              <Text
                style={{
                  fontFamily: fonts.LATOBOLD,
                  fontSize: moderateScale(18),
                  color: colors.BLUE,
                  paddingVertical: moderateScale(20)
                }}
              >
                {strings.notification.email}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  paddingBottom: moderateScale(15),
                  borderBottomColor: "#dadada",
                  borderBottomWidth: 1
                }}
              >
                <View style={{ flex: 0.8, alignItems: "flex-start" }}>
                  <Text
                    style={{
                      fontSize: moderateScale(16),
                      fontFamily: fonts.LATOREGULAR,
                      color: "#888888"
                    }}
                  >
                    {strings.notification.bookingC}{" "}
                  </Text>
                </View>
                <View style={{ flex: 0.2, alignItems: "flex-end" }}>
                  <Switch
                    value={this.state.bookingConfirmedMail}
                    onValueChange={bookingConfirmedMail =>
                      this.setState({ bookingConfirmedMail }, () => {
                        this.setStatus(
                          this.state.bookingConfirmedMail,
                          1,
                          "booking_confirmed"
                        );
                      })
                    }
                    disabled={false}
                    thumbColor={colors.BLUE}
                    tintColor={"#DCEBFF"}
                    onTintColor={"#DCEBFF"}
                  />
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  paddingVertical: moderateScale(15),
                  borderBottomColor: "#dadada",
                  borderBottomWidth: 1
                }}
              >
                <View style={{ flex: 0.8, alignItems: "flex-start" }}>
                  <Text
                    style={{
                      fontSize: moderateScale(16),
                      fontFamily: fonts.LATOREGULAR,
                      color: "#888888"
                    }}
                  >
                    {strings.notification.bookingD}{" "}
                  </Text>
                </View>
                <View style={{ flex: 0.2, alignItems: "flex-end" }}>
                  <Switch
                    value={this.state.bookingDeclinedMail}
                    onValueChange={bookingDeclinedMail =>
                      this.setState({ bookingDeclinedMail }, () => {
                        this.setStatus(
                          this.state.bookingDeclinedMail,
                          1,
                          "booking_declined"
                        );
                      })
                    }
                    disabled={false}
                    thumbColor={colors.BLUE}
                    tintColor={"#DCEBFF"}
                    onTintColor={"#DCEBFF"}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingVertical: moderateScale(15),
                  borderBottomColor: "#dadada",
                  borderBottomWidth: 1
                }}
              >
                <View style={{ flex: 0.8, alignItems: "flex-start" }}>
                  <Text
                    style={{
                      fontSize: moderateScale(16),
                      fontFamily: fonts.LATOREGULAR,
                      color: "#888888"
                    }}
                  >
                    {strings.notification.expertChat}{" "}
                  </Text>
                </View>
                <View style={{ flex: 0.2, alignItems: "flex-end" }}>
                  <Switch
                    value={this.state.expertChatMail}
                    onValueChange={expertChatMail =>
                      this.setState({ expertChatMail }, () => {
                        this.setStatus(
                          this.state.expertChatMail,
                          1,
                          "expert_chat"
                        );
                      })
                    }
                    disabled={false}
                    thumbColor={colors.BLUE}
                    tintColor={"#DCEBFF"}
                    onTintColor={"#DCEBFF"}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingVertical: moderateScale(15),
                  borderBottomColor: "#dadada",
                  borderBottomWidth: 1
                }}
              >
                <View style={{ flex: 0.8, alignItems: "flex-start" }}>
                  <Text
                    style={{
                      fontSize: moderateScale(16),
                      fontFamily: fonts.LATOREGULAR,
                      color: "#888888"
                    }}
                  >
                    {strings.notification.notification}{" "}
                  </Text>
                  <Text
                    style={{
                      fontSize: moderateScale(16),
                      fontFamily: fonts.LATOBOLD,
                      color: "#888888"
                    }}
                  >
                    {strings.notification.pop}
                  </Text>
                </View>
                <View style={{ flex: 0.2, alignItems: "flex-end" }} />
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    notificationStatus: state.userList.notificationStatus,
    user_id:
      idx(state, _ => _.user.userData.data.id) ||
      idx(state, _ => _.signup.data.data.user_id),
    loading: state.userList.loading
  };
}

export default connect(
  mapStateToProps,
  { getNotificationStatus, setNotificationStatus, notificationSound }
)(Notifications);
