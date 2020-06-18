// Continer to display Forget password screen

import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView
} from "react-native";
import { Navigation } from "react-native-navigation";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "../../constants/styleSheets/others/forgotPassword";
import { forgotPassword } from "../../actions/auth/loginActions";
import strings from "../../constants/language";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      errors: {}
    };
  }

  // Make a request for a new password
  forgotPassword = () => {
    if (this.validate("validate")) {
      this.props.forgotPassword(
        { email: this.state.email },
        this.props.componentId
      );
    }
  };

  // Text input validations
  validate = key => {
    const errors = {};
    let formIsValid = true;

    if (key == "email" || key === "validate") {
      if (!this.validateEmail(this.state.email)) {
        formIsValid = false;
        errors.email = strings.login.errorEmail;
      }
    }

    this.setState({
      errors
    });
    return formIsValid;
  };

  // Validating email
  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  // Navigating to Signin screen
  goBack = () => {
    Navigation.pop(this.props.componentId);
  };

  render() {
    const { errors } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAwareScrollView style={styles.container}>
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
          <View style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>
              {strings.login.forget}
            </Text>
            <View style={styles.spaceTwo} />

            <Text style={styles.instructions}>
              {strings.forgotPassword.title}
            </Text>
          </View>
          <View style={styles.spaceTwo} />

          <View style={styles.emailContainer}>
            <Text style={styles.email}>
              {strings.forgotPassword.enterEmail}
            </Text>
            <TextInput
              underlineColorAndroid="transparent"
              placeholder={"e.g johndoe@email.com"}
              style={styles.input}
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
              autoCapitalize={"none"}
              onBlur={() => {
                this.validate("email");
              }}
              onEndEditing={() => this.validate("email")}
            />
          </View>
          {<Text style={styles.errorText}>{errors.email}</Text>}
          <View style={styles.spaceTwo} />

          <View style={styles.space}>
            <View style={styles.buttonContainer}>
              <View style={styles.authButtons}>
                <TouchableOpacity
                  disabled={this.props.loader ? true : false}
                  onPress={this.goBack}
                  style={styles.loginBtn}
                >
                  <Text style={styles.btnText}>{strings.home.back}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.spaceThree} />
              <View style={styles.authButtons}>
                <TouchableOpacity
                  disabled={this.props.loader ? true : false}
                  onPress={this.forgotPassword}
                  style={[styles.loginBtn, { backgroundColor: "#0d5da8" }]}
                >
                  {this.props.loader ? (
                    <ActivityIndicator color={"white"} />
                  ) : (
                    <Text style={[styles.btnText, { color: "white" }]}>
                      {strings.forgotPassword.reset}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    loader: state.userList.loading
  };
}

export default connect(
  mapStateToProps,
  {
    forgotPassword
  }
)(ForgotPassword);
