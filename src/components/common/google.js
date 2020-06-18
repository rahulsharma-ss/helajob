// Google component for social signup

import React from "react";
import { connect } from "react-redux";
import { GoogleSignin, statusCodes } from "react-native-google-signin";
import { RNToasty } from "react-native-toasty";
import styles from "../../constants/styleSheets/others/signIn";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from "react-native";
import strings from "../../constants/language";

class Google extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount = () => {
    this.configureGoogle(); //configure google before making a login request
  };

  logout = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {}
  };

  configureGoogle = () => {
    return GoogleSignin.configure({
      webClientId:
        "213845513839-u2huuak0oaj84c7cl3vrhmtiijsufbvv.apps.googleusercontent.com",
      offlineAccess: true,
      forceConsentPrompt: true,
      iosClientId:
        "637817007111-irf7odjhveidqv41619ea0ejcghp4ipe.apps.googleusercontent.com"
    });
  };

  // Requesting access token from google
  googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo });
      this.props.socialData(userInfo.accessToken, userInfo.user, "google"); //userInfo.idToken
    } catch (error) {
      this.logout();
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        RNToasty.Warn({
          title: "Signin cancelled.",
          withIcon: false
        });
        //signin cancelled
      } else if (error.code === statusCodes.IN_PROGRESS) {
        RNToasty.Warn({
          title: "Already in progress.",
          withIcon: false
        });
        //signin inprogress
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        RNToasty.Error({
          title: "Play service not available.",
          withIcon: false
        });
        //playservice not available
      }
    }
  };

  render() {
    return (
      <TouchableOpacity
        onPress={this.googleSignIn}
        style={[styles.socialContainer, styles.googleContainer]}
      >
        <View style={styles.googleIcon}>
          <Image
            source={require("../../assets/img/google.png")}
            resizeMode={"contain"}
            style={styles.googleImage}
          />
        </View>
        <View style={styles.socialTitle}>
          {this.props.loader && this.props.loaderIs == "google" ? (
            <ActivityIndicator color={"#1F5BA8"} />
          ) : (
            <Text style={styles.socialText}>{strings.login.google}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

function mapStateToProps(state) {
  return {
    loader: state.user.loading,
    loaderIs: state.user.loaderIs,
    myLanguage: state.language.language.title
  };
}

export default connect(
  mapStateToProps,
  {}
)(Google);
