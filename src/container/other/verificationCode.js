// Container to display verification code scren

import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import { Navigation } from "react-native-navigation";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import OtpInputs from "react-native-otp-inputs";
import { colors } from "../../constants/theme";
import Timer from "../../components/timer";
import { RNToasty } from "react-native-toasty";
import styles from "../../constants/styleSheets/others/verificationCode";
import { otpVerification, resendOtp } from "../../actions/list/listAction";
import strings from "../../constants/language";

class VerificationCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      numberIs: true,
      otp: null,
      force: true,
      resendTo: true
    };
  }

  componentWillMount = () => {
    if (this.props.fromLoginAction) {
      this.resend("mobile"); // Resend OTP
    }
  };
  verificationType = () => {
    this.setState({ numberIs: !this.state.numberIs });
  };

  // Navigate to signin
  editNumber = () => {
    Navigation.pop(this.props.componentId);
  };

  // Restart timer
  resend = type => {
    this.props.resendOtp(type);
    this.setState({ force: !this.state.force });
  };

  // Verify OTP request
  verifyOtp = () => {
    if (this.state.otp && this.state.otp.length == 6) {
      let details = { email: this.props.email, otp: this.state.otp };
      this.props.otpVerification(
        details,
        this.props.componentId,
        this.props.fromLoginAction,
        response => {
          if (response != "ERROR" && response.requestStatus == "success") {
            let ID = response.data.id;
            socket.onSocketConnect(ID);
          }
        }
      );
    } else {
      RNToasty.Error({
        title: "Please enter a valid otp.",
        withIcon: false
      });
    }
  };

  // Auto verify OTP
  autoVerify = () => {
    if (this.state.otp && this.state.otp.length === 6) {
      this.verifyOtp();
    }
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          style={styles.container}
          keyboardShouldPersistTaps={"never"}
        >
          <View style={styles.header}>
            <View style={styles.logo}>
              <Image
                source={require("../../assets/img/logo.png")}
                resizeMode={"contain"}
                style={styles.logoImage}
              />
            </View>
          </View>
          <View style={styles.space} />

          <View style={styles.body}>
            <Text style={styles.verifyText}>
              {strings.otpScreen.verification}
            </Text>
            <View style={styles.spaceTwo} />

            <Text style={styles.otpTextTwo}>
              {strings.otpScreen.code} {}
            </Text>
            <Text style={styles.otpDestination}>
              {this.state.numberIs ? this.props.number : this.props.email}
            </Text>
            <TouchableOpacity
              onPress={this.editNumber}
              disabled={this.props.loader || this.props.resendLoader}
            >
              <Text style={styles.otpChange}>{strings.otpScreen.change}</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={{ height: moderateScale(20) }} /> */}

          <View style={styles.otpHolder}>
            <OtpInputs
              handleChange={otp =>
                this.setState({ otp }, () => {
                  this.autoVerify();
                })
              }
              numberOfInputs={6}
              inputContainerStyles={styles.inputContainerStyles}
              unFocusedBorderColor={colors.LBLUE}
              focusedBorderColor={colors.BLUE}
              containerStyles={[styles.otpContainer]}
              inputStyles={{
                color: colors.GREY
              }}
              editable={this.props.loader ? false : true}
            />
          </View>
          {/* <View style={styles.space} /> */}

          <View style={styles.timerContainer}>
            <View style={[styles.expiryText, { flexDirection: "row" }]}>
              <Text style={styles.codeText}>{strings.otpScreen.codeText1}</Text>
              <Timer
                resend={this.state.resend}
                forceRemount={this.state.force}
              />
            </View>
          </View>
          <View style={styles.otpView}>
            <Text style={styles.codeText}>
              {strings.otpScreen.question}{" "}
              <Text
                onPress={() => this.resend("mobile")}
                style={[styles.otpText, styles.resendButtton]}
              >
                {strings.otpScreen.resend}{" "}
              </Text>
              <Text style={styles.codeText}> {strings.otpScreen.or}</Text>
              <Text
                style={[
                  styles.otpText,
                  styles.resendButtton,
                  { textAlign: "center" }
                ]}
                onPress={() => {
                  this.resend("email");
                }}
              >
                {" "}
                {strings.otpScreen.email}
              </Text>
            </Text>
          </View>
          {/* <View style={styles.otpView}>
            <Text style={styles.codeText}>{strings.otpScreen.question}</Text>
            <TouchableOpacity
              style={styles.resendButtton}
              onPress={() => this.resend("mobile")}
              disabled={this.props.resendLoader}
            >
              <Text style={styles.otpText}> {strings.otpScreen.resend}</Text>
            </TouchableOpacity>
            <Text style={styles.codeText}> {strings.otpScreen.or}</Text>
            <TouchableOpacity
              disabled={this.props.resendLoader}
              style={styles.resendButtton}
              onPress={() => {
                this.resend("email");
              }}
            >
              <Text style={styles.otpText}> {strings.otpScreen.email}</Text>
            </TouchableOpacity>
          </View> */}
          <View style={styles.spaceThree} />

          <View style={styles.space}>
            <TouchableOpacity
              disabled={this.props.loader}
              onPress={this.verifyOtp}
              style={styles.verifyContainer}
            >
              {this.props.loader ? (
                <ActivityIndicator color={colors.WHITE} />
              ) : (
                <Text style={styles.verifyButtonText}>
                  {strings.otpScreen.verify}
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.bottomPadding} />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    loader: state.userList.loading,
    userId: state.signup.data,
    resendLoader: state.userList.loadingR
  };
}

export default connect(
  mapStateToProps,
  { otpVerification, resendOtp }
)(VerificationCode);
