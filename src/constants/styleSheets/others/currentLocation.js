import { StyleSheet, Platform } from "react-native";
import { fonts, colors } from "../../theme";
import { moderateScale } from "../../../utilities/ResponsiveFonts";

module.exports = StyleSheet.create({
  map: {
    flex: 1
  },
  container: {
    flex: 1
  },
  locationSearch: {
    position: "absolute",
    marginTop: Platform.OS == "ios" ? moderateScale(80) : moderateScale(40),
    marginLeft: moderateScale(30)
  },
  locationSearchText: {
    fontSize: moderateScale(17),
    color: colors.BLUE,
    fontFamily: fonts.LATOBOLD,
    paddingLeft: moderateScale(5)
  },
  backButton: {
    backgroundColor: colors.BLUE,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginTop: moderateScale(5),
    marginBottom: moderateScale(5),
    borderWidth: 1,
    borderColor: colors.BLUE,
    borderRadius: moderateScale(3)
  },
  back: {
    backgroundColor: colors.WHITE,
    borderColor: colors.BLUE,
    borderWidth: 0.6
  },
  backButtonText: {
    color: colors.BLUE,
    fontSize: moderateScale(15),
    fontFamily: fonts.LATOBOLD
  },
  space: { width: moderateScale(12) },
  buttonContainer: {
    position: "absolute",
    flexDirection: "row",
    bottom: 0,
    marginBottom: moderateScale(20),
    paddingHorizontal: moderateScale(20)
  },
  buttons: { height: moderateScale(60), width: moderateScale(150) },
  loader: { marginTop: moderateScale(350) }
});
