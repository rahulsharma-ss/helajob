// Container displaying scheduled service

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  ScrollView,
  SectionList
} from "react-native";
import ModalSwiper from "react-native-modal";
import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";
import { moderateScale } from "../../../utilities/ResponsiveFonts";
import { fonts, colors } from "../../../constants/theme";
import idx from "idx";
import moment from "moment";
import styles from "../../../constants/styleSheets/home/home";
import {
  getScheduledservices,
  cancelRequest
} from "../../../actions/list/listAction";
import { serviceType } from "../../../actions/list/listAction";
import strings from "../../../constants/language";

var _ = require("lodash");

class ScheduledServices extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cancelModal: false, cardItem: null };
    this.goToStartService = _.debounce(this.goToStartService, 500);
  }

  componentDidMount = () => {
    // Requesting scheduled services
    this.props.getScheduledservices();
  };

  // Navigating to home
  goToHome = () => {
    Navigation.pop(this.props.componentId);
  };

  goToHome1 = () => {};

  // Navigating to start service
  goToStartService = item => {
    this.props.serviceType("START");
    Navigation.push(this.props.componentId, {
      component: {
        name: "StartService",
        options: {
          statusBar: {},
          topBar: {
            visible: false,
            height: 0
          },
          animations: {
            push: {
              waitForRender: true
            }
          }
        },
        passProps: {
          item
        }
      }
    });
  };

  // Job status
  status = status => {
    if (status == 0) {
      return "Pending";
    } else if (status == 1) {
      return "Confirmed";
    } else if (status == 2) {
      return "Completed";
    } else if (status == 3) {
      return "Ongoing";
    } else {
      return "Pending";
    }
  };

  // Listing scheduled services list
  scheduledServices = data => {
    const item = data;
    jobDate = moment(item.booking_date)
      .utc()
      .local()
      .format("MMM DD");
    todaysDate = moment().format("MMM DD");
    disabledIs = moment(jobDate).isAfter(todaysDate);
    return (
      <View
        key={Math.random.toString()}
        style={[
          styles.scheduledServicesScreen,
          { paddingHorizontal: moderateScale(13) }
        ]}
      >
        <View style={styles.scheduledNew}>
          <View style={[styles.jobDetails]}>
            <Text style={[styles.jobText]} numberOfLines={1}>
              {item.service.service}
            </Text>
            <View style={styles.space} />
            <Text style={[styles.username]}>
              {idx(item, _ => _.expert.fullname)}
            </Text>
            <Text style={styles.confirmText}>{this.status(item.status)}</Text>
            <View style={{ height: moderateScale(5) }} />
            <Text style={styles.jobDate}>
              {moment
                .utc(item.booking_date)
                .local()
                .format("MMM DD")}
              <Text style={[styles.jobTime, { color: "#E2E2E2" }]}> | </Text>
              <Text style={styles.jobTime}>
                {moment
                  .utc(item.booking_date)
                  .local()
                  .format("hh:mm a")}
              </Text>
            </Text>
          </View>
          <View style={[styles.jobStatus]}>
            <View style={styles.spaceTwo} />

            <View
              style={{
                height: idx(item, _ => _.status == 1)
                  ? moderateScale(40)
                  : moderateScale(0),
                paddingLeft: moderateScale(15)
              }}
            >
              {idx(item, _ => _.status == 1) ? (
                <TouchableOpacity
                  onPress={() => this.goToStartService(item, "START")}
                  style={styles.qrContainer}
                >
                  <Image
                    source={require("../../../assets/img/qrcode.png")}
                    resizeMode={"contain"}
                    style={styles.qrImage}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
            <View style={styles.cancelSchedule}>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    cancelModal: true,
                    cardItem: item ? item.id : 0
                  })
                }
                style={styles.cancelScheduleButton}
              >
                <Text
                  style={[
                    styles.confirmText,
                    { color: colors.GREY, fontFamily: fonts.LATOBOLD }
                  ]}
                >
                  {strings.dashboard.cancel1}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.spaceFive} />
      </View>
    );
  };
  render() {
    let cardId = idx(this.props, _ => _.scheduledServices.data); // Unique job Id.
    let card_Item = cardId && cardId.find(o => o.id === this.state.cardItem); // All job details.

    return (
      <SafeAreaView style={styles.safeAreaSchedule}>
        <View style={styles.goBackFromSchedule}>
          <TouchableOpacity
            onPress={this.goToHome}
            style={{
              flex: 0.15
            }}
          >
            <Image
              source={require("../../../assets/img/back.png")}
              resizeMode={"contain"}
              style={styles.backIcon}
            />
          </TouchableOpacity>

          <View style={{ flex: 0.7 }}>
            <Text style={styles.scheduledServicesHeaderTwo}>
              {strings.profile.scheduled}
            </Text>
          </View>
          <View style={{ flex: 0.15 }} />
        </View>
        {!idx(this.props, _ =>
          _.scheduledServices.data.some(o => o.status == 1 || o.status == 0)
        ) ? (
          <Text style={styles.noScheduled}>
            {strings.dashboard.noScheduled}
          </Text>
        ) : this.props.sectionData.length > 0 ? (
          <SectionList
            renderItem={({ item, index, section }) => {
              return this.scheduledServices(item);
            }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item + index}
            sections={this.props.sectionData}
            renderSectionHeader={item => {
              return (
                <Text
                  style={[
                    styles.todayText,
                    { paddingHorizontal: moderateScale(13) }
                  ]}
                >
                  {item.section.title
                    ? moment(item.section.title).calendar(null, {
                        // when the date is closer, specify custom values
                        lastWeek: "[Last] dddd",
                        lastDay: "[Yesterday]",
                        sameDay: "[Today]",
                        nextDay: "[Tomorrow]",
                        nextWeek: "DD MMM YYYY",
                        // when the date is further away, use from-now functionality
                        sameElse: "DD MMM YYYY"
                      })
                    : null}
                </Text>
              );
            }}
          />
        ) : null}

        {/* Cancel job modal. */}
        <ModalSwiper
          animationInTiming={1}
          animationOutTiming={1}
          isVisible={this.state.cancelModal}
          style={{ justifyContent: "flex-end", margin: 0 }}
          swipeDirection="down"
          onSwipeComplete={() => this.setState({ cancelModal: false })}
          hasBackdrop={true}
        >
          <TouchableOpacity
            onPress={() => this.setState({ cancelModal: false })}
            style={{ flex: 0.7 }}
          />
          <View style={styles.cancelScheduled}>
            <View style={{ flex: 1, paddingBottom: moderateScale(12) }}>
              <View style={styles.cancelAlert}>
                <Text style={styles.sureText}>
                  {idx(card_Item, _ => _.card_Item.expert.fullname)
                    ? "Cancel your job with" +
                      idx(card_Item, _ => _.card_Item.expert.fullname)
                    : "Cancel your job?"}
                </Text>
                <Text style={styles.warning}>{strings.dashboard.warn}</Text>
              </View>
              <View style={{ flex: 0.7 }}>
                <View style={styles.changeScheduledService}>
                  <View style={styles.changeServiceButtonContainer}>
                    <View style={{ flex: 0.7, justifyContent: "center" }}>
                      <Text style={styles.changeServiceButtonText}>
                        {idx(card_Item, _ => _.service.service)}{" "}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={this.goToHome1}
                      style={{ flex: 0.3, justifyContent: "center" }}
                    >
                      <Text style={styles.change1}>
                        {strings.dashboard.change}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.chengeServiceAddress}>
                  <View style={styles.changeAddressContainer}>
                    <View style={styles.addressService}>
                      <Text style={styles.newAdressService} numberOfLines={1}>
                        {idx(card_Item, _ => _.address)}{" "}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        flex: 0.3,
                        justifyContent: "center"
                      }}
                    >
                      <Text style={styles.change1}>
                        {strings.dashboard.change}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.optionButtons}>
                  <TouchableOpacity
                    onPress={() => this.setState({ cancelModal: false })}
                    style={styles.noButtonChoice}
                  >
                    <Text
                      style={{
                        fontSize: moderateScale(15),
                        fontFamily: fonts.LATOBOLD,
                        color: colors.BLUE
                      }}
                    >
                      {strings.dashboard.no}
                    </Text>
                  </TouchableOpacity>
                  <View style={{ flex: 0.04 }} />

                  <TouchableOpacity
                    onPress={() =>
                      this.setState({ cancelModal: false }, () => {
                        this.props.cancelRequest({
                          expert_id: idx(card_Item, _ => _.expert.id),
                          request_id: idx(card_Item, _ => _.id),
                          reason: "TEST",
                          user_type: 1
                        });
                      })
                    }
                    style={styles.yesButtonChoice}
                  >
                    <Text style={styles.yesButtonText}>
                      {strings.dashboard.yes}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ModalSwiper>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  let scheduledServices =
    state.userList.scheduledServices &&
    state.userList.scheduledServices.data.filter(
      item =>
        moment(item.booking_date).format("MMM DD") >=
          moment().format("MMM DD") &&
        (item.status == 1 || item.status == 0)
    );

  let sectionData = [];
  scheduledServices &&
    scheduledServices.map(item => {
      let dateAdded = sectionData.find(
        o =>
          moment(o.title).format("YYYY-MM-DD") ===
          moment(item.booking_date).format("YYYY-MM-DD")
      );
      sectionData.push({
        title: dateAdded ? null : item.booking_date,
        data: [
          {
            service: { service: item.service && item.service.service },
            expert: { fullname: item.expert && item.expert.fullname },
            status: item.status,
            booking_date: item.booking_date,
            id: item.id
          }
        ]
      });
    });

  return {
    scheduledServices: state.userList.scheduledServices,
    sectionData: sectionData
  };
}

export default connect(
  mapStateToProps,
  { getScheduledservices, cancelRequest, serviceType }
)(ScheduledServices);
