// Modal opened to perform various operation on an ongoing job

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { moderateScale } from "../utilities/ResponsiveFonts";
import { colors, fonts } from "../constants/theme";
import CIcon from "react-native-vector-icons/AntDesign";
import moment from "moment";
import ServiceTimer from "../components/serviceTimer";
import strings from "../constants/language";

export default class OngoingJobModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let data = this.props.data;
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{ flex: 0.45, backgroundColor: "rgba(0,0,0,0.4)" }}
          onPress={() => {
            this.props.closeOngoingJobModal();
          }}
        />
        <View
          style={{
            flex: 0.65,
            backgroundColor: "white",
            paddingHorizontal: moderateScale(20)
          }}
        >
          <View
            style={{
              flex: 0.15,
              flexDirection: "row"
            }}
          >
            <View style={{ flex: 0.6, justifyContent: "center" }}>
              <Text
                style={{
                  color: "#000000",
                  fontFamily: fonts.LATOBOLD,
                  fontSize: moderateScale(16)
                }}
              >
                {strings.home.onGoingService}
              </Text>
            </View>
            <View
              style={{
                flex: 0.4,
                justifyContent: "center",
                alignItems: "flex-end"
              }}
            >
              <View
                style={{
                  borderColor: "#F85C5C",
                  borderWidth: moderateScale(1),
                  paddingHorizontal: moderateScale(12),
                  paddingVertical: moderateScale(5),
                  borderRadius: moderateScale(19)
                }}
              >
                <ServiceTimer
                  serviceStartTime={data.service_start_time}
                  startTimer={
                    data.service_start_time && !data.service_end_time ? 1 : 0
                  }
                  endTimer={data.service_end_time ? 1 : 0}
                  breakStart={data.break_start}
                  breakEnd={data.break_end}
                  breakDuration={data.break_duration || 0}
                  style={{
                    color: "#F85C5C",
                    fontFamily: fonts.LATOMEDIUM,
                    fontSize: moderateScale(15)
                  }}
                />
              </View>
            </View>
          </View>
          <View style={{ flex: 0.1, flexDirection: "row" }}>
            <View
              style={{
                flex: 0.6,
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  color: "#1F5BA8",
                  fontFamily: fonts.LATOBOLD,
                  fontSize: moderateScale(15)
                }}
              >
                {data.expert && data.expert.fullname}
              </Text>
            </View>
            <TouchableOpacity
              onPress={this.props.chat}
              style={{
                flex: 0.4,
                justifyContent: "center",
                alignItems: "flex-end"
              }}
            >
              <CIcon name="message1" size={moderateScale(25)} color="#1F5BA8" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 0.05,
              flexDirection: "row"
            }}
          >
            <View
              style={{
                flex: 0.8,
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  color: "#888888",
                  fontFamily: fonts.LATOREGULAR,
                  fontSize: moderateScale(14)
                }}
              >
                {data.service && data.service.service_parent[0].service} >{" "}
                {data.service && data.service.service}
              </Text>
            </View>
            <View
              style={{
                flex: 0.2,
                justifyContent: "center",
                alignItems: "flex-end"
              }}
            >
              <Text
                style={{
                  color: "#3E3E3E",
                  fontFamily: fonts.LATOBOLD,
                  fontSize: moderateScale(14)
                }}
              >
                £{data.service && data.service.price}
              </Text>
            </View>
          </View>
          <View style={{ flex: 0.1, flexDirection: "row" }}>
            <View style={{ flex: 0.6, justifyContent: "center" }}>
              <Text
                style={{
                  color: "#888888",
                  fontFamily: fonts.LATOREGULAR,
                  fontSize: moderateScale(14)
                }}
              >
                {strings.expandHistory.startTime}
              </Text>
            </View>
            <View
              style={{
                flex: 0.4,
                justifyContent: "center",
                alignItems: "flex-end"
              }}
            >
              <Text
                style={{
                  color: "#3E3E3E",
                  fontFamily: fonts.LATOBOLD,
                  fontSize: moderateScale(14)
                }}
              >
                {moment
                  .utc(data.service_start_time)
                  .local()
                  .format("hh:mm a")}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 0.6
            }}
          >
            <View
              style={{
                flex: 0.3,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  this.props.reportExpert(data.ref_number, data.id)
                }
                style={{
                  height: moderateScale(42),
                  width: moderateScale(100),
                  backgroundColor: "transparent",
                  borderColor: "#3E3E3E",
                  borderWidth: moderateScale(1),
                  borderRadius: moderateScale(3),
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={{
                    color: "#3E3E3E",
                    fontFamily: fonts.LATOBOLD,
                    fontSize: moderateScale(15)
                  }}
                >
                  {strings.expandHistory.report}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: moderateScale(42),
                  width: moderateScale(100),
                  backgroundColor: "#1F5BA8",
                  borderColor: "#1F5BA8",
                  borderWidth: moderateScale(1),
                  borderRadius: moderateScale(3),
                  alignItems: "center",
                  justifyContent: "center"
                }}
                onPress={() => {
                  this.props.onPressBreak({
                    data,
                    breakTime: moment
                      .utc()
                      .local()
                      .format("YYYY-MM-DD HH:mm:ss")
                  });
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontFamily: fonts.LATOBOLD,
                    fontSize: moderateScale(15)
                  }}
                >
                  {data.break_start && !data.break_end
                    ? strings.modal.endBreak
                    : strings.expandHistory.break}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: moderateScale(42),
                  width: moderateScale(100),
                  backgroundColor: "#1F5BA8",
                  borderColor: "#1F5BA8",
                  borderWidth: moderateScale(1),
                  borderRadius: moderateScale(3),
                  alignItems: "center",
                  justifyContent: "center"
                }}
                onPress={() => {
                  this.props.onPressFinish({
                    data,
                    finishTime: moment
                      .utc()
                      .local()
                      .format("YYYY-MM-DD HH:mm:ss")
                  });
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontFamily: fonts.LATOBOLD,
                    fontSize: moderateScale(15)
                  }}
                >
                  {strings.modal.finish}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 0.7,
                flexDirection: "column"
              }}
            >
              <View
                style={{
                  flex: 0.25,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <TouchableOpacity
                  onPress={this.props.extendHire}
                  style={{
                    backgroundColor: "#1F5BA8",
                    borderColor: "#1F5BA8",
                    borderWidth: moderateScale(1),
                    borderRadius: moderateScale(3),
                    alignItems: "center",
                    justifyContent: "center",
                    height: moderateScale(42),
                    width: moderateScale(325)
                  }}
                >
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontFamily: fonts.LATOBOLD,
                      fontSize: moderateScale(15)
                    }}
                  >
                    {strings.extendHire.extend}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={this.props.call}
                style={{
                  flex: 0.3,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: moderateScale(10)
                }}
              >
                <Text
                  style={{
                    color: "red",
                    fontFamily: fonts.LATOBOLD,
                    fontSize: moderateScale(14)
                  }}
                >
                  {strings.modal.emergency}
                </Text>
              </TouchableOpacity>

              <View style={{ flex: 0.05 }}>
                <View
                  style={{
                    height: moderateScale(0.2),
                    borderWidth: 1,
                    borderStyle: "dashed",
                    borderColor: colors.GREY,
                    borderRadius: 10,
                    marginHorizontal: moderateScale(9)
                  }}
                />
              </View>

              <View
                style={{
                  flex: 0.4,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: moderateScale(5)
                }}
              >
                <Text
                  style={{
                    color: "grey",
                    fontFamily: fonts.BASEBOLD,
                    fontSize: moderateScale(12),
                    textAlign: "center"
                  }}
                >
                  {strings.extendHire.info}{" "}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
