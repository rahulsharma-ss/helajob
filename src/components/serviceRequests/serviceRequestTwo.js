// Service request child for making a future request

import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { fonts, colors } from "../../constants/theme";
import { moderateScale } from "../../utilities/ResponsiveFonts";
import strings from "../../constants/language";

export const ServiceRequestTwo = props => {
  const { details } = props;
  return (
    <View style={{ flex: 1, paddingHorizontal: moderateScale(15) }}>
      <View
        style={{
          flex: 0.75,
          paddingTop: moderateScale(10),
          justifyContent: "space-evenly"
        }}
      >
        <Text
          style={{
            fontSize: moderateScale(15),
            fontFamily: fonts.LATOBOLD,
            color: colors.BLACK
          }}
        >
          {strings.serviceReq.schedule}
        </Text>
        <View
          style={{
            height: moderateScale(20),
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Text
            style={{
              fontSize: moderateScale(13),
              fontFamily: fonts.LATOBOLD,
              color: colors.DGREY
            }}
          >
            {details.subCategoryName}
          </Text>
          <Text
            style={{
              fontSize: moderateScale(13),
              fontFamily: fonts.LATOMEDIUM,
              color: colors.DGREY
            }}
          >
            £{details.price}/{strings.dashboard.hour}
          </Text>
        </View>

        <TouchableOpacity
          style={{
            height: moderateScale(50),
            justifyContent: "space-between"
          }}
          onPress={props.showDatePicker}
        >
          <Text
            style={{
              fontSize: moderateScale(13),
              fontFamily: fonts.LATOBOLD,
              color: colors.DGREY
            }}
          >
            {strings.serviceReq.date}
          </Text>
          <View
            style={{
              borderBottomWidth: 0.3,
              borderBottomColor: colors.GREY,
              paddingVertical: moderateScale(7),
              justifyContent: "space-between",
              flexDirection: "row",
              paddingRight: moderateScale(5)
            }}
          >
            <Text
              style={{
                fontSize: moderateScale(13),
                fontFamily: fonts.LATOREGULAR,
                color: colors.GREY
              }}
            >
              {details.currentDate}
            </Text>
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

        <TouchableOpacity
          style={{
            justifyContent: "space-between",
            height: moderateScale(50)
          }}
          onPress={props.showTimePicker}
        >
          <Text
            style={{
              fontSize: moderateScale(13),
              fontFamily: fonts.LATOBOLD,
              color: colors.DGREY
            }}
          >
            {strings.serviceReq.time}
          </Text>
          <View
            style={{
              borderBottomWidth: 0.3,
              borderBottomColor: colors.GREY,
              justifyContent: "space-between",
              flexDirection: "row",
              paddingRight: moderateScale(5)
            }}
          >
            <Text
              style={{
                fontSize: moderateScale(13),
                fontFamily: fonts.LATOREGULAR,
                color: colors.GREY,
                paddingVertical: moderateScale(7)
              }}
            >
              {details.currentTime}
            </Text>
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
      <View style={{ flex: 0.25, paddingBottom: moderateScale(12) }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            paddingVertical: moderateScale(5),
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            onPress={props.requestTwo}
            style={{
              height: moderateScale(45),
              width: moderateScale(330),
              backgroundColor: colors.BLUE,
              borderRadius: moderateScale(5),
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                fontSize: moderateScale(15),
                fontFamily: fonts.LATOBOLD,
                color: colors.WHITE,
                textAlign: "center"
              }}
            >
              {strings.serviceReq.scheduleOn} {details.currentDate}{" "}
              {strings.serviceReq.at} {details.currentTime}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
