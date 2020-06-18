// Facebook component for social login

import React from "react";
import { connect } from "react-redux";
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { GRAPH_API } from "../../constants/url";
import styles from "../../constants/styleSheets/others/signIn";
import { RNToasty } from "react-native-toasty";
import strings from "../../constants/language";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from "react-native";

class Facebook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uniqueValue: 1
    };
  }

  componentWillMount = () => {
    // strings.setLanguage(this.props.language);
  };

  fbLogin = async () => {
    const result = await LoginManager.logInWithPermissions([
      "email",
      "public_profile"
    ]);

    if (result.isCancelled) {
      // throw errorConsts.cancelledLogin;
    } else {
      const { accessToken } = await AccessToken.getCurrentAccessToken();
      if (accessToken) {
        const {
          first_name,
          last_name,
          name,
          id,
          email,
          picture
        } = await this.fetchFbProfile(accessToken);
        let userData = { first_name, last_name, name, id, email, picture };
        this.props.socialData(accessToken, userData, "facebook");
      }
    }
  };

  //Fetching profile details
  fetchFbProfile = async accessToken => {
    try {
      const response = await fetch(`${GRAPH_API}${accessToken}`);
      return response.json();
    } catch (error) {
      RNToasty.Error({
        title: "Unable to login, please retry.",
        withIcon: false
      });
    }
  };

  //Clear facebook session from device
  logout = () => {
    LoginManager.logOut();
  };

  render() {
    return (
      <TouchableOpacity onPress={this.fbLogin} style={styles.socialContainer}>
        <View style={styles.fbLogoContainer}>
          <Image
            source={require("../../assets/img/facebook-logo.png")}
            resizeMode={"contain"}
            style={styles.fbLogo}
          />
        </View>
        <View style={[styles.socialTitle, { backgroundColor: "#3B5998" }]}>
          {this.props.loader && this.props.loaderIs == "facebook" ? (
            <ActivityIndicator color={"white"} />
          ) : (
            <Text style={[styles.socialText, { color: "white" }]}>
              {strings.login.facebook}
            </Text>
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
)(Facebook);
