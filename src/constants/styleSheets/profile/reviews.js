import { StyleSheet, Platform } from "react-native";
import { fonts, colors } from "../../theme";
import { moderateScale } from "../../../utilities/ResponsiveFonts";

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  header: {
    flexDirection: "row",
    flex: 0.1,
    justifyContent: "flex-end",
    paddingTop: moderateScale(15)
  },
  backButton: {
    flex: 0.15,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    flex: 0.7,
    alignItems: "center",
    justifyContent: "center"
  },
  titleText: {
    fontFamily: fonts.LATOBOLD,
    fontSize: moderateScale(18),
    color: colors.BLACK
  },
  spaceOne: {
    flex: 0.15
  },
  userDetails: {
    flex: 0.1,
    paddingHorizontal: moderateScale(23)
  },
  userRating: {
    flex: 1,
    marginVertical: moderateScale(8),
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#DCDCDC",
    borderRadius: moderateScale(4)
  },
  services: {
    flex: 0.4,
    alignItems: "center",
    justifyContent: "center"
  },
  servicesText: {
    fontSize: moderateScale(17),
    fontFamily: fonts.LATOREGULAR,
    color: colors.GREY
  },
  seperator: {
    flex: 0.05,
    alignItems: "center",
    justifyContent: "center"
  },
  seperatorText: {
    fontSize: moderateScale(17),
    fontFamily: fonts.BASEREGULAR,
    color: "#707070"
  },
  totalRating: {
    flex: 0.55,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  positiveRating: {
    fontSize: moderateScale(17),
    fontFamily: fonts.LATOREGULAR,
    color: colors.GREY
  },

  negativeRating: {
    fontSize: moderateScale(17),
    fontFamily: fonts.LATOREGULAR,
    color: colors.GREY
  },
  allReviews: {
    marginHorizontal: moderateScale(23),
    borderBottomColor: "#707070",
    borderBottomWidth: 1,
    marginTop: moderateScale(15)
  },
  expertFeedback: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: moderateScale(50),
    borderWidth: 1,
    overflow: "hidden"
  },
  expertImage: {
    height: moderateScale(43),
    width: moderateScale(43)
  },
  expertName: {
    marginLeft: moderateScale(20),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  expertNameText: {
    fontSize: moderateScale(17),
    fontFamily: fonts.LATOBOLD,
    color: colors.BLUE
  },
  description: {
    marginVertical: moderateScale(14),
    fontSize: moderateScale(17),
    fontFamily: fonts.LATOREGULAR,
    color: colors.GREY
  },
  noReview: {
    fontSize: moderateScale(15),
    fontFamily: fonts.LATOBOLD,
    color: colors.GREY,
    textAlign: "center",
    paddingTop: moderateScale(200)
  }
});
