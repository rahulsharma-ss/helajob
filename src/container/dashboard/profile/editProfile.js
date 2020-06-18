// Edit profile Container

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
  Platform
} from "react-native";
import { moderateScale } from "../../../utilities/ResponsiveFonts";
import Icon from "react-native-vector-icons/Entypo";
import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";
import { fonts, colors } from "../../../constants/theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "../../../constants/styleSheets/others/signIn";
import idx from "idx";
import { updateProfile } from "../../../actions/list/listAction";
import { PROFILE_IMG_URL } from "../../../constants/url";
import ImagePicker from "react-native-image-picker";
import { CachedImage } from "react-native-cached-image";
import strings from "../../../constants/language";

var _ = require("lodash");

class EditProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      fullname: "",
      username: "",
      email: "",
      mobile_number: "",
      password: "",
      errors: {},
      profileImage: null,
      email_verified: null,
      mobile_verified: null,
      sendImage: "",
      firstName: "",
      lastName: ""
    };
    this.updateProfile = _.debounce(this.updateProfile, 300);
    this.openCamera = _.debounce(this.openCamera, 300);
  }

  componentDidMount() {
    // Setting user data
    if (this.props && this.props.userDetails) {
      let data = idx(this.props, _ => _.userDetails.data[0]);

      this.setState({
        // profileImage: data.profile_image,
        firstName: data.first_name,
        lastName: data.last_name ? data.last_name : "",
        mobile_number: data.mobile_number,
        email: data.email,
        email_verified: data.email_verified,
        mobile_verified: data.mobile_verified
      });
    }
  }

  // Validating email
  validateEmail = email => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  // Validating input fields
  validateUser = key => {
    let { errors } = this.state;
    let formIsValid = true;

    if (key == "fullname" || key === "validate") {
      if (this.state.firstName.length < 1) {
        formIsValid = false;
        errors.fullname = strings.signup.fRequired;
      } else {
        formIsValid = true;
        delete errors.fullname;
      }
    }
    if (key == "phone" || key === "validate") {
      if (this.state.mobile_number.length < 10) {
        formIsValid = false;
        errors.phone = strings.signup.phRequired;
      } else if (this.state.mobile_number.length > 15) {
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
    if (key == "password" || (key === "validate" && !this.state.user_id)) {
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

  // Navigating to dashboard
  goBack = () => {
    Navigation.pop(this.props.componentId);
  };

  //Open camera
  openCamera = () => {
    ImagePicker.showImagePicker(
      {
        quality: 0.1
      },
      response => {
        if (response.didCancel) {
        } else if (response.error) {
        } else if (response.customButton) {
        } else {
          const source = { uri: response.uri };
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          this.setState({
            profileImage: `data:image/jpeg;base64,${response.data}`,
            sendImage: response
          });
        }
      }
    );
  };

  // Update profile
  updateProfile = () => {
    if (this.validateUser("validate")) {
      let image =
        this.state.sendImage ||
        this.state.profileImage ||
        `${PROFILE_IMG_URL}${idx(
          this.props,
          _ => _.userDetails.data[0].profile_image
        )}`;
      const { firstName, lastName, password } = this.state;
      this.props.updateProfile(image, firstName, lastName, password);
    }
  };

  render() {
    const { errors } = this.state;
    let serverImage = idx(this.props, _ => _.userDetails.data[0].profile_image);
    let localImage = this.state.profileImage;
    return (
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop:
            Platform.OS == "ios" ? moderateScale(5) : moderateScale(30)
        }}
      >
        <View
          style={{
            height: moderateScale(40),
            flexDirection: "row",
            paddingHorizontal: moderateScale(13),
            paddingVertical: moderateScale(10)
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
                alignSelf: "flex-start"
              }}
            />
          </TouchableOpacity>
          <View style={{ flex: 0.8 }}>
            <Text
              style={{
                fontSize: moderateScale(18),
                textAlign: "center",
                fontFamily: fonts.LATOBOLD,
                color: colors.BLACK
              }}
            >
              {strings.editProfile.edit}
            </Text>
          </View>
        </View>
        <KeyboardAwareScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: moderateScale(20)
          }}
          keyboardShouldPersistTaps={"never"}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          innerRef={ref => {
            this.scroll = ref;
          }}
        >
          <TouchableOpacity
            onPress={this.openCamera}
            style={{
              height: moderateScale(76),
              width: moderateScale(76),
              borderColor: colors.BLUE,
              borderRadius: moderateScale(76 / 2),
              marginVertical: moderateScale(20),
              borderWidth: 1,
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden"
            }}
          >
            {localImage ? (
              <Image
                style={{
                  height: moderateScale(76),
                  width: moderateScale(76),
                  borderColor: "transparent"
                }}
                source={{
                  uri: this.state.profileImage
                }}
              />
            ) : serverImage ? (
              <Image
                style={{
                  height: moderateScale(76),
                  width: moderateScale(76),
                  borderColor: "transparent"
                }}
                source={{
                  uri: `${PROFILE_IMG_URL}${idx(
                    this.props,
                    _ => _.userDetails.data[0].profile_image
                  )}`
                }}
              />
            ) : (
              <Image
                source={require("../../../assets/img/logo.png")}
                resizeMode={"contain"}
                style={{
                  height: moderateScale(50),
                  width: moderateScale(50)
                }}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.openCamera}
            style={{
              height: moderateScale(27),
              width: moderateScale(27),
              borderColor: colors.PRIMARY,
              borderRadius: moderateScale(27 / 2),
              borderWidth: 1,
              backgroundColor: colors.BLUE,
              position: "absolute",
              left: moderateScale(70),
              top: moderateScale(70),
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Icon name="edit" size={moderateScale(13)} color={"white"} />
          </TouchableOpacity>
          <Text style={[styles.username, { color: colors.BLACK }]}>
            {strings.editProfile.firstName}
          </Text>
          <TextInput
            style={styles.input}
            placeholder={strings.editProfile.john}
            underlineColorAndroid={"transparent"}
            value={this.state.firstName}
            onChangeText={firstName => this.setState({ firstName })}
            onBlur={() => {
              this.validateUser("fullname");
            }}
            onEndEditing={() => this.validateUser("fullname")}
          />
          {<Text style={styles.errorText}>{errors.fullname}</Text>}
          <Text style={[styles.username, { color: colors.BLACK }]}>
            {strings.editProfile.lastName}
          </Text>
          <TextInput
            style={styles.input}
            placeholder={strings.editProfile.doe}
            underlineColorAndroid={"transparent"}
            value={this.state.lastName}
            onChangeText={lastName => this.setState({ lastName })}
          />

          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 0.7 }}>
              <Text style={[styles.username, { color: colors.BLACK }]}>
                {strings.signup.phone}
              </Text>
            </View>
            <View
              style={{
                paddingVertical: moderateScale(10),
                flex: 0.3,
                paddingTop: moderateScale(20),
                alignItems: "flex-end",
                justifyContent: "center"
              }}
            >
              {idx(this.props, _ => _.userDetails.data[0].mobile_verified) ===
              1 ? (
                <View
                  style={{
                    height: moderateScale(18),
                    width: moderateScale(48),
                    backgroundColor: "#40D15D",
                    borderColor: "#40D15D",
                    borderWidth: 1,
                    borderRadius: moderateScale(9),
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: moderateScale(10),
                      fontFamily: fonts.BASESEMIBOLD
                    }}
                  >
                    {strings.editProfile.verified}
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    height: moderateScale(18),
                    width: moderateScale(41),
                    backgroundColor: "#F85C5C",
                    borderColor: "#F85C5C",
                    borderWidth: 1,
                    borderRadius: moderateScale(9),
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: moderateScale(10),
                      fontFamily: fonts.BASESEMIBOLD
                    }}
                  >
                    {strings.editProfile.verify}
                  </Text>
                </View>
              )}
            </View>
          </View>
          <TextInput
            editable={false}
            style={styles.input}
            keyboardType={"phone-pad"}
            placeholder={strings.editProfile.phone}
            underlineColorAndroid={"transparent"}
            value={this.state.mobile_number}
            onChangeText={mobile_number => this.setState({ mobile_number })}
            onBlur={() => {
              this.validateUser("phone");
            }}
            onEndEditing={() => this.validateUser("phone")}
          />
          {<Text style={styles.errorText}>{errors.phone}</Text>}

          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 0.7 }}>
              <Text style={[styles.username, { color: colors.BLACK }]}>
                {strings.signup.email}
              </Text>
            </View>
            <View
              style={{
                paddingVertical: moderateScale(10),
                flex: 0.3,
                paddingTop: moderateScale(20),
                alignItems: "flex-end",
                justifyContent: "center"
              }}
            >
              {idx(this.props, _ => _.userDetails.data[0].email_verified) ===
              1 ? (
                <View
                  style={{
                    height: moderateScale(18),
                    width: moderateScale(48),
                    backgroundColor: "#40D15D",
                    borderColor: "#40D15D",
                    borderWidth: 1,
                    borderRadius: moderateScale(9),
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: moderateScale(10),
                      fontFamily: fonts.BASESEMIBOLD
                    }}
                  >
                    {strings.editProfile.verified}
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    height: moderateScale(18),
                    width: moderateScale(41),
                    backgroundColor: "#F85C5C",
                    borderColor: "#F85C5C",
                    borderWidth: 1,
                    borderRadius: moderateScale(9),
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: moderateScale(10),
                      fontFamily: fonts.BASESEMIBOLD
                    }}
                  >
                    {strings.editProfile.verify}
                  </Text>
                </View>
              )}
            </View>
          </View>
          <TextInput
            editable={false}
            style={styles.input}
            keyboardType={"email-address"}
            placeholder={strings.editProfile.email}
            underlineColorAndroid={"transparent"}
            value={this.state.email}
            onChangeText={email => {
              this.setState({ email });
            }}
            autoCapitalize={"none"}
            onBlur={() => {
              this.validateUser("email");
            }}
            onEndEditing={() => this.validateUser("email")}
          />
          {<Text style={styles.errorText}>{errors.email}</Text>}
          <Text style={[styles.username, { color: colors.BLACK }]}>
            {strings.signup.password}
          </Text>
          <TextInput
            style={styles.input}
            placeholder={"***************"}
            underlineColorAndroid={"transparent"}
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            onBlur={() => {
              if (!this.state.user_id) {
                this.validateUser("password");
              }
            }}
            onEndEditing={() => {
              if (!this.state.user_id) {
                this.validateUser("password");
              }
            }}
          />
          {<Text style={styles.errorText}>{errors.password}</Text>}
          <TouchableOpacity
            onPress={this.updateProfile}
            style={{
              height: moderateScale(45),
              backgroundColor: colors.BLUE,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: moderateScale(3),
              marginVertical: moderateScale(40)
            }}
            disabled={this.props.updatingProfile ? true : false}
          >
            {this.props.updatingProfile ? (
              <ActivityIndicator color={"white"} />
            ) : (
              <Text
                style={{
                  color: "white",
                  fontSize: moderateScale(15),
                  fontFamily: fonts.LATOBOLD
                }}
              >
                {strings.editProfile.update}
              </Text>
            )}
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    userDetails: state.userList.userDetails,
    updatingProfile: state.userList.updatingProfile
  };
}

export default connect(
  mapStateToProps,
  { updateProfile }
)(EditProfile);
