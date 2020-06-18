import { StyleSheet } from "react-native";
import { fonts, colors } from "../../theme";
import { moderateScale } from "../../../utilities/ResponsiveFonts";

module.exports = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    paddingHorizontal: moderateScale(15)
  },
  username: {
    fontSize: moderateScale(15),
    paddingVertical: moderateScale(10),
    fontFamily: fonts.LATOBOLD,
    color: "#888888"
  },
  input: {
    height: moderateScale(40),
    borderColor: colors.GREY,
    borderBottomWidth: 1,
    fontFamily: fonts.LATOREGULAR
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
  socialBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.GREY,
    flex: 1
  },
  btnText: {
    color: colors.BLUE,
    fontSize: moderateScale(15),
    fontFamily: fonts.LATOBOLD
  },
  socialText: {
    color: colors.GREY,
    fontWeight: "bold",
    fontSize: moderateScale(15)
  },
  socialTitle: {
    flex: 0.8,
    backgroundColor: colors.GWHITE,
    justifyContent: "center",
    alignItems: "center"
  },
  socialContainer: {
    flex: 0.5,
    flexDirection: "row",
    borderRadius: moderateScale(3),
    overflow: "hidden"
  },
  orText: {
    textAlign: "center",
    fontSize: moderateScale(16),
    color: colors.GREY,
    fontFamily: fonts.LATOMEDIUM
  },
  safeArea: { flex: 1 },
  header: {
    flexDirection: "row",
    marginTop: moderateScale(30)
  },
  logoContainer: {
    flex: 0.5,
    alignItems: "flex-start"
  },
  logo: {
    flex: 1
  },
  space: {
    flex: 0.5
  },
  signIn: {
    flex: 0.05,
    height: moderateScale(70),
    justifyContent: "center"
  },
  signInText: {
    fontSize: moderateScale(23),
    fontFamily: fonts.LATOBOLD
  },
  inputField: {
    height: moderateScale(220)
  },
  forgotPasswordContainer: {
    height: moderateScale(20),
    justifyContent: "flex-end"
  },
  forgotPasswordText: {
    fontSize: moderateScale(15),
    color: "#1F5BA8",
    fontFamily: fonts.LATOREGULAR
  },
  buttonContainer: {
    height: moderateScale(50)
  },
  authButton: {
    flex: 1,
    flexDirection: "row"
  },
  spaceTwo: { flex: 0.04 },
  orDivider: {
    height: moderateScale(45),
    flexDirection: "row"
  },
  orView: { flex: 0.46 },
  spaceThree: {
    flex: 0.5,
    borderBottomWidth: 0.5
  },
  socialButtons: {
    height: moderateScale(110)
  },
  fbLogoContainer: {
    flex: 0.2,
    backgroundColor: "#35528F"
  },
  fbLogo: {
    flex: 1,
    alignSelf: "center"
  },
  spaceFour: {
    height: moderateScale(15)
  },
  googleContainer: { borderWidth: 0.3, borderColor: "#95989A" },
  googleIcon: {
    flex: 0.2,
    backgroundColor: "#F8F6F6"
  },
  googleImage: {
    flex: 1,
    alignSelf: "center"
  },
  orTextView: { flex: 0.08, justifyContent: "center" },
  spaceFive: {
    flex: 0.5,
    borderBottomWidth: 0.5
  },
  errorText: {
    fontSize: moderateScale(12),
    fontFamily: fonts.LATOREGULAR,
    color: "red",
    paddingTop: moderateScale(5)
  }
});
