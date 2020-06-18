import { StyleSheet, Platform } from "react-native";
import { fonts, colors } from "../../theme";
import { moderateScale } from "../../../utilities/ResponsiveFonts";

module.exports = StyleSheet.create({
  safeView: {
    flex: 1
  },
  container: {
    height: moderateScale(50),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: moderateScale(10)
  },
  backButton: { flex: 0.1, justifyContent: "center" },
  backImage: {
    height: moderateScale(20),
    width: moderateScale(20),
    alignSelf: "flex-start"
  },
  expertName: {
    fontSize: moderateScale(18),
    textAlign: "center",
    fontFamily: fonts.LATOBOLD
  },
  space: { flex: 0.1 },
  body: { flex: 1, paddingHorizontal: moderateScale(13) },
  jobInfoContainer: {
    flex: 0.15,
    flexDirection: "row"
  },
  jobInfo: {
    flex: 0.5,
    justifyContent: "space-evenly"
  },
  expertFullName: {
    fontSize: moderateScale(15),
    fontFamily: fonts.LATOBOLD,
    color: colors.BLUE
  },
  service: {
    fontSize: moderateScale(13),
    fontFamily: fonts.LATOREGULAR,
    color: colors.GREY,
    fontWeight: "800"
  },
  jobInfoTwo: {
    flex: 0.5,
    justifyContent: "space-evenly",
    alignItems: "flex-end"
  },
  totalTime: {
    fontSize: moderateScale(12),
    fontFamily: fonts.LATOBOLD,
    color: colors.GREY
  },
  totalHours: {
    fontSize: moderateScale(12),
    fontFamily: fonts.LATOBOLD,
    color: colors.BLACK
  },
  seperator: {
    height: moderateScale(1),
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10,
    borderColor: colors.GREY,
    opacity: 0.3
  },
  jobInfoThree: {
    flex: 0.15,
    // justifyContent: "space-evenly",
    alignItems: "flex-start"
  },
  startTime: {
    fontSize: moderateScale(13),
    fontFamily: fonts.LATOMEDIUM,
    color: colors.GREY,
    fontWeight: "700"
  },
  startTimeText: {
    fontSize: moderateScale(13),
    fontWeight: "700",
    color: colors.DGREY
  },
  breaktime: {
    fontSize: moderateScale(13),
    fontFamily: fonts.LATOMEDIUM,
    color: colors.GREY,
    fontWeight: "700"
  },
  breakTimeText: {
    fontSize: moderateScale(13),
    color: colors.GREY,
    fontStyle: "italic",
    fontWeight: "700"
  },
  finishTime: {
    fontSize: moderateScale(13),
    fontFamily: fonts.LATOMEDIUM,
    color: colors.GREY,
    fontWeight: "700"
  },
  finishTimeText: {
    fontSize: moderateScale(13),
    fontWeight: "700",
    color: colors.DGREY
  },
  jobInfoFour: {
    flex: 0.2,
    flexDirection: "row"
  },
  jobInfoHeader: {
    flex: 0.5,
    justifyContent: "space-evenly",
    alignItems: "flex-start"
  },
  subTotal: {
    fontSize: moderateScale(13),
    color: colors.GREY,
    fontStyle: "italic",
    fontWeight: "600"
  },
  serviceFee: {
    fontSize: moderateScale(13),
    color: colors.GREY,
    fontWeight: "600",
    fontStyle: "italic"
  },
  total: {
    fontSize: moderateScale(13),
    fontFamily: fonts.LATOBOLD,
    color: colors.DGREY,
    paddingLeft: moderateScale(5)
  },
  details: {
    flex: 0.5,
    justifyContent: "space-evenly",
    alignItems: "flex-end"
  },
  subtotalText: {
    fontSize: moderateScale(13),
    color: colors.DGREY,
    fontWeight: "600",
    fontStyle: "italic"
  },
  serviceFeeText: {
    fontSize: moderateScale(13),
    color: colors.DGREY,
    fontStyle: "italic",
    fontWeight: "600"
  },
  totalPriceContainer: {
    borderTopColor: colors.BLACK,
    borderTopWidth: 1
  },
  totalPriceText: {
    fontSize: moderateScale(13),
    fontFamily: fonts.LATOBOLD,
    color: colors.BLACK
  },
  otherInfoContainer: {
    flex: 0.2,
    justifyContent: "space-evenly"
  },
  otherInfoText: {
    fontSize: moderateScale(14),
    fontFamily: fonts.LATOBOLD,
    color: colors.BLUE
  },
  referenceNumberContainer: {
    flex: 0.2,
    justifyContent: "space-between",
    flexDirection: "row"
  },
  referenceNumberText: {
    fontSize: moderateScale(14),
    color: colors.GREY,
    fontWeight: "600"
  },
  referenceId: {
    fontSize: moderateScale(14),
    fontFamily: fonts.LATOBOLD,
    color: colors.BLACK
  },
  feedbackContainer: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  feedbackText: {
    fontSize: moderateScale(14),
    fontFamily: fonts.LATOBOLD,
    color: colors.BLUE
  },
  thumbsUp: {
    height: moderateScale(18),
    width: moderateScale(18),
    marginLeft: moderateScale(5)
  },
  descriptionText: {
    fontSize: moderateScale(14),
    fontFamily: fonts.LATOMEDIUM,
    color: colors.GREY
  },
  noFeedback: {
    fontSize: moderateScale(14),
    fontFamily: fonts.LATOBOLD,
    color: colors.GREY
  },
  reportButtonContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: moderateScale(10)
  },
  reportButton: {
    height: moderateScale(40),
    width: moderateScale(150),
    backgroundColor: colors.WHITE,
    borderWidth: 0.7,
    borderColor: colors.BLUE,
    borderRadius: moderateScale(5),
    justifyContent: "center",
    alignItems: "center"
  },
  reportText: {
    fontSize: moderateScale(14),
    fontFamily: fonts.LATOBOLD,
    color: colors.BLUE
  }
});
