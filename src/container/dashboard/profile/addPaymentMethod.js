// Container to add new credit card

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";
import { moderateScale } from "../../../utilities/ResponsiveFonts";
import { fonts, colors } from "../../../constants/theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { addCard } from "../../../actions/list/listAction";
import strings from "../../../constants/language";

class AddPaymentMethod extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: "",
      cardCvv: "",
      cardDate: "",
      errors: {}
    };
  }

  // Navigate to start service
  goBack = () => {
    Navigation.pop(this.props.componentId);
  };

  // Input field validations
  validate = key => {
    // const errors = {};
    let { errors } = this.state;
    let formIsValid = true;

    if (key == "cardNumber" || key === "validate") {
      if (this.state.cardNumber.length < 16) {
        formIsValid = false;
        errors.cardNumber = strings.addPaymentMethod.cardError;
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
        errors.cardDate = strings.addPaymentMethod.dateError;
      } else {
        formIsValid = true;
        delete errors.cardDate;
      }
    }
    if (key == "cardCvv" || key === "validate") {
      if (this.state.cardCvv.length < 3) {
        formIsValid = false;
        errors.cardCvv = strings.addPaymentMethod.cvvError;
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
    let number = data.item.card_number;
    return (
      <View
        style={{
          height: moderateScale(50),
          paddingTop: moderateScale(10)
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Image
            source={require("../../../assets/img/visa.png")}
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
              paddingRight: moderateScale(100),
              color: "#888888"
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
                {strings.addMoney.primary}
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

  // Add new card
  addCard = () => {
    const { errors } = this.state;
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
        }
      });
    }
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

  render() {
    let { errors, cardDate } = this.state;
    return (
      <View
        style={{
          flex: 1,
          paddingTop: moderateScale(30),
          paddingHorizontal: moderateScale(13)
        }}
      >
        <View style={{ flex: 0.05, flexDirection: "row" }}>
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
          <View style={{ flex: 0.8, justifyContent: "center" }}>
            <Text
              style={{
                fontSize: moderateScale(18),
                textAlign: "center",
                fontFamily: fonts.LATOBOLD,
                color: colors.BLACK
              }}
            >
              {strings.payment.addMethod}
            </Text>
          </View>
          <View style={{ flex: 0.1 }} />
        </View>
        <View
          style={{
            flex: 0.95,
            paddingTop: moderateScale(20)
          }}
        >
          <View style={{ flex: 0.4 }}>
            <Text
              style={{
                fontSize: moderateScale(15),
                fontFamily: fonts.LATOBOLD
              }}
            >
              {strings.addPaymentMethod.select}
            </Text>
            {/* Render all added cards */}
            {this.props.allCards && this.props.allCards.data.length > 0 ? (
              <FlatList
                scrollEnabled={false}
                contentContainerStyle={{ height: moderateScale(220) }}
                renderItem={this.renderCards}
                extraData={this.state}
                data={this.props.allCards.data.slice(
                  this.props.allCards.data.length - 1
                )}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
              />
            ) : this.props.loader ? (
              <ActivityIndicator style={{ paddingTop: moderateScale(80) }} />
            ) : (
              <Text
                style={{
                  fontSize: moderateScale(15),
                  fontFamily: fonts.LATOBOLD,
                  color: colors.GREY
                }}
              >
                {strings.payment.noCard}
              </Text>
            )}
          </View>
          <KeyboardAwareScrollView
            style={{ flex: 0.6 }}
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
                    height: moderateScale(50),
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
                      // height: moderateScale(50)
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
                    {strings.addPaymentMethod.expiry}
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
                        style={{ paddingVertical: moderateScale(12) }}
                        autoCorrect={false}
                        onBlur={() => {
                          this.validate("cardDate");
                          this.checkDate(this.state.cardDate);
                        }}
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
                        autoCorrect={false}
                        style={{ paddingVertical: moderateScale(12) }}
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
                        source={require("../../../assets/img/cvv.png")}
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

            <View style={{ flex: 0.6, alignItems: "center" }}>
              <View
                style={{ height: moderateScale(20), width: moderateScale(20) }}
              />

              <TouchableOpacity
                disabled={this.props.loader2}
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
                {this.props.loader2 ? (
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
                    <Image
                      source={require("../../../assets/img/shield.png")}
                      resizeMode={"contain"}
                      style={{
                        height: moderateScale(35),
                        width: moderateScale(35),
                        alignSelf: "center"
                      }}
                    />
                    <Text
                      style={{
                        fontSize: moderateScale(15),
                        textAlign: "center",
                        fontFamily: fonts.LATOBOLD,
                        color: colors.WHITE
                      }}
                    >
                      {strings.addPaymentMethod.pay}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    allCards: state.userList.allCards,
    loader: state.userList.loadingR,
    loader2: state.userList.loadingC
  };
}

export default connect(
  mapStateToProps,
  { addCard }
)(AddPaymentMethod);
