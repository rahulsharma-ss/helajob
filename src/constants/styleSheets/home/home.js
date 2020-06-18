import { StyleSheet, Platform } from "react-native";
import { fonts, colors } from "../../theme";
import { moderateScale } from "../../../utilities/ResponsiveFonts";

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: moderateScale(15)
  },
  header: {
    height: moderateScale(110),
    paddingHorizontal: moderateScale(13)
  },
  searchContainer: {
    height: moderateScale(40),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.8,
    borderRadius: moderateScale(20),
    borderColor: colors.DGREY,
    elevation: Platform.OS == "ios" ? 1 : 10,
    shadowOffset: {
      width: Platform.OS == "ios" ? -0.5 : -15,
      height: Platform.OS == "ios" ? -0.3 : -0.2
    },
    shadowColor: "black",
    shadowOpacity: 0.3,
    backgroundColor: "white"
  },
  searchImage: { flex: 0.1, paddingLeft: moderateScale(10) },
  textInput: { flex: 0.9 },
  locationContainer: {
    height: moderateScale(55),
    justifyContent: "flex-end"
  },
  locationText: {
    fontSize: moderateScale(15),
    color: colors.BLACK,
    fontFamily: fonts.LATOBOLD,
    textAlign: "left"
  },
  addressText: {
    fontSize: moderateScale(15),
    color: colors.DGREY,
    fontFamily: fonts.LATOREGULAR
  },
  servicesContainer: {
    // flex: 0.35
    height: moderateScale(190),

    paddingHorizontal: moderateScale(13)
  },
  services: {
    height: moderateScale(16),
    flexDirection: "row"
  },
  serviceHeader: {
    flex: 0.85,
    fontSize: moderateScale(15),
    color: colors.BLACK,
    fontFamily: fonts.LATOBOLD,
    alignSelf: "center",
    textAlign: "left"
  },
  serviceImage: {
    height: moderateScale(18),
    width: moderateScale(18),
    alignSelf: "flex-end"
  },
  serviceListing: { height: moderateScale(180), justifyContent: "center" },
  scheduledServices: { flex: 1, paddingHorizontal: moderateScale(13) },
  scheduledServicesHeader: {
    height: moderateScale(30),
    flexDirection: "row"
  },
  scheduledServicesText: {
    flex: 0.85,
    fontSize: moderateScale(15),
    color: colors.BLACK,
    fontFamily: fonts.LATOBOLD,
    alignSelf: "flex-end"
  },
  moreServices: {
    flex: 0.15,
    justifyContent: "center"
  },
  nextLogo: {
    height: moderateScale(18),
    width: moderateScale(18),
    alignSelf: "flex-end"
  },
  cardView: {
    height: moderateScale(110),
    borderBottomWidth: 0.7,
    flexDirection: "row",
    justifyContent: "center",
    borderBottomColor: colors.GREY
  },
  jobDetails: {
    flex: 0.7,
    justifyContent: "center"
  },
  jobText: {
    fontSize: moderateScale(15),
    fontFamily: fonts.LATOMEDIUM,
    color: colors.BLUE
  },

  space: { height: moderateScale(5) },
  username: {
    fontSize: moderateScale(15),
    fontFamily: fonts.LATOREGULAR,
    color: colors.GREY
  },
  jobDate: {
    fontSize: moderateScale(15),
    fontFamily: fonts.LATOREGULAR,
    color: colors.GREY
  },
  jobTime: {
    fontSize: moderateScale(15),
    fontFamily: fonts.LATOREGULAR,
    color: colors.GREY
  },
  spaceTwo: { height: moderateScale(5) },
  jobStatus: {
    flex: 0.3,
    justifyContent: "center"
  },

  confirmContainer: {
    borderWidth: 0.5,
    borderRadius: moderateScale(200),
    alignItems: "center",
    justifyContent: "center",
    width: moderateScale(85),

    paddingBottom: moderateScale(1)
  },
  confirmText: {
    fontSize: moderateScale(15),
    fontFamily: fonts.LATOREGULAR,
    color: colors.GREY
  },
  qrContainer: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center"
  },
  qrImage: {
    height: moderateScale(35),
    width: moderateScale(35),
    alignSelf: "center"
  },
  allServices: {
    height: moderateScale(180),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  servicesView: {
    width: moderateScale(135),
    height: moderateScale(135),
    borderRadius: moderateScale(10),
    overflow: "hidden",
    justifyContent: "flex-end",
    backgroundColor: "#cfe6ff",
    borderWidth: 0.8,
    borderColor: "#82ADE5"
  },
  serviceImageContainer: {
    flex: 0.65,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: moderateScale(20)
  },
  serviceLogo: {
    height: moderateScale(75),
    width: moderateScale(75),
    alignSelf: "center"
  },
  serviceTitle: {
    flex: 0.35,
    justifyContent: "center",
    alignItems: "center"
  },
  serviceTitleText: {
    fontFamily: fonts.LATOMEDIUM,
    fontSize: moderateScale(14),
    textAlign: "center",
    color: colors.BLUE
  },
  spaceThree: { height: moderateScale(15), width: moderateScale(15) },
  loader: { alignSelf: "center" },
  nextImageContainer: {
    flex: 0.15,
    justifyContent: "center"
  },
  scheduledServicesContainer: {
    height: moderateScale(110)
  },
  scheduledServicesChild: {
    flex: 0.95,
    flexDirection: "row",
    borderWidth: 0.7,
    paddingHorizontal: moderateScale(10),
    borderColor: colors.GREY,
    justifyContent: "center",
    borderRadius: moderateScale(5)
  },
  cancelContainer: {
    height: moderateScale(40),
    alignItems: "flex-end",
    paddingTop: moderateScale(10)
  },
  cancelButton: {
    borderWidth: 0.5,
    borderRadius: moderateScale(200),
    alignItems: "center",
    justifyContent: "center",
    width: moderateScale(85)
  },
  safeArea: {
    flex: 1
  },
  headerContainer: {
    height: moderateScale(50),
    flexDirection: "row",
    paddingHorizontal: moderateScale(10),
    paddingTop: moderateScale(20)
  },
  backButton: {
    flex: 0.15
  },
  backImage: {
    height: moderateScale(25),
    width: moderateScale(25),
    alignSelf: "flex-start"
  },
  headerText: {
    fontSize: moderateScale(18),
    textAlign: "center",
    fontFamily: fonts.LATOBOLD
  },
  noServiceText: {
    fontSize: moderateScale(15),
    fontFamily: fonts.LATOBOLD,
    color: colors.GREY,
    textAlign: "center",
    paddingTop: moderateScale(270)
  },
  scrollView: {
    flex: 0.95,
    paddingHorizontal: moderateScale(10)
  },
  today: {
    fontSize: moderateScale(25),
    fontFamily: fonts.LATOMEDIUM,
    paddingBottom: moderateScale(10)
  },
  thisWeek: {
    fontSize: moderateScale(25),
    fontFamily: fonts.LATOMEDIUM,
    paddingBottom: moderateScale(10)
  },
  cancelRequest: {
    height: moderateScale(250),
    paddingHorizontal: moderateScale(10),
    backgroundColor: "white"
  },
  cancelRequestHeader: {
    flex: 0.3,
    borderBottomColor: colors.GREY,
    borderBottomWidth: 0.2,
    paddingTop: moderateScale(10)
  },
  cancelRequestInfo2: {
    fontSize: moderateScale(12),
    fontFamily: fonts.LATOMEDIUM,
    color: colors.BLACK,
    textAlign: "center"
  },
  cancelRequestInfo1: {
    fontSize: moderateScale(18),
    fontFamily: fonts.LATOBOLD,
    color: colors.BLACK,
    textAlign: "center"
  },
  addressChange: {
    flex: 0.35,
    borderBottomColor: colors.GREY,
    borderBottomWidth: 0.2
  },
  addressButtonContainer: {
    flex: 0.5,
    flexDirection: "row",
    paddingTop: moderateScale(15)
  },
  serviceText: {
    fontSize: moderateScale(14),
    fontFamily: fonts.LATOMEDIUM,
    color: colors.GREY
  },
  changeService: {
    fontSize: moderateScale(15),
    fontFamily: fonts.LATOMEDIUM,
    color: colors.BLUE,
    textAlign: "right"
  },
  options: {
    flex: 0.3,
    flexDirection: "row",
    paddingVertical: moderateScale(10)
  },
  noOption: {
    flex: 0.48,
    backgroundColor: colors.WHITE,
    borderRadius: moderateScale(5),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.7,
    borderColor: colors.BLUE
  },
  noText: {
    fontSize: moderateScale(15),
    fontFamily: fonts.LATOBOLD,
    color: colors.BLUE
  },
  yesOption: {
    flex: 0.48,
    backgroundColor: colors.BLUE,
    borderRadius: moderateScale(5),

    justifyContent: "center",
    alignItems: "center"
  },
  yesText: {
    fontSize: moderateScale(15),
    fontFamily: fonts.LATOBOLD,
    color: colors.WHITE
  },
  changeContainer: {
    flex: 0.35,
    borderBottomColor: colors.GREY,
    borderBottomWidth: 0.2
  },
  changeJob: {
    flex: 0.5,
    flexDirection: "row",
    paddingTop: moderateScale(15)
  },
  changeJobContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
  newAddress: {
    fontSize: moderateScale(14),
    fontFamily: fonts.LATOMEDIUM,
    color: colors.GREY
  },
  changeAddress: {
    fontSize: moderateScale(15),
    fontFamily: fonts.LATOMEDIUM,
    color: colors.BLUE,
    textAlign: "right"
  },
  scheduledStatus: {
    height: moderateScale(40),
    alignItems: "flex-end"
  },
  scheduledQr: {
    height: moderateScale(40),
    paddingLeft: moderateScale(15)
  },
  noService: {
    fontFamily: fonts.LATOBOLD,
    fontSize: moderateScale(13)
  },
  onGoingContainer: {
    flex: 0.5,
    paddingHorizontal: moderateScale(13)
  },
  onGoing: {
    flex: 0.2
  },
  onGoingList: {
    flex: 0.8,
    justifyContent: "center"
  },
  onGoingText: {
    fontFamily: fonts.LATOREGULAR,
    color: colors.GREY,
    fontSize: moderateScale(12),
    textAlign: "right"
  },
  seperator: {
    fontFamily: fonts.LATOREGULAR,
    color: "#E2E2E2",
    fontSize: moderateScale(12)
  },
  moreOption: {
    height: moderateScale(40),
    justifyContent: "center",
    alignItems: "flex-end"
  },
  moreButton: {
    height: moderateScale(30),
    width: moderateScale(70),
    borderRadius: moderateScale(100),
    backgroundColor: colors.BLUE,
    justifyContent: "center",
    alignItems: "center"
  },
  moreText: {
    fontFamily: fonts.LATOBOLD,
    color: colors.WHITE
  },
  noOnGoingText: {
    fontFamily: fonts.LATOBOLD,
    fontSize: moderateScale(15),
    textAlign: "center"
  },
  emergencyContainer: {
    flex: 1,
    backgroundColor: "#0009"
  },
  spaceFour: {
    flex: 1,
    backgroundColor: "transparent"
  },
  emergencyChild: {
    height: moderateScale(250),
    backgroundColor: "white",
    paddingHorizontal: moderateScale(13)
  },
  emergencyInfo: {
    flex: 0.8,
    justifyContent: "space-evenly"
  },
  emergencyHeader: {
    fontFamily: fonts.LATOBOLD,
    color: colors.RED,
    fontSize: moderateScale(15)
  },
  contactNameHeader: {
    fontFamily: fonts.LATOBOLD,
    color: colors.BLUE,
    fontSize: moderateScale(15)
  },
  contactName: {
    fontFamily: fonts.LATOBOLD,
    color: colors.GREY,
    fontSize: moderateScale(15)
  },
  relationHeader: {
    fontFamily: fonts.LATOBOLD,
    color: colors.BLUE,
    fontSize: moderateScale(15)
  },
  relation: {
    fontFamily: fonts.LATOBOLD,
    color: colors.GREY,
    fontSize: moderateScale(15)
  },
  emergencyButton: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: moderateScale(18)
  },
  backButtonEmergency: {
    height: moderateScale(45),
    width: moderateScale(160),
    borderColor: colors.BLACK,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(3),
    alignItems: "center",
    justifyContent: "center"
  },
  buttonBackText: {
    color: colors.BLACK,
    fontFamily: fonts.LATOBOLD,
    fontSize: moderateScale(17)
  },
  callButton: {
    height: moderateScale(45),
    width: moderateScale(160),
    backgroundColor: colors.RED,
    borderRadius: moderateScale(3),
    alignItems: "center",
    justifyContent: "center"
  },
  callText: {
    color: "#FFFFFF",
    fontFamily: fonts.LATOBOLD,
    fontSize: moderateScale(17)
  },
  searchingNew: {
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.5,
    position: "absolute",
    bottom: 0,
    width: moderateScale(380),
    alignSelf: "center"
  },
  searchingText: {
    fontSize: moderateScale(17),
    textAlign: "center",
    fontFamily: fonts.LATOBOLD,
    paddingTop: moderateScale(10)
  },
  searchingInfo: {
    fontSize: moderateScale(13),
    textAlign: "center",
    fontFamily: fonts.LATOBOLD,
    paddingTop: moderateScale(15)
  },
  scheduledServicesScreen: {
    height: moderateScale(110),
    backgroundColor: "white"
  },
  scheduledNew: {
    flex: 0.95,
    flexDirection: "row",
    borderWidth: 0.7,
    paddingHorizontal: moderateScale(10),
    borderColor: colors.GREY,
    justifyContent: "center",
    borderRadius: moderateScale(5),
    paddingVertical: moderateScale(20)
  },
  cancelSchedule: {
    height: moderateScale(40),
    alignItems: "flex-end",
    paddingTop: moderateScale(10)
  },
  cancelScheduleButton: {
    borderWidth: 0.5,
    borderRadius: moderateScale(200),
    alignItems: "center",
    justifyContent: "center",
    width: moderateScale(85)
  },
  spaceFive: {
    flex: 0.05
  },
  safeAreaSchedule: {
    flex: 1,
    paddingTop: Platform.OS == "ios" ? moderateScale(5) : moderateScale(30)
  },
  goBackFromSchedule: {
    height: moderateScale(50),
    flexDirection: "row",
    paddingHorizontal: moderateScale(10),
    paddingTop: moderateScale(20)
  },
  backIcon: {
    height: moderateScale(20),
    width: moderateScale(20),
    alignSelf: "flex-start"
  },
  scheduledServicesHeaderTwo: {
    fontSize: moderateScale(18),
    textAlign: "center",
    fontFamily: fonts.LATOBOLD
  },
  noScheduled: {
    fontSize: moderateScale(15),
    fontFamily: fonts.LATOBOLD,
    color: colors.GREY,
    textAlign: "center",
    paddingTop: moderateScale(270)
  },
  scroll: {
    flex: 0.95,
    paddingHorizontal: moderateScale(10)
  },
  todayText: {
    fontSize: moderateScale(25),
    fontFamily: fonts.LATOMEDIUM,
    paddingBottom: moderateScale(10)
  },
  weekText: {
    fontSize: moderateScale(25),
    fontFamily: fonts.LATOMEDIUM,
    paddingBottom: moderateScale(10)
  },
  cancelScheduled: {
    height: moderateScale(250),
    paddingHorizontal: moderateScale(10),
    backgroundColor: "white"
  },
  cancelAlert: {
    flex: 0.3,
    borderBottomColor: colors.GREY,
    borderBottomWidth: 0.2,
    paddingTop: moderateScale(10)
  },
  sureText: {
    fontSize: moderateScale(18),
    fontFamily: fonts.LATOBOLD,
    color: colors.BLACK,
    textAlign: "center"
  },
  warning: {
    fontSize: moderateScale(12),
    fontFamily: fonts.LATOMEDIUM,
    color: colors.BLACK,
    textAlign: "center"
  },
  changeScheduledService: {
    flex: 0.35,
    borderBottomColor: colors.GREY,
    borderBottomWidth: 0.2
  },
  changeServiceButtonContainer: {
    flex: 0.5,
    flexDirection: "row",
    paddingTop: moderateScale(15)
  },
  changeServiceButtonText: {
    fontSize: moderateScale(14),
    fontFamily: fonts.LATOMEDIUM,
    color: colors.GREY
  },
  change1: {
    fontSize: moderateScale(15),
    fontFamily: fonts.LATOMEDIUM,
    color: colors.BLUE,
    textAlign: "right"
  },
  chengeServiceAddress: {
    flex: 0.35,
    borderBottomColor: colors.GREY,
    borderBottomWidth: 0.2
  },
  changeAddressContainer: {
    flex: 0.5,
    flexDirection: "row",
    paddingTop: moderateScale(15)
  },
  addressService: {
    flex: 0.7,
    justifyContent: "center"
  },
  newAdressService: {
    fontSize: moderateScale(14),
    fontFamily: fonts.LATOMEDIUM,
    color: colors.GREY
  },
  optionButtons: {
    flex: 0.3,
    flexDirection: "row",
    paddingVertical: moderateScale(10)
  },
  noButtonChoice: {
    flex: 0.48,
    backgroundColor: colors.WHITE,
    borderRadius: moderateScale(5),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.7,
    borderColor: colors.BLUE
  },
  yesButtonChoice: {
    flex: 0.48,
    backgroundColor: colors.BLUE,
    borderRadius: moderateScale(5),
    justifyContent: "center",
    alignItems: "center"
  },
  yesButtonText: {
    fontSize: moderateScale(15),
    fontFamily: fonts.LATOBOLD,
    color: colors.WHITE
  }
});
