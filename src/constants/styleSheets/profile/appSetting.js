import { StyleSheet, Platform } from "react-native";
import { fonts, colors } from "../../theme";
import { moderateScale } from "../../../utilities/ResponsiveFonts";

module.exports = StyleSheet.create({
  options: {
    height: moderateScale(50),
    flexDirection: "row",
    paddingHorizontal: moderateScale(15)
  },
  optionTitle: {
    flex: 0.8
  },
  version: {
    flex: 0.2
  },
  versionText: {
    fontSize: moderateScale(16),
    fontFamily: fonts.LATOMEDIUM,
    color: colors.BLUE,
    textAlign: "right"
  },
  nextImage: {
    height: moderateScale(18),
    width: moderateScale(18),
    alignSelf: "flex-end"
  },
  container: {
    flex: 1,
    paddingTop: moderateScale(15)
  },
  header: {
    height: moderateScale(25),
    flexDirection: "row",
    paddingHorizontal: moderateScale(13)
  },
  backButton: {
    height: moderateScale(20),
    width: moderateScale(20),
    alignSelf: "flex-start"
  }
});
