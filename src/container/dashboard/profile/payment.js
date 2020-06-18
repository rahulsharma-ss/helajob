// Container for displaying Payment options

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  Platform,
  Clipboard
} from "react-native";
import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";
import { moderateScale } from "../../../utilities/ResponsiveFonts";
import { fonts, colors } from "../../../constants/theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  couponVerification1,
  getWalletAmount
} from "../../../actions/list/listAction";
import idx from "idx";
import { RNToasty } from "react-native-toasty";
import Share, { ShareSheet, Button } from "react-native-share";
import styles from "../../../constants/styleSheets/profile/payment";
var _ = require("lodash");
import strings from "../../../constants/language";

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      promoCode: "",
      myCode: "john2398",
      discountTypeIs: "",
      absoluteDiscount: 0,
      visible: false
    };
    this.addMoney = _.debounce(this.addMoney, 300);
    this.addPaymentMethod = _.debounce(this.addPaymentMethod, 300);
    this.recentTransactions = _.debounce(this.recentTransactions, 300);
  }

  componentDidMount = () => {
    this.props.getWalletAmount(res => {});
  };
  // Navigate to Profile
  goBack = () => {
    Navigation.pop(this.props.componentId);
  };

  // Navigating to Add payment
  addPaymentMethod = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "AddPaymentMethod",
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

  // Navigate to add money
  addMoney = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "AddMoney",
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

  // Navigate to recent transactions
  recentTransactions = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "RecentTransactions",
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

  // Navigate to verify coupon
  verifyCoupon = () => {
    this.props.couponVerification1(this.state.promoCode, response => {
      if (response != 0) {
        let discountType = idx(response, _ => _.data.is_fixed == 0); // Discount type fixed or precent.
        let totalDiscount = Number(idx(response, _ => _.data.discount_amount)); // Total discount
        this.setState({
          absoluteDiscount: totalDiscount,
          discountTypeIs: discountType ? "P" : "W"
        });
      } else {
        this.setState({
          absoluteDiscount: 0,
          discountTypeIs: ""
        });
      }
    });
  };

  // Discount text
  discountText = () => {
    if (this.state.discountTypeIs == "P") {
      return `${this.state.absoluteDiscount} ${strings.payment.discountOne}`;
    } else if (this.state.discountTypeIs == "W") {
      return `£${this.state.absoluteDiscount} ${strings.payment.discountTwo}`;
    } else {
      return "";
    }
  };

  // Write to clipboard
  writeToClipboard = async () => {
    await Clipboard.setString(this.state.myCode);
    RNToasty.Success({
      title: `${strings.payment.codeSuccess}`,
      withIcon: false
    });
  };

  onCancel() {
    this.setState({ visible: false });
  }
  onOpen() {
    this.setState({ visible: true });
  }

  render() {
    let shareOptions = {
      title: `${strings.payment.use} ${this.state.myCode} ${strings.payment.get}`,
      message: `${strings.payment.use} ${this.state.myCode} ${strings.payment.get}`,
      url: "https://www.helajob.com",
      subject: `${this.props.userData} has Invited You To Join Hela Job` //  for email
    }; // Share options for sharing data

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={this.goBack} style={styles.backButton}>
            <Image
              source={require("../../../assets/img/back.png")}
              resizeMode={"contain"}
              style={styles.backButtonImage}
            />
          </TouchableOpacity>
          <View style={{ flex: 0.8 }}>
            <Text style={styles.paymentText}>{strings.payment.payment}</Text>
          </View>
        </View>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
        >
          {this.props.walletIs == 1 ? (
            <View style={styles.addMoneyContainer}>
              <View style={styles.walletTitle}>
                <Text
                  style={{
                    fontSize: moderateScale(16),
                    fontFamily: fonts.LATOBOLD
                  }}
                >
                  {strings.payment.title}
                </Text>
              </View>
              <View style={styles.totalAmountWallet}>
                <Text style={styles.walletAmountText}>
                  £
                  {(this.props.totalAmount &&
                    this.props.totalAmount.data &&
                    this.props.totalAmount.data.amount) ||
                    0}
                </Text>
              </View>

              <TouchableOpacity
                onPress={this.addMoney}
                style={{
                  fontSize: moderateScale(15),
                  fontFamily: fonts.LATOBOLD
                }}
              >
                <Text style={styles.addTitle}>
                  {strings.payment.addMoney} >
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
          {/* Rendering all added cards */}
          <View style={styles.paymentMethod}>
            <Text style={styles.paymentMethodText}>
              {strings.payment.methods}
            </Text>
            {idx(this.props, _ => _.allCards.data.length > 0) ? (
              <View style={styles.cardContainer}>
                <Image
                  source={require("../../../assets/img/visa.png")}
                  resizeMode={"contain"}
                  style={styles.visa}
                />
                <Text
                  style={{
                    fontSize: moderateScale(16),
                    fontFamily: fonts.LATOBOLD,
                    paddingRight: moderateScale(100),
                    color: "#888888"
                  }}
                >
                  *******
                  {idx(
                    this.props,
                    _ =>
                      _.allCards.data.slice(
                        this.props.allCards.data.length - 1
                      )[0].card_number
                  )}
                </Text>
                <View style={styles.primary}>
                  <Text style={styles.primaryText}>
                    {strings.payment.primary}
                  </Text>
                </View>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text
                  style={{
                    fontSize: moderateScale(15),
                    fontFamily: fonts.LATOBOLD,
                    color: colors.GREY
                  }}
                >
                  {strings.payment.noCard}
                </Text>
              </View>
            )}
            <TouchableOpacity onPress={this.addPaymentMethod}>
              <Text
                style={{
                  fontSize: moderateScale(15),
                  fontFamily: fonts.LATOBOLD
                }}
              >
                {strings.payment.addMethod} >
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 0.25, //also 2
              justifyContent: "space-evenly"
            }}
          >
            <Text
              style={{
                fontSize: moderateScale(16),
                fontFamily: fonts.LATOBOLD
              }}
            >
              {strings.payment.addPromo}
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderRadius: moderateScale(100),
                flex: 0.4,
                borderColor: colors.GREY,
                justifyContent: "center",
                flexDirection: "row",
                overflow: "hidden"
              }}
            >
              <View style={{ flex: 0.8, justifyContent: "center" }}>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder={strings.payment.enterCode}
                  style={{
                    height: moderateScale(40),
                    paddingLeft: moderateScale(10),
                    fontFamily: fonts.LATOREGULAR
                  }}
                  onChangeText={promoCode => this.setState({ promoCode })}
                  value={this.state.promoCode}
                  autoCapitalize={"none"}
                  autoCorrect={false}
                />
              </View>
              <TouchableOpacity
                onPress={this.verifyCoupon}
                style={{
                  flex: 0.2,
                  backgroundColor: colors.GREY,
                  justifyContent: "center"
                }}
              >
                <Text
                  style={{
                    fontSize: moderateScale(15),
                    fontFamily: fonts.LATOMEDIUM,
                    textAlign: "left",
                    color: colors.WHITE,
                    paddingLeft: moderateScale(10)
                  }}
                >
                  {strings.payment.apply}
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontSize: moderateScale(13),
                fontFamily: fonts.LATOMEDIUM,
                textAlign: "left",
                color: "green",
                paddingLeft: moderateScale(10)
              }}
            >
              {this.discountText()}
            </Text>
          </View>
        </KeyboardAwareScrollView>
        <TouchableOpacity
          onPress={() => this.recentTransactions()}
          style={{
            height: moderateScale(50),
            elevation: Platform.OS == "ios" ? 1 : 10,
            shadowOffset: {
              width: Platform.OS == "ios" ? -4.5 : -15,
              height: Platform.OS == "ios" ? -5 : -0.2
            },
            shadowColor: "black",
            shadowOpacity: 0.3,
            backgroundColor: "white",
            paddingHorizontal: moderateScale(13),
            justifyContent: "space-between",
            flexDirection: "row",
            paddingTop: moderateScale(12)
          }}
        >
          <Text
            style={{
              fontSize: moderateScale(14),
              fontFamily: fonts.LATOMEDIUM,
              textAlign: "left",
              color: colors.BLUE,
              paddingLeft: moderateScale(8)
            }}
          >
            {strings.payment.recent}
          </Text>
          <Image
            source={require("../../../assets/img/blue_next.png")}
            resizeMode={"contain"}
            style={{
              height: moderateScale(10),
              width: moderateScale(10),
              alignSelf: "flex-start"
            }}
          />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    totalAmount: state.userList.walletDetails,
    allCards: state.userList.allCards,
    userData: idx(state, _ => _.userList.userDetails.data[0].fullname),
    walletIs:
      idx(state, _ => _.user.userData.wallet_connect_status) ||
      idx(state, _ => _.signup.data.wallet_connect_status)
  };
}

export default connect(
  mapStateToProps,
  { couponVerification1, getWalletAmount }
)(Payment);
