// Component used for creating a support ticket
import React from "react";
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ActivityIndicator,
  NativeModules,
  LayoutAnimation,
  Image
} from "react-native";
import { moderateScale } from "../utilities/ResponsiveFonts";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import styles from "../constants/styleSheets/others/signUp";
import { Navigation } from "react-native-navigation";
import { fonts, colors } from "../constants/theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  createZendeskTicket,
  disputeTicket
} from "../actions/user/TicketActions";
import { RNToasty } from "react-native-toasty";
import idx from "idx";
import ZendeskChat from "react-native-zendesk-chat";
import strings from "../constants/language";
import { Dropdown } from "react-native-material-dropdown";
import Icon2 from "react-native-vector-icons/dist/FontAwesome";

const { UIManager } = NativeModules;
const CustomLayoutAnimation = {
  duration: 300,
  create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity
  },
  update: {
    type: LayoutAnimation.Types.easeIn
  }
};
const { width } = Dimensions.get("window");

class SupportTicket extends React.Component {
  constructor() {
    super();
    this.state = {
      supportTitle: "",
      supportType: "",
      supportDetails: "",
      loading: false,
      titleIs: true,
      supportTypeIs: true,
      supportDetailsIs: true,
      categoryModal: false,
      categoryName: "Select service type",
      categoryId: ""
    };
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  // Method for submitting a ticket request
  onSubmit = () => {
    this.validation("check");
    let data = {
      ticket: {
        subject: this.state.supportTitle,
        comment: { body: this.state.supportDetails },
        priority: "urgent",
        requester_id: this.props.zenddesk_id,
        submitter_id: this.props.zenddesk_id,
        external_id: this.props.zenddesk_id,
        tags: [this.state.categoryName],
        status: "pending",
        type: this.state.supportType
      }
    };

    setTimeout(() => {
      if (
        this.state.titleIs === true &&
        this.state.supportTypeIs === true &&
        this.state.supportDetailsIs === true
      ) {
        this.setState({ loading: true });
        this.props.createZendeskTicket(data, cb => {
          this.setState({
            loading: false,
            supportDetails: "",
            supportTitle: "",
            supportType: "",
            categoryName: ""
          });
          if (this.props.jobId) {
            this.props.disputeTicket(this.props.jobId);
          }
          RNToasty.Success({
            title: strings.ticket.success,
            withIcon: false
          });
        });
        Navigation.pop(this.props.componentId);
      }
    }, 300);
  };

  // Method for initializing customer care chat
  customerSupport = () => {
    if (Platform.OS == "ios") {
      return ZendeskChat.startChat({
        name: idx(this.props, _ => _.userData.fullname),
        email: idx(this.props, _ => _.userData.email),
        phone: idx(this.props, _ => _.userData.mobile_number),
        tags: ["Hela Job", "Customer"],
        department: "Hela Job Customer"
      });
    } else {
      return NativeModules.ZendeskChat.startChat({
        name: idx(this.props, _ => _.userData.fullname),
        email: idx(this.props, _ => _.userData.email),
        phone: idx(this.props, _ => _.userData.mobile_number),
        tags: ["Hela Job", "Customer"],
        department: "Hela Job Customer"
      });
    }
  };

  // Method for rendering chat over screen
  renderBottomView = () => {
    return (
      <View
        style={{
          position: "absolute",
          bottom: 0,
          height: moderateScale(111),
          width: width,
          borderColor: "#dadada",
          borderWidth: 1,
          shadowColor: "#dadada", // IOS
          shadowOffset: { height: moderateScale(5), width: moderateScale(5) }, // IOS
          shadowOpacity: 1, // IOS
          shadowRadius: moderateScale(10), //IOS
          elevation: moderateScale(30), // Android
          backgroundColor: "white"
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginHorizontal: moderateScale(15),
            marginTop: moderateScale(15)
          }}
        >
          <View style={{ flex: 0.75 }}>
            <View style={{ flex: 0.5 }}>
              <Text
                style={{
                  fontFamily: fonts.BASEREGULAR,
                  fontSize: moderateScale(16),
                  color: "#686868"
                }}
              >
                {strings.ticket.wait}
              </Text>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={this.customerSupport}
              >
                <Text
                  style={{
                    fontFamily: fonts.LATOBOLD,
                    fontSize: moderateScale(16),
                    color: "#1F5BA8"
                  }}
                >
                  {strings.ticket.chat}
                </Text>
                <Icon
                  name="ios-arrow-forward"
                  size={moderateScale(15)}
                  color={"#1F5BA8"}
                  style={{ marginLeft: moderateScale(10) }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 0.5 }} />
          </View>
          <View style={{ flex: 0.25 }} />
        </View>
      </View>
    );
  };

  validation = value => {
    if (value == "title" || value == "check") {
      if (this.state.supportTitle.length < 1) {
        this.setState({ titleIs: false });
      } else {
        this.setState({ titleIs: true });
      }
    }
    if (value == "type" || value == "check") {
      if (
        this.state.supportType.length < 1 ||
        this.state.supportType == "Select service type"
      ) {
        this.setState({ supportTypeIs: false });
      } else {
        this.setState({ supportTypeIs: true });
      }
    }
    if (value == "details" || value == "check") {
      if (this.state.supportDetails.length < 1) {
        this.setState({ supportDetailsIs: false });
      } else {
        this.setState({ supportDetailsIs: true });
      }
    }
  };

