import React from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import { fonts, colors } from "../constants/theme";
import { moderateScale } from "../utilities/ResponsiveFonts";
import strings from "../constants/language";

export const MoreInfo = props => {
  return (
    <View style={{ flex: 1, paddingHorizontal: moderateScale(13) }}>
      <View
        style={{
          flex: 0.25,
          justifyContent: "center"
        }}
      >
        <Text
          style={{
            textAlign: "left",
            fontSize: moderateScale(45),
            color: colors.INTROBLACK,
            fontFamily: fonts.LATOMEDIUM
          }}
        >
          {strings.intro.question}
        </Text>
      </View>
      <View
        style={{
          flex: 0.15
        }}
      >
        <TouchableOpacity
          onPress={props.helpCenter}
          style={{
            flex: 0.45,
            borderRadius: moderateScale(5),
            borderWidth: 0.5,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              fontSize: moderateScale(16),
              color: colors.INTROGREY,
              fontFamily: fonts.LATOMEDIUM
            }}
          >
            FAQ
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 0.2 }}>
        <Text
          style={{
            fontSize: moderateScale(17),
            color: colors.BLUE,
            fontFamily: fonts.LATOMEDIUM,
            textAlign: "center"
          }}
        >
          Call our Customer team
        </Text>
        <Text
          style={{
            fontSize: moderateScale(17),
            color: colors.INTROGREY,
            fontFamily: fonts.LATOMEDIUM,
            textAlign: "center",
            lineHeight: moderateScale(30)
          }}
        >
          {strings.intro.connect1}
        </Text>
      </View>

      <View style={{ flex: 0.15 }}>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(`tel:${+448003687761}`);
          }}
          style={{
            flex: 0.45,
            borderRadius: moderateScale(5),
            borderWidth: 0.5,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              fontSize: moderateScale(16),
              color: colors.INTROGREY,
              fontFamily: fonts.LATOMEDIUM
            }}
          >
            08003687761
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 0.25,
          justifyContent: "flex-end",
          paddingBottom: moderateScale(10)
        }}
      >
        <TouchableOpacity
          onPress={props.toLogin}
          style={{
            flex: 0.3,
            borderRadius: moderateScale(5),
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.BLUE
          }}
        >
          <Text
            style={{
              fontSize: moderateScale(16),
              color: colors.WHITE,
              fontFamily: fonts.LATOBOLD
            }}
          >
            {strings.intro.start}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
