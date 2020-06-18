// Signup component

import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Keyboard,
  SafeAreaView
} from "react-native";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { moderateScale } from "../../utilities/ResponsiveFonts";
import { signup } from "../../actions/auth/signupActions";
import { socialLogin } from "../../actions/auth/loginActions";
import idx from "idx";
import { fonts, colors } from "../../constants/theme";
import Facebook from "../../components/common/facebook";
import Google from "../../components/common/google";
import CheckBox from "react-native-check-box";
import { Navigation } from "react-native-navigation";
import styles from "../../constants/styleSheets/others/signUp";
import { RNToasty } from "react-native-toasty";
import CountryPicker from "react-native-country-picker-modal";
import closeImgLight from "../../assets/img/back.png";
import strings from "../../constants/language";
import { Dropdown } from "react-native-material-dropdown";
import Icon from "react-native-vector-icons/dist/FontAwesome";
const data = [
  {
    value: strings.signup.value1
  },
  {
    value: strings.signup.value2
  },
  {
    value: strings.signup.value3
  },
  {
    value: strings.signup.value4
  },
  {
    value: strings.signup.value5
  },
  {
    value: strings.signup.value6
  },
  {
    value: strings.signup.value7
  },
  {
    value: strings.signup.value8
  },
  {
    value: strings.signup.value9
  },
  {
    value: strings.signup.value10
  },
  {
    value: strings.signup.value11
  }
];

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.socialData ? this.props.socialData.name : "",
      lastName: "",
      password: "",
      email: this.props.socialData ? this.props.socialData.email : "",
      phone: "",
      userType: "Personal",
      companyName: "",
      companyAddress: "",
      companyAddress1: "",
      isChecked: false,
      isNotify: false,
      errors: {},
      cca2: "GB",
      callingCode: "44",
      newMobile: "",
      source: null
    };
  }

  componentWillMount() {
    strings.setLanguage(this.props.myLanguage);
    //Keyboard listners
    this.keyboardListner();
  }

  componentWillUnmount() {
    //Unmounting keyboard listners
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  // Signup request
  signUp = () => {
    Keyboard.dismiss();
    if (this.state.userType == "Personal") {
      if (
        this.validateUser("validate") &&
        this.validateUser("password") &&
        this.validateUser("firstName") &&
        this.validateUser("phone") &&
        this.validateUser("email")
      ) {
        let details = idx(this.props, _ => _.userId)
          ? {
              id: idx(this.props, _ => _.userId.data.user_id),
              email: this.state.email,
              password: this.state.password,
              user_type_id: 1,
              first_name: this.state.firstName,
              last_name: this.state.lastName,
              mobile_number: `+${this.state.callingCode}${this.state.newMobile}`,
              info: this.state.source,
              is_subscribed: this.state.isNotify ? 1 : 0,
              terms: this.state.isChecked
            }
          : {
              email: this.state.email,
              password: this.state.password,
              user_type_id: 1,
              first_name: this.state.firstName,
              last_name: this.state.lastName,
              mobile_number: `+${this.state.callingCode}${this.state.newMobile}`,
              info: this.state.source,
              is_subscribed: this.state.isNotify,
              terms: this.state.isChecked
            };
        if (!this.state.isChecked) {
          RNToasty.Error({
            title: `${strings.signup.check}`,
            withIcon: false
          });
        } else if (!this.state.source) {
          RNToasty.Error({
            title: `${strings.signup.source}`,
            withIcon: false
          });
        } else {
          this.props.signup(details, this.props.componentId, this.state.email); // Signup request made for individual
        }
      }
    } else if (this.state.userType == "Company") {
      if (this.validateCompany("validate")) {
        let details = idx(this.props, _ => _.userId)
          ? {
              id: idx(this.props, _ => _.userId.data.user_id),
              email: this.state.email,
              password: this.state.password,
              user_type_id: 1,
              // username: this.state.username,
              first_name: this.state.firstName,
              last_name: this.state.lastName,
              mobile_number: `+${this.state.callingCode}${this.state.newMobile}`,
              company_name: this.state.companyName,
              company_registration_no: "123456",
              company_address1: this.state.companyAddress,
              company_address2: this.state.companyAddress1,
              info: this.state.source,
              is_subscribed: this.state.isNotify,
              terms: this.state.isChecked
            }
          : {
              email: this.state.email,
              password: this.state.password,
              user_type_id: 1,
              // username: this.state.username,
              first_name: this.state.firstName,
              last_name: this.state.lastName,
              mobile_number: `+${this.state.callingCode}${this.state.newMobile}`,
              company_name: this.state.companyName,
              company_registration_no: "123456",
              company_address1: this.state.companyAddress,
              company_address2: this.state.companyAddress1,
              info: this.state.source,
              is_subscribed: this.state.isNotify,
              terms: this.state.isChecked
            };
        if (!this.state.isChecked) {
          RNToasty.Error({
            title: `${strings.signup.check}`,
            withIcon: false
          });
        } else if (!this.state.source) {
          RNToasty.Error({
            title: `${strings.signup.source}`,
            withIcon: false
          });
        } else {
          this.props.signup(details, this.props.componentId, this.state.email); // Signup request made for company
        }
      }
    }
  };

  // Mobile number validation to check for 0
  mobileNumber = mobile_number => {
    if (mobile_number.startsWith("0")) {
      this.setState({ newMobile: mobile_number.substring(1) });
    } else {
      this.setState({ newMobile: mobile_number });
    }
  };

  keyboardListner = () => {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  };

  // Navigate to login screen
  login = () => {
    Navigation.pop(this.props.componentId);
  };

  // Toggle between user/company
  toggleUser = user => {
    this.setState({
      userType: user
    });
  };

  // Validate email
  validateEmail = email => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  // Text input validation
  validateUser = key => {
    // const errors = {};
    let formIsValid = true;
    let { errors } = this.state;
    if (key == "firstName" || key === "validate") {
      if (this.state.firstName.length < 1) {
        formIsValid = false;
        errors.firstName = strings.signup.fRequired;
      } else {
        formIsValid = true;
        delete errors.firstName;
      }
    }
    if (key == "phone" || key === "validate") {
      if (this.state.phone.length < 10 || this.state.phone.length > 15) {
        formIsValid = false;
        errors.phone = strings.signup.phRequired;
      } else {
        formIsValid = true;
        delete errors.phone;
      }
    }
    if (key == "email" || key === "validate") {
      if (!this.validateEmail(this.state.email)) {
        formIsValid = false;
        errors.email = strings.signup.mailRequired;
      } else {
        formIsValid = true;
        delete errors.email;
      }
    }
    if (key == "password" || key === "validate") {
      if (this.state.password.length < 8) {
        formIsValid = false;
        errors.password = strings.signup.passRequired;
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

  // Text input validation for company fields
  validateCompany = key => {
    let formIsValid = true;
    let { errors } = this.state;

    if (key == "firstName" || key === "validate") {
      if (this.state.firstName.length < 1) {
        formIsValid = false;
        errors.firstName = strings.signup.fRequired;
      } else {
        formIsValid = true;
        delete errors.firstName;
      }
    }

    if (key == "companyName" || key === "validate") {
      if (this.state.companyName.length < 1) {
        formIsValid = false;
        errors.companyName = strings.signup.companyRequired;
      } else {
        formIsValid = true;
        delete errors.companyName;
      }
    }
    if (key == "phone" || key === "validate") {
      if (this.state.phone.length < 10) {
        formIsValid = false;
        errors.phone = strings.signup.phRequired;
      } else {
        formIsValid = true;
        delete errors.phone;
      }
    }
    if (key == "email" || key === "validate") {
      if (!this.validateEmail(this.state.email)) {
        formIsValid = false;
        errors.email = strings.signup.mailRequired;
      } else {
        formIsValid = true;
        delete errors.email;
      }
    }
    if (key == "password" || key === "validate") {
      if (this.state.password.length < 8) {
        formIsValid = false;
        errors.password = strings.signup.passRequired;
      } else {
        formIsValid = true;
        delete errors.password;
      }
    }

    if (key == "companyAddress" || key === "validate") {
      if (this.state.companyAddress.length < 1) {
        formIsValid = false;
        errors.companyAddress = strings.signup.userRequired;
      } else {
        formIsValid = true;
        delete errors.companyAddress;
      }
    }

    if (key == "companyAddress1" || key === "validate") {
      if (this.state.companyAddress1.length < 1) {
        formIsValid = false;
        errors.companyAddress1 = strings.signup.companyAddRequired;
      } else {
        formIsValid = true;
        delete errors.companyAddress1;
      }
    }
    this.setState({
      errors
    });
    return formIsValid;
  };

  // Social login request
  socialData = (token, data, provider) => {
    this.setState({
      email: data.email,
      firstName: data.first_name || data.givenName
    });
    //Api hit to check if user already registered then:
    let googleToken = {
      name: name,
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
      ); // Social login signup request made
    });
  };

  // Function to navigate to terms and conditions
  termsAndConditions = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "TermsAndConditions",
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

  // Function to navigate to privacy policy
  privacyPolicy = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "PrivacyPolicy",
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

  // Proceeding on basis of ocial login response
  proceed = response => {
    if (idx(response, _ => _.data.is_profile_complete) == 0) {
      this.setState({
        email: response.data.email,
        firstName: idx(response, _ => _.data.first_name)
      });
    } else if (idx(response, _ => _.data.is_profile_complete) == 1) {
      //Send to Dashboard
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
      this.setState({
        firstName: idx(response, _ => _.data.first_name)
      });
    }
  };

  renderIcon = () => {
    return (
      <View
        style={{ paddingTop: moderateScale(6), paddingRight: moderateScale(5) }}
      >
        <Icon name="circle" size={moderateScale(6)} color={colors.BLUE} />
      </View>
    );
  };
  render() {
    const { errors } = this.state;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={"always"}
          style={styles.container}
        >
          <View style={styles.header}>
            <View style={StyleSheet.logoContainer}>
              <Image
                source={require("../../assets/img/logo.png")}
                resizeMode={"contain"}
                style={styles.logo}
              />
            </View>
          </View>
          <View style={styles.signUpTitle}>
            <Text style={styles.signUpText}>{strings.login.signup}</Text>
          </View>
          <View style={styles.toggleContainer}>
            <View style={styles.toggleItems}>
              {/* Toggle to personal signup component */}
              <TouchableOpacity
                disabled={this.props.loader}
                onPress={() => this.toggleUser("Personal")}
                style={[
                  styles.toggleUser,
                  {
                    backgroundColor:
                      this.state.userType == "Personal" ? "#1F5BA8" : "white"
                  }
                ]}
              >
                <Text
                  style={[
                    styles.userType,
                    {
                      color:
                        this.state.userType == "Personal" ? "white" : "#1F5BA8",
                      fontFamily: fonts.LATOREGULAR
                    }
                  ]}
                >
                  {strings.signup.personal}
                </Text>
              </TouchableOpacity>
              {/* Toggle to company signup component */}
              <TouchableOpacity
                onPress={() => this.toggleUser("Company")}
                style={[
                  styles.toggleUser,
                  {
                    backgroundColor:
                      this.state.userType == "Company" ? "#1F5BA8" : "white"
                  }
                ]}
              >
                <Text
                  style={[
                    styles.userType,
                    {
                      color:
                        this.state.userType == "Company" ? "white" : "#1F5BA8",
                      fontFamily: fonts.LATOREGULAR
                    }
                  ]}
                >
                  {strings.signup.company}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 0.7 }}>
            <Text style={styles.details}>{strings.signup.fname}</Text>
            <TextInput
              style={[styles.input]}
              placeholder="John"
              onChangeText={firstName => this.setState({ firstName })}
              autoCorrect={false}
              onBlur={() => {
                this.validateUser("firstName");
              }}
              autoCapitalize="words"
              onEndEditing={() => this.validateUser("firstName")}
              value={this.state.firstName}
            />
            <Text style={styles.errorText}>{errors.firstName}</Text>
            <Text style={styles.details}>{strings.editProfile.lastName}</Text>
            <TextInput
              style={[styles.input]}
              placeholder="Doe"
              onChangeText={lastName => this.setState({ lastName })}
              autoCorrect={false}
              value={this.state.lastName}
              autoCapitalize="words"
            />
            {this.state.userType == "Company" ? (
              <Text style={styles.details}>{strings.signup.cname}</Text>
            ) : null}
            {this.state.userType === "Company" ? (
              <TextInput
                style={[styles.input]}
                placeholder="e.g JJ & LLC"
                onChangeText={companyName => this.setState({ companyName })}
                autoCorrect={false}
                autoCapitalize="words"
                onBlur={() => {
                  this.validateCompany("companyName");
                }}
                onEndEditing={() => this.validateCompany("companyName")}
                value={this.state.companyName}
              />
            ) : null}
            {this.state.userType == "Company" ? (
              <Text style={styles.errorText}>{errors.companyName}</Text>
            ) : null}

            <Text style={styles.details}>{strings.signup.phone}</Text>
            <View
              style={{
                height: moderateScale(40),
                flexDirection: "row",
                borderBottomWidth: 0.6
              }}
            >
              <View
                style={{
                  flex: 0.1,
                  justifyContent: "center"
                }}
              >
                <CountryPicker
                  filterable
                  closeable={true}
                  showCallingCode={true}
                  filterPlaceholder={"Search"}
                  closeButtonImage={closeImgLight}
                  onChange={value => {
                    this.setState({
                      cca2: value.cca2,
                      callingCode: value.callingCode
                    });
                  }}
                  cca2={this.state.cca2}
                  translation="eng"
                  styles={{
                    modalContainer: {
                      paddingVertical: moderateScale(10)
                    },

                    itemCountryName: {
                      borderBottomWidth: 0,
                      height: moderateScale(35),
                      paddingTop: moderateScale(6)
                      // textAlign: "center"
                    },
                    countryName: {
                      color: colors.BLACK
                    },
                    letterText: {
                      fontSize: moderateScale(16)
                    }
                  }}
                />
              </View>
              <View style={{ flex: 0.9, paddingLeft: moderateScale(6) }}>
                <TextInput
                  style={[styles.input, { borderBottomWidth: 0 }]}
                  keyboardType={"phone-pad"}
                  placeholder="e.g 07911 123456"
                  autoCapitalize="none"
                  onChangeText={phone =>
                    this.setState({ phone }, () => {
                      this.mobileNumber(phone);
                    })
                  }
                  onBlur={() => {
                    this.validateUser("phone");
                  }}
                  onEndEditing={() => this.validateUser("phone")}
                  maxLength={11}
                  value={this.state.phone}
                />
              </View>
            </View>

            {<Text style={styles.errorText}>{errors.phone}</Text>}
            {this.state.userType == "Company" ? (
              <Text style={styles.details}>{strings.signup.cadress}</Text>
            ) : null}
            {this.state.userType == "Company" ? (
              <TextInput
                style={styles.input}
                placeholder={strings.signup.cAdd}
                autoCapitalize="words"
                onChangeText={companyAddress =>
                  this.setState({ companyAddress })
                }
                autoCorrect={false}
                onBlur={() => {
                  this.validateCompany("companyAddress");
                }}
                onEndEditing={() => this.validateCompany("companyAddress")}
                value={this.state.companyAddress}
              />
            ) : null}
            {this.state.userType == "Company" ? (
              <Text style={styles.errorText}>{errors.companyAddress}</Text>
            ) : null}
            {this.state.userType == "Company" ? (
              <Text style={styles.details}>{strings.signup.cadress} 1</Text>
            ) : null}
            {this.state.userType == "Company" ? (
              <TextInput
                style={styles.input}
                placeholder="Street Name"
                autoCapitalize="words"
                onChangeText={companyAddress1 =>
                  this.setState({ companyAddress1 })
                }
                onBlur={() => {
                  this.validateCompany("companyAddress1");
                }}
                onEndEditing={() => this.validateCompany("companyAddress1")}
                autoCorrect={false}
                value={this.state.companyAddress1}
              />
            ) : null}
            {this.state.userType == "Company" ? (
              <Text style={styles.errorText}>{errors.companyAddress1}</Text>
            ) : null}
            <Text style={styles.details}>{strings.signup.email}</Text>

            <TextInput
              style={styles.input}
              keyboardType={"email-address"}
              placeholder={strings.forgotPassword.holder}
              autoCapitalize="none"
              onChangeText={email => this.setState({ email })}
              autoCorrect={false}
              onBlur={() => {
                this.validateUser("email");
              }}
              onEndEditing={() => this.validateUser("email")}
              value={this.state.email}
            />
            {<Text style={styles.errorText}>{errors.email}</Text>}

            <Text style={styles.details}>{strings.signup.password}</Text>

            <TextInput
              style={styles.input}
              placeholder="************"
              secureTextEntry={true}
              autoCapitalize="none"
              onChangeText={password => this.setState({ password })}
              onBlur={() => {
                this.validateUser("password");
              }}
              onEndEditing={() => this.validateUser("password")}
              value={this.state.password}
            />
            {<Text style={styles.errorText}>{errors.password}</Text>}
            <Text
              style={{
                color: "#888888",
                fontSize: moderateScale(15),
                fontFamily: fonts.LATOBOLD,
                paddingLeft: moderateScale(4),
                paddingVertical: moderateScale(12)
              }}
            >
              {strings.signup.how}
            </Text>
            <Dropdown
              data={data}
              label=""
              labelHeight={0}
              containerStyle={{
                borderBottomWidth: 0.5,
                paddingLeft: moderateScale(5)
              }}
              value={strings.signup.how2}
              inputContainerStyle={{ borderBottomColor: "transparent" }}
              textColor={colors.GREY}
              renderAccessory={this.renderIcon}
              onChangeText={value => this.setState({ source: value })}
            />
            {<Text style={styles.errorText}>{errors.source}</Text>}
          </View>
          <View
            style={[
              styles.checkBoxContainer,
              {
                flexDirection: "row",
                paddingTop: moderateScale(10)
              }
            ]}
          >
            <View
              style={{
                flex: 0.1,
                justifyContent: "center"
              }}
            >
              <CheckBox
                style={styles.checkBoxOption}
                disabled={this.props.loader}
                onClick={() => {
                  this.setState({
                    isChecked: !this.state.isChecked
                  });
                }}
                isChecked={this.state.isChecked}
                checkBoxColor={colors.BLUE}
                rightTextStyle={styles.checkBoxStyle}
              />
            </View>
            <View
              style={{
                flex: 0.9,
                // alignItems: "center",
                alignItems: "flex-start"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  height: moderateScale(20)
                }}
              >
                <Text
                  style={{
                    fontSize:
                      strings._language == "greek"
                        ? moderateScale(12)
                        : moderateScale(13),
                    fontFamily: fonts.LATOREGULAR,
                    color: "#888888"
                  }}
                >
                  {strings.signup.iAccept}
                </Text>
                <TouchableOpacity onPress={this.termsAndConditions}>
                  <Text
                    style={{
                      textDecorationLine: "underline",
                      fontSize:
                        strings._language == "greek"
                          ? moderateScale(12)
                          : moderateScale(13),
                      fontFamily: fonts.LATOREGULAR,
                      color: "#888888"
                    }}
                  >
                    {" "}
                    {strings.signup.termsA}{" "}
                  </Text>
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize:
                      strings._language == "greek"
                        ? moderateScale(12)
                        : moderateScale(13),
                    fontFamily: fonts.LATOREGULAR,
                    color: "#888888"
                  }}
                >
                  {strings.signup.and}{" "}
                </Text>
              </View>
              <TouchableOpacity
                onPress={this.privacyPolicy}
                style={{
                  justifyContent: "flex-start",
                  height: moderateScale(20),
                  width: moderateScale(290)
                }}
              >
                <Text
                  style={{
                    textDecorationLine: "underline",
                    fontSize:
                      strings._language == "greek"
                        ? moderateScale(12)
                        : moderateScale(13),
                    fontFamily: fonts.LATOREGULAR,
                    textAlign: "left",
                    color: "#888888"
                  }}
                >
                  {strings.signup.privacy}.
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={[
              styles.checkBoxContainer,
              {
                flexDirection: "row",
                height:
                  strings._language == "greek"
                    ? moderateScale(80)
                    : moderateScale(65)
              }
            ]}
          >
            <View
              style={{
                flex: 0.1,
                justifyContent: "center"
              }}
            >
              <CheckBox
                style={styles.checkBoxOption}
                disabled={this.props.loader}
                onClick={() => {
                  this.setState({
                    isNotify: !this.state.isNotify
                  });
                }}
                isChecked={this.state.isNotify}
                checkBoxColor={colors.BLUE}
                rightTextStyle={styles.checkBoxStyle}
              />
            </View>
            <View
              style={{
                flex: 0.9
              }}
            >
              <Text
                style={{
                  fontSize:
                    strings._language == "greek"
                      ? moderateScale(12)
                      : moderateScale(13),
                  fontFamily: fonts.LATOREGULAR,
                  color: "#888888",
                  textAlign: "left"
                }}
              >
                {strings.signup.notify}
              </Text>
            </View>
          </View>
          <View style={styles.authContainers}>
            <View style={styles.buttons}>
              <View style={styles.authButtons}>
                <TouchableOpacity
                  onPress={this.login}
                  style={[styles.loginBtn, styles.loginButtonColor]}
                >
                  <Text style={[styles.btnText, styles.loginText]}>
                    {strings.login.loginS}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.space} />

              <View style={styles.authButtons}>
                <TouchableOpacity
                  onPress={this.signUp}
                  style={styles.loginBtn}
                  disabled={this.props.loader}
                >
                  {this.props.loader ? (
                    <ActivityIndicator color={"white"} />
                  ) : (
                    <Text style={styles.btnText}>{strings.signup.signup}</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* <View style={styles.orContainer}>
            <View style={styles.spaceTwo}>
              <View style={styles.spaceThree} />
            </View>
            <View style={styles.orContainerBox}>
              <Text style={styles.orText}>{strings.login.or}</Text>
            </View>

            <View style={styles.spaceTwo}>
              <View style={styles.spaceFour} />
            </View>
          </View> */}
          {/* <View style={styles.socialLogin}>
            <Facebook
              socialData={this.socialData}
              language={this.props.myLanguage}
            />
            <View style={styles.spaceSix} />
            <Google
              socialData={this.socialData}
              language={this.props.myLanguage}
            />
          </View> */}
          <View style={{ height: moderateScale(12) }} />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    loader: state.signup.loading,
    userId: state.userList.signUpTrue,
    myLanguage: state.language.language.title
  };
}

export default connect(
  mapStateToProps,
  { signup, socialLogin }
)(SignUp);
