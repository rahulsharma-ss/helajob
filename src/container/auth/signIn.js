// Signin Component

import React from "react";
import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
  BackHandler,
  Platform,
  Keyboard
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "../../constants/styleSheets/others/signIn";
import { login, socialLogin } from "../../actions/auth/loginActions";
import { moderateScale } from "../../utilities/ResponsiveFonts";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";
import Facebook from "../../components/common/facebook";
import Google from "../../components/common/google";
import { CustomAlert } from "../../components/customAlert";
import {
  getServices,
  setNotificationDetails,
  notificationToken,
  introDone
} from "../../actions/list/listAction";
import idx from "idx";
import strings from "../../constants/language";
import { Dropdown } from "react-native-material-dropdown";
import { setMylanguage } from "../../actions/language/language";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import { colors } from "../../constants/theme";
import Share from "react-native-share";
import Introduction from "../../components/introduction";
import { MoreInfo } from "../../components/moreInfo";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isChecked: "",
      errors: {},
      userInfo: null,
      gpsOn: false,
      socialData: null,
      socialToken: null,
      showAlert: false,
      lang: "english",
      step: 1
    };
  }

  componentWillMount = () => {
    strings.setLanguage(this.props.myLanguage);
    this.props.getServices(); //Requesting all services
    if (Platform.OS != "ios") {
      this.enableGps(); // Enabling gps for IOS
    }

    this.keyboardListners(); //Keyboard listners
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress); // Hardware back button handler for android
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress); //Removing backhandlers
    this.keyboardDidShowListener.remove(); //Removing keyboard listners
    this.keyboardDidHideListener.remove(); //Removing keyboard listners
  }

  keyboardListners = () => {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  };

  enableGps = () => {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000
    })
      .then(data => {
        this.setState({ gpsOn: true });
      })
      .catch(err => {
        this.setState({ gpsOn: false });
      });
  };

  handleBackPress = () => {
    return true;
  };

  setUserDetails = async data => {
    this.props.notificationToken({
      user_id: await this.props.userId,
      device_type: Platform.OS === "android" ? "ANDROID" : "IOS",
      device_token: data.pushToken,
      player_id: data.userId
    });
  };

  // Loggin request
  login = () => {
    notification.getUserNotificationsDetail(userDetails => {
      this.props.setNotificationDetails(userDetails);
      this.setUserDetails(userDetails);
    });

    Keyboard.dismiss(); //Dismissing opeaned keyboard
    if (Platform.OS === "ios") {
      if (this.validate("validate")) {
        let credentials = {
          email: this.state.username,
          password: this.state.password,
          user_type_id: "1"
        };
        this.props.login(credentials, this.props.componentId, response => {
          if (response != "ERROR" && response.requestStatus == "success") {
            let ID = response.data.id;
            socket.onSocketConnect(ID); // Establishing connection from socket
          }
        }); //Login request made
      }
    } else if (Platform.OS != "ios" && this.state.gpsOn) {
      if (this.validate("validate")) {
        let credentials = {
          email: this.state.username,
          password: this.state.password,
          user_type_id: "1"
        };
        this.props.login(credentials, this.props.componentId, response => {
          if (response != "ERROR" && response.requestStatus == "success") {
            let ID = response.data.id;
            socket.onSocketConnect(ID); // Establishing connection from socket
          }
        }); //Login request made
      }
    } else {
      this.enableGps();
    }
  };

  // Input field validations
  validate = key => {
    let { errors } = this.state;
    let formIsValid = true;

    if (key == "username" || key === "validate") {
      if (this.state.username.length < 5) {
        formIsValid = false;
        errors.username = strings.login.errorEmail;
      } else {
        formIsValid = true;
        delete errors.username;
      }
    }
    if (key == "password" || key === "validate") {
      if (this.state.password.length < 6) {
        formIsValid = false;
        errors.password = strings.login.errorPassword;
      } else {
        formIsValid = true;
        delete errors.password;
      }
    }
    this.setState({
      errors
    });
    return formIsValid;
  };

  _keyboardDidShow() {}
  _keyboardDidHide() {}

  // Navigating to signup screen
  signUp = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "SignUp",
        passProps: {
          socialData: this.state.socialData,
          socialToken: this.state.socialToken
        },
        options: {
          statusBar: {},
          topBar: {
            visible: false,
            height: 0
          }
        }
      }
    });

    setTimeout(() => {
      this.setState({ socialData: "", socialToken: "" });
    }, 300);
  };

  // Navigating to forgot password screen
  forgotPassword = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "ForgotPassword",
        options: {
          statusBar: {},
          topBar: {
            visible: false,
            height: 0
          }
        }
      }
    });
  };

  socialData = (token, data, provider) => {
    //Api hit to check if user already registered then:
    let googleToken = {
      name: data.name,
      email: data.email,
      photo: data.photo,
      id: data.id
    };

    let socialLoginData = {
      provider: provider,
      token: provider === "facebook" ? token : googleToken,
      user_type: 1
    };

    this.setState({ socialData: data, socialToken: token }, () => {
      this.props.socialLogin(
        socialLoginData,
        response => {
          this.proceed(response);
        },
        provider
      );
    });
  };

  proceed = response => {
    if (idx(response, _ => _.data.is_profile_complete) == 0) {
      //Navigate to Registeration
      this.signUp();
    } else if (idx(response, _ => _.data.is_profile_complete) == 1) {
      //Navigate to Dashboard
      Navigation.push(this.props.componentId, {
        component: {
          name: "Services",
          options: {
            statusBar: {},
            topBar: {
              visible: false,
              height: 0
            }
          }
        }
      });
    } else {
      this.signUp();
    }
  };

  // Displaying custom alert
  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };

  // Hiding custom alert
  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  // Displaying confirmation alert
  confirmAlert = () => {
    this.setState({
      showAlert: false
    });

    this.setTimeout(() => {
      this.signUp();
    }, 300);
  };

  setLanguage = language => {
    let languageCode =
      language == "English"
        ? "en"
        : language == "Arabic"
        ? "ar"
        : language == "Greek"
        ? "el"
        : "en";
    let languageDetails = {
      title: language.toLowerCase(),
      code: languageCode
    };
    this.props.setMylanguage(languageDetails);
    strings.setLanguage(language.toLowerCase());
    setTimeout(() => {
      this.setState({ a: 1 });
    }, 300);
  };

  renderPasswordAccessory = () => {
    return (
      <View style={{ paddingTop: moderateScale(8) }}>
        <Icon size={moderateScale(7)} name={"circle"} color={colors.BLUE} />
      </View>
    );
  };

  renderLogin = () => {
    let { errors } = this.state;
    let languages = [
      {
        value: "English"
      },
      {
        value: "Arabic"
      },
      {
        value: "Greek"
      }
    ];
    return (
      <View style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          style={[styles.container]}
          keyboardShouldPersistTaps={"handled"}
        >
          <View style={styles.header}>
            <View style={[styles.logoContainer]}>
              <Image
                source={require("../../assets/img/logo.png")}
                resizeMode={"contain"}
                style={styles.logo}
              />
            </View>
            <View style={[styles.space, { alignItems: "flex-end" }]}>
              <Dropdown
                onChangeText={title => {
                  this.setLanguage(title);
                  this.setState({ lang: title });
                }}
                label={strings.login.language}
                data={languages}
                containerStyle={{
                  width: moderateScale(100)
                }}
                pickerStyle={{
                  marginTop: moderateScale(30)
                }}
                renderAccessory={this.renderPasswordAccessory}
              />
            </View>
          </View>
          <View style={styles.signIn}>
            <Text style={styles.signInText}>{strings.login.signin}</Text>
          </View>

          <View style={styles.inputField}>
            <View
              style={{
                height: errors.password
                  ? moderateScale(220)
                  : moderateScale(200)
              }}
            >
              <Text numberOfLines={1} style={styles.username}>
                {strings.login.phoneTitle}
              </Text>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder={strings.login.nameHolder}
                style={styles.input}
                onChangeText={username => this.setState({ username })}
                value={this.state.username}
                autoCapitalize={"none"}
                autoCorrect={false}
                onBlur={() => {
                  this.validate("username");
                }}
                onEndEditing={() => this.validate("username")}
              />
              {<Text style={styles.errorText}>{errors.username}</Text>}
              <Text style={styles.username}>{strings.login.password}</Text>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder={strings.login.password}
                style={styles.input}
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
                autoCapitalize={"none"}
                secureTextEntry={true}
                onBlur={() => {
                  this.validate("password");
                }}
                onEndEditing={() => this.validate("password")}
              />
              <View style={{ height: moderateScale(30) }}>
                {<Text style={styles.errorText}>{errors.password}</Text>}
              </View>
              <TouchableOpacity
                onPress={this.forgotPassword}
                style={styles.forgotPasswordContainer}
              >
                <Text style={styles.forgotPasswordText}>
                  {strings.login.forget}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ height: moderateScale(30) }} />
          <View style={styles.buttonContainer}>
            <View style={styles.authButton}>
              <View style={styles.authButtons}>
                <TouchableOpacity
                  disabled={this.props.loader ? true : false}
                  onPress={this.signUp}
                  style={styles.loginBtn}
                >
                  <Text style={styles.btnText}>{strings.signup.signup}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 0.04 }} />
              <View style={styles.authButtons}>
                <TouchableOpacity
                  disabled={this.props.loader ? true : false}
                  onPress={this.login}
                  style={[styles.loginBtn, { backgroundColor: "#0d5da8" }]}
                >
                  {this.props.loader ? (
                    <ActivityIndicator color={"white"} />
                  ) : (
                    <Text style={[styles.btnText, { color: "white" }]}>
                      {strings.login.loginS}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* <View style={styles.orDivider}>
            <View style={{ flex: 0.46 }}>
              <View style={styles.spaceFive} />
            </View>
            <View style={styles.orTextView}>
              <Text style={styles.orText}>{strings.login.or}</Text>
            </View>

            <View style={styles.orView}>
              <View style={styles.spaceThree} />
            </View>
          </View> */}

          {/* <View style={styles.socialButtons}>
            <Facebook
              socialData={this.socialData}
              logout={this.logoutFb}
              language={this.state.lang}
            />
            <View style={styles.spaceFour} />
            <Google socialData={this.socialData} language={this.state.lang} />
          </View> */}

          <View style={{ height: moderateScale(12) }} />
        </KeyboardAwareScrollView>
        {/* Custom alert box component */}
        <CustomAlert
          show={this.state.showAlert}
          hideAlert={this.hideAlert}
          title={
            "No Email found for this Social account. Please register manually."
          }
          confirmText={"Proceed"}
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.confirmAlert();
          }}
          valueIs={true}
        />
      </View>
    );
  };

  renderIntroduction = () => {
    return <Introduction proceed={this.proceed} share={this.share} />;
  };

  proceed = () => {
    this.setState({ step: 2 });
  };

  share = () => {
    let shareOptions = {
      title: "Hela Job",
      message: `Hello, Your friend ${this.props.userName ||
        "Your friend"} has invited you to Hela Job. Hela Job is a fast, simple and secure employment app that I use to find job seekers in seconds.`,
      url: "https://www.helajob.com",
      subject: `${this.props.userName ||
        "Your friend"} Has Invited You To Join Hela Job"` //  for email
    };
    Share.open(shareOptions)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  toLogin = () => {
    this.setState({ step: 3 });
    this.props.introDone(true);
  };

  renderGetStarted = () => {
    return (
      <MoreInfo
        toLogin={this.toLogin}
        submitTicket={this.submitTicket}
        helpCenter={this.helpCenter}
      />
    );
  };

  submitTicket = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "SupportTicket",
        options: {
          statusBar: {
            drawBehind: true,
            backgroundColor: "white",
            style: "dark"
          },
          topBar: {
            visible: false,
            height: moderateScale(20),
            transparent: true
          }
        }
      }
    });
  };

  helpCenter = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "Faq",
        options: {
          statusBar: {},
          topBar: {
            visible: false,
            height: 0
          },
          animations: {
            push: {
              waitForRender: true
            }
          }
        }
      }
    });
  };

  renderBody = () => {
    if (this.state.step == 1 && !this.props.userStatus) {
      return this.renderIntroduction();
    } else if (this.state.step == 2 && !this.props.userStatus) {
      return this.renderGetStarted();
    } else {
      return this.renderLogin();
    }
  };

  render() {
    console.log(this.state.step == 1, "&&========>", !this.props.userStatus);
    return (
      <SafeAreaView style={styles.safeArea}>{this.renderBody()}</SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    loader: state.login.loading,
    myLanguage: state.language.language.title,
    userId:
      idx(state.user, _ => _.userData.data.id) ||
      idx(state.signup, _ => _.data.data.user_id),
    userStatus: state.introReducer.introduction
  };
}

export default connect(
  mapStateToProps,
  {
    login,
    socialLogin,
    getServices,
    setMylanguage,
    setNotificationDetails,
    notificationToken,
    introDone
  }
)(SignIn);
