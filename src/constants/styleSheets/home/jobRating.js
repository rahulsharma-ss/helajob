import { StyleSheet, Platform } from "react-native";
import { fonts, colors } from "../../theme";
import { moderateScale } from "../../../utilities/ResponsiveFonts";

module.exports = StyleSheet.create({
  dislikedContainer: {
    flex: 1,
    backgroundColor: "transparent"
  },
  space: {
    flex: 0.7,
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  dislike: {
    flex: 0.3,
    backgroundColor: "white",
    paddingHorizontal: moderateScale(15)
  },
  ratingHeader: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  ratingText: {
    color: "#000000",
    fontSize: moderateScale(17),
    fontFamily: fonts.LATOBOLD
  },
  thanksHeader: {
    flex: 0.4,
    alignItems: "center",
    justifyContent: "center"
  },
  thanksHeaderText: {
    color: "#000000",
    fontSize: moderateScale(14),
    fontFamily: fonts.LATOREGULAR,
    textAlign: "center"
  },
  ok: {
    flex: 0.4
  },
  submitRate: {
    flex: 0.5,
    backgroundColor: colors.BLUE,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.BLUE,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(3),
    alignSelf: "center"
  },
  okText: {
    color: "#FFFFFF",
    fontSize: moderateScale(17),
    fontFamily: fonts.BASEBOLD,
    width: moderateScale(140),
    textAlign: "center"
  },
  scrollView: {
    backgroundColor: colors.WHITE,
    paddingHorizontal: moderateScale(15),
    flexGrow: 1
  },
  ratingHeaderOne: {
    textAlign: "center",
    marginVertical: moderateScale(30),
    color: "#000000",
    fontSize: moderateScale(18),
    fontFamily: fonts.LATOBOLD
  },
  thankyouText: {
    textAlign: "center",
    color: "#3E3E3E",
    fontSize: moderateScale(16),
    fontFamily: fonts.LATOREGULAR
  },
  options: {
    marginVertical: moderateScale(45),
    flexDirection: "row"
  },
  likeButton: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center"
  },
  dislikeButton: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center"
  },
  extraImage: {
    height: moderateScale(126),
    width: moderateScale(126),
    alignItems: "center",
    justifyContent: "center"
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: moderateScale(5)
  },
  checkStatus: {
    height: moderateScale(21),
    width: moderateScale(21),
    backgroundColor: "white",
    borderColor: colors.BLUE,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(3),
    alignItems: "center",
    justifyContent: "center"
  },
  isChecked: {
    height: moderateScale(16),
    width: moderateScale(16),
    backgroundColor: colors.BLUE,
    borderColor: colors.BLUE,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(3)
  },
  reuse: {
    color: "#888888",
    fontSize: moderateScale(14),
    fontFamily: fonts.BASEREGULAR,
    marginLeft: moderateScale(8)
  },
  commentHeader: {
    color: "#3E3E3E",
    fontSize: moderateScale(16),
    fontFamily: fonts.LATOREGULAR,
    marginVertical: moderateScale(15)
  },
  commentInput: {
    height: moderateScale(95.52),
    borderColor: "#707070",
    borderWidth: 1,
    borderRadius: moderateScale(3),
    paddingHorizontal: moderateScale(5)
  },
  improve: {
    color: "#3E3E3E",
    fontSize: moderateScale(16),
    fontFamily: fonts.LATOREGULAR,
    marginVertical: moderateScale(15)
  },
  mandatory: {
    color: "#3E3E3E",
    fontSize: moderateScale(16),
    marginVertical: moderateScale(15),
    fontStyle: "italic"
  },
  commentInputText: {
    height: moderateScale(95.52),
    borderColor: "#707070",
    borderWidth: 1,
    borderRadius: moderateScale(3),
    paddingHorizontal: moderateScale(5)
  },
  submitRateExpert: {
    height: moderateScale(45),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(3),
    marginVertical: moderateScale(20)
  },
  buttonActive: {
    borderColor: "#dadada",
    borderWidth: 1,
    borderRadius: moderateScale(126 / 2),
    shadowColor: "#dadada", // IOS
    shadowOffset: { height: moderateScale(5), width: moderateScale(5) }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: moderateScale(10), //IOS
    elevation: moderateScale(15), // Android
    backgroundColor: "white"
  },
  likedContainer: {
    flex: 1
  },
  spaceTwo: {
    flex: 0.7,
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  likedContainerChild: {
    flex: 0.3,
    backgroundColor: "white",
    paddingHorizontal: moderateScale(15)
  },
  likedRatingHeader: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  likedRatingHeaderText: {
    color: "#000000",
    fontSize: moderateScale(17),
    fontFamily: fonts.LATOBOLD
  },
  likeThanks: {
    flex: 0.4,
    alignItems: "center",
    justifyContent: "center"
  },
  likedThanksText: {
    color: "#000000",
    fontSize: moderateScale(14),
    fontFamily: fonts.LATOREGULAR,
    textAlign: "center"
  },
  afterRateButton: {
    flex: 0.4,
    flexDirection: "row"
  },
  likeSubmit: {
    flex: 0.5,
    marginBottom: moderateScale(40),
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.BLUE,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(3),
    marginRight: moderateScale(5)
  },
  rateOnStore: {
    color: "#1F5BA8",
    fontSize: moderateScale(17),
    fontFamily: fonts.BASEBOLD,
    width: moderateScale(140),
    textAlign: "center"
  },
  likedOk: {
    flex: 0.5,
    marginBottom: moderateScale(40),
    backgroundColor: colors.BLUE,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.BLUE,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(3),
    marginLeft: moderateScale(5)
  },
  likedOkText: {
    color: "#FFFFFF",
    fontSize: moderateScale(17),
    fontFamily: fonts.BASEBOLD,
    width: moderateScale(140),
    textAlign: "center"
  }
});
