// Component to display extended view of job history

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Platform
} from "react-native";
import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";
import { listExpertHistoryForCustomer } from "../../../actions/list/listAction";
import idx from "idx";
import moment from "moment";
import styles from "../../../constants/styleSheets/history/expandHistory";
import { moderateScale } from "../../../utilities/ResponsiveFonts";
import { colors, fonts } from "../../../constants/theme";

var _ = require("lodash");
import strings from "../../../constants/language";

class ExpandHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.reportService = _.debounce(this.reportService, 300);
  }

  componentDidMount = () => {
    // Listing expert job history
    this.props.listExpertHistoryForCustomer(
      this.props.selectedHistory && this.props.selectedHistory.expert_id,
      this.props.selectedHistory && this.props.selectedHistory.id
    );
  };

  // Navigationg to dashboard
  goBack = () => {
    Navigation.pop(this.props.componentId);
  };

  reportService = () => {
    let history = idx(this.props, _ => _.selectedHistory); //Job details foor a job
    let jobId = idx(this.props, _ => _.selectedHistory.id);
    Navigation.push(this.props.componentId, {
      component: {
        name: "SupportTicket",
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
          referenceNumber: history.ref_number, // Reference number for a job
          jobId
        }
      }
    });
  };

  render() {
    let history = idx(this.props, _ => _.selectedHistory);
    let totalJobTime = idx(history, _ => _.service_payment.job_duration);
    return (
      <SafeAreaView
        style={[
          styles.safeView,
          {
            paddingTop:
              Platform.OS === "android" ? moderateScale(30) : moderateScale(10)
          }
        ]}
      >
        <View style={styles.container}>
          <TouchableOpacity onPress={this.goBack} style={styles.backButton}>
            <Image
              source={require("../../../assets/img/back.png")}
              resizeMode={"contain"}
              style={styles.backImage}
            />
          </TouchableOpacity>
          <View style={{ flex: 0.8 }}>
            <Text style={styles.expertName}>
              {idx(history, _ => _.expert.fullname)}{" "}
            </Text>
          </View>
          <View style={styles.space} />
        </View>
        <View style={styles.body}>
          <View style={styles.jobInfoContainer}>
            <View style={styles.jobInfo}>
              <Text style={styles.expertFullName}>
                {idx(history, _ => _.expert.fullname)}{" "}
              </Text>
              <Text style={styles.service}>
                {idx(history, _ => _.service.service)}{" "}
              </Text>
            </View>
            <View style={styles.jobInfoTwo}>
              <Text style={styles.totalTime}>
                {strings.expandHistory.totalTime}{" "}
              </Text>
              <Text style={styles.totalHours}>
                {totalJobTime < 4
                  ? `${strings.startService.policy}`
                  : `${totalJobTime} ${strings.startService.hours}`}
              </Text>
            </View>
          </View>
          <View style={styles.seperator} />
          <View style={styles.jobInfoThree}>
            <View
              style={{
                flex: 0.33,
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Text style={styles.startTime}>
                {strings.expandHistory.startTime}{" "}
              </Text>
              <Text style={styles.startTimeText}>
                {" "}
                {moment
                  .utc(idx(history, _ => _.service_start_time))
                  .local()
                  .format("hh:mm a")}
              </Text>
            </View>
            <View
              style={{
                flex: 0.33,
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontSize: moderateScale(13),
                  fontFamily: fonts.LATOMEDIUM,
                  color: colors.GREY,
                  fontWeight: "600"
                }}
              >
                {strings.expandHistory.break}{" "}
              </Text>
              <Text style={styles.breakTimeText}>
                {" "}
                {Number(idx(history, _ => _.break_duration / 60)) < 60
                  ? Number(
                      idx(history, _ => _.break_duration / 60).toFixed(2)
                    ) + "mins"
                  : Number(
                      idx(history, _ => _.break_duration / 60).toFixed(2)
                    ) + "hrs"}
              </Text>
            </View>
            <View
              style={{
                flex: 0.33,
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Text style={styles.finishTime}>
                {strings.expandHistory.finishTime}{" "}
              </Text>
              <Text style={styles.finishTimeText}>
                {" "}
                {moment
                  .utc(idx(history, _ => _.service_end_time))
                  .local()
                  .format("hh:mm a")}
              </Text>
            </View>
          </View>
          <View style={styles.seperator} />
          <View style={styles.jobInfoFour}>
            <View style={styles.jobInfoHeader}>
              <Text style={styles.subTotal}>
                {" "}
                {strings.expandHistory.subTotal}{" "}
              </Text>
              <Text style={styles.serviceFee}>
                {" "}
                {strings.expandHistory.serviceFee}{" "}
              </Text>
              <Text style={styles.total}>{strings.expandHistory.total}</Text>
            </View>
            <View style={styles.details}>
              <Text
                style={{
                  fontSize: moderateScale(13),
                  color: colors.DGREY,
                  fontWeight: "600",
                  fontStyle: "italic"
                }}
              >
                £{idx(history, _ => _.service_payment.sub_total) || 0}{" "}
              </Text>
              <Text style={styles.serviceFeeText}>
                £{idx(history, _ => _.service_payment.service_fee) || 0}{" "}
              </Text>
              <View style={styles.totalPriceContainer}>
                <Text style={styles.totalPriceText}>
                  £{idx(history, _ => _.service_payment.total_price) || 0}{" "}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.otherInfoContainer}>
            <View style={{ flex: 0.2, alignItems: "flex-start" }}>
              <Text style={styles.otherInfoText}>
                {strings.expandHistory.otherInfo}{" "}
              </Text>
            </View>
            <View style={styles.referenceNumberContainer}>
              <Text style={styles.referenceNumberText}>
                {" "}
                {strings.expandHistory.referenceNo}{" "}
              </Text>
              <Text style={styles.referenceId}>
                #{idx(history, _ => _.ref_number)}{" "}
              </Text>
            </View>
          </View>
          <View style={{ flex: 0.4 }}>
            <View style={styles.feedbackContainer}>
              <View
                style={{
                  flex: 0.2
                  // justifyContent: "flex-end",
                  // alignItems: "flex-end"
                }}
              >
                <Text style={styles.feedbackText}>
                  {strings.dashboard.feedback}
                </Text>
              </View>
              <View style={{ flex: 0.8 }}>
                <Image
                  source={require("../../../assets/img/thumbUp.png")}
                  resizeMode={"contain"}
                  style={styles.thumbsUp}
                />
              </View>
            </View>
            {idx(history, _ => _.service_feedback.description) ? (
              <View style={{ flex: 0.8 }}>
                <Text style={styles.descriptionText}>
                  {history.service_feedback.description}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  flex: 0.8,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text style={styles.noFeedback}>
                  No feedback comment has been written
                </Text>
              </View>
            )}
          </View>

          <View style={styles.reportButtonContainer}>
            <TouchableOpacity
              onPress={this.reportService}
              style={styles.reportButton}
            >
              <Text style={styles.reportText}>
                {strings.expandHistory.report}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    singleHistory: state.userList.expertHistory
  };
}

export default connect(
  mapStateToProps,
  { listExpertHistoryForCustomer }
)(ExpandHistory);
