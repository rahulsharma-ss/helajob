import { StyleSheet, Platform } from "react-native";
import { fonts, colors } from "../../theme";
import { moderateScale } from "../../../utilities/ResponsiveFonts";

module.exports = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS == "ios" ? moderateScale(15) : moderateScale(30)
  },
  header: {
    height: moderateScale(40),
    flexDirection: "row",
    paddingHorizontal: moderateScale(13),
    paddingVertical: moderateScale(10)
  },
  backButton: {
    flex: 0.1,
    justifyContent: "center"
  },
  backButtonImage: {
    height: moderateScale(20),
    width: moderateScale(20),
    alignSelf: "flex-start"
  },
  paymentText: {
    fontSize: moderateScale(18),
    textAlign: "center",
    fontFamily: fonts.LATOBOLD,
    color: colors.BLACK
  },
  scroll: {
    height: moderateScale(550),
    paddingHorizontal: moderateScale(13)
  },
  addMoneyContainer: {
    flex: 0.25,
    justifyContent: "space-evenly",
    borderBottomWidth: 0.5,
    borderBottomColor: colors.GREY
  },
  walletTitle: {
    flex: 0.4,
    justifyContent: "center"
  },
  totalAmountWallet: {
    flex: 0.4,
    justifyContent: "center"
  },
  walletAmountText: {
    fontSize: moderateScale(30),
    fontFamily: fonts.LATOBOLD,
    color: colors.BLUE
  },
  add: {
    flex: 0.2,
    justifyContent: "center",
    paddingVertical: moderateScale(5)
  },
  addTitle: {
    fontSize: moderateScale(14),
    fontFamily: fonts.LATOBOLD
  },
  paymentMethod: {
    flex: 0.2,
    justifyContent: "space-evenly",
    borderBottomWidth: 0.5,
    borderBottomColor: colors.GREY
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  visa: {
    height: moderateScale(35),
    width: moderateScale(35),
    alignSelf: "flex-start"
  },
  secure: {
    fontSize: moderateScale(16),
    fontFamily: fonts.LATOBOLD,
    paddingRight: moderateScale(100)
  },
  primary: {
    borderWidth: 1,
    borderRadius: moderateScale(100),
    height: moderateScale(20),
    width: moderateScale(55),
    borderColor: colors.GREY
  },
  paymentMethodText: {
    fontSize: moderateScale(16),
    fontFamily: fonts.LATOBOLD
  },
  primaryText: {
    fontSize: moderateScale(12),
    fontFamily: fonts.LATOBOLD,
    textAlign: "center",
    color: colors.GREY
  }
});
