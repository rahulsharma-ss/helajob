// Service request child for making a request

import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { fonts, colors } from "../../constants/theme";
import { moderateScale } from "../../utilities/ResponsiveFonts";
import strings from "../../constants/language";

export const ServiceRequestOne = props => {
  const { details, addressPresent } = props;
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: moderateScale(15)
      }}
    >
      <View
        style={{
          flex: 0.65,
          justifyContent: "space-evenly",
          paddingTop: moderateScale(10)
        }}
      >
        <Text
          style={{
            fontSize: moderateScale(15),
            fontFamily: fonts.LATOBOLD,
            color: colors.BLACK,
            textAlign: "left"
          }}
        >
          {strings.profile.services}
        </Text>
        <TouchableOpacity
          onPress={() => {
            props.openCategoryModal();
          }}
          style={{
            height: moderateScale(40),
            width: moderateScale(330),
            flexDirection: "row",
            borderBottomWidth: 0.3
          }}
        >
          <View style={{ flex: 0.9, justifyContent: "center" }}>
            <Text
              style={{
                fontSize: moderateScale(14),
                fontFamily: fonts.LATOMEDIUM,
                color: colors.GREY
              }}
            >
              {details.categoryName}
            </Text>
          </View>
          <View
            style={{
              flex: 0.1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                height: moderateScale(5),
                width: moderateScale(5),
                borderRadius: moderateScale(100),
                backgroundColor: colors.BLUE
              }}
            />
          </View>
        </TouchableOpacity>

        <Text
          style={{
            fontSize: moderateScale(15),
            fontFamily: fonts.LATOBOLD,
            color: colors.BLACK,
            textAlign: "left"
          }}
        >
          {strings.serviceReq.sub}
        </Text>
        <TouchableOpacity
          onPress={() => {
            props.openSubCategoryModal();
          }}
          style={{
            height: moderateScale(40),
            width: moderateScale(330),
            flexDirection: "row",
            borderBottomWidth: 0.3
          }}
        >
          <View
            style={{
              flex: 0.9,
              justifyContent: "center",
              flexDirection: "row"
            }}
          >
            <View
              style={{
                flex: 0.65,
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  fontSize: moderateScale(14),
                  fontFamily: fonts.LATOMEDIUM,
                  color: colors.GREY
                }}
              >
                {details.subCategoryName}
              </Text>
            </View>
            <View style={{ flex: 0.35, justifyContent: "center" }}>
              {details.price.length > 0 ? (
                <Text
                  style={{
                    fontSize: moderateScale(14),
                    fontFamily: fonts.LATOMEDIUM,
                    color: colors.GREY,
                    textAlign: "right"
                  }}
                >
                  £{details.price}/{strings.dashboard.hour}
                </Text>
              ) : null}
            </View>
          </View>
          <View
            style={{
              flex: 0.1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                height: moderateScale(5),
                width: moderateScale(5),
                borderRadius: moderateScale(100),
                backgroundColor: colors.BLUE
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 0.35 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",

            paddingVertical: moderateScale(15)
          }}
        >
          <View style={{ flex: 0.76, justifyContent: "center" }}>
            <TouchableOpacity
              disabled={!addressPresent || addressPresent == ""}
              onPress={() => props.requestOne()}
              style={{
                height: moderateScale(45),
                width: moderateScale(250),
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
                {strings.serviceReq.reqNow}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 0.04, backgroundColor: "white" }} />

          <View
            style={{
              flex: 0.2,
              justifyContent: "center"
            }}
          >
            <TouchableOpacity
              onPress={() => props.openCalender()}
              style={{
                height: moderateScale(45),
                width: moderateScale(50),
                backgroundColor: colors.WHITE,
                borderRadius: moderateScale(5),
                borderWidth: 1,
                borderColor: colors.BLUE,
                justifyContent: "center",
                alignSelf: "flex-end"
              }}
            >
              <Image
                source={require("../../assets/img/calender.png")}
                resizeMode={"contain"}
                style={{
                  height: moderateScale(30),
                  width: moderateScale(30),
                  alignSelf: "center"
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
