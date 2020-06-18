// Component rendered to display resolved ticket

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  FlatList,
  RefreshControl
} from "react-native";
import { moderateScale } from "../utilities/ResponsiveFonts";
import { fonts, colors } from "../constants/theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import moment from "moment";
import strings from "../constants/language";

export default class ResolvedTicketHistory extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  jsUcfirst = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Render tickets
  renderTickets = item => {
    let data = item.item;
    let index = item.index;
    return (
      <View
        style={{
          marginVertical: moderateScale(10),
          borderWidth: 1,
          borderColor: "#E9E9E9",
          borderRadius: moderateScale(5)
        }}
        key={index}
      >
        <Text
          style={{
            margin: moderateScale(10),
            fontSize: moderateScale(17),
            fontFamily: fonts.LATOBOLD,
            color: "#3E3E3E"
          }}
        >
          {data.subject}
        </Text>
        <Text
          style={{
            marginHorizontal: moderateScale(10),
            fontSize: moderateScale(14),
            fontFamily: fonts.LATOREGULAR,
            color: "#888888"
          }}
        >
          {data.description}
        </Text>
        <Text
          style={{
            marginTop: moderateScale(10),
            marginHorizontal: moderateScale(10),
            fontSize: moderateScale(14),
            fontFamily: fonts.LATOBOLD,
            color: "#40D15D"
          }}
        >
          {this.jsUcfirst(data.status)}
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: moderateScale(3),
            marginHorizontal: moderateScale(10),
            marginBottom: moderateScale(10)
          }}
        >
          <View
            style={{ flex: 0.4, flexDirection: "row", alignItems: "center" }}
          >
            <Text
              style={{
                fontSize: moderateScale(14),
                fontFamily: fonts.LATOREGULAR,
                color: "#888888"
              }}
            >
              {moment(data.updated_at).format("MMM DD")}
            </Text>
            <Text
              style={{
                fontSize: moderateScale(12),
                fontFamily: fonts.LATOREGULAR,
                color: "#888888"
              }}
            >
              {" | "}
            </Text>
            <Text
              style={{
                fontSize: moderateScale(14),
                fontFamily: fonts.LATOREGULAR,
                color: "#888888"
              }}
            >
              {moment(data.updated_at).format("hh:mm a")}
            </Text>
          </View>

          <View
            style={{
              flex: 0.6,
              flexDirection: "row",
              justifyContent: "flex-end"
            }}
          >
            <TouchableOpacity
              style={{
                paddingVertical: moderateScale(3),
                paddingHorizontal: moderateScale(6),
                backgroundColor: colors.BLUE,
                borderWidth: 1,
                borderColor: colors.BLUE,
                borderRadius: moderateScale(13)
              }}
              onPress={() => {
                this.props.updateTicketStatus(data, "pending");
              }}
            >
              <Text
                style={{
                  fontSize: moderateScale(14),
                  fontFamily: fonts.LATOBOLD,
                  color: "white",
                  padding: moderateScale(3)
                }}
              >
                {strings.ticketHistory.reopen}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  render() {
    let data = this.props.ticketHistory;

    return this.props.loading || this.props.statusUpdateLoading ? (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} color={colors.BLUE} />
      </View>
    ) : (
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: moderateScale(20)
        }}
        keyboardShouldPersistTaps={"never"}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        innerRef={ref => {
          this.scroll = ref;
        }}
      >
        {data && data.length > 0 ? (
          <FlatList
            data={data}
            renderItem={item => {
              return this.renderTickets(item);
            }}
            refreshControl={
              <RefreshControl onRefresh={this.props.getTickets} />
            }
          />
        ) : (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text
              style={{
                color: colors.BASEBLACK,
                fontFamily: fonts.LATOBOLD,
                fontSize: moderateScale(18)
              }}
            >
              {strings.ticketHistory.no2}
            </Text>
          </View>
        )}
      </KeyboardAwareScrollView>
    );
  }
}
