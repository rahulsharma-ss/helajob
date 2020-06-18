import { StyleSheet, Platform } from "react-native";
import { fonts, colors } from "../../theme";
import { moderateScale } from "../../../utilities/ResponsiveFonts";

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? moderateScale(20) : 0
  },
  header: {
    height: moderateScale(50),
    flexDirection: "row",
    paddingHorizontal: moderateScale(13),
    backgroundColor: colors.BLUE
  },
  backButtonContainer: {
    flex: 0.1,
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  backImage: {
    height: moderateScale(20),
    width: moderateScale(20),
    alignSelf: "flex-start",
    tintColor: colors.WHITE
  },
  headerTitle: {
    flex: 0.8
  },
  headerText: {
    fontSize: moderateScale(18),
    textAlign: "center",
    fontFamily: fonts.LATOBOLD,
    color: colors.WHITE,
    paddingTop: moderateScale(10)
  }
});