  // Render job categories
  rendercategories = data => {
    LayoutAnimation.configureNext(CustomLayoutAnimation);
    return (
      <TouchableOpacity
        key={Math.random().toString()}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingRight: moderateScale(5),
          paddingVertical: moderateScale(7)
        }}
        onPress={() => {
          this.setState(
            {
              categoryModal: !this.state.categoryModal,
              categoryName: data.service,
              categoryId: data.id
            },
            () => {
              this.validation("type");
            }
          );
        }}
      >
        <Text
          style={{
            fontSize: moderateScale(15),
            color: colors.DGREY,
            fontFamily: fonts.LATOMEDIUM
          }}
        >
          {data.service}
        </Text>
      </TouchableOpacity>
    );
  };

  renderPasswordAccessory = () => {
    return (
      <View style={{ paddingTop: moderateScale(8) }}>
        <Icon2 size={moderateScale(7)} name={"circle"} color={"#1F5BA8"} />
      </View>
    );
  };

  render() {
    let ticketType = [
      {
        value: strings.ticket.relatedTo1
      },
      {
        value: strings.ticket.relatedTo2
      },
      {
        value: strings.ticket.relatedTo3
      },
      {
        value: strings.ticket.relatedTo4
      },
      {
        value: strings.ticket.relatedTo5
      },
      {
        value: strings.ticket.relatedTo6
      },
      {
        value: strings.ticket.relatedTo7
      }
    ];
    return (
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
            onPress={() => {
              Navigation.pop(this.props.componentId);
            }}
          >
            <Image
              source={require("../assets/img/back.png")}
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
              {strings.helpCenter.support}
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
        <View
          style={{
            flex: 0.77
          }}
        >
          <KeyboardAwareScrollView
            contentContainerStyle={{
              paddingHorizontal: moderateScale(20),
              justifyContent: "center"
            }}
            keyboardShouldPersistTaps={"never"}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            innerRef={ref => {
              this.scroll = ref;
            }}
          >
            {this.props.referenceNumber ? (
              <Text style={styles.inputText}>
                {strings.expandHistory.referenceNo}
              </Text>
            ) : null}
            {this.props.referenceNumber ? (
              <TextInput
                editable={false}
                style={styles.textInput2}
                placeholder={strings.expandHistory.referenceNo}
                underlineColorAndroid={"transparent"}
                value={`#${this.props.referenceNumber}`}
              />
            ) : null}

            <Text style={styles.inputText}>{strings.ticket.title}</Text>
            <TextInput
              style={styles.textInput2}
              placeholder={strings.ticket.enter}
              underlineColorAndroid={"transparent"}
              value={this.state.supportTitle}
              onChangeText={supportTitle => this.setState({ supportTitle })}
              onBlur={() => this.validation("title")}
            />

            {!this.state.titleIs ? (
              <Text
                style={{
                  fontSize: moderateScale(12),
                  fontFamily: fonts.LATOREGULAR,
                  color: "red",
                  paddingTop: moderateScale(5)
                }}
              >
                {strings.ticket.please}
              </Text>
            ) : null}

            <Text
              style={[
                styles.inputText,
                {
                  paddingVertical: moderateScale(0),
                  paddingTop: moderateScale(10)
                }
              ]}
            >
              {strings.ticket.type}
            </Text>
            <Dropdown
              onChangeText={supportType => {
                this.setState({ supportType: supportType });
                this.validation("type");
              }}
              label={""}
              value={strings.ticket.relatedTo}
              data={ticketType}
              containerStyle={{}}
              renderAccessory={this.renderPasswordAccessory}
            />
            {!this.state.supportTypeIs ? (
              <Text
                style={{
                  fontSize: moderateScale(12),
                  fontFamily: fonts.LATOREGULAR,
                  color: "red",
                  paddingTop: moderateScale(5)
                }}
              >
                {strings.ticket.type2}
              </Text>
            ) : null}
            {!this.state.supportTypeIs ? (
              <Text
                style={{
                  fontSize: moderateScale(12),
                  fontFamily: fonts.LATOREGULAR,
                  color: "red",
                  paddingTop: moderateScale(5)
                }}
              >
                {strings.ticket.service2}
              </Text>
            ) : null}

            <Text style={styles.inputText}>{strings.ticket.details}</Text>
            <TextInput
              style={[styles.textInput2, { height: moderateScale(100) }]}
              placeholder={strings.ticket.enter2}
              underlineColorAndroid={"transparent"}
              value={this.state.supportDetails}
              onChangeText={supportDetails => this.setState({ supportDetails })}
              onBlur={() => this.validation("details")}
              multiline={true}
            />

            {!this.state.supportDetailsIs ? (
              <Text
                style={{
                  fontSize: moderateScale(12),
                  fontFamily: fonts.LATOREGULAR,
                  color: "red",
                  paddingTop: moderateScale(5)
                }}
              >
                {strings.ticket.please3}
              </Text>
            ) : null}
            <TouchableOpacity
              style={{
                height: moderateScale(45),
                width: moderateScale(160),
                backgroundColor: "#1F5BA8",
                alignItems: "center",
                justifyContent: "center",
                borderColor: colors.PRIMARY,
                borderRadius: moderateScale(5),
                marginVertical: moderateScale(55),
                alignSelf: "center"
              }}
              onPress={() => {
                this.onSubmit();
              }}
              disabled={this.state.loading}
            >
              {this.state.loading ? (
                <ActivityIndicator color={"white"} />
              ) : (
                <Text style={styles.btnText}>{strings.ticket.submit}</Text>
              )}
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </View>
        <View style={{ flex: 0.1 }}>{this.renderBottomView()}</View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    userId:
      idx(state, _ => _.user.userData.data.id) ||
      idx(state, _ => _.signup.data.data.user_id),
    zenddesk_id: idx(state, _ => _.userList.userDetails.data[0].zenddesk_id),
    userData: idx(state, _ => _.userList.userDetails.data[0]),
    services: state.userList.listData
  };
}

export default connect(
  mapStateToProps,
  { createZendeskTicket, disputeTicket }
)(SupportTicket);
