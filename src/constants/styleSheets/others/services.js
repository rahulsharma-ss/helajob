import { StyleSheet, Platform } from "react-native";
import { fonts, colors } from "../../theme";
import { moderateScale } from "../../../utilities/ResponsiveFonts";

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(15),
    paddingTop: Platform.OS === "android" ? moderateScale(20) : 0
  },
  authButtons: {
    flex: 1
  },
  loginBtn: {
    backgroundColor: colors.BLUE,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginTop: moderateScale(10),
    marginBottom: moderateScale(10),
    borderWidth: 1,
    borderColor: "#0d5da8",
    borderRadius: moderateScale(3)
  },
  serviceItem: {
    flex: 1,
    height: moderateScale(180),
    justifyContent: "center",
    alignItems: "center"
  },
  serviceImage: {
    width: moderateScale(150),
    height: moderateScale(150),
    borderRadius: moderateScale(10),
    overflow: "hidden",
    justifyContent: "flex-end",
    backgroundColor: "#cfe6ff",
    borderWidth: 0.8,
    borderColor: "#82ADE5"
  },
  serviceText: {
    color: colors.WHITE,
    fontFamily: fonts.LATOBOLD,
    paddingBottom: moderateScale(10),
    paddingLeft: moderateScale(10),
    flex: 0.35
  },
  btnText: {
    color: colors.WHITE,
    fontSize: moderateScale(15),
    fontFamily: fonts.LATOBOLD
  },
  safeView: { flex: 1 },
  header: { flex: 0.1, justifyContent: "center" },
  headerText: {
    fontSize: moderateScale(20),
    fontFamily: fonts.LATOBOLD,
    color: colors.GREY
  },
  gridView: { flex: 0.8, justifyContent: "center" },
  buttonContainer: {
    flex: 0.1
  },
  buttonChild: {
    flex: 1,
    flexDirection: "row"
  },
  loginBtnText: { marginRight: moderateScale(5), backgroundColor: "white" },
  backText: { color: colors.BLUE },
  space: { flex: 0.04 },
  subView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "dodgerblue",
    borderTopLeftRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10)
  },
  subCategoryModal: { flex: 1, backgroundColor: "#0009" },
  blurView: {
    flex: 0.65
  },
  subCategoryListing: {
    flex: 0.35,
    backgroundColor: "white",
    paddingBottom: moderateScale(10)
  },
  subCategoryHeader: {
    flex: 0.18,
    height: moderateScale(50),
    justifyContent: "center",
    marginHorizontal: moderateScale(10),
    borderBottomWidth: 0.5,
    borderBottomColor: "#707070"
  },
  subCategoryText: {
    fontSize: moderateScale(17),
    color: colors.BLUE,
    fontFamily: fonts.LATOBOLD
  },
  subCategoryTitle: {
    flex: 0.82,
    marginHorizontal: moderateScale(10)
  },
  subCategoryTitleText: {
    fontSize: moderateScale(16),
    fontFamily: fonts.LATOBOLD,
    paddingVertical: moderateScale(10)
  },
  categoryItems: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: moderateScale(5),
    paddingVertical: moderateScale(7)
  },
  categoryItemsText: {
    fontSize: moderateScale(15),
    color: colors.DGREY,
    fontFamily: fonts.LATOMEDIUM
  },
  serviceText: {
    flex: 0.35,
    alignItems: "center"
  },
  serviceHeader: {
    fontFamily: fonts.LATOMEDIUM,
    fontSize: moderateScale(15),
    paddingHorizontal: moderateScale(5),
    color: colors.BLUE
  },
  subCategoryModalText: {
    textAlign: "center",
    fontSize: moderateScale(16),
    fontFamily: fonts.LATOBOLD
  },
  modalTextTwo: { flex: 0.4, paddingTop: moderateScale(20) },
  modalSubtitle: {
    textAlign: "center",
    fontSize: moderateScale(16),
    fontFamily: fonts.LATOMEDIUM
  },
  okContainer: {
    flex: 0.35,
    justifyContent: "center",
    alignItems: "center"
  },
  okButton: {
    width: moderateScale(180),
    height: moderateScale(40),
    backgroundColor: colors.BLUE,
    borderRadius: moderateScale(5),
    justifyContent: "center"
  },
  okText: {
    fontSize: moderateScale(18),
    fontFamily: fonts.LATOBOLD,
    color: colors.WHITE,
    textAlign: "center"
  }
});
