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
    paddingTop: moderateScale(20)
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
    flex: 0.9
  },
  toggleContainer: {
    flex: 0.07,
    flexDirection: "row"
  },
  spaceTwo: {
    flex: 0.05
  },
  toggleOption: {
    flex: 0.9,
    borderColor: colors.BLUE,
    borderWidth: 1,
    borderRadius: moderateScale(25),
    flexDirection: "row",
    overflow: "hidden"
  },
  spaceThree: {
    flex: 0.05
  },
  renderToggle: {
    flex: 0.93
  }
});
