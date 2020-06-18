import { StyleSheet } from "react-native";
import { fonts, colors } from "../../theme";
import { moderateScale } from "../../../utilities/ResponsiveFonts";

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(15),
    marginBottom: moderateScale(10)
  },
  input: {
    height: moderateScale(40),
    borderColor: "gray",
    borderBottomWidth: 1,
    fontFamily: fonts.LATOREGULAR
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
    overflow: "hidden",
    fontFamily: fonts.LATOBOLD
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
    fontFamily: fonts.LATOBOLD
  },
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
  space: { height: moderateScale(50) },
  forgotPassword: { flex: 0.2 },
  forgotPasswordText: {
    fontSize: moderateScale(20),
    fontFamily: fonts.LATOBOLD
  },
  spaceTwo: { height: moderateScale(20) },
  instructions: {
    fontSize: moderateScale(15),
    color: colors.GREY,
    fontFamily: fonts.LATOREGULAR
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row"
  },
  emailContainer: { flex: 0.4 },
  spaceThree: { flex: 0.04 },
  errorText: {
    fontSize: moderateScale(15),
    fontFamily: fonts.LATOREGULAR,
    color: "red",
    paddingTop: moderateScale(5)
  }
});
