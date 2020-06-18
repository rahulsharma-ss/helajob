import { StyleSheet, Platform } from "react-native";
import { fonts, colors } from "../../theme";
import { moderateScale } from "../../../utilities/ResponsiveFonts";

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(13),
    paddingTop:
      Platform.OS === "android" ? moderateScale(25) : moderateScale(15)
  },
  header: { height: moderateScale(80) },
  headerTitle: {
    fontSize: moderateScale(18),
    textAlign: "center",
    fontFamily: fonts.LATOBOLD
  },
  space: { height: moderateScale(10) },
  searchContainer: {
    height: moderateScale(40),
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.8,
    borderRadius: moderateScale(20),
    borderColor: colors.DGREY,
    elevation: Platform.OS == "ios" ? 1 : 10,
    shadowOffset: {
      width: Platform.OS == "ios" ? -0.5 : -15,
      height: Platform.OS == "ios" ? -0.3 : -0.2
    },
    shadowColor: "black",
    shadowOpacity: 0.3,
    backgroundColor: "white"
  },
  searchImage: { flex: 0.1, paddingLeft: moderateScale(10) },
  searchInput: { flex: 0.9 },
  spaceTwo: { flex: 0.05 },
  chatListing: { flex: 1 },
  historyCard: {
    height: moderateScale(100),

    borderBottomWidth: 0.2,
    flexDirection: "row",
    borderBottomColor: colors.DGREY
  },
  logoContainer: {
    flex: 0.2,
    justifyContent: "center"
  },
  userLogo: {
    height: moderateScale(55),
    width: moderateScale(55),
    alignSelf: "center"
  },
  details: { flex: 0.8 },
  mainDetails: {
    flex: 0.4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  userName: {
    fontSize: moderateScale(16),
    fontFamily: fonts.LATOBOLD
  },
  day: {
    fontSize: moderateScale(11),
    textAlign: "right",
    fontStyle: "italic",
    color: colors.GREY,
    fontWeight: "400"

    // paddingLeft: moderateScale(55)
  },
  time: {
    fontSize: moderateScale(11),
    textAlign: "right",
    fontStyle: "italic",
    color: colors.GREY,
    fontWeight: "400"
  },
  serviceType: {
    flex: 0.3,
    justifyContent: "center"
  },
  serviceTypeText: {
    fontSize: moderateScale(10.5),
    fontFamily: fonts.LATOMEDIUM,
    color: colors.DGREY,
    opacity: 0.8
  },
  ratingContainer: {
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  ratingDetails: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  ratingImage: {
    height: moderateScale(15),
    width: moderateScale(15),
    alignSelf: "center"
  },
  ratingText: {
    fontSize: moderateScale(10),
    paddingLeft: moderateScale(8),
    color: colors.GREY,
    fontWeight: "400"
  },
  spaceThree: { height: moderateScale(10), width: moderateScale(10) },
  serviceProvided: {
    borderWidth: 0.5,
    borderRadius: moderateScale(100),
    width: moderateScale(80),
    justifyContent: "center",
    alignItems: "center",
    height: moderateScale(20),
    borderColor: colors.GREY
  },
  providedServiceText: {
    fontSize: moderateScale(12),
    fontFamily: fonts.LATOMEDIUM,
    paddingHorizontal: moderateScale(2),
    color: colors.GREY,
    fontWeight: "500"
  }
});
