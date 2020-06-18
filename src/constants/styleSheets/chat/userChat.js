import { StyleSheet, Platform } from "react-native";
import { fonts, colors } from "../../theme";
import { moderateScale } from "../../../utilities/ResponsiveFonts";

module.exports = StyleSheet.create({
  customChatActions: {
    flexDirection: "row",
    height: moderateScale(43),
    alignItems: "center"
  },
  camera: { marginHorizontal: moderateScale(20) },
  gallery: { marginRight: moderateScale(15) },
  container: { flex: 1, backgroundColor: "white" },
  headerContainer: {
    flex: 0.1,
    flexDirection: "row",
    marginTop: moderateScale(15)
  },
  backButton: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center"
  },
  expertName: {
    fontSize: moderateScale(17),
    fontFamily: fonts.LATOBOLD,
    color: colors.BLACK
  },
  space: { flex: 0.2 },
  chatContainer: { flex: 0.9, paddingBottom: moderateScale(22) },
  loader: {
    height: moderateScale(500),
    width: moderateScale(300),
    alignSelf: "center",
    top: moderateScale(80),
    justifyContent: "center",
    position: "absolute"
  },
  messageFooter: {
    paddingBottom: moderateScale(10),
    paddingRight: moderateScale(5),
    flexDirection: "row"
  },
  footerTime: {
    fontFamily: fonts.LATOREGULAR,
    color: colors.WHITE,
    fontSize: moderateScale(10)
  },
  footerTimeBlack: {
    fontFamily: fonts.LATOREGULAR,
    color: colors.BLACK,
    fontSize: moderateScale(10)
  }
});
