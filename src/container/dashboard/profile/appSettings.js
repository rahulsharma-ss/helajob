import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
  Modal,
  Platform
} from "react-native";
import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";
import { moderateScale } from "../../../utilities/ResponsiveFonts";
import { deleteAccount } from "../../../actions/list/listAction";
import { fonts, colors } from "../../../constants/theme";
import strings from "../../../constants/language";
import { WebView } from "react-native-webview";

class AppSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        strings.settings.version,
        strings.settings.terms,
        strings.settings.privacy,
        strings.settings.delete
      ],
      deleteModal: false,
      termsAndConditions: false,
      privacyPolicy: false
    };
  }

  // Navigate to current location
  goBack = () => {
    if (this.state.termsAndConditions || this.state.privacyPolicy) {
      this.setState({ termsAndConditions: false, privacyPolicy: false });
    } else {
      Navigation.pop(this.props.componentId);
    }
  };

  // Open delete account modal
  selectedOption = option => {
    if (option == 3) {
      this.setState({ deleteModal: true });
    } else if (option == 1) {
      this.setState({ termsAndConditions: true });
    } else if (option == 2) {
      this.setState({ privacyPolicy: true });
    }
  };

  // Render app setting option
  renderOptions = option => {
    return (
      <TouchableOpacity
        disabled={option.index === 0}
        onPress={() => this.selectedOption(option.index)}
        style={{
          height: moderateScale(50),
          flexDirection: "row",
          paddingHorizontal: moderateScale(15)
        }}
      >
        <View style={{ flex: 0.8 }}>
          <Text
            style={{
              fontSize: moderateScale(16),
              fontFamily: fonts.LATOMEDIUM,
              color: option.index === 3 ? "red" : colors.GREY,
              fontWeight: "400"
            }}
          >
            {option.item}
          </Text>
        </View>
        {/* App version  */}
        <View style={{ flex: 0.2 }}>
          {option.index === 0 ? (
            <Text
              style={{
                fontSize: moderateScale(16),
                fontFamily: fonts.LATOMEDIUM,
                color: colors.BLUE,
                textAlign: "right"
              }}
            >
              1.0.0
            </Text>
          ) : option.index != 3 ? (
            <Image
              source={require("../../../assets/img/next.png")}
              resizeMode={"contain"}
              style={{
                height: moderateScale(18),
                width: moderateScale(18),
                alignSelf: "flex-end"
              }}
            />
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  // Display terms and conditions and privacy policy.
  renderView = () => {
    const { termsAndConditions, privacyPolicy } = this.state;
    if (termsAndConditions) {
      return (
        <WebView
          source={{ uri: "http://3.9.15.38:8002/term-condition.html" }}
        />
      );
    } else if (privacyPolicy) {
      return (
        <WebView
          source={{ uri: "http://3.9.15.38:8002/term-condition.html" }}
        />
      );
    } else {
      return (
        <FlatList
          renderItem={this.renderOptions}
          showsVerticalScrollIndicator={false}
          extraData={this.state}
          data={this.state.options}
          key={Math.random.toString()}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    }
  };
  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop:
            Platform.OS == "ios" ? moderateScale(15) : moderateScale(30),
          backgroundColor:
            this.state.termsAndConditions || this.state.privacyPolicy
              ? colors.BLUE
              : colors.WHITE
        }}
      >
        <View
          style={{
            height: moderateScale(40),
            flexDirection: "row",
            paddingHorizontal: moderateScale(13),
            backgroundColor:
              this.state.termsAndConditions || this.state.privacyPolicy
                ? colors.BLUE
                : colors.WHITE
          }}
        >
          <TouchableOpacity
            onPress={this.goBack}
            style={{ flex: 0.1, justifyContent: "center" }}
          >
            <Image
              source={require("../../../assets/img/back.png")}
              resizeMode={"contain"}
              style={{
                height: moderateScale(20),
                width: moderateScale(20),
                alignSelf: "flex-start",
                tintColor:
                  this.state.termsAndConditions || this.state.privacyPolicy
                    ? colors.WHITE
                    : colors.BLACK
              }}
            />
          </TouchableOpacity>
          <View style={{ flex: 0.8, justifyContent: "center" }}>
            <Text
              style={{
                fontSize: moderateScale(18),
                textAlign: "center",
                fontFamily: fonts.LATOBOLD,
                color:
                  this.state.termsAndConditions || this.state.privacyPolicy
                    ? colors.WHITE
                    : colors.BLACK
              }}
            >
              {this.state.termsAndConditions
                ? strings.settings.terms
                : this.state.privacyPolicy
                ? strings.settings.privacy
                : strings.settings.appSetting}
            </Text>
          </View>
        </View>

        <View style={{ flex: 1, paddingTop: moderateScale(20) }}>
          {this.renderView()}
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.deleteModal}
          onRequestClose={() => null}
        >
          <View style={{ flex: 0.7, backgroundColor: "#0009" }} />
          <View style={{ flex: 0.3 }}>
            <View
              style={{
                flex: 0.2,
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  fontSize: moderateScale(18),
                  textAlign: "center",
                  fontFamily: fonts.LATOBOLD,
                  color: colors.BLACK
                }}
              >
                {strings.settings.delete}{" "}
              </Text>
            </View>
            <View
              style={{
                flex: 0.4,
                paddingHorizontal: moderateScale(10)
              }}
            >
              <Text
                style={{
                  fontSize: moderateScale(15),
                  textAlign: "center",
                  fontFamily: fonts.LATOREGULAR,
                  color: colors.BLACK
                }}
              >
                {strings.settings.unhappy}{" "}
              </Text>
            </View>

            <View
              style={{
                flex: 0.4,
                flexDirection: "row"
              }}
            >
              <View
                style={{
                  flex: 0.5,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ deleteModal: false });
                  }}
                  style={{
                    height: moderateScale(50),
                    width: moderateScale(150),
                    borderWidth: 0.7,
                    borderColor: colors.BLUE,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: moderateScale(5)
                  }}
                >
                  <Text
                    style={{
                      fontSize: moderateScale(15),
                      textAlign: "center",
                      fontFamily: fonts.LATOBOLD,
                      color: colors.BLUE
                    }}
                  >
                    {strings.dashboard.no}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 0.5,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.props.deleteAccount(this.props.componentId);
                    this.setState({ deleteModal: false });
                  }}
                  style={{
                    height: moderateScale(50),
                    width: moderateScale(150),
                    borderWidth: 0.7,
                    borderColor: "red",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: moderateScale(5),
                    backgroundColor: colors.RED
                  }}
                >
                  <Text
                    style={{
                      fontSize: moderateScale(15),
                      textAlign: "center",
                      fontFamily: fonts.LATOBOLD,
                      color: colors.WHITE
                    }}
                  >
                    {strings.profile.yes}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  { deleteAccount }
)(AppSettings);
