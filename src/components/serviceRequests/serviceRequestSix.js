// Service request child for making a request

import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { fonts, colors } from "../../constants/theme";
import { moderateScale } from "../../utilities/ResponsiveFonts";
import strings from "../../constants/language";

export const ServiceRequestSix = props => {
  const { details } = props;
  return (
    <View
      style={{
        flex: 1
      }}
    >
      <View
        style={{
          flex: 0.2,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text
          style={{
            fontSize: moderateScale(15),
            fontFamily: fonts.LATOBOLD,
            color: colors.BLACK
          }}
        >
          {strings.serviceReq.noSeeker}
        </Text>
      </View>
      <View style={{ flex: 0.4, paddingHorizontal: moderateScale(10) }}>
        <Text
          style={{
            fontSize: moderateScale(13),
            fontFamily: fonts.LATOBOLD,
            color: colors.BLACK,
            textAlign: "center",
            justifyContent: "center"
          }}
        >
          {strings.serviceReq.sorry}
        </Text>
      </View>

      <View
        style={{
          flex: 0.4,
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
        <TouchableOpacity
          onPress={props.goToHome}
          style={{
            height: moderateScale(45),
            width: moderateScale(165),
            backgroundColor: colors.WHITE,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderRadius: moderateScale(5)
          }}
        >
          <Text
            style={{
              fontSize: moderateScale(15),
              fontFamily: fonts.LATOBOLD,
              color: colors.BLUE
            }}
          >
            {strings.dashboard.no}
          </Text>
        </TouchableOpacity>
        <View style={{ height: moderateScale(10), width: moderateScale(10) }} />
        <TouchableOpacity
          onPress={props.goToStepOne}
          style={{
            height: moderateScale(45),
            width: moderateScale(165),
            backgroundColor: colors.BLUE,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: moderateScale(5)
          }}
        >
          <Text
            style={{
              fontSize: moderateScale(15),
              fontFamily: fonts.LATOBOLD,
              color: colors.WHITE
            }}
          >
            {strings.profile.retry}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
