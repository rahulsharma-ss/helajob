import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView
} from "react-native";
import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";
import styles from "../../constants/styleSheets/others/termsAndConditions";
import { colors } from "../../constants/theme";
import strings from "../../constants/language";
import { WebView } from "react-native-webview";

class PrivacyPolicy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goBack = () => {
    // Navigating to Signin component
    Navigation.pop(this.props.componentId);
  };

  render() {
    return (
      <SafeAreaView
        style={styles.container}
        translucent
        backgroundColor={colors.BLUE}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={this.goBack}
            style={styles.backButtonContainer}
          >
            <Image
              source={require("../../assets/img/back.png")}
              resizeMode={"contain"}
              style={styles.backImage}
            />
          </TouchableOpacity>
          <View style={styles.headerTitle}>
            <Text style={styles.headerText}>{strings.settings.privacy}</Text>
          </View>
        </View>
        <WebView
          source={{ uri: "https://www.helajob.com/privacy-policy.html" }}
        />
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  {}
)(PrivacyPolicy);
