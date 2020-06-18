// Container for adding money to wallet

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Platform,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";
import { moderateScale } from "../../../utilities/ResponsiveFonts";
import { fonts, colors } from "../../../constants/theme";
import { addMoney, addCardModal } from "../../../actions/list/listAction";
import idx from "idx";
import strings from "../../../constants/language";
const { width } = Dimensions.get("window");
class AddMoney extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: null,
      amountError: false,
      cardError: false,
      originalAmount: 0,
      ref_number: ""
    };
  }

  // Navigating to Start service
  goBack = () => {
    if (this.props.newUser) {
      this.props.close();
    } else {
      Navigation.pop(this.props.componentId);
    }
    // this.props.addCardModal(false);
  };

  // Listing added credit cards
  renderCards = data => {
    let number = idx(data, _ => _.item.card_number);
    return (
      <View
        style={{
          height: moderateScale(50)
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

  // Add money to wallet.
  addMoney = () => {
    this.setState({ ref_number: Math.floor(Math.random() * 90000) + 10000 });
    let card_Id = idx(
      this.props,
      _ =>
        _.allCards.data.slice(this.props.allCards.data.length - 1)[0]
          .stripe_card_id
    ); // Unique job id.
    const { amount } = this.state;

    // Adding money to wallet.
    this.props.addMoney(card_Id, amount, response => {
      if (response) {
        this.props.addCardModal(true);
      }
    });
  };

  // Check if amount is sufficient for job request.
  checkAmount = () => {
    this.setState({ originalAmount: this.state.amount });
    if (
      idx(this.props, _ => _.allCards.data.length < 1) ||
      !idx(this.props, _ => _.allCards.data.length)
    ) {
      this.setState({ cardError: true });
    } else {
      this.setState({ cardError: false });
      if (!this.state.amount || this.state.amount == 0) {
        this.setState({
          amountError: true
        });
      } else {
        this.setState({
          amountError: false,
          amount: null
        });
        this.addMoney();
      }
    }
  };

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop:
            Platform.OS == "ios" ? moderateScale(15) : moderateScale(35)
        }}
      >
        <View
          style={{
            flex: 1,
            paddingHorizontal: moderateScale(13),
            paddingTop: moderateScale(10)
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
            <View style={{ flex: 0.8 }}>
              <Text
                style={{
                  fontSize: moderateScale(18),
                  textAlign: "center",
                  fontFamily: fonts.LATOBOLD,
                  color: colors.BLACK
                }}
              >
                {strings.addMoney.add}
              </Text>
            </View>
            <View style={{ flex: 0.1 }} />
          </View>
          <View
            style={{
              flex: 0.95
            }}
          >
            <View
              style={{
                flex: 0.3,
                justifyContent: "space-evenly"
              }}
            >
              <Text
                style={{
                  fontSize: moderateScale(16),
                  fontFamily: fonts.LATOBOLD
                }}
              >
                {strings.addMoney.balance}{" "}
              </Text>
              <Text
                style={{
                  fontSize: moderateScale(30),
                  fontFamily: fonts.LATOBOLD,
                  color: colors.BLUE,
                  borderBottomWidth: 0.5,
                  borderBottomColor: colors.GREY
                }}
              >
                £{idx(this.props, _ => _.totalAmount.data.amount) || 0}
              </Text>
              <View
                style={{
                  height: moderateScale(1),
                  borderTopWidth: 1,
                  opacity: 0.2
                }}
              />

              <Text
                style={{
                  fontSize: moderateScale(15),
                  fontFamily: fonts.LATOBOLD
                }}
              >
                {strings.addMoney.add}
              </Text>
            </View>
            <View style={{ flex: 0.7 }}>
              <View style={{ height: moderateScale(40) }}>
                <TextInput
                  returnKeyType={"done"}
                  keyboardType="number-pad"
                  underlineColorAndroid="transparent"
                  placeholder={"£0.00"}
                  style={{
                    height: moderateScale(40),
                    paddingLeft: moderateScale(10),
                    fontFamily: fonts.LATOREGULAR,
                    borderBottomWidth: 0.5,
                    borderBottomColor: colors.GREY
                  }}
                  onChangeText={amount => this.setState({ amount })}
                  value={this.state.amount}
                  autoCapitalize={"none"}
                  autoCorrect={false}
                />
                <Text
                  style={{
                    fontSize: moderateScale(13),
                    color: "red",
                    fontFamily: fonts.LATOREGULAR
                  }}
                >
                  {this.state.cardError
                    ? strings.addMoney.cardError
                    : this.state.amountError
                    ? strings.addMoney.amtError
                    : ""}
                </Text>
              </View>

              <View style={{ height: moderateScale(25) }} />
              {/* Display all added credit cards */}
              {idx(this.props, _ => _.allCards.data.length > 0) ? (
                <View
                  style={{
                    height: moderateScale(200),
                    paddingTop: moderateScale(10)
                  }}
                >
                  <View
                    style={{
                      height: moderateScale(60),
                      justifyContent: "flex-end"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: moderateScale(15),
                        fontFamily: fonts.LATOBOLD,
                        paddingBottom: moderateScale(10)
                      }}
                    >
                      {strings.payment.methods}
                    </Text>
                  </View>

                  <FlatList
                    contentContainerStyle={{
                      height: moderateScale(200)
                    }}
                    renderItem={this.renderCards}
                    extraData={this.state}
                    data={idx(this.props, _ =>
                      _.allCards.data.slice(this.props.allCards.data.length - 1)
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                  />
                </View>
              ) : null}
              <View
                style={{
                  flex: 0.3,
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  onPress={this.checkAmount}
                  disabled={this.props.moneyLoader}
                  style={{
                    height: moderateScale(40),
                    width: moderateScale(320),
                    backgroundColor: colors.BLUE,
                    borderRadius: moderateScale(5),
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  {this.props.moneyLoader ? (
                    <ActivityIndicator color={colors.WHITE} />
                  ) : (
                    <Text
                      style={{
                        fontSize: moderateScale(15),
                        fontFamily: fonts.LATOBOLD,
                        color: colors.WHITE
                      }}
                    >
                      {strings.addMoney.addMoney}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        {this.props.cardAdded ? (
          <View
            style={{
              height: moderateScale(200),
              width,
              backgroundColor: "white",
              elevation: Platform.OS == "ios" ? 1 : 10,
              shadowOffset: {
                width: Platform.OS == "ios" ? -0.2 : -0.4,
                height: Platform.OS == "ios" ? -0.1 : -0.2
              },
              shadowColor: "black",
              shadowOpacity: 0.5,
              position: "absolute",
              bottom: 0
            }}
          >
            <View
              style={{
                height: moderateScale(200),
                paddingHorizontal: moderateScale(10),
                alignItems: "center",
                justifyContent: "space-evenly"
              }}
            >
              <View
                style={{
                  height: moderateScale(35),
                  alignItems: "center",
                  justifyContent: "space-evenly"
                }}
              >
                <Text
                  style={{
                    fontSize: moderateScale(17),
                    textAlign: "center",
                    fontFamily: fonts.LATOBOLD
                  }}
                >
                  {strings.addMoney.success}
                </Text>
              </View>
              <View
                style={{
                  height: moderateScale(50),
                  alignItems: "center",
                  paddingTop: moderateScale(10)
                }}
              >
                <Text
                  style={{
                    fontSize: moderateScale(13),
                    textAlign: "center",
                    fontFamily: fonts.LATOBOLD
                  }}
                >
                  {strings.addMoney.successOne} £{this.state.originalAmount}{" "}
                  {strings.addMoney.successTwo} #{this.state.ref_number}
                </Text>
              </View>
              <View
                style={{
                  height: moderateScale(75),
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.props.addCardModal(false);
                    Navigation.push(this.props.componentId, {
                      component: {
                        name: "SupportTicket",
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
                        },
                        passProps: {
                          referenceNumber: this.state.ref_number
                        }
                      }
                    });
                  }}
                  style={{
                    height: moderateScale(50),
                    width: moderateScale(150),
                    alignItems: "center",
                    justifyContent: "center",
                    borderColor: "red",
                    borderWidth: 0.7,
                    borderRadius: moderateScale(5)
                  }}
                >
                  <Text
                    style={{
                      fontSize: moderateScale(17),
                      textAlign: "center",
                      fontFamily: fonts.LATOBOLD,
                      color: "red"
                    }}
                  >
                    {strings.addMoney.report}
                  </Text>
                </TouchableOpacity>
                <View style={{ width: moderateScale(40) }} />
                <TouchableOpacity
                  onPress={() => {
                    this.props.addCardModal(false);
                  }}
                  style={{
                    height: moderateScale(50),
                    width: moderateScale(150),
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: colors.BLUE,
                    borderRadius: moderateScale(5)
                  }}
                >
                  <Text
                    style={{
                      fontSize: moderateScale(17),
                      textAlign: "center",
                      fontFamily: fonts.LATOBOLD,
                      color: colors.WHITE
                    }}
                  >
                    {strings.services.ok}{" "}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : null}
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    allCards: state.userList.allCards,
    totalAmount: state.userList.walletDetails,
    moneyLoader: state.userList.moneyLoader,
    cardAdded: state.userList.cardAdded
  };
}

export default connect(
  mapStateToProps,
  { addMoney, addCardModal }
)(AddMoney);
