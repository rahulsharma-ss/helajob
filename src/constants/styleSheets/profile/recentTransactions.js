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
    flex: 0.13,
    justifyContent: "center",
    paddingTop: moderateScale(5)
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
    color: "#000000"
  },
  space: {
    flex: 0.15,
    alignItems: "center",
    justifyContent: "center"
  },
  body: {
    flex: 0.87
  },
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  sectionList: {
    marginHorizontal: moderateScale(20),
    paddingVertical: moderateScale(15)
  },
  ticketBody: {
    borderColor: "#E9E9E9",
    borderWidth: 1,
    marginVertical: moderateScale(8),
    borderRadius: moderateScale(5)
  },
  ticketHeader: {
    flexDirection: "row",
    marginVertical: moderateScale(10)
  },
  paidForText: {
    fontSize: moderateScale(17),
    color: "red",
    fontFamily: fonts.LATOMEDIUM,
    marginLeft: moderateScale(15)
  },
  subTotal: {
    flex: 0.3,
    alignItems: "center",
    fontFamily: fonts.LATOMEDIUM
  },
  subTotalText: {
    fontSize: moderateScale(17),
    color: "#3E3E3E",
    fontFamily: fonts.LATOBOLD
  },
  accNo: {
    fontSize: moderateScale(14),
    color: "#888888",
    fontFamily: fonts.BASEREGULAR,
    marginLeft: moderateScale(15)
  },
  accNoText: {
    fontSize: moderateScale(14),
    color: "#888888",
    fontFamily: fonts.BASESEMIBOLD,
    marginLeft: moderateScale(15)
  },
  createdAt: {
    fontSize: moderateScale(14),
    color: "#888888",
    fontFamily: fonts.LATOBOLD,
    marginLeft: moderateScale(15),
    marginVertical: moderateScale(8)
  },
  closingBalance: {
    fontSize: moderateScale(14),
    color: "#888888",
    fontFamily: fonts.BASESEMIBOLD,
    marginLeft: moderateScale(15)
  },
  ticketFooter: {
    marginBottom: moderateScale(8),
    flexDirection: "row"
  },
  referenceNo: {
    fontSize: moderateScale(12),
    color: "#888888",
    fontFamily: fonts.LATOMEDIUM,
    marginLeft: moderateScale(15)
  },
  report: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
    color: colors.GREY
  },
  reportButton: {
    borderColor: "#E2E2E2",
    borderWidth: 1,
    borderRadius: moderateScale(13)
  },
  reportText: {
    marginVertical: moderateScale(3),
    marginHorizontal: moderateScale(8),
    color: colors.DGREY,
    fontFamily: fonts.LATOBOLD,
    opacity: 0.8
  },
  listing: {
    fontSize: moderateScale(17),
    color: "#000000",
    fontFamily: fonts.LATOBOLD
  },
  noTransactionText: {
    fontSize: moderateScale(17),
    color: colors.GREY,
    fontFamily: fonts.LATOBOLD,
    marginLeft: moderateScale(15),
    paddingTop: moderateScale(250),
    textAlign: "center"
  }
});
