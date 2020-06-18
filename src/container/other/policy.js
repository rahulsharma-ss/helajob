import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
  FlatList,
  ActivityIndicator,
  Platform
} from "react-native";
import { Navigation } from "react-native-navigation";
import { connect } from "react-redux";
import { moderateScale } from "../../utilities/ResponsiveFonts";
import { fonts, colors } from "../../constants/theme";
import styles from "../../constants/styleSheets/others/termsAndConditions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import idx from "idx";
import {
  addCard,
  getCards,
  addMoney,
  setPolicyStatus,
  deductMoney
} from "../../actions/list/listAction";
import strings from "../../constants/language";
import { RNToasty } from "react-native-toasty";
import AddMoney from "../../container/dashboard/profile/addMoney";
var _ = require("lodash");

class UnderDevelopment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      cardNumber: "",
      cardCvv: "",
      cardDate: "",
      errors: {},
      moneyError: false,
      loader: false
    };
    // socket.requestResponse(response => {
    //   this.test(response);
    // });
    this.addCard = _.debounce(this.addCard, 500);
  }

  // Navigate to current location screen
  goBack = () => {
    Navigation.pop(this.props.componentId);
  };

  // test = response => {
  //   let adminComission = idx(this.props, _ => _.adminComission) || 0.22;
  //   let jobPrice = idx(this.props, _ => _.jobData.price) * 4;
  //   let jobWithFee = jobPrice + jobPrice * adminComission;
  //   let data = {
  //     // request_id: response.requestId,
  //     request_id: response.requestId,
  //     total_amount: jobWithFee.toFixed(2)
  //   };
  //   this.props.deductMoney(data, response => {
  //     this.setState({ moneyError: response, loader: true });
  //   }); // Deducting money for a request
  // };

  // policy modal
  policy = () => {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            height:
              Platform.OS === "ios" ? moderateScale(40) : moderateScale(65),
            flexDirection: "row",
            paddingHorizontal: moderateScale(13),
            alignItems: "flex-end",
            paddingBottom: moderateScale(10)
          }}
        >
          <TouchableOpacity
            onPress={this.goBack}
            style={styles.backButtonContainer}
          >
            <Image
              source={require("../../assets/img/back.png")}
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
                paddingTop: moderateScale(10)
              }}
            >
              {strings.policy.title}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, paddingHorizontal: moderateScale(13) }}>
          <View style={{ flex: 0.9 }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{}}
            >
              <Text
                style={{
                  fontFamily: fonts.LATOBOLD,
                  fontSize: moderateScale(15),
                  color: colors.BLUE,
                  paddingVertical: moderateScale(10)
                }}
              >
                {strings.policy.policy2}
              </Text>

              <Text
                style={{
                  fontFamily: fonts.LATOBOLD,
                  fontSize: moderateScale(13),
                  color: colors.DGREY
                }}
              >
                {strings.policy.policy1}
              </Text>

              <Text
                style={{
                  fontFamily: fonts.LATOBOLD,
                  fontSize: moderateScale(15),
                  color: colors.BLUE,
                  paddingVertical: moderateScale(10)
                }}
              >
                {strings.policy.policy3}
              </Text>
              <Text
                style={{
                  fontFamily: fonts.LATOBOLD,
                  fontSize: moderateScale(13),
                  color: colors.DGREY
                }}
              >
                {strings.policy.policy4}
              </Text>
              <Text
                style={{
                  fontFamily: fonts.LATOBOLD,
                  fontSize: moderateScale(15),
                  color: colors.BLUE,
                  paddingVertical: moderateScale(10)
                }}
              >
                {strings.policy.policy5}
              </Text>
              <Text
                style={{
                  fontFamily: fonts.LATOBOLD,
                  fontSize: moderateScale(13),
                  color: colors.DGREY
                }}
              >
                {strings.policy.policy6}
              </Text>
            </ScrollView>
          </View>
          <View
            style={{
              flex: 0.1,
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: moderateScale(10)
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.setState({ step: 2 });
              }}
              style={{
                height: moderateScale(40),
                width: moderateScale(340),
                borderRadius: moderateScale(5),
                backgroundColor: colors.BLUE,
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.LATOBOLD,
                  fontSize: moderateScale(15),
                  color: colors.WHITE,
                  textAlign: "center"
                }}
              >
                {strings.policy.accept}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  // Setting 4hr policy status.
  setPolicyStatus = () => {
    let data = {
      user_id: this.props.userId,
      status: 1
    };
    this.props.setPolicyStatus(data, response => {});
  };

  // Ading money to wallet
  // addMoney = () => {
  //   this.setState({ loader: false });
  //   if (!this.state.moneyError) {
  //     Navigation.pop(this.props.componentId);
  //   } else {
  //     RNToasty.Error({
  //       title: strings.payment.error,
  //       withIcon: false
  //     });
  //   }
  // };

  addMoney = () => {
    this.props.requestJob();
    Navigation.pop(this.props.componentId);
    this.setPolicyStatus();
  };

  // Add new card
  addCard = () => {
    let cardPresent = idx(this.props, _ => _.cardPresent.data.length > 0);
    const { errors } = this.state;
    if (cardPresent) {
      this.addMoney();
    } else {
      this.validate("validate");
      if (
        !errors.hasOwnProperty("cardNumber") &&
        !errors.hasOwnProperty("cardCvv") &&
        !errors.hasOwnProperty("cardDate")
      ) {
        let cardDetails = {
          card_no: this.state.cardNumber,
          card_month: this.state.cardDate
            ? this.state.cardDate.split("/")[0]
            : "",
          card_year: this.state.cardDate
            ? `${"20"}${this.state.cardDate.split("/")[1]}`
            : "",
          card_cvv: this.state.cardCvv
        };
        this.props.addCard(cardDetails, response => {
          if (response == 1) {
            this.setState({ cardNumber: "", cardCvv: "", cardDate: "" });
            this.addMoney();
          }
        });
      }
    }
  };

  // Input field validations
  validate = key => {
    // const errors = {};
    let { errors } = this.state;
    let formIsValid = true;

    if (key == "cardNumber" || key === "validate") {
      if (this.state.cardNumber.length < 16) {
        formIsValid = false;
        errors.cardNumber = `${strings.addPaymentMethod.cardError}`;
      } else {
        formIsValid = true;
        delete errors.cardNumber;
      }
    }

    if (key == "cardDate" || key === "validate") {
      if (
        this.state.cardDate.length < 4 ||
        Number(this.state.cardDate.split("/")[0]) > 12
      ) {
        formIsValid = false;
        errors.cardDate = `${strings.addPaymentMethod.dateError}`;
      } else {
        formIsValid = true;
        delete errors.cardDate;
      }
    }
    if (key == "cardCvv" || key === "validate") {
      if (this.state.cardCvv.length < 3) {
        formIsValid = false;
        errors.cardCvv = `${strings.addPaymentMethod.cvvError}`;
      } else {
        formIsValid = true;
        delete errors.cardCvv;
      }
    }

    this.setState({
      errors
    });
    return formIsValid;
  };

  // Render added cards list
  renderCards = data => {
    let number = data.item.card_number; // Card id
    return (
      <View
        style={{
          height: moderateScale(50),
          paddingTop: moderateScale(10)
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Image
            source={require("../../assets/img/visa.png")}
            resizeMode={"contain"}
            style={{
              height: moderateScale(35),
              width: moderateScale(35),
              alignSelf: "flex-start"
            }}
          />
          <Text
            style={{
              fontSize: moderateScale(16),
              fontFamily: fonts.LATOBOLD,
              paddingRight: moderateScale(100)
            }}
          >
            ******{number}
          </Text>
          {data.index == 0 ? (
            <View
              style={{
                borderWidth: 1,
                borderRadius: moderateScale(100),
                height: moderateScale(20),
                width: moderateScale(55),
                borderColor: colors.GREY
              }}
            >
              <Text
                style={{
                  fontSize: moderateScale(12),
                  fontFamily: fonts.LATOBOLD,
                  textAlign: "center",
                  color: colors.GREY
                }}
              >
                {strings.payment.primary}
              </Text>
            </View>
          ) : (
            <View
              style={{
                height: moderateScale(20),
                width: moderateScale(55)
              }}
            />
          )}
        </View>
        <View
          style={{
            height: moderateScale(30),
            width: moderateScale(10)
          }}
        />
      </View>
    );
  };

  // Check credit card expiry date
  checkDate = expiry => {
    const sanitized = this.limitLength(this.removeNonNumber(expiry), 4);
    if (sanitized.match(/^[2-9]$/)) {
      this.setState({ cardDate: `0${sanitized}` });
    }
    if (sanitized.length > 2) {
      this.setState({
        cardDate: `${sanitized.substr(0, 2)}/${sanitized.substr(
          2,
          sanitized.length
        )}`
      });
    }
  };

  limitLength = (string = "", maxLength) => string.substr(0, maxLength);
  removeNonNumber = (string = "") => string.toString().replace(/[^\d]/g, "");

  makePayment = () => {
    let adminComission = idx(this.props, _ => _.adminComission) || 0.22;
    let cardPresent = idx(this.props, _ => _.cardPresent.data.length > 0); // Checking if card is present.
    let amount = idx(this.props, _ => _.totalAmount.data.amount) || 0; // Two decimal points

    const { errors } = this.state;
    return (
      <View
        style={{
          flex: 1,
          paddingTop: moderateScale(10),
          paddingHorizontal: moderateScale(13)
        }}
      >
        <View
          style={{
            flexDirection: "row",
            height:
              Platform.OS === "ios" ? moderateScale(40) : moderateScale(65),
            paddingTop:
              Platform.OS === "ios" ? moderateScale(0) : moderateScale(25)
          }}
        >
          <TouchableOpacity
            onPress={this.goBack}
            style={styles.backButtonContainer}
          >
            <Image
              source={require("../../assets/img/back.png")}
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
                paddingTop: moderateScale(10)
              }}
            >
              {strings.payment.addMethod}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 0.95,
            paddingTop: moderateScale(20)
          }}
        >
          <KeyboardAwareScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ flex: 0.2 }}>
              <View style={{ height: moderateScale(30) }}>
                <Text
                  style={{
                    fontSize: moderateScale(15),
                    fontFamily: fonts.LATOBOLD
                  }}
                >
                  {strings.addPaymentMethod.add}
                </Text>
              </View>
              <View
                style={{
                  height: moderateScale(60),
                  justifyContent: "center"
                }}
              >
                <View
                  style={{
                    height: moderateScale(25)
                  }}
                >
                  <Text
                    style={{
                      fontSize: moderateScale(15),
                      fontFamily: fonts.LATOBOLD,
                      color: colors.GREY
                    }}
                  >
                    {strings.addPaymentMethod.enter}
                  </Text>
                </View>
                <View
                  style={{
                    height: moderateScale(45),
                    justifyContent: "center"
                  }}
                >
                  <TextInput
                    maxLength={16}
                    keyboardType="numeric"
                    underlineColorAndroid="transparent"
                    placeholder={strings.addPaymentMethod.enter}
                    autoCapitalize={"none"}
                    onChangeText={cardNumber => this.setState({ cardNumber })}
                    autoCorrect={false}
                    style={{
                      borderBottomColor: colors.GREY,
                      borderBottomWidth: 0.5,
                      paddingVertical: moderateScale(15)
                    }}
                    onBlur={() => {
                      this.validate("cardNumber");
                    }}
                    onEndEditing={() => this.validate("cardNumber")}
                    value={this.state.cardNumber}
                  />
                  <Text
                    style={{
                      fontSize: moderateScale(14),
                      color: "red",
                      fontFamily: fonts.LATOREGULAR
                    }}
                  >
                    {errors.cardNumber}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 0.2,
                justifyContent: "center"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  paddingTop: moderateScale(25),
                  height: moderateScale(55)
                }}
              >
                <View style={{ flex: 0.5 }}>
                  <Text
                    style={{
                      fontSize: moderateScale(15),
                      fontFamily: fonts.LATOBOLD,
                      color: colors.GREY
                    }}
                  >
                    {strings.addPaymentMethod.expiry}{" "}
                  </Text>
                </View>
                <View style={{ height: 10, width: 10 }} />

                <View style={{ flex: 0.5 }}>
                  <Text
                    style={{
                      fontSize: moderateScale(15),
                      fontFamily: fonts.LATOBOLD,
                      color: colors.GREY
                    }}
                  >
                    {strings.addPaymentMethod.cvv}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row"
                }}
              >
                <View style={{ flex: 0.5 }}>
                  <View
                    style={{
                      flex: 0.7,
                      flexDirection: "row"
                    }}
                  >
                    <View
                      style={{
                        flex: 0.8,
                        borderBottomColor: colors.GREY,
                        borderBottomWidth: 0.5
                      }}
                    >
                      <TextInput
                        maxLength={5}
                        keyboardType="numeric"
                        underlineColorAndroid="transparent"
                        placeholder={"MM/YY"}
                        autoCapitalize={"none"}
                        onChangeText={cardDate =>
                          this.setState({ cardDate }, () => {
                            this.checkDate(this.state.cardDate);
                          })
                        }
                        autoCorrect={false}
                        onBlur={() => {
                          this.validate("cardDate");
                          this.checkDate(this.state.cardDate);
                        }}
                        style={{ paddingVertical: moderateScale(12) }}
                        onEndEditing={() => this.validate("cardDate")}
                        value={this.state.cardDate}
                      />
                    </View>
                    <View
                      style={{
                        flex: 0.2,
                        borderBottomColor: colors.GREY,
                        borderBottomWidth: 0.5
                      }}
                    >
                      <Image
                        source={null}
                        resizeMode={"contain"}
                        style={{
                          height: moderateScale(20),
                          width: moderateScale(20),
                          alignSelf: "center"
                        }}
                      />
                    </View>
                  </View>
                  <View style={{ flex: 0.4 }}>
                    <Text
                      style={{
                        fontSize: moderateScale(14),
                        color: "red",
                        fontFamily: fonts.LATOREGULAR,
                        height: moderateScale(20)
                      }}
                    >
                      {errors.cardDate}
                    </Text>
                  </View>
                </View>
                <View style={{ height: 10, width: 10 }} />
                <View style={{ flex: 0.5 }}>
                  <View
                    style={{
                      flex: 0.7,
                      flexDirection: "row"
                    }}
                  >
                    <View
                      style={{
                        flex: 0.8,
                        borderBottomColor: colors.GREY,
                        borderBottomWidth: 0.5
                      }}
                    >
                      <TextInput
                        maxLength={3}
                        keyboardType="numeric"
                        underlineColorAndroid="transparent"
                        placeholder={strings.addPaymentMethod.enterCvv}
                        onChangeText={cardCvv => this.setState({ cardCvv })}
                        autoCapitalize={"none"}
                        style={{ paddingVertical: moderateScale(12) }}
                        autoCorrect={false}
                        onBlur={() => {
                          this.validate("cardCvv");
                        }}
                        onEndEditing={() => this.validate("cardCvv")}
                        value={this.state.cardCvv}
                      />
                    </View>
                    <View
                      style={{
                        flex: 0.2,
                        borderBottomColor: colors.GREY,
                        borderBottomWidth: 0.5,
                        paddingVertical: moderateScale(12)
                      }}
                    >
                      <Image
                        source={require("../../assets/img/cvv.png")}
                        resizeMode={"contain"}
                        style={{
                          height: moderateScale(20),
                          width: moderateScale(20),
                          alignSelf: "center"
                        }}
                      />
                    </View>
                  </View>
                  <View style={{ flex: 0.3 }}>
                    <Text
                      style={{
                        fontSize: moderateScale(14),
                        color: "red",
                        fontFamily: fonts.LATOREGULAR,
                        height: moderateScale(20)
                      }}
                    >
                      {errors.cardCvv}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ flex: 0.1 }}>
              <Text
                style={{
                  fontFamily: fonts.LATOBOLD,
                  fontSize: moderateScale(13),
                  color: colors.INTROGREEN
                }}
              >
                {strings.policy.please}
                <Text
                  style={{
                    fontFamily: fonts.LATOREGULAR,
                    fontSize: moderateScale(13),
                    color: colors.DGREY
                  }}
                >
                  {" "}
                  {strings.policy.please2}
                </Text>
              </Text>
            </View>
            <View
              style={{
                flex: 0.4,
                alignItems: "center",
                paddingTop: moderateScale(30)
              }}
            >
              <View
                style={{ height: moderateScale(20), width: moderateScale(20) }}
              />

              <TouchableOpacity
                disabled={this.props.loader2 || this.state.loader}
                onPress={this.addCard}
                style={{
                  height: moderateScale(45),
                  width: moderateScale(330),
                  backgroundColor: colors.BLUE,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: moderateScale(8)
                }}
              >
                {this.props.loader2 || this.state.loader ? (
                  <ActivityIndicator color={colors.WHITE} />
                ) : (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: moderateScale(15),
                        textAlign: "center",
                        fontFamily: fonts.LATOBOLD,
                        color: colors.WHITE
                      }}
                    >
                      {strings.policy.add}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </View>
    );
  };

  // Displaying body according to requirement
  renderBody = () => {
    switch (this.state.step) {
      case 0:
        return this.policy();

      case 2:
        return this.makePayment();
    }
  };

  render() {
    return <SafeAreaView style={{ flex: 1 }}>{this.renderBody()}</SafeAreaView>;
  }
}

function mapStateToProps(state) {
  return {
    allCards: state.userList.allCards,
    loader: state.userList.loadingR,
    loader2: state.userList.loadingC,
    cardPresent: state.userList.allCards,
    userId:
      idx(state.user, _ => _.userData.data.id) ||
      idx(state.signup, _ => _.data.data.user_id),
    adminComission: state.userList.commissionPercent,
    totalAmount: state.userList.walletDetails
  };
}

export default connect(
  mapStateToProps,
  { addCard, getCards, addMoney, setPolicyStatus, deductMoney }
)(UnderDevelopment);
