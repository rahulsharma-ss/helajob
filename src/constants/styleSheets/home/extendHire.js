import { StyleSheet, Platform } from "react-native";
import { fonts, colors } from "../../theme";
import { moderateScale } from "../../../utilities/ResponsiveFonts";

module.exports = StyleSheet.create({
  container: { flex: 0.74 },
  dateComponent: {
    height: moderateScale(130),
    width: moderateScale(350),
    justifyContent: "center"
  },
  renderDates: {
    flex: 0.45,
    justifyContent: "center"
  },
  dateIs: {
    fontSize: moderateScale(15),
    textAlign: "left",
    fontFamily: fonts.LATOBOLD,
    color: colors.BLACK
  },
  jobDetails: {
    flex: 0.55,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  jobStartTime: {
    flex: 0.3333,
    alignItems: "flex-start"
  },
  jobStartText: {
    fontSize: moderateScale(12),
    textAlign: "left",
    fontFamily: fonts.LATOREGULAR,
    color: colors.GREY
  },
  startTimePicker: {
    height: moderateScale(40),
    width: moderateScale(90),
    borderRadius: moderateScale(5),
    borderWidth: 0.5,
    flexDirection: "row"
  },
  startTimeText: {
    flex: 0.7,
    justifyContent: "center"
  },
  selectedStartTime: {
    fontSize: moderateScale(12),
    textAlign: "center",
    fontFamily: fonts.LATOREGULAR,
    color: colors.GREY
  },
  dropDown: {
    flex: 0.3,
    justifyContent: "center"
  },
  dropDownImage: {
    height: moderateScale(10),
    width: moderateScale(10),
    alignSelf: "center",
    tintColor: colors.BLUE
  },
  endTimeText: {
    fontSize: moderateScale(12),
    textAlign: "left",
    fontFamily: fonts.LATOREGULAR,
    color: colors.GREY
  },
  endTimeText2: {
    fontSize: moderateScale(12),
    textAlign: "right",
    fontFamily: fonts.LATOREGULAR,
    color: colors.GREY
  },
  endTimePicker: {
    height: moderateScale(40),
    width: moderateScale(90),
    borderRadius: moderateScale(5),
    borderWidth: 0.5,
    flexDirection: "row"
  },
  endTime: {
    flex: 0.7,
    justifyContent: "center"
  },
  totalText: {
    fontSize: moderateScale(12),
    textAlign: "left",
    fontFamily: fonts.LATOREGULAR,
    color: colors.GREY
  },
  totalTimeJob: {
    height: moderateScale(40),
    width: moderateScale(85),
    borderRadius: moderateScale(5),
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.GREY
  },
  totalTimeText: {
    fontSize: moderateScale(12),
    textAlign: "center",
    fontFamily: fonts.LATOMEDIUM,
    color: colors.BLUE
  },
  stepTwo: { flex: 0.74 },
  selectedDates: {
    flex: 0.1,
    justifyContent: "center"
  },
  selectedDayText: {
    fontSize: moderateScale(15),
    textAlign: "left",
    fontFamily: fonts.LATOBOLD,
    color: colors.BLUE
  },
  jobInfo: {
    flex: 0.1,
    borderBottomWidth: 1
  },
  subTotal: {
    flex: 0.5,
    justifyContent: "space-between",
    flexDirection: "row"
  },
  subTotalText: {
    fontSize: moderateScale(14),
    textAlign: "left",
    fontFamily: fonts.LATOREGULAR,
    color: colors.GREY
  },
  actualSubTotal: {
    fontSize: moderateScale(14),
    textAlign: "left",
    fontFamily: fonts.LATOREGULAR,
    color: colors.GREY
  },
  serviceFee: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  serviceFeeText: {
    fontSize: moderateScale(14),
    textAlign: "left",
    fontFamily: fonts.LATOREGULAR,
    color: colors.GREY
  },
  actualServiceFee: {
    fontSize: moderateScale(14),
    textAlign: "left",
    fontFamily: fonts.LATOREGULAR,
    color: colors.GREY
  },
  totalAmount: {
    flex: 0.4,
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomWidth: 1,
    alignItems: "center"
  },
  totalAmountText: {
    fontSize: moderateScale(14),
    textAlign: "left",
    fontFamily: fonts.LATOBOLD,
    color: colors.BLACK
  },
  actualTotalAmount: {
    fontSize: moderateScale(14),
    textAlign: "left",
    fontFamily: fonts.LATOBOLD,
    color: colors.BLACK
  },
  condition: {
    fontSize: moderateScale(12),
    fontFamily: fonts.LATOREGULAR,
    color: colors.GREY,
    textAlign: "center"
  },
  cardContainer: {
    height: moderateScale(50)
  },
  allCards: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  visaLogo: {
    height: moderateScale(35),
    width: moderateScale(35),
    alignSelf: "flex-start"
  },
  cardNumber: {
    fontSize: moderateScale(16),
    fontFamily: fonts.LATOBOLD,
    paddingRight: moderateScale(100)
  },
  primaryCard: {
    borderWidth: 1,
    borderRadius: moderateScale(100),
    height: moderateScale(20),
    width: moderateScale(55),
    borderColor: colors.GREY
  },
  primaryText: {
    fontSize: moderateScale(12),
    fontFamily: fonts.LATOBOLD,
    textAlign: "center",
    color: colors.GREY
  },
  space: {
    height: moderateScale(20),
    width: moderateScale(55)
  },
  spaceTwo: {
    height: moderateScale(30),
    width: moderateScale(10)
  },
  paymentContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(13)
  },
  paymentHeader: {
    flexDirection: "row"
  },
  paymentButton: {
    flex: 0.1,
    justifyContent: "center"
  },
  backImage: {
    height: moderateScale(20),
    width: moderateScale(20),
    alignSelf: "flex-start"
  },
  addMoneyText: {
    fontSize: moderateScale(18),
    textAlign: "center",
    fontFamily: fonts.LATOBOLD,
    color: colors.BLACK
  },
  spaceThree: { flex: 0.1 },
  availableBalance: {
    flex: 0.9,
    paddingTop: moderateScale(20)
  },
  balanceInfo: {
    flex: 0.2,
    justifyContent: "space-evenly"
  },
  availableBalanceText: {
    fontSize: moderateScale(16),
    fontFamily: fonts.LATOBOLD
  },
  totalAmountDisplayed: {
    fontSize: moderateScale(30),
    fontFamily: fonts.LATOBOLD,
    color: colors.BLUE
  },
  addMoneyToWalletText: {
    fontSize: moderateScale(15),
    fontFamily: fonts.LATOBOLD
  },
  amountInput: {
    height: moderateScale(40),
    paddingLeft: moderateScale(5),
    fontFamily: fonts.LATOREGULAR,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.GREY,
    fontSize: moderateScale(16)
  },
  paymentMethod: {
    fontSize: moderateScale(15),
    fontFamily: fonts.LATOBOLD
  },
  loader: {
    flex: 0.15,
    justifyContent: "center",
    alignItems: "center"
  },
  validateButton: {
    height: moderateScale(40),
    width: moderateScale(300),
    backgroundColor: colors.BLUE,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(5)
  },
  validateText: {
    fontSize: moderateScale(15),
    fontFamily: fonts.LATOBOLD,
    color: colors.WHITE
  },
  safeArea: {
    flex: 1,
    paddingTop:
      Platform.OS === "android" ? moderateScale(30) : moderateScale(10)
  },
  header: {
    height: moderateScale(30),
    flexDirection: "row",
    paddingHorizontal: moderateScale(13),
    paddingTop: moderateScale(10)
  },
  backButton: {
    flex: 0.1,
    justifyContent: "center"
  },
  backIcon: {
    height: moderateScale(20),
    width: moderateScale(20),
    alignSelf: "flex-start"
  },
  extendHireText: {
    fontSize: moderateScale(18),
    textAlign: "center",
    fontFamily: fonts.LATOBOLD,
    color: colors.BLACK
  },
  question: {
    flex: 1,
    paddingHorizontal: moderateScale(13),
    paddingVertical: moderateScale(13)
  },
  questionText: {
    fontSize: moderateScale(15),
    textAlign: "left",
    fontFamily: fonts.LATOBOLD,
    color: colors.BLACK
  },
  selections: {
    flex: 0.08,
    flexDirection: "row"
  },
  totalDays: {
    flex: 0.6,
    justifyContent: "center"
  },
  totalDaysText: {
    fontSize: moderateScale(15),
    textAlign: "left",
    fontFamily: fonts.LATOBOLD,
    color: colors.BLUE
  },
  dropDownContainer: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center"
  },
  dropDownDay: {
    height: moderateScale(40),
    width: moderateScale(70),
    borderWidth: 1,
    borderColor: colors.GREY,
    borderRadius: moderateScale(5),
    alignItems: "center",
    justifyContent: "center"
  },
  dropDownStyle: {
    height: moderateScale(40),
    width: moderateScale(70),
    alignSelf: "center",
    justifyContent: "center",
    paddingLeft: moderateScale(5)
  },
  hourlyPrice: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "flex-end"
  },
  hourlyPriceText: {
    fontSize: moderateScale(13.5),
    textAlign: "left",
    fontFamily: fonts.LATOBOLD,
    color: colors.BLUE
  },
  proceedButton: {
    flex: 0.1,
    alignItems: "center"
  },
  payButton: {
    height: moderateScale(45),
    width: moderateScale(320),
    backgroundColor: colors.BLUE,
    borderRadius: moderateScale(5),
    justifyContent: "center",
    alignItems: "center"
  },
  payButtonText: {
    fontSize: moderateScale(15),
    textAlign: "left",
    fontFamily: fonts.LATOBOLD,
    color: colors.WHITE
  }
});
