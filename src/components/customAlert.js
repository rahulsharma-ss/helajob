// Custtomized alert for application

import React from "react";
import AwesomeAlert from "react-native-awesome-alerts";
import { moderateScale } from "../utilities/ResponsiveFonts";
import { fonts } from "../constants/theme";
export const CustomAlert = props => {
  return (
    <AwesomeAlert
      show={props.show}
      showProgress={false}
      title={props.title}
      message={props.message}
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={false}
      showCancelButton={true}
      showConfirmButton={true}
      cancelText="Cancel"
      confirmText={props.confirmText}
      confirmButtonColor="#1F5BA8"
      onCancelPressed={() => {
        props.onCancelPressed();
      }}
      onConfirmPressed={() => {
        props.onConfirmPressed();
      }}
      titleStyle={{
        fontSize: props.valueIs ? moderateScale(15) : moderateScale(18),
        fontFamily: fonts.LATOMEDIUM
      }}
      cancelButtonTextStyle={{
        fontSize: moderateScale(16),
        fontFamily: fonts.LATOBOLD
      }}
      confirmButtonTextStyle={{
        fontSize: moderateScale(16),
        fontFamily: fonts.LATOBOLD
      }}
      contentContainerStyle={{
        height: moderateScale(150),
        width: moderateScale(300),
        marginBottom: props.isChat ? moderateScale(100) : 0
      }}
      cancelButtonStyle={{
        height: moderateScale(40),
        width: moderateScale(100),
        justifyContent: "center",
        alignItems: "center"
      }}
      confirmButtonStyle={{
        height: moderateScale(40),
        width: moderateScale(100),
        justifyContent: "center",
        alignItems: "center",
        marginTop: moderateScale(20)
      }}
      alertContainerStyle={{
        paddingTop: moderateScale(100)
      }}
    />
  );
};
