import { StyleSheet, Platform } from "react-native";
import { fonts, colors } from "../../theme";
import { moderateScale } from "../../../utilities/ResponsiveFonts";

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(15),
    paddingTop: moderateScale(10)
  },
  input: {
    height: moderateScale(40),
    borderColor: colors.GREY,
    borderBottomWidth: 1
  },
  email: {
    fontWeight: "bold",
    fontSize: moderateScale(18),
    color: colors.GREY
  },
  authButtons: {
    flex: 0.48,
    borderWidth: 1,
    borderColor: colors.BLUE,
    borderRadius: moderateScale(3),
    overflow: "hidden"
  },
  loginBtn: {
    backgroundColor: colors.WHITE,
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  btnText: {
    color: colors.BLUE,
    fontSize: moderateScale(15),
    fontWeight: "bold"
  },
  codeText: {
    color: colors.LGREY,
    fontSize: moderateScale(15),
    fontFamily: fonts.LATOREGULAR
  },
  otpView: {
    height: moderateScale(40),
    flexDirection: "row",
    alignItems: "center"
  },
  otpText: {
    color: colors.BLUE,
    fontSize: moderateScale(14.5),
    fontFamily: fonts.LATOBOLD,
    paddingBottom: moderateScale(2)
  },
  resendButtton: { justifyContent: "flex-end" },
  header: {
    flexDirection: "row",
    height: moderateScale(100),
    marginTop: moderateScale(30)
  },
  logo: {
    flex: 0.5,
    alignItems: "flex-start"
  },
  logoImage: {
    flex: 1
  },
  space: { height: moderateScale(45) },
  body: { flex: 0.2 },
  verifyText: { fontSize: moderateScale(20), fontFamily: fonts.LATOBOLD },
  spaceTwo: { height: moderateScale(20) },
  otpTextTwo: {
    fontSize: moderateScale(15),
    color: colors.GREY,
    fontFamily: fonts.SEGOEUI
  },
  otpDestination: {
    fontSize: moderateScale(14),
    color: colors.GREY,
    fontFamily: fonts.LATOBOLD
  },
  otpHolder: {
    height: moderateScale(120),
    alignItems: "center",
    justifyContent: "center"
  },
  otpChange: {
    fontSize: moderateScale(15),
    color: colors.BLUE,
    fontWeight: "bold",
    fontStyle: "italic"
    // fontFamily: fonts.SEGOEUI
  },
  otpContainer: {
    justifyContent: "center"
  },
  timerContainer: {
    height: moderateScale(25),
    width: moderateScale(420),
    flexDirection: "row"
  },
  expiryText: { flex: 0.6 },
  timer: {
    flex: 0.4,
    // alignItems: "flex-start",
    paddingBottom: moderateScale(2)
  },
  spaceThree: { height: moderateScale(20) },
  verifyContainer: {
    flex: 1,
    backgroundColor: colors.BLUE,
    borderRadius: moderateScale(5),
    justifyContent: "center"
  },
  verifyButtonText: {
    textAlign: "center",
    fontSize: moderateScale(20),
    color: colors.WHITE,
    fontFamily: fonts.LATOBOLD
  },
  inputContainerStyles: {
    backgroundColor: colors.WHITE,
    elevation: 2,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: colors.BLACK,
    shadowOpacity: 0.3,
    height: moderateScale(45),
    width: moderateScale(35)
  },
  bottomPadding: { height: moderateScale(12) }
});
