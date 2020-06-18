// Add component for viewing and starting new services

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
import { cancelRequest } from "../../../actions/list/listAction";
import { serviceType } from "../../../actions/list/listAction";
import strings from "../../../constants/language";

var _ = require("lodash");

class ScheduledServices extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cancelModal: false, cardItem: null };
    this.goToStartService = _.debounce(this.goToStartService, 500);
  }

  // Navigating to home
  goToHome = () => {
    Navigation.pop(this.props.componentId);
  };

  // Service satatus
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

  // Navigating to Start service screen
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

  // Scheduled services listing
  scheduledServices = data => {
    const item = data;
    jobDate = moment(item.booking_date)
      .utc()
      .local()
      .format("MMM DD"); // Job date
    todaysDate = moment().format("MMM DD"); // Todays date
    disabledIs = moment(jobDate).isAfter(todaysDate); // Disabled toggler

    return (
      <View
        key={Math.random.toString()} // Generating key for view
        style={[
          styles.scheduledServicesContainer,
          { paddingHorizontal: moderateScale(13) }
        ]}
      >
        <View style={styles.scheduledServicesChild}>
          <View style={styles.jobDetails}>
            <Text style={styles.jobText} numberOfLines={1}>
              {item.service.service}
            </Text>
            <View style={styles.space} />
            <Text style={styles.username}>
              {idx(item, _ => _.expert.fullname)}
            </Text>
            <Text style={styles.confirmText}>{this.status(item.status)}</Text>
            <View style={{ height: moderateScale(8) }} />
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
                  onPress={() => this.goToStartService(item)}
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
            <View style={styles.cancelContainer}>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    cancelModal: true,
                    cardItem: item ? item.id : 0
                  })
                }
                style={styles.cancelButton}
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
        <View style={{ flex: 0.05 }} />
      </View>
    );
  };

  render() {
    let cardId =
      this.props.scheduledServices && this.props.scheduledServices.data; // Job id
    let card_Item = cardId && cardId.find(o => o.id === this.state.cardItem); // Job details
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={this.props.goToHome}
            style={styles.backButton}
          >
            <Image
              source={require("../../../assets/img/back.png")}
              resizeMode={"contain"}
              style={styles.backImage}
            />
          </TouchableOpacity>

          <View style={{ flex: 0.7 }}>
            <Text style={styles.headerText}>{strings.profile.scheduled}</Text>
          </View>
          <View style={{ flex: 0.15 }} />
        </View>
        {!idx(this.props, _ =>
          _.scheduledServices.data.some(o => o.status == 1 || o.status == 0)
        ) ? (
          <Text style={styles.noServiceText}>
            {strings.dashboard.noScheduled}
          </Text>
        ) : this.props.sectionData.length > 0 ? (
          <SectionList
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index, section }) => {
              return this.scheduledServices(item);
            }}
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
        {/* Cancel job popup. */}
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
          <View style={styles.cancelRequest}>
            <View
              style={{
                flex: 1,
                paddingBottom: moderateScale(12)
              }}
            >
              <View style={styles.cancelRequestHeader}>
                <Text style={styles.cancelRequestInfo1}>
                  {strings.add.cancel}{" "}
                  {idx(card_Item, _ => _.card_Item.expert.fullname)}
                </Text>
                <Text style={styles.cancelRequestInfo2}>
                  {strings.dashboard.warn}
                </Text>
              </View>
              <View style={{ flex: 0.7 }}>
                <View style={styles.addressChange}>
                  <View style={styles.addressButtonContainer}>
                    <View style={{ flex: 0.7, justifyContent: "center" }}>
                      <Text style={styles.serviceText}>
                        {idx(card_Item, _ => _.service.service)}{" "}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{ flex: 0.3, justifyContent: "center" }}
                    >
                      <Text style={styles.changeService}>
                        {strings.dashboard.change}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.changeContainer}>
                  <View style={styles.changeJob}>
                    <View style={styles.changeJobContainer}>
                      <Text style={styles.newAddress} numberOfLines={1}>
                        {idx(card_Item, _ => _.address)}{" "}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        flex: 0.3,
                        justifyContent: "center"
                      }}
                    >
                      <Text style={styles.changeAddress}>
                        {strings.dashboard.change}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.options}>
                  <TouchableOpacity
                    onPress={() => this.setState({ cancelModal: false })}
                    style={styles.noOption}
                  >
                    <Text style={styles.noText}>{strings.dashboard.no}</Text>
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
                    style={styles.yesOption}
                  >
                    <Text style={styles.yesText}>{strings.dashboard.yes}</Text>
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
  { cancelRequest, serviceType }
)(ScheduledServices);
