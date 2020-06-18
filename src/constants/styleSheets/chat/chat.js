import { StyleSheet, Platform } from "react-native";
import { fonts, colors } from "../../theme";
import { moderateScale } from "../../../utilities/ResponsiveFonts";

module.exports = StyleSheet.create({
  chatListing: {
    height: moderateScale(85),
    flexDirection: "row"
  },
  expertImageContainer: {
    flex: 0.25,
    justifyContent: "center"
  },
  expertImage: {
    height: moderateScale(55),
    width: moderateScale(55),
    alignSelf: "center",
    borderRadius: moderateScale(200),
    overflow: "hidden"
  },
  expertPicture: {
    height: moderateScale(55),
    width: moderateScale(55),
    alignSelf: "center"
  },
  expertDetails: {
    flex: 0.75,
    borderBottomColor: colors.DGREY,
    borderBottomWidth: 0.25
  },
  expertInfo: {
    flex: 0.4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  expertName: {
    fontSize: moderateScale(17),
    fontFamily: fonts.LATOBOLD
  },
  chatTime: {
    fontSize: moderateScale(13),
    textAlign: "right",
    fontFamily: fonts.LATOREGULAR,
    fontStyle: "italic"
  },
  message: {
    fontSize: moderateScale(13),
    fontFamily: fonts.LATOREGULAR,
    fontStyle: "italic"
  },
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(13),
    paddingTop: moderateScale(15)
  },
  headerContainer: { height: moderateScale(90) },
  chatHeader: {
    fontSize: moderateScale(18),
    textAlign: "center",
    fontFamily: fonts.LATOBOLD
  },
  space: { height: moderateScale(10) },
  searchBar: {
    height: moderateScale(40),
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.8,
    borderRadius: moderateScale(20),
    borderColor: colors.DGREY,
    shadowColor: "black",
    shadowOpacity: 0.2,
    backgroundColor: "white"
  },
  searchLogo: { flex: 0.1, paddingLeft: moderateScale(10) },
  spaceTwo: { flex: 0.05 },
  noChat: {
    fontSize: moderateScale(15),
    fontFamily: fonts.LATOBOLD,
    textAlign: "center",
    paddingTop: moderateScale(250)
  }
});
