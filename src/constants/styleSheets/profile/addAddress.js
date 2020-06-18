import { StyleSheet, Platform } from "react-native";
import { fonts, colors } from "../../theme";
import { moderateScale } from "../../../utilities/ResponsiveFonts";

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS == "ios" ? moderateScale(15) : moderateScale(35)
  },
  header: {
    height: moderateScale(50),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: moderateScale(10)
  },
  backButton: {
    flex: 0.1,
    justifyContent: "center"
  },
  backImage: {
    height: moderateScale(20),
    width: moderateScale(20),
    alignSelf: "flex-start"
  },
  headerText: {
    fontSize: moderateScale(18),
    textAlign: "center",
    fontFamily: fonts.LATOBOLD
  },
  locationFields: {
    height: moderateScale(550)
  },
  locationName: {
    height: moderateScale(80),
    justifyContent: "space-evenly"
  },
  locationNameTitle: {
    fontSize: moderateScale(14),
    fontFamily: fonts.LATOBOLD
  },
  locationInput: {
    borderBottomWidth: 0.4,
    borderBottomColor: colors.GREY,
    fontSize: moderateScale(14),
    fontFamily: fonts.LATOREGULAR,
    paddingVertical: moderateScale(10)
  },
  errorText: {
    fontSize: moderateScale(13),
    fontFamily: fonts.LATOREGULAR,
    color: "red",
    paddingVertical: moderateScale(10)
  },
  doorNumber: {
    height: moderateScale(80),
    justifyContent: "space-evenly"
  },
  doorNumberText: {
    fontSize: moderateScale(14),
    fontFamily: fonts.LATOBOLD
  },
  streetAddress: {
    height: moderateScale(40),
    opacity: 0.5
  },
  streetAddresText: {
    fontSize: moderateScale(13),
    fontFamily: fonts.LATOREGULAR
  },
  border: {
    height: moderateScale(10),
    borderBottomColor: colors.GREY,
    borderBottomWidth: 0.4
  },
  errorText2: {
    fontSize: moderateScale(13),
    fontFamily: fonts.LATOREGULAR,
    color: "red",
    borderBottomColor: colors.GREY,
    borderBottomWidth: 0.4
  }
});
