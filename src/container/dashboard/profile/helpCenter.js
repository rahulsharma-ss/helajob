// Help center container

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  FlatList,
  ActivityIndicator,
  Image
} from "react-native";
import { moderateScale } from "../../../utilities/ResponsiveFonts";
import Icon from "react-native-vector-icons/Ionicons";
import EIcon from "react-native-vector-icons/Entypo";
import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";
import { fonts, colors } from "../../../constants/theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SIcon from "react-native-vector-icons/FontAwesome";
import { getFAQCategory } from "../../../actions/user/TicketActions";
import idx from "idx";
import strings from "../../../constants/language";

const { width } = Dimensions.get("window");

const helpType = [
  "Payments",
  "Chat",
  "Profile",
  "Location",
  "Verification",
  "Notification"
];

class HelpCenterContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedTypeIndex: 0,
      selectedItemId: null,
      searchedData: null
    };
  }

  componentDidMount() {
    // Requesting FAQ category listing
    this.props.getFAQCategory(cb => {
      this.setState({ selectedItemId: cb });
    });
  }

  // Displaying help type
  renderHelpType = item => {
    let data = item.item;
    let index = item.index;
    return (
      <TouchableOpacity
        key={index}
        style={{
          paddingHorizontal: moderateScale(10),
          marginHorizontal: moderateScale(10),
          height: moderateScale(26),
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderColor:
            this.state.selectedTypeIndex === index ? "#1F5BA8" : "#E2E2E2",
          borderRadius: moderateScale(13),
          backgroundColor:
            this.state.selectedTypeIndex === index ? "#1F5BA8" : "#FFFFFF"
        }}
        onPress={() => {
          this.setState({ selectedTypeIndex: index, selectedItemId: data.id });
        }}
      >
        <Text
          style={{
            fontFamily: fonts.LATOREGULAR,
            fontSize: moderateScale(12),
            color:
              this.state.selectedTypeIndex === index ? "#FFFFFF" : "#BCBCBC"
          }}
        >
          {data.name}
        </Text>
      </TouchableOpacity>
    );
  };

  // Displaying FAQ list
  renderFaqList = item => {
    let data = item.item; // Faq items.
    let index = item.index; // Faq items list.
    if (data.category == this.state.selectedItemId) {
      return (
        <TouchableOpacity
          style={{ marginVertical: moderateScale(15), flexDirection: "row" }}
          onPress={() => {
            // Navigating to Help details screen
            Navigation.push(this.props.componentId, {
              component: {
                name: "HelpDetail",
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
                },
                passProps: {
                  data: data
                }
              }
            });
          }}
          key={index}
        >
          <View style={{ flex: 0.9 }}>
            <Text
              style={{
                fontFamily: fonts.LATOREGULAR,
                fontSize: moderateScale(16),
                color: "#3E3E3E"
              }}
            >
              {data.title}
            </Text>
          </View>

          <View style={{ flex: 0.1 }}>
            <Icon
              name="ios-arrow-forward"
              size={moderateScale(15)}
              color={"#3E3E3E"}
              style={{ marginLeft: moderateScale(10) }}
            />
          </View>
        </TouchableOpacity>
      );
    }
  };

  // On searching list
  onSearch = (data, text) => {
    let searchedData = data.filter(item => {
      return item.title.toLowerCase().includes(text.toLowerCase() || text);
    });
    if (searchedData && searchedData.length > 0) {
      this.setState({ searchedData: searchedData });
    }
    if (text == "" || searchedData.length > 0) {
      this.setState({ searching: false });
    }
  };

  _keyExtractor = (item, index) => {
    return `${item.id}`;
  };

  // Navigate to dashboard
  goToDashboard = () => {
    Navigation.pop(this.props.componentId);
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            flexDirection: "row",
            flex: 0.13,
            justifyContent: "center",
            paddingTop: moderateScale(5)
          }}
        >
          <TouchableOpacity
            style={{
              flex: 0.15,
              alignItems: "center",
              justifyContent: "center"
            }}
            onPress={() => {
              Navigation.pop(this.props.componentId);
            }}
          >
            <Image
              source={require("../../../assets/img/back.png")}
              resizeMode={"contain"}
              style={{
                height: moderateScale(20),
                width: moderateScale(20)
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              flex: 0.7,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                fontFamily: fonts.LATOBOLD,
                fontSize: moderateScale(18),
                color: colors.BLACK
              }}
            >
              {strings.helpCenter.title}
            </Text>
          </View>
          <View
            style={{
              flex: 0.15,
              alignItems: "center",
              justifyContent: "center"
            }}
          />
        </View>
        <View
          style={{
            flex: 0.87
          }}
        >
          {this.props.loading ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <ActivityIndicator size={"small"} />
            </View>
          ) : (
            <KeyboardAwareScrollView
              contentContainerStyle={{
                backgroundColor: colors.WHITE
              }}
              keyboardShouldPersistTaps={"never"}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              innerRef={ref => {
                this.scroll = ref;
              }}
            >
              <View
                style={{
                  height: moderateScale(37),
                  width: moderateScale(300),
                  borderColor: "#dadada",
                  borderWidth: 1,
                  shadowColor: "#dadada", // IOS
                  shadowOffset: {
                    height: moderateScale(5),
                    width: moderateScale(5)
                  }, // IOS
                  shadowOpacity: 1, // IOS
                  shadowRadius: moderateScale(10), //IOS
                  elevation: moderateScale(15), // Android
                  backgroundColor: "white",
                  alignSelf: "center",
                  borderRadius: moderateScale(19),
                  flexDirection: "row",
                  marginTop: moderateScale(10)
                }}
              >
                <View
                  style={{
                    flex: 0.1,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <SIcon name="search" size={moderateScale(15)} />
                </View>
                <View style={{ flex: 0.9, justifyContent: "center" }}>
                  <TextInput
                    style={{
                      flex: 1,
                      fontSize: moderateScale(14),
                      fontFamily: fonts.LATOREGULAR,
                      color: "#888888"
                    }}
                    underlineColorAndroid={"transparent"}
                    onChangeText={text =>
                      this.onSearch(this.props.faqList, text)
                    }
                    placeholder={strings.helpCenter.search}
                    placeholderTextColor={"#888888"}
                    clearButtonMode={"always"}
                  />
                </View>
              </View>
              <FlatList
                keyExtractor={this._keyExtractor}
                data={this.props.categories}
                style={{ margin: moderateScale(23) }}
                horizontal={true}
                extraData={this.props.categories}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={item => {
                  return this.renderHelpType(item);
                }}
              />
              <FlatList
                keyExtractor={this._keyExtractor}
                data={
                  this.state.searchedData && this.state.searchedData.length > 0
                    ? this.state.searchedData
                    : this.props.faqList
                }
                style={{
                  marginHorizontal: moderateScale(23),
                  paddingBottom: moderateScale(111)
                }}
                extraData={helpType}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={item => {
                  return this.renderFaqList(item);
                }}
              />
            </KeyboardAwareScrollView>
          )}
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            height: moderateScale(111),
            width: width,
            borderColor: "#dadada",
            borderWidth: 1,
            shadowColor: "#dadada", // IOS
            shadowOffset: { height: moderateScale(5), width: moderateScale(5) }, // IOS
            shadowOpacity: 1, // IOS
            shadowRadius: moderateScale(10), //IOS
            elevation: moderateScale(30), // Android
            backgroundColor: "white"
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginHorizontal: moderateScale(15),
              marginTop: moderateScale(15)
            }}
          >
            <View style={{ flex: 0.75 }}>
              <View
                style={{
                  flex: 0.5,
                  borderRightWidth: 1,
                  borderRightColor: "#D1E5FF"
                }}
              >
                <Text
                  style={{
                    fontFamily: fonts.LATOREGULAR,
                    fontSize: moderateScale(16),
                    color: colors.GREY
                  }}
                >
                  {strings.helpCenter.noSolution}
                </Text>
                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "center" }}
                  onPress={() => {
                    // Navigating to support ticket screen
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
                  }}
                >
                  <Text
                    style={{
                      fontFamily: fonts.LATOBOLD,
                      fontSize: moderateScale(16),
                      color: "#1F5BA8"
                    }}
                  >
                    {strings.helpCenter.support}
                  </Text>
                  <Icon
                    name="ios-arrow-forward"
                    size={moderateScale(15)}
                    color={"#1F5BA8"}
                    style={{ marginLeft: moderateScale(10) }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 0.5 }} />
            </View>
            <TouchableOpacity
              style={{ flex: 0.25, alignItems: "center" }}
              onPress={() => {
                // Navigating to support ticket history screen
                Navigation.push(this.props.componentId, {
                  component: {
                    name: "TicketHistory",
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
              }}
            >
              <EIcon
                name="back-in-time"
                size={moderateScale(35)}
                color={"#1F5BA8"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user_id:
      idx(state, _ => _.user.userData.data.id) ||
      idx(state, _ => _.signup.data.data.user_id),
    categories: state.tickets && state.tickets.faqCategories,
    faqList: state.tickets && state.tickets.faqListing,
    loading: state.tickets && state.tickets.loading
  };
}

export default connect(
  mapStateToProps,
  { getFAQCategory }
)(HelpCenterContainer);

const questionList = [
  {
    question: "How the payments will be done?",
    detail:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum."
  },

  {
    question: "Can I transfer payment from my card?",
    detail:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum."
  },
  {
    question: "Do I need to keep balance?",
    detail:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum."
  },
  {
    question: "How can I set priority of my wallet?",
    detail:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum."
  },
  {
    question: "What is Hela Job wallet?",
    detail:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum."
  },
  {
    question: "Do I need to do KYC?",
    detail:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum."
  },
  {
    question: "What documents I need for wallet?",
    detail:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum."
  }
];
