//Service request child if the request is being cancelled

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { fonts, colors } from "../../constants/theme";
import { moderateScale } from "../../utilities/ResponsiveFonts";
import strings from "../../constants/language";

export const ServiceRequestFive = props => {
  const { details, subCategory } = props;
  return (
    <View style={{ flex: 1, paddingHorizontal: moderateScale(15) }}>
      <View
        style={{
          flex: 0.3,
          borderBottomColor: colors.GREY,
          borderBottomWidth: 0.2,
          paddingTop: moderateScale(10)
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
          {strings.dashboard.cancel}
        </Text>
        <Text
          style={{
            fontSize: moderateScale(12),
            fontFamily: fonts.LATOMEDIUM,
            color: colors.BLACK,
            textAlign: "center"
          }}
        >
          {strings.dashboard.warn}
        </Text>
      </View>
      <View style={{ flex: 0.7 }}>
        <View
          style={{
            flex: 0.3,
            borderBottomColor: colors.GREY,
            borderBottomWidth: 0.2
          }}
        >
          <View
            style={{
              flex: 0.5,
              flexDirection: "row",
              paddingTop: moderateScale(10)
            }}
          >
            <View style={{ flex: 0.7, justifyContent: "center" }}>
              <Text
                style={{
                  fontSize: moderateScale(12),
                  fontFamily: fonts.LATOMEDIUM,
                  color: colors.GREY
                }}
              >
                {details.subCategoryName &&
                details.subCategoryName != "Select a subcategory"
                  ? details.subCategoryName
                  : subCategory.service}{" "}
              </Text>
            </View>
            <TouchableOpacity
              onPress={props.stepOne}
              style={{ flex: 0.3, justifyContent: "center" }}
            >
              <Text
                style={{
                  fontSize: moderateScale(15),
                  fontFamily: fonts.LATOMEDIUM,
                  color: colors.BLUE,
                  textAlign: "right"
                }}
              >
                {strings.dashboard.change}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flex: 0.3,
            borderBottomColor: colors.GREY,
            borderBottomWidth: 0.2
          }}
        >
          <View
            style={{
              flex: 0.5,
              flexDirection: "row",
              paddingTop: moderateScale(10)
            }}
          >
            <View
              style={{
                flex: 0.7,
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  fontSize: moderateScale(12),
                  fontFamily: fonts.LATOMEDIUM,
                  color: colors.GREY
                }}
                numberOfLines={1}
              >
                {details.selectedAddress}{" "}
              </Text>
            </View>
            <TouchableOpacity
              onPress={props.stepOne}
              style={{ flex: 0.3, justifyContent: "center" }}
            >
              <Text
                style={{
                  fontSize: moderateScale(15),
                  fontFamily: fonts.LATOMEDIUM,
                  color: colors.BLUE,
                  textAlign: "right"
                }}
              >
                {strings.dashboard.change}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flex: 0.3,
            flexDirection: "row",
            paddingVertical: moderateScale(10)
          }}
        >
          <TouchableOpacity
            onPress={props.stepFour}
            style={{
              flex: 0.48,
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
              {strings.dashboard.no}
            </Text>
          </TouchableOpacity>
          <View style={{ flex: 0.04 }} />

          <TouchableOpacity
            onPress={props.cancelRequest}
            style={{
              flex: 0.48,
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
              {strings.dashboard.yes}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
