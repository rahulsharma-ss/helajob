import { StyleSheet, Platform } from "react-native";
import { fonts, colors } from "../../theme";
import { moderateScale } from "../../../utilities/ResponsiveFonts";

module.exports = StyleSheet.create({
  optionsContainer: {
    height: moderateScale(50),
    flexDirection: "row"
  },
  itemContainer: {
    flex: 0.8
  },
  item: {
    fontSize: moderateScale(16),
    fontFamily: fonts.LATOMEDIUM,
    color: colors.GREY,
    textAlign: "left"
  },
  selected: {
    flex: 0.2
  },
  selectedImage: {
    height: moderateScale(18),
    width: moderateScale(18),
    alignSelf: "flex-end"
  },
  container: {
    flex: 1,
    paddingTop: moderateScale(20),
    paddingHorizontal: moderateScale(13)
  },
  header: {
    flex: 0.35,
    justifyContent: "center",
    alignItems: "center"
  },
  userImageContainer: {
    flex: 0.6,
    justifyContent: "center"
  },
  userImage: {
    alignItems: "center",
    height: moderateScale(100),
    width: moderateScale(100),
    borderRadius: moderateScale(200),
    overflow: "hidden",
    justifyContent: "center",
    borderColor: colors.BLUE,
    borderWidth: 2
  },
  userImageStyle: {
    height: moderateScale(100),
    width: moderateScale(100)
  },
  fullName: {
    flex: 0.15
  },
  fullNameText: {
    fontSize: moderateScale(20),
    fontFamily: fonts.LATOMEDIUM,
    color: colors.BLUE
  },
  address: {
    flex: 0.1
  },
  addressText: {
    fontSize: moderateScale(15),
    fontFamily: fonts.LATOMEDIUM,
    color: colors.GREY
  },
  userDetailsExtra: {
    flex: 0.15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  totalService: {
    fontSize: moderateScale(15),
    fontFamily: fonts.LATOMEDIUM,
    fontWeight: "700",
    color: colors.DGREY
  },
  space: {
    height: moderateScale(10),
    width: moderateScale(10)
  },
  rating: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  thumbUp: {
    height: moderateScale(15),
    width: moderateScale(15),
    alignSelf: "center"
  },
  body: {
    flex: 0.65
  },
  spaceTwo: {
    height: moderateScale(25)
  },
  logoutContainer: {
    flex: 1,
    backgroundColor: "#0009"
  },
  proceed: {
    flex: 0.3,
    backgroundColor: "white",
    paddingHorizontal: moderateScale(8)
  },
  logoutAsk: {
    height: moderateScale(50),
    justifyContent: "center",
    marginHorizontal: moderateScale(10),
    borderBottomWidth: 0.5,
    borderBottomColor: "#707070"
  },
  logoutText: {
    textAlign: "center",
    fontSize: moderateScale(16),
    fontFamily: fonts.LATOBOLD
  },
  extraInfo: {
    flex: 0.4,
    paddingTop: moderateScale(20)
  },
  extraInfoText: {
    textAlign: "center",
    fontSize: moderateScale(16),
    fontFamily: fonts.LATOMEDIUM
  },
  noContainer: {
    flex: 0.35,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: moderateScale(5),
    paddingRight: moderateScale(5)
  },
  noButton: {
    width: moderateScale(150),
    height: moderateScale(40),
    backgroundColor: colors.WHITE,
    borderRadius: moderateScale(5),
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: colors.BLUE
  },
  noButtonText: {
    fontSize: moderateScale(18),
    fontFamily: fonts.LATOBOLD,
    color: colors.BLUE,
    textAlign: "center"
  },
  yesButton: {
    width: moderateScale(155),
    height: moderateScale(40),
    backgroundColor: colors.BLUE,
    borderRadius: moderateScale(5),
    justifyContent: "center"
  },
  yes: {
    fontSize: moderateScale(18),
    fontFamily: fonts.LATOBOLD,
    color: colors.WHITE,
    textAlign: "center"
  }
});
