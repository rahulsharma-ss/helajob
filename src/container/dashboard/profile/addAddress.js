// Container for Addin addresses

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  ActivityIndicator
} from "react-native";
import ModalSwiper from "react-native-modal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";
import { moderateScale } from "../../../utilities/ResponsiveFonts";
import { fonts, colors } from "../../../constants/theme";
import Map from "../../../components/addAddressMap";
import { addAddress } from "../../../actions/list/listAction";
import styles from "../../../constants/styleSheets/profile/addAddress";
import strings from "../../../constants/language";

class AddAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addAdressModal: false,
      selctedAddress: "",
      locationName: "",
      streetAddress: "Eg: City Road",
      streetAddress1: "",
      postalCode: "",
      isHome: false,
      isWork: false,
      isFav: false,
      latitude: "",
      longitude: "",
      locationError: false,
      addressError: false
    };
  }

  componentDidMount = () => {
    if (this.props.item) {
      let data = this.props.item;

      this.setState({
        latitude: data.latitude,
        longitude: data.longitude,
        locationName: data.location_name,
        streetAddress: data.address_line1,
        postalCode: data.postal_code,
        isHome: data.is_home ? true : false,
        isWork: data.is_job ? true : false,
        isFav: data.is_fav ? true : false,
        streetAddress1: data.address_line2
      });
    }
  };

  // Close address modal
  closeAddressModal = details => {
    this.setState({ addAdressModal: false });
  };

  // Add address request
  addAddress = () => {
    this.checkValidation("submit");
    const {
      latitude,
      longitude,
      locationName,
      streetAddress,
      streetAddress1,
      postalCode,
      isFav,
      isHome,
      isWork
    } = this.state;
    let details = {
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      location_name: locationName,
      street_address: streetAddress,
      street_address1: streetAddress1,
      postal_code: postalCode.toString(),
      is_home: isHome,
      is_job: isWork,
      is_fav: isFav,
      id: this.props.addressId
    };
    setTimeout(() => {
      if (this.props.addressId) {
        Navigation.pop(this.props.componentId);
      }
      if (
        this.state.streetAddress == "Eg: City Road" ||
        this.state.locationError
      ) {
      } else {
        this.props.addAddress(details);
        this.setState({
          selctedAddress: "",
          locationName: "",
          streetAddress: "Eg: City Road",
          streetAddress1: "",
          postalCode: "",
          isHome: false,
          isWork: false,
          isFav: false,
          latitude: "",
          longitude: "",
          locationError: false,
          addressError: false
        });
      }
    }, 300);
  };

  // Navigate to Locations
  goToLoacation = () => {
    Navigation.pop(this.props.componentId);
  };

  // Setting address
  addressIs = (details, address, latitude, longitude, postalCode) => {
    let lat = (details.geometry && details.geometry.location.lat) || latitude;
    let lng = (details.geometry && details.geometry.location.lng) || longitude;
    this.setState({
      streetAddress: details.name || address,
      latitude: lat,
      longitude: lng,
      postalCode
    });
    setTimeout(() => {
      this.setState({ addAdressModal: false }, () => {});
    }, 200);
  };

  // Input field validations
  checkValidation = type => {
    if (type == "locationName" || type == "submit") {
      if (this.state.locationName.length < 3) {
        this.setState({ locationError: true });
      } else {
        this.setState({ locationError: false });
      }
    }

    if (type == "streetAddress" || type == "submit") {
      if (
        this.state.streetAddress.length < 3 ||
        this.state.streetAddress == "Eg: City Road"
      ) {
        this.setState({ addressError: true });
      } else {
        this.setState({ addressError: false });
      }
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={this.goToLoacation}
            style={styles.backButton}
          >
            <Image
              source={require("../../../assets/img/back.png")}
              resizeMode={"contain"}
              style={styles.backImage}
            />
          </TouchableOpacity>
          <View style={{ flex: 0.8 }}>
            <Text style={styles.headerText}>
              {this.props.addressId
                ? strings.addLoc.update
                : strings.addLoc.add}
            </Text>
          </View>
          <View style={{ flex: 0.1 }} />
        </View>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            height: moderateScale(550),
            paddingHorizontal: moderateScale(13)
          }}
        >
          <View style={styles.locationFields}>
            <View style={styles.locationName}>
              <Text style={styles.locationNameTitle}>
                {strings.addLoc.locName}
              </Text>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder={strings.addLoc.eg}
                style={styles.locationInput}
                onChangeText={locationName => this.setState({ locationName })}
                value={this.state.locationName}
                autoCapitalize={"none"}
                secureTextEntry={false}
                onBlur={() => {
                  this.checkValidation("locationName");
                }}
              />
              {this.state.locationError ? (
                <Text style={styles.errorText}>{strings.addLoc.err1}</Text>
              ) : null}
            </View>

            <View style={styles.doorNumber}>
              <Text style={styles.doorNumberText}>{strings.addLoc.door}</Text>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder={"Eg: 160"}
                style={styles.locationInput}
                onChangeText={streetAddress1 =>
                  this.setState({ streetAddress1 })
                }
                value={this.state.streetAddress1}
                autoCapitalize={"none"}
                secureTextEntry={false}
              />
            </View>
            <View
              style={{
                height: moderateScale(80)
              }}
            >
              <TouchableOpacity
                onPress={() => this.setState({ addAdressModal: true })}
                style={{
                  height: moderateScale(70)
                }}
              >
                <View style={{ height: moderateScale(40) }}>
                  <Text style={styles.locationNameTitle}>
                    {strings.addLoc.street}
                  </Text>
                </View>
                <View style={styles.streetAddress}>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: moderateScale(14),
                      fontFamily: fonts.LATOREGULAR,
                      color: colors.BLACK
                    }}
                  >
                    {this.state.streetAddress}
                  </Text>
                  <View style={styles.border} />
                </View>
              </TouchableOpacity>

              {this.state.addressError ? (
                <Text style={styles.errorText2} />
              ) : null}
            </View>
            <View style={{ height: moderateScale(80) }}>
              <View style={{ height: moderateScale(40) }}>
                <Text
                  style={{
                    fontSize: moderateScale(14),
                    fontFamily: fonts.LATOBOLD,
                    paddingVertical: moderateScale(12)
                  }}
                >
                  {strings.addLoc.post}
                </Text>
              </View>
              <View
                style={{
                  height: moderateScale(40),
                  borderBottomWidth: 0.4,
                  borderBottomColor: colors.GREY,
                  justifyContent: "flex-end"
                }}
              >
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder={"Eg: EC1V 2NX"}
                  style={{
                    fontSize: moderateScale(14),
                    fontFamily: fonts.LATOREGULAR,
                    paddingVertical: moderateScale(10),
                    color: colors.BLACK
                  }}
                  onChangeText={postalCode => this.setState({ postalCode })}
                  value={this.state.postalCode}
                  autoCapitalize={"none"}
                />
              </View>
            </View>
            <View style={{ height: moderateScale(80) }}>
              <Text
                style={{
                  fontSize: moderateScale(14),
                  fontFamily: fonts.LATOBOLD,
                  paddingVertical: moderateScale(12)
                }}
              >
                {strings.addLoc.choose}
              </Text>
              <View style={{ flex: 0.2, flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => this.setState({ isHome: !this.state.isHome })}
                >
                  <Image
                    source={require("../../../assets/img/home.png")}
                    resizeMode={"contain"}
                    style={{
                      height: moderateScale(30),
                      width: moderateScale(30),
                      alignSelf: "flex-start",
                      tintColor: this.state.isHome ? colors.BLUE : colors.GREY
                    }}
                  />
                </TouchableOpacity>
                <View style={{ flex: 0.1 }} />
                <TouchableOpacity
                  onPress={() => this.setState({ isWork: !this.state.isWork })}
                >
                  <Image
                    source={require("../../../assets/img/work.png")}
                    resizeMode={"contain"}
                    style={{
                      height: moderateScale(30),
                      width: moderateScale(30),
                      alignSelf: "flex-start",
                      tintColor: this.state.isWork ? colors.BLUE : colors.GREY
                    }}
                  />
                </TouchableOpacity>
                <View style={{ flex: 0.1 }} />
                <TouchableOpacity
                  onPress={() => this.setState({ isFav: !this.state.isFav })}
                >
                  <Image
                    source={require("../../../assets/img/fav.png")}
                    resizeMode={"contain"}
                    style={{
                      height: moderateScale(30),
                      width: moderateScale(30),
                      alignSelf: "flex-start",
                      tintColor: this.state.isFav ? colors.BLUE : colors.GREY
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                height: moderateScale(80),
                justifyContent: "flex-end"
              }}
            >
              <TouchableOpacity
                disabled={this.props.loading}
                onPress={this.addAddress}
                style={{
                  height: moderateScale(45),
                  width: moderateScale(340),
                  backgroundColor: colors.BLUE,
                  borderRadius: moderateScale(5),
                  justifyContent: "center",

                  alignSelf: "center"
                }}
              >
                {!this.props.loading ? (
                  <Text
                    style={{
                      fontSize: moderateScale(15),
                      fontFamily: fonts.LATOBOLD,
                      color: colors.WHITE,
                      textAlign: "center"
                    }}
                  >
                    {this.props.addressId
                      ? strings.addLoc.update
                      : strings.addLoc.add}
                  </Text>
                ) : (
                  <ActivityIndicator color={colors.WHITE} />
                )}
              </TouchableOpacity>
            </View>
          </View>
          {/* Map componet for displaying google map */}
          <ModalSwiper
            animationInTiming={1}
            animationOutTiming={1}
            isVisible={this.state.addAdressModal}
            style={{ justifyContent: "flex-end", margin: 0 }}
            swipeDirection="down"
            hasBackdrop={false}
          >
            <View style={{ flex: 1, backgroundColor: "#0009" }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center"
                }}
              >
                <Map
                  listOn={true}
                  closeAddressModal={this.closeAddressModal}
                  myAddress={this.myAddress}
                  addressIs={this.addressIs}
                />
              </View>
            </View>
          </ModalSwiper>
        </KeyboardAwareScrollView>
        <View style={{ height: moderateScale(20) }} />
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.userList.loading
  };
}

export default connect(
  mapStateToProps,
  { addAddress }
)(AddAddress);
