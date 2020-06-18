// Service request child for making a request

import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { fonts, colors } from "../../constants/theme";
import { moderateScale } from "../../utilities/ResponsiveFonts";
import strings from "../../constants/language";
import CheckBox from "react-native-check-box";

export const ServiceRequestSeven = props => {
  console.log(props, "propspropsprops");
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: moderateScale(15),
        justifyContent: "center"
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center"
        }}
      >
        <View style={{ flex: 0.1, paddingTop: moderateScale(10) }}>
          <View
            style={{
              height: moderateScale(10),
              width: moderateScale(100),
              backgroundColor: "#e2e2e2",
              justifyContent: "space-evenly",
              alignItems: "center",
              borderRadius: moderateScale(100)
            }}
          />
        </View>
        <View
          style={{
            flex: 0.3
          }}
        >
          <Image
            source={require("../../assets/img/noService.png")}
            resizeMode={"contain"}
            style={{
              height: moderateScale(80),
              width: moderateScale(75)
            }}
          />
        </View>
        <View style={{ flex: 0.6 }}>
          <Text
            style={{
              fontSize: moderateScale(15),
              fontFamily: fonts.LATOBOLD,
              color: colors.BLACK,
              textAlign: "center"
            }}
          >
            {strings.currentLocation.sorry1}
            {"\n"}
            {strings.currentLocation.sorry2}
          </Text>
          <CheckBox
            disabled={props.disabled}
            style={{
              flex: 1,
              paddingTop: moderateScale(20)
            }}
            rightTextStyle={{
              fontFamily: fonts.LATOBOLD,
              fontSize: moderateScale(15)
            }}
            onClick={props.apply}
            isChecked={props.disabled}
            rightText={"Notify me once it launches!"}
          />
        </View>
      </View>
    </View>
  );
};
