// Container to display all added locations

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Platform
} from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";
import { moderateScale } from "../../../utilities/ResponsiveFonts";
import { fonts, colors } from "../../../constants/theme";
import {
  getAllAdddress,
  deleteAddress
} from "../../../actions/list/listAction";
import idx from "idx";
import strings from "../../../constants/language";

var _ = require("lodash");

class Locations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.addAddress = _.debounce(this.addAddress, 500);
  }

  componentDidMount = () => {
    // Request all addresses
    this.props.getAllAdddress();
  };

  // Display address icon
  addressIcon = item => {
    if (item.is_fav) {
      return (
        <Image
          source={require("../../../assets/img/fav.png")}
          resizeMode={"contain"}
          style={{
            height: moderateScale(30),
            width: moderateScale(30)
          }}
        />
      );
    } else if (item.is_home) {
      return (
        <Image
          source={require("../../../assets/img/home.png")}
          resizeMode={"contain"}
          style={{
            height: moderateScale(30),
            width: moderateScale(30),
            tintColor: colors.BLUE
          }}
        />
      );
    } else if (item.is_job) {
      return (
        <Image
          source={require("../../../assets/img/work.png")}
          resizeMode={"contain"}
          style={{
            height: moderateScale(30),
            width: moderateScale(30)
          }}
        />
      );
    } else {
      return (
        <Image
          source={require("../../../assets/img/fav.png")}
          resizeMode={"contain"}
          style={{
            height: moderateScale(30),
            width: moderateScale(30)
          }}
        />
      );
    }
  };

  // render address option icon
  renderIcon = () => {
    return (
      <Image
        source={require("../../../assets/img/ellipse.png")}
        resizeMode={"contain"}
        style={{
          height: moderateScale(20),
          width: moderateScale(20)
        }}
      />
    );
  };

  // Display adress list
  renderAddress = data => {
    const { item } = data;
    return (
      <View
        style={{
          height: moderateScale(60),
          width: moderateScale(350),
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <View style={{ flex: 0.1 }}>{this.addressIcon(item)}</View>
        <View style={{ flex: 0.7 }}>
          <Text
            style={{ fontSize: moderateScale(14), fontFamily: fonts.LATOBOLD }}
          >
            {item.location_name || "Favourite"}
          </Text>
          <Text
            style={{
              fontSize: moderateScale(14),
              fontFamily: fonts.LATOMEDIUM,
              color: colors.GREY
            }}
            numberOfLines={1}
          >
            {item.address_line2 ? item.address_line2 + "," : ""}
            {item.address_line1}
          </Text>
        </View>
        <TouchableOpacity
          onPress={this.showMenu}
          style={{
            height: moderateScale(50),
            width: moderateScale(70),
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: moderateScale(10)
          }}
        >
          <Dropdown
            inputContainerStyle={{ borderBottomColor: "transparent" }}
            containerStyle={{
              height: moderateScale(15),
              width: moderateScale(80),
              justifyContent: "center",
              alignItems: "center",
              borderRadius: moderateScale(5)
            }}
            pickerStyle={{
              left: moderateScale(250)
            }}
            onChangeText={val => {
              if (val == "Delete") {
                this.props.deleteAddress({
                  location_id: item.id
                });
              } else {
                this.addAddress(item);
              }
            }}
            renderAccessory={this.renderIcon}
            data={[
              {
                value: "Edit"
              },
              {
                value: "Delete"
              }
            ]}
          />
        </TouchableOpacity>
      </View>
    );
  };

  // Navigate to add address
  addAddress = item => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "AddAddress",
        options: {
          statusBar: {},
          topBar: {
            visible: false,
            height: 0
          }
        },
        passProps: {
          item,
          addressId: item && item.id
        }
      }
    });
  };

  // Navigate to Dashboard
  goToProfile = () => {
    Navigation.pop(this.props.componentId);
  };

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingTop:
            Platform.OS == "ios" ? moderateScale(5) : moderateScale(30),
          paddingHorizontal: moderateScale(13)
        }}
      >
        <View style={{ flex: 0.08, flexDirection: "row" }}>
          <TouchableOpacity
            onPress={this.goToProfile}
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
          <View
            style={{
              flex: 0.8,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                fontSize: moderateScale(18),
                fontFamily: fonts.LATOBOLD,
                color: colors.BLACK
              }}
            >
              {strings.location.location}
            </Text>
          </View>
          <View style={{ flex: 0.1 }} />
        </View>
        <View style={{ flex: 0.82, justifyContent: "center" }}>
          {/* Displaying all added addresses */}
          {this.props.loading ? (
            <ActivityIndicator />
          ) : idx(this.props, _ => _.allAddresses.data.length > 0) ? (
            <FlatList
              renderItem={this.renderAddress}
              extraData={this.state}
              data={idx(this.props, _ => _.allAddresses.data)}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <Text
              style={{
                fontSize: moderateScale(15),
                fontFamily: fonts.LATOBOLD,
                color: colors.GREY
              }}
            >
              {strings.location.noLocation}
            </Text>
          )}
        </View>
        <View style={{ flex: 0.1, flexDirection: "row" }}>
          <View style={{ flex: 0.8 }} />
          <TouchableOpacity
            onPress={() => this.addAddress(null)}
            style={{ flex: 0.2 }}
          >
            <Image
              source={require("../../../assets/img/add.png")}
              resizeMode={"contain"}
              style={{
                height: moderateScale(45),
                width: moderateScale(45)
              }}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    allAddresses: state.userList.allAddress,
    loading: state.userList.loading
  };
}

export default connect(
  mapStateToProps,
  { getAllAdddress, deleteAddress }
)(Locations);
