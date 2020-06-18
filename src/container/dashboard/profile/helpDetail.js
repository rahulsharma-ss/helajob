/* Component for help details screen */

import React from "react";
import { moderateScale } from "../../../utilities/ResponsiveFonts";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet
} from "react-native";
import { fonts, colors } from "../../../constants/theme";
import Icon from "react-native-vector-icons/Ionicons";
import { Navigation } from "react-native-navigation";
import EIcon from "react-native-vector-icons/Entypo";
import strings from "../../../constants/language";
import HTMLView from "react-native-htmlview";

const { width } = Dimensions.get("window");

export default class HelpDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {}

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
              Navigation.pop(this.props.componentId, {
                component: {
                  name: "HelpCenterContainer",
                  options: {
                    statusBar: {},
                    topBar: {
                      visible: false,
                      height: 0
                    }
                  }
                }
              });
            }}
          >
            <Icon name="ios-arrow-back" size={moderateScale(30)} />
          </TouchableOpacity>
          <View
            style={{
              flex: 0.85
            }}
          />
        </View>
        <View
          style={{
            flex: 0.87,
            marginHorizontal: moderateScale(23)
          }}
        >
          <ScrollView style={{ paddingBottom: moderateScale(111) }}>
            <Text
              style={{
                fontFamily: fonts.LATOBOLD,
                fontSize: moderateScale(17),
                color: "#000000"
              }}
            >
              {(this.props.data && this.props.data.title) || ""}
            </Text>
            <HTMLView
              value={this.props.data && this.props.data.message}
              stylesheet={styles}
            />
          </ScrollView>
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
          <TouchableOpacity
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
                    color={colors.PRIMARY}
                    style={{ marginLeft: moderateScale(10) }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 0.5 }} />
            </View>
            <TouchableOpacity
              style={{ flex: 0.25, alignItems: "center" }}
              onPress={() => {
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
                color={colors.PRIMARY}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  p: {
    fontFamily: fonts.LATOREGULAR,
    fontSize: moderateScale(14),
    color: "#888888",
    marginTop: moderateScale(14)
  }
});
