import { StyleSheet } from "react-native";
import { fonts, colors } from "../../theme";
import { moderateScale } from "../../../utilities/ResponsiveFonts";

module.exports = StyleSheet.create({
  details: {
    color: "#888888",
    fontSize: moderateScale(15),
    fontFamily: fonts.LATOBOLD,
    paddingVertical: moderateScale(10),
    paddingLeft: moderateScale(4)
  },
  input: {
    height: moderateScale(40),
    borderColor: "gray",
    borderBottomWidth: 1,
    fontFamily: fonts.LATOREGULAR
  },
  authButtons: {
    flex: 0.48,
    borderWidth: 0.5,
    borderColor: "grey",
    borderRadius: moderateScale(3),
    overflow: "hidden"
  },
  loginBtn: {
    backgroundColor: "#1F5BA8",
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  socialBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
    flex: 1
  },
  userType: {
    fontSize: moderateScale(13),
    fontWeight: "bold",
    textAlign: "center"
  },
  toggleUser: { flex: 0.5, justifyContent: "center" },
  btnText: {
    color: "white",
    fontSize: moderateScale(15),
    fontFamily: fonts.LATOBOLD
  },
  socialText: {
    color: "#888888",
    fontFamily: fonts.LATOBOLD,
    fontSize: moderateScale(15)
  },
  socialTitle: {
    flex: 0.8,
    backgroundColor: "#F8F6F6",
    justifyContent: "center",
    alignItems: "center"
  },
  socialContainer: {
    flex: 0.5,
    flexDirection: "row",
    borderRadius: moderateScale(3),
    overflow: "hidden"
  },
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(15)
  },
  header: {
    flexDirection: "row",
    height: moderateScale(100),
    marginTop: moderateScale(30)
  },
  logoContainer: {
    flex: 0.5,
    alignItems: "flex-start"
  },
  logo: {
    flex: 1
  },
  signUpTitle: {
    height: moderateScale(75),
    justifyContent: "center"
  },
  signUpText: { fontSize: moderateScale(23), fontFamily: fonts.LATOBOLD },
  toggleContainer: {
    height: moderateScale(30),
    justifyContent: "center"
  },
  toggleItems: {
    flex: 1,
    borderRadius: moderateScale(200),
    flexDirection: "row",
    overflow: "hidden",
    borderWidth: 0.3
  },
  checkBoxContainer: {
    height: moderateScale(60),
    paddingVertical: moderateScale(8)
  },
  checkBoxStyle: { fontSize: moderateScale(15) },
  authContainers: {
    height: moderateScale(50),
    marginTop: moderateScale(25)
  },
  buttons: {
    flex: 1,
    flexDirection: "row"
  },
  checkBoxOption: { flex: 1, paddingTop: moderateScale(10) },
  space: { flex: 0.04 },
  loginButtonColor: { backgroundColor: "white" },
  orContainer: {
    height: moderateScale(45),
    flexDirection: "row"
  },
  loginText: { color: "#1F5BA8" },
  spaceTwo: { flex: 0.46 },
  spaceThree: {
    flex: 0.5,
    borderBottomWidth: 0.5
  },
  orContainerBox: { flex: 0.08, justifyContent: "center" },
  orText: {
    textAlign: "center",
    fontSize: moderateScale(16),
    color: "#888888",
    fontFamily: fonts.LATOMEDIUM
  },
  spaceFour: {
    flex: 0.5,
    borderBottomWidth: 0.5
  },
  socialLogin: {
    height: moderateScale(110)
  },
  socialLogoContainer: {
    flex: 0.2,
    backgroundColor: "#35528F"
  },
  socialImage: {
    flex: 1,
    alignSelf: "center"
  },
  spaceSix: {
    height: moderateScale(15)
  },
  socialContainer2: { borderWidth: 0.3, borderColor: "#95989A" },
  socialFbContainer: {
    flex: 0.2,
    backgroundColor: "#F8F6F6"
  },
  socialFbImage: {
    flex: 1,
    alignSelf: "center"
  },
  errorText: {
    fontSize: moderateScale(15),
    fontFamily: fonts.LATOREGULAR,
    color: "red",
    paddingTop: moderateScale(5)
  },
  textInput: {
    fontFamily: fonts.LATOREGULAR,
    fontSize: moderateScale(15),
    borderBottomWidth: 0.5,
    borderBottomColor: colors.GREY
  },
  inputText: {
    fontFamily: fonts.LATOBOLD,
    fontSize: moderateScale(15),
    paddingVertical: moderateScale(12)
  },

  textInput2: {
    fontSize: moderateScale(15.5),
    fontFamily: fonts.BASEREGULAR,
    paddingVertical: moderateScale(10),
    borderBottomColor: "#dadada",
    borderBottomWidth: 1
  }
});
