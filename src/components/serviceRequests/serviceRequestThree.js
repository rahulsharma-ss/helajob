// Service request child if the request is being processed

import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { fonts, colors } from "../../constants/theme";
import { moderateScale } from "../../utilities/ResponsiveFonts";
import strings from "../../constants/language";

export const ServiceRequestThree = props => {
  const { details } = props;
  return (
    <View style={{ flex: 1, paddingHorizontal: moderateScale(15) }}>
      <View style={{ flex: 0.75, paddingTop: moderateScale(10) }}>
        <View
          style={{
            flex: 0.35,
            borderBottomWidth: 0.3,
            borderBottomColor: colors.GREY
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
            {strings.serviceReq.scheduled}
          </Text>
          <Text
            style={{
              fontSize: moderateScale(12),
              fontFamily: fonts.LATOMEDIUM,
              color: colors.BLACK,
              textAlign: "center"
            }}
          >
            {strings.serviceReq.scheduledSuccess} #
            {(props.referenceNumber && props.referenceNumber.requestId) ||
              "#238420348"}
          </Text>
        </View>
        <View style={{ flex: 0.65 }}>
          <View
            style={{
              flex: 0.4,

              flexDirection: "row",
              borderBottomColor: colors.GREY,
              borderBottomWidth: 0.3
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
              >
                {details.categoryName} > {details.subCategoryName} £
                {details.price}{" "}
              </Text>
            </View>
            <TouchableOpacity
              onPress={props.editDetails}
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
                {strings.serviceReq.edit}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 0.6
            }}
          >
            <View style={{ flex: 0.5, flexDirection: "row" }}>
              <View style={{ flex: 0.1, justifyContent: "center" }}>
                <Image
                  source={require("../../assets/img/calenderB.png")}
                  resizeMode={"contain"}
                  style={{
                    height: moderateScale(25),
                    width: moderateScale(25),
                    alignSelf: "flex-start"
                  }}
                />
              </View>
              <View style={{ flex: 0.65, justifyContent: "center" }}>
                <Text
                  style={{
                    fontSize: moderateScale(12),
                    fontFamily: fonts.LATOMEDIUM,
                    color: colors.GREY
                  }}
                >
                  {details.formattedDate} {details.formattedTime}{" "}
                </Text>
              </View>
              <TouchableOpacity
                onPress={props.editDetails}
                style={{ flex: 0.25, justifyContent: "center" }}
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
            <View
              style={{
                flex: 0.5,
                flexDirection: "row"
              }}
            >
              <View
                style={{
                  flex: 0.1,
                  justifyContent: "center"
                }}
              >
                <Image
                  source={require("../../assets/img/locationB.png")}
                  resizeMode={"contain"}
                  style={{
                    height: moderateScale(25),
                    width: moderateScale(25),
                    alignSelf: "flex-start"
                  }}
                />
              </View>
              <View style={{ flex: 0.65, justifyContent: "center" }}>
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
                onPress={props.stepTwo}
                style={{ flex: 0.25, justifyContent: "center" }}
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
        </View>
      </View>
      <View style={{ flex: 0.25, paddingBottom: moderateScale(10) }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            paddingVertical: moderateScale(5),
            paddingBottom: moderateScale(10)
          }}
        >
          <TouchableOpacity
            onPress={props.rebookJob}
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
              {strings.serviceReq.bookAnother}
            </Text>
          </TouchableOpacity>
          <View style={{ flex: 0.04 }} />

          <TouchableOpacity
            onPress={props.requestThree}
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
              {strings.services.ok}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
