//Service request child if the request is accepted

import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { fonts, colors } from "../../constants/theme";
import { moderateScale } from "../../utilities/ResponsiveFonts";
import * as Progress from "react-native-progress";
import strings from "../../constants/language";

export const ServiceRequestFour = props => {
  const { details } = props;
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.05 }}>
        <Progress.Bar
          width={moderateScale(380)}
          borderRadius={0}
          borderWidth={0}
          color={colors.BLUE}
          unfilledColor={colors.WHITE}
          useNativeDriver={true}
          indeterminateAnimationDuration={2000}
          animated={true}
          indeterminate={true}
          height={moderateScale(2)}
        />
      </View>
      <View
        style={{
          flex: 0.45,
          paddingTop: moderateScale(10),
          paddingHorizontal: moderateScale(15)
        }}
      >
        <Text
          style={{
            fontSize: moderateScale(18),
            fontFamily: fonts.LATOBOLD,
            color: colors.BLACK,
            textAlign: "center"
          }}
        >
          {strings.serviceReq.searching}
        </Text>
        <Text
          style={{
            fontSize: moderateScale(13),
            fontFamily: fonts.LATOMEDIUM,
            color: colors.BLACK,
            textAlign: "center",
            paddingTop: moderateScale(10)
          }}
        >
          {strings.serviceReq.searchingSuccess}
        </Text>
      </View>
      <View style={{ flex: 0.5, paddingHorizontal: moderateScale(15) }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            paddingVertical: moderateScale(10)
          }}
        >
          <TouchableOpacity
            onPress={props.stepFive}
            style={{
              height: moderateScale(50),
              width: moderateScale(160),
              backgroundColor: colors.WHITE,
              borderRadius: moderateScale(5),
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 0.7,
              borderColor: colors.BLUE
            }}
          >
            <Text
              style={{
                fontSize: moderateScale(15),
                fontFamily: fonts.LATOBOLD,
                color: colors.BLUE
              }}
            >
              {strings.dashboard.cancel1}
            </Text>
          </TouchableOpacity>
          <View
            style={{ height: moderateScale(10), width: moderateScale(10) }}
          />

          <TouchableOpacity
            onPress={props.searching}
            style={{
              height: moderateScale(50),
              width: moderateScale(160),
              backgroundColor: colors.BLUE,
              borderRadius: moderateScale(5),

              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                fontSize: moderateScale(15),
                fontFamily: fonts.LATOBOLD,
                color: colors.WHITE
              }}
            >
              {strings.services.ok}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
