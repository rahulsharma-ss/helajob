import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { moderateScale } from "../../../utilities/ResponsiveFonts";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";
import { fonts, colors } from "../../../constants/theme";
import ResolvedTicketHistory from "../../../components/resolvedTicketHistory";
import PendingTicketHistory from "../../../components/pendingTicketHistory";
import {
  listZendeskTickets,
  updateZendeskTicket
} from "../../../actions/user/TicketActions";
import idx from "idx";
import styles from "../../../constants/styleSheets/profile/ticketHistory";
import { RNToasty } from "react-native-toasty";
import _ from "lodash";
import strings from "../../../constants/language";

class TicketHistory extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: "pending",
      statusUpdateLoading: false
    };
  }

  componentDidMount() {
    this.getTickets();
  }

  getTickets = () => {
    this.props.listZendeskTickets(this.props.zenddesk_id); // Listing all zendesk tickets
  };

  // Updating ticket status
  updateTicketStatus = (item, status) => {
    this.setState({ statusUpdateLoading: true });
    let data = {
      ticket: {
        subject: item.subject,
        comment: { body: item.description },
        priority: "urgent",
        requester_id: item.requester_id,
        submitter_id: item.requester_id,
        external_id: item.requester_id,
        tags: item.tags,
        status: status
      }
    };
    let id = item.id;

    this.props.updateZendeskTicket(data, id, cb => {
      this.setState({ statusUpdateLoading: false });

      this.getTickets();
      RNToasty.Success({
        title: strings.ticketHistory.success,
        withIcon: false
      });
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              // Navigating to help center screen
              Navigation.pop(this.props.componentId);
            }}
          >
            <Icon name="ios-arrow-back" size={moderateScale(30)} />
          </TouchableOpacity>
          <View style={styles.title}>
            <Text style={styles.titleText}>{strings.ticketHistory.title}</Text>
          </View>
          <TouchableOpacity style={styles.space} />
        </View>
        <View style={styles.body}>
          <View style={styles.toggleContainer}>
            <View style={styles.spaceTwo} />
            <View style={styles.toggleOption}>
              <TouchableOpacity
                style={{
                  flex: 0.5,
                  backgroundColor:
                    this.state.selected === "pending" ? colors.BLUE : "white",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                onPress={() => this.setState({ selected: "pending" })}
              >
                <Text
                  style={{
                    fontFamily: fonts.LATOBOLD,
                    fontSize: moderateScale(17),
                    color:
                      this.state.selected === "pending" ? "white" : colors.BLUE
                  }}
                >
                  {strings.ticketHistory.pending}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 0.5,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor:
                    this.state.selected === "resolved" ? colors.BLUE : "white"
                }}
                onPress={() => this.setState({ selected: "resolved" })}
              >
                <Text
                  style={{
                    fontFamily: fonts.LATOBOLD,
                    fontSize: moderateScale(17),
                    color:
                      this.state.selected === "resolved" ? "white" : colors.BLUE
                  }}
                >
                  {strings.ticketHistory.resolved}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.spaceThree} />
          </View>
          <View style={styles.renderToggle}>
            {/* Displaying pending tickets */}
            {this.state.selected === "pending" && (
              <PendingTicketHistory
                ticketHistory={this.props.pendingTickets}
                loading={this.props.loading}
                updateTicketStatus={this.updateTicketStatus}
                getTickets={this.getTickets}
                statusUpdateLoading={this.state.statusUpdateLoading}
              />
            )}
            {/* Displaying resolved tickets */}
            {this.state.selected === "resolved" && (
              <ResolvedTicketHistory
                ticketHistory={this.props.solvedTickets}
                loading={this.props.loading}
                updateTicketStatus={this.updateTicketStatus}
                getTickets={this.getTickets}
                statusUpdateLoading={this.state.statusUpdateLoading}
              />
            )}
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  let tickets = _.get(state.tickets.ticketsHistory, "tickets");
  let solvedTickets =
    tickets &&
    tickets.length > 0 &&
    tickets.filter(item => {
      return item.status === "solved";
    });

  let pendingTickets =
    tickets &&
    tickets.length > 0 &&
    tickets.filter(item => {
      return item.status === "pending";
    });

  return {
    user_id:
      idx(state, _ => _.user.userData.data.id) ||
      idx(state, _ => _.signup.data.data.user_id),
    zenddesk_id: idx(state, _ => _.userList.userDetails.data[0].zenddesk_id),
    solvedTickets,
    pendingTickets,
    loading: state.tickets.loading
  };
}

export default connect(
  mapStateToProps,
  { listZendeskTickets, updateZendeskTicket }
)(TicketHistory);
