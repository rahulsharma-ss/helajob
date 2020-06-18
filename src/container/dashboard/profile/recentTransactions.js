// Container to display recent transactions

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SectionList,
  ActivityIndicator
} from "react-native";
import { moderateScale } from "../../../utilities/ResponsiveFonts";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";
import { fonts, colors } from "../../../constants/theme";
import { listRecentTransactions } from "../../../actions/list/listAction";
import moment from "moment";
import styles from "../../../constants/styleSheets/profile/recentTransactions";
import strings from "../../../constants/language";

class RecentTransactions extends React.Component {
  constructor() {
    super();
    this.state = { showFilter: false };
  }

  componentDidMount() {
    this.props.listRecentTransactions(); // Request recent transactions
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              // Navigate to Payment screen
              Navigation.pop(this.props.componentId);
            }}
          >
            <Icon name="ios-arrow-back" size={moderateScale(30)} />
          </TouchableOpacity>
          <View style={styles.title}>
            <Text
              style={{
                fontSize: moderateScale(18),
                textAlign: "center",
                fontFamily: fonts.LATOBOLD,
                color: colors.BLACK
              }}
            >
              {strings.payment.recent}
            </Text>
          </View>
          <TouchableOpacity style={styles.space} />
        </View>
        <View style={styles.body}>
          {this.props.loading ? (
            <View style={styles.loader}>
              <ActivityIndicator color={colors.PRIMARY} size={"large"} />
            </View>
          ) : this.props.recentTransactions.length > 0 ? (
            <SectionList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.sectionList}
              renderItem={({ item, index, section }) => {
                return (
                  <View style={styles.ticketBody}>
                    <View style={styles.ticketHeader}>
                      <View style={{ flex: 0.7 }}>
                        <Text style={styles.paidForText}>
                          {strings.payment.paid}{" "}
                          {(item.service && item.service.service) || ""}
                        </Text>
                      </View>
                      <View style={styles.subTotal}>
                        <Text style={styles.subTotalText}>
                          £{item.sub_total}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.createdAt}>
                      {moment
                        .utc(item.created_at)
                        .local()
                        .format("hh:mm A")}{" "}
                      |{" "}
                      <Text style={styles.closingBalance}>
                        {strings.payment.closing}: £
                        {item.customer_closing_balance || 0}
                      </Text>
                    </Text>
                    <View style={styles.ticketFooter}>
                      <View style={{ flex: 0.7 }}>
                        <Text style={styles.referenceNo}>
                          {strings.expandHistory.referenceNo} : #
                          {item.ref_number || "21568756"}
                        </Text>
                      </View>
                      <View style={styles.report}>
                        <TouchableOpacity
                          onPress={() => {
                            // Navigating to support ticket screen
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
                                  referenceNumber: item.ref_number,
                                  expertId: item.expert_id
                                }
                              }
                            });
                          }}
                          style={styles.reportButton}
                        >
                          <Text style={styles.reportText}>
                            {strings.expandHistory.report}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              }}
              renderSectionHeader={item => {
                return (
                  <Text style={styles.listing}>
                    {item.section.title
                      ? moment(item.section.title).calendar(null, {
                          // when the date is closer, specify custom values
                          lastWeek: "[Last] dddd",
                          lastDay: "[Yesterday]",
                          sameDay: "[Today]",
                          nextDay: "[Tomorrow]",
                          nextWeek: "dddd",
                          // when the date is further away, use from-now functionality
                          sameElse: "DD MMM YYYY"
                        })
                      : null}
                  </Text>
                );
              }}
              sections={this.props.recentTransactions || []}
              keyExtractor={(item, index) => item + index}
            />
          ) : (
            <Text style={styles.noTransactionText}>No recent transactions</Text>
          )}
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    recentTransactions: state.userList.recentTransactions
  };
}

export default connect(
  mapStateToProps,
  {
    listRecentTransactions
  }
)(RecentTransactions);
