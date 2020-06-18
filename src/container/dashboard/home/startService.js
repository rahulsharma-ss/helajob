import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Platform,
  ImageBackground,
  ActivityIndicator,
  TextInput,
  Modal
} from "react-native";
import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";
import { fonts, colors } from "../../../constants/theme";
import { moderateScale } from "../../../utilities/ResponsiveFonts";
import moment from "moment";
import RateExpert from "./jobRating";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  requestQr,
  getScheduledservices,
  couponVerification1,
  setSuccessModal,
  getFinshTime,
  serviceType1,
  payMoney,
  paymentSuccessModal,
  getWalletAmount
} from "../../../actions/list/listAction";
import { PROFILE_IMG_URL } from "../../../constants/url";
import idx from "idx";
import { RNToasty } from "react-native-toasty";
import strings from "../../../constants/language";

class StartService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakIs: false,
      qrStep: 1,
      promoCode: "",
      successModal: false,
      primaryWallet: this.props.walletIs == 0 ? false : true,
      primaryCard: this.props.walletIs == 0 ? true : false,
      rateModal: false,
      finishTime: 0,
      absoluteDiscount: 0,
      discountTypeIs: "",
      jobStarted: false
    };
    socket.servicePopup(response => {
      this.togglePopup();
    });
  }

  togglePopup = () => {
    if (this.props.serviceType != "FINISH") {
      this.setState({ jobStarted: true });
      setTimeout(() => {
        this.goToHome();
      }, 400);
    }
  }; // Called when event is received from service start/break/resume

  componentDidMount = () => {
    this.props.getWalletAmount(res => {});
    const { item } = this.props;
    let qrDetails = {
      expert_id:
        idx(item, _ => _.expert_id) || idx(item, _ => _.data.expert_id),
      request_id: idx(item, _ => _.id) || idx(item, _ => _.data.id)
    };

    if (this.props.serviceType == "BREAK") {
      this.setState({ qrStep: 2 });
      this.props.requestQr(qrDetails, 0);
      this.props.getFinshTime(
        {
          request_id: idx(item, _ => _.data.id),
          date: moment()
            .utc()
            .format("YYYY-MM-DD HH:mm:ss")
        },
        response => {
          this.setState({ finishTime: response.job_duration });
        }
      );
    } else if (this.props.serviceType == "FINISH") {
      this.setState({ qrStep: 3 });
      this.props.getFinshTime(
        {
          request_id: idx(item, _ => _.data.id),
          date: moment()
            .utc()
            .format("YYYY-MM-DD HH:mm:ss")
        },
        response => {
          this.setState({ finishTime: response.job_duration });
        }
      );
      this.props.requestQr(qrDetails, 1);
    } else if (this.props.serviceType == "START") {
      this.setState({ qrStep: 1 });
      this.props.requestQr(qrDetails, 3);
    } else if (this.props.serviceType == "BREAK END") {
      this.setState({ qrStep: 2 });
      this.props.requestQr(qrDetails, 2);
    }
  };

  // Displayes finish job screen.
  goToFinish = () => {
    const { item } = this.props;

    this.props.getFinshTime(
      {
        request_id: idx(item, _ => _.data.id),
        date: moment()
          .utc()
          .format("YYYY-MM-DD HH:mm:ss")
      },
      response => {
        this.setState({ finishTime: response.job_duration });
      }
    ); // Finish time of a job.
    this.props.serviceType1("FINISH");
    let qrDetails = {
      expert_id:
        idx(item, _ => _.expert_id) || idx(item, _ => _.data.expert_id),
      request_id: idx(item, _ => _.id) || idx(item, _ => _.data.id)
    };
    this.setState({ qrStep: 3 });
    this.props.requestQr(qrDetails, 1);
  };

  textType = type => {
    if (this.props.serviceType == "BREAK") {
      return `${strings.startService.startBreak}`;
    } else if (this.props.serviceType == "FINISH") {
      return `${strings.startService.finishJob}`;
    } else if (this.props.serviceType == "START") {
      return `${strings.startService.startJob}`;
    } else if (this.props.serviceType == "BREAK END") {
      return `${strings.startService.finishBreak}`;
    }
  };

  // Button text type
  buttonTextType = type => {
    if (this.props.serviceType == "BREAK") {
      return "Start break";
    } else if (this.props.serviceType == "FINISH") {
      return "Finish job";
    } else if (this.props.serviceType == "START") {
      return "Start shift";
    } else if (this.props.serviceType == "BREAK END") {
      return "End break";
    }
  };

  // Navigate back to home
  goToHome = () => {
    this.props.getScheduledservices();
    Navigation.pop(this.props.componentId);
  };

  // Checking if job is started before going to home.
  checkBeforeHome = () => {
    if (this.startBreak.jobStarted) {
      Navigation.pop(this.props.componentId);
    } else {
      RNToasty.Warn({
        title: `${strings.startService.endJob}`,
        withIcon: false
      });
    }
  };

  validate = () => {
    this.verifyCoupon();
  };

  // Displaying start job screen.
  startJob = (item, qrImage) => {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 0.68,
            justifyContent: "flex-end"
            // alignItems: "center",
          }}
        >
          <View
            style={{
              height: moderateScale(350),
              width: moderateScale(350),
              alignSelf: "center"
            }}
          >
            <ImageBackground
              source={require("../../../assets/img/card.png")}
              resizeMode={"stretch"}
              style={{
                height: moderateScale(350),
                width: moderateScale(350),
                elevation: Platform.OS == "ios" ? 1 : 10,
                shadowOffset: {
                  width: Platform.OS == "ios" ? -0.5 : -15,
                  height: Platform.OS == "ios" ? -0.3 : -0.2
                },
                shadowColor: "black",
                shadowOpacity: 0.5,
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  width: moderateScale(280),
                  flexDirection: "row",
                  paddingBottom: moderateScale(5),
                  height: moderateScale(50)
                }}
              >
                <View
                  style={{
                    flex: 0.5,
                    justifyContent: "space-evenly"
                  }}
                >
                  <Text
                    style={{
                      fontSize: moderateScale(15),
                      fontFamily: fonts.LATOBOLD
                    }}
                    numberOfLines={1}
                  >
                    {idx(item, _ => _.expert.fullname) ||
                      idx(item, _ => _.data.expert.fullname)}
                  </Text>
                  <Text
                    style={{
                      fontSize: moderateScale(13),
                      fontFamily: fonts.LATOREGULAR,
                      color: colors.GREY
                    }}
                    numberOfLines={1}
                  >
                    {idx(item, _ => _.service.service) ||
                      idx(item, _ => _.data.service.service)}{" "}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0.5,
                    justifyContent: "space-evenly",
                    alignItems: "flex-end"
                  }}
                >
                  <Text
                    style={{
                      fontSize: moderateScale(13),
                      fontFamily: fonts.LATOREGULAR,
                      color: colors.GREY
                    }}
                  >
                    {strings.startService.startDate}
                    <Text
                      style={{
                        fontSize: moderateScale(13),
                        fontFamily: fonts.LATOREGULAR,
                        color: colors.DGREY
                      }}
                    >
                      {" "}
                      {moment(
                        idx(item, _ => _.booking_date) ||
                          idx(item, _ => _.data.booking_date)
                      )
                        .local()
                        .format("MMM DD")}
                    </Text>
                  </Text>
                  <Text
                    style={{
                      fontSize: moderateScale(13),
                      fontFamily: fonts.LATOREGULAR,
                      color: colors.GREY
                    }}
                  >
                    {strings.extendHire.startTime}
                    <Text
                      style={{
                        fontSize: moderateScale(13),
                        fontFamily: fonts.LATOREGULAR,
                        color: colors.DGREY
                      }}
                    >
                      {" "}
                      {moment().format("hh:mm a")}
                    </Text>
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: moderateScale(180),
                  height: moderateScale(245),
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                {!this.props.loading ? (
                  <Image
                    // resizeMode={"contain"}
                    style={{
                      height: moderateScale(235),
                      width: moderateScale(235),
                      alignSelf: "center"
                    }}
                    source={{
                      uri: `${PROFILE_IMG_URL}${qrImage.image}`
                    }}
                  />
                ) : (
                  <ActivityIndicator />
                )}
              </View>
            </ImageBackground>
          </View>
        </View>
        <View
          style={{
            flex: 0.12,
            justifyContent: "flex-start"
          }}
        >
          <Text
            style={{
              fontSize: moderateScale(13),
              fontFamily: fonts.LATOBOLD,
              color: colors.GREY,
              textAlign: "center"
            }}
          >
            {this.textType(this.props.serviceType)}
          </Text>
          <Text
            style={{
              fontSize: moderateScale(13),
              fontFamily: fonts.LATOBOLD,
              color: colors.GREY,
              textAlign: "center"
            }}
          >
            {strings.startService.code} {qrImage.OTP}
          </Text>
        </View>
        <View
          style={{
            flex: 0.1,
            justifyContent: "flex-end",
            paddingBottom: moderateScale(20)
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.serviceType == "START"
                ? this.checkBeforeHome()
                : this.goToHome();
            }}
            style={{
              height: moderateScale(45),
              width: moderateScale(300),
              backgroundColor: colors.BLUE,
              borderRadius: moderateScale(5),
              alignSelf: "center",
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                fontSize: moderateScale(16),
                fontFamily: fonts.LATOBOLD,
                color: colors.WHITE,
                textAlign: "center"
              }}
            >
              {this.buttonTextType()}
            </Text>
          </TouchableOpacity>
        </View>
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

        <View
          style={{
            flex: 0.19,
            justifyContent: "center"
            //   backgroundColor: "pink",
          }}
        >
          <Text
            style={{
              fontSize: moderateScale(12),
              fontFamily: fonts.LATOREGULAR,
              color: colors.GREY,
              textAlign: "center",
              paddingHorizontal: moderateScale(5)
            }}
          >
            {strings.startService.info}
          </Text>
        </View>
      </View>
    );
  };

  startBreak = (item, qrImage) => {
    let totalJobTime = idx(this.props, _ => _.jobInfo.job_duration);
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 0.2,
            paddingHorizontal: moderateScale(13)
          }}
        >
          <View
            style={{
              flex: 1,
              elevation: Platform.OS == "ios" ? 1 : 10,
              shadowOffset: {
                width: Platform.OS == "ios" ? -0.5 : -15,
                height: Platform.OS == "ios" ? -0.3 : -0.2
              },
              shadowColor: "black",
              shadowOpacity: 0.5,
              backgroundColor: "white",
              borderRadius: moderateScale(10)
            }}
          >
            <View
              style={{
                flex: 1,
                paddingHorizontal: moderateScale(13),
                overflow: "hidden"
              }}
            >
              <View
                style={{
                  flex: 0.6,
                  justifyContent: "space-evenly"
                }}
              >
                <Text
                  style={{
                    fontSize: moderateScale(15),
                    fontFamily: fonts.LATOBOLD,
                    color: colors.BLUE
                  }}
                >
                  {idx(item, _ => _.expert.fullname) ||
                    idx(item, _ => _.data.expert.fullname)}
                </Text>
                <Text
                  style={{
                    fontSize: moderateScale(12),
                    fontFamily: fonts.LATOBOLD,
                    color: colors.GREY
                  }}
                >
                  {idx(item, _ => _.service.service_parent[0].service) ||
                    idx(
                      item,
                      _ => _.data.service.service_parent[0].service
                    )}{" "}
                  >{" "}
                  {idx(item, _ => _.service.service) ||
                    idx(item, _ => _.data.service.service)}
                </Text>
              </View>
              <View
                style={{
                  height: moderateScale(1),
                  borderWidth: 1,
                  borderStyle: "dashed",
                  borderRadius: 10
                }}
              />
              <View
                style={{
                  flex: 0.4,
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <View style={{ flex: 0.5 }}>
                  <Text
                    style={{
                      fontSize: moderateScale(13),
                      fontFamily: fonts.LATOREGULAR,
                      color: colors.GREY
                    }}
                  >
                    {strings.expandHistory.startTime}:{" "}
                    <Text
                      style={{
                        fontSize: moderateScale(13),
                        fontFamily: fonts.LATOBOLD,
                        color: colors.GREY
                      }}
                    >
                      {" "}
                      {moment
                        .utc(
                          idx(item, _ => _.service_start_time) ||
                            idx(item, _ => _.data.service_start_time)
                        )
                        .local()
                        .format("hh:mm a")}
                    </Text>
                  </Text>
                </View>
                <View style={{ flex: 0.5 }}>
                  <Text
                    style={{
                      fontSize: moderateScale(15),
                      fontFamily: fonts.LATOREGULAR,
                      color: colors.GREY
                    }}
                  >
                    {strings.expandHistory.totalTime}:{" "}
                    <Text
                      style={{
                        fontSize: moderateScale(15),
                        fontFamily: fonts.LATOBOLD,
                        color: colors.BLACK
                      }}
                    >
                      {`${totalJobTime || 0} ${strings.startService.hours}`}{" "}
                      {/* {duration} {strings.startService.hours} */}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 0.45,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {!this.props.loading ? (
            <View
              style={{
                height: moderateScale(200),
                width: moderateScale(200),
                elevation: Platform.OS == "ios" ? 1 : 2,
                shadowOffset: {
                  width: Platform.OS == "ios" ? -0.5 : -0.4,
                  height: Platform.OS == "ios" ? -0.3 : -0.2
                },
                shadowColor: "black",
                shadowOpacity: 0.5,
                backgroundColor: "white",
                overflow: "hidden"
              }}
            >
              <Image
                resizeMode={"contain"}
                style={{
                  height: moderateScale(200),
                  width: moderateScale(200)
                }}
                source={{
                  uri: `${PROFILE_IMG_URL}${qrImage.image}`
                }}
              />
            </View>
          ) : (
            <ActivityIndicator />
          )}
          <Text
            style={{
              fontSize: moderateScale(15),
              fontFamily: fonts.LATOBOLD,
              color: colors.GREY,
              textAlign: "center",
              paddingTop: moderateScale(10)
            }}
          >
            {strings.startService.code} {qrImage.OTP}{" "}
          </Text>
        </View>
        <View
          style={{
            height: moderateScale(1),
            width: moderateScale(220),
            borderWidth: 1,
            borderStyle: "dashed",
            borderRadius: 10,
            alignSelf: "center"
          }}
        />
        <View
          style={{
            flex: 0.05,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: moderateScale(13)
          }}
        >
          <Text
            style={{
              fontSize: moderateScale(15),
              fontFamily: fonts.LATOBOLD,
              color: colors.BLUE,
              textAlign: "center"
            }}
          >
            {this.props.serviceType == "BREAK"
              ? strings.startService.pause
              : strings.startService.resume}
          </Text>
        </View>

        <View
          style={{
            flex: 0.15,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: moderateScale(13)
          }}
        >
          <Text
            style={{
              fontSize: moderateScale(12),
              fontFamily: fonts.LATOREGULAR,
              color: colors.GREY,
              textAlign: "center"
            }}
          >
            {strings.extendHire.info}
          </Text>
        </View>
        <View
          style={{
            flex: 0.25,
            backgroundColor: colors.WHITE,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View
            style={{
              flax: 0.4,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                fontSize: moderateScale(15),
                fontFamily: fonts.LATOBOLD,
                color: colors.BLUE,
                textAlign: "center"
              }}
            >
              {strings.startService.finish}
            </Text>
          </View>
          <View
            style={{
              flax: 0.6,
              justifyContent: "center",
              alignItems: "center",
              paddingTop: moderateScale(10)
            }}
          >
            <TouchableOpacity
              onPress={this.goToFinish}
              style={{
                height: moderateScale(45),
                width: moderateScale(300),
                backgroundColor: colors.WHITE,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: moderateScale(5),
                overflow: "hidden",
                borderWidth: 0.3,
                borderColor: colors.BLUE
              }}
            >
              <Text
                style={{
                  fontSize: moderateScale(15),
                  fontFamily: fonts.LATOBOLD,
                  color: colors.BLUE,
                  textAlign: "center"
                }}
              >
                {strings.modal.finish}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  // Navigating to add money screen
  addMoney = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "AddMoney",
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
          fromService: true
        }
      }
    });
  };

  // Navigating to ad payment method
  addPaymentMethod = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "AddPaymentMethod",
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
          fromService: true
        }
      }
    });
  };

  // Converting seconds to hours nad minutes
  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds
    };
    return obj;
  }

  // Render finish job screen.
  finishJob = (item, qrImage, newDiscountOne) => {
    let totalJobTime = idx(this.props, _ => _.jobInfo.job_duration); // Total time of a job.
    let totalAmount = idx(this.props, _ => _.jobInfo.sub_total); // Total price of a job.
    let serviceFee = idx(this.props, _ => _.jobInfo.fee); // Service frees of a job.
    let grandTotal = totalAmount + (serviceFee - newDiscountOne); // Final price with deducted amount.
    // Final job time to seconds.
    return (
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 0.4,
            alignItems: "center",
            paddingTop: moderateScale(20)
          }}
        >
          {/* Card view */}

          <View
            style={{
              height: moderateScale(320),
              width: moderateScale(380)
            }}
          >
            <ImageBackground
              source={require("../../../assets/img/card.png")}
              style={{
                height: moderateScale(320),
                width: moderateScale(380),
                elevation: Platform.OS == "ios" ? 1 : 10,
                shadowOffset: {
                  width: Platform.OS == "ios" ? -0.5 : -15,
                  height: Platform.OS == "ios" ? -0.3 : -0.2
                },
                shadowColor: "black",
                shadowOpacity: 0.5,
                justifyContent: "center",
                paddingBottom: moderateScale(12)
              }}
              resizeMode={"stretch"}
            >
              <View
                style={{
                  height: moderateScale(50),
                  width: moderateScale(300),
                  alignSelf: "center"
                }}
              >
                <View
                  style={{
                    height: moderateScale(20),
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <Text
                    style={{
                      fontSize: moderateScale(15),
                      fontFamily: fonts.LATOBOLD,
                      color: colors.BLACK
                    }}
                    numberOfLines={1}
                  >
                    {idx(item, _ => _.expert.fullname) ||
                      idx(item, _ => _.data.expert.fullname)}
                  </Text>
                  <Text
                    style={{
                      fontSize: moderateScale(13),
                      fontFamily: fonts.LATOREGULAR,
                      color: colors.GREY
                    }}
                  >
                    {strings.expandHistory.totalTime}
                  </Text>
                </View>
                <View
                  style={{
                    height: moderateScale(20),
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <Text
                    style={{
                      fontSize: moderateScale(13),
                      fontFamily: fonts.LATOREGULAR,
                      color: colors.GREY
                    }}
                  >
                    {idx(item, _ => _.data.service.service) ||
                      idx(item, _ => _.data.service.service)}{" "}
                    {"£" + idx(item, _ => _.data.service.price) + "/hr"}
                  </Text>
                  <Text
                    style={{
                      fontSize: moderateScale(13),
                      fontFamily: fonts.LATOBOLD,
                      color: colors.BLACK
                    }}
                  >
                    {totalJobTime < 4
                      ? strings.startService.policy
                      : `${totalJobTime} ${strings.startService.hours}`}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  height: moderateScale(0.2),
                  width: moderateScale(295),
                  borderWidth: 1,
                  borderStyle: "dashed",
                  borderColor: colors.GREY,
                  borderRadius: 10,
                  marginHorizontal: moderateScale(9),
                  alignSelf: "center"
                }}
              />
              <View
                style={{
                  height: moderateScale(75),
                  width: moderateScale(300),
                  alignSelf: "center",
                  justifyContent: "space-evenly"
                }}
              >
                <View
                  style={{
                    height: moderateScale(20),
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <Text
                    style={{
                      fontSize: moderateScale(13),
                      fontFamily: fonts.LATOREGULAR,
                      color: colors.GREY
                    }}
                  >
                    {strings.expandHistory.startTime}{" "}
                    <Text
                      style={{
                        fontSize: moderateScale(13),
                        fontFamily: fonts.LATOBOLD,
                        color: colors.GREY
                      }}
                    >
                      {" "}
                      {moment
                        .utc(idx(this.props, _ => _.jobInfo.service_start_time))
                        .local()
                        .format("hh:mm a")}
                    </Text>
                  </Text>
                </View>
                <View
                  style={{
                    height: moderateScale(20),
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <Text
                    style={{
                      fontSize: moderateScale(13),
                      color: colors.GREY,
                      fontStyle: "italic"
                    }}
                  >
                    {strings.expandHistory.break}:{" "}
                    {idx(item, _ => _.data.break_duration / 60).toFixed(0) +
                      "mins"}
                  </Text>
                </View>
                <View
                  style={{
                    height: moderateScale(20),
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <Text
                    style={{
                      fontSize: moderateScale(13),
                      fontFamily: fonts.LATOREGULAR,
                      color: colors.GREY
                    }}
                  >
                    {strings.expandHistory.finishTime}{" "}
                    <Text
                      style={{
                        fontSize: moderateScale(13),
                        fontFamily: fonts.LATOBOLD,
                        color: colors.GREY
                      }}
                    >
                      {" "}
                      {moment
                        .utc(idx(this.props, _ => _.jobInfo.service_end_time))
                        .local()
                        .format("hh:mm a")}
                    </Text>
                  </Text>
                </View>
              </View>
              <View
                style={{
                  height: moderateScale(0.2),
                  width: moderateScale(295),
                  borderWidth: 1,
                  borderStyle: "dashed",
                  borderColor: colors.GREY,
                  borderRadius: 10,
                  marginHorizontal: moderateScale(9),
                  alignSelf: "center"
                }}
              />
              <View
                style={{
                  height: moderateScale(120),
                  width: moderateScale(300),
                  alignSelf: "center",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: moderateScale(5)
                }}
              >
                <View
                  style={{
                    height: moderateScale(110),
                    width: moderateScale(140),
                    justifyContent: "space-between"
                  }}
                >
                  <Text
                    style={{
                      fontSize: moderateScale(13),
                      color: colors.GREY,
                      fontStyle: "italic"
                    }}
                  >
                    {strings.startService.balance}{" "}
                  </Text>
                  <Text
                    style={{
                      fontSize: moderateScale(13),
                      fontFamily: fonts.LATOREGULAR,
                      color: colors.GREY,
                      fontStyle: "italic"
                    }}
                  >
                    {strings.expandHistory.subTotal}{" "}
                  </Text>
                  <Text
                    style={{
                      fontSize: moderateScale(13),
                      fontFamily: fonts.LATOBOLD,
                      color: colors.GREY,
                      fontStyle: "italic"
                    }}
                  >
                    {strings.extendHire.serviceFee}
                  </Text>
                  {this.state.absoluteDiscount > 0 || newDiscountOne > 0 ? (
                    <Text
                      style={{
                        fontSize: moderateScale(13),
                        fontFamily: fonts.LATOREGULAR,
                        color: "green"
                      }}
                    >
                      {strings.startService.discount}
                    </Text>
                  ) : null}
                  <Text
                    style={{
                      fontSize: moderateScale(13),
                      fontFamily: fonts.LATOBOLD,
                      color: colors.BLACK
                    }}
                  >
                    {strings.expandHistory.total}
                  </Text>
                </View>
                <View
                  style={{
                    height: moderateScale(110),
                    width: moderateScale(150),
                    justifyContent: "space-between",
                    alignItems: "flex-end"
                  }}
                >
                  <Text
                    style={{
                      fontSize: moderateScale(13),
                      color: "green",
                      fontStyle: "italic"
                    }}
                  >
                    £{idx(this.props, _ => _.totalAmount.data.amount) || 0}
                  </Text>
                  <Text
                    style={{
                      fontSize: moderateScale(13),
                      fontFamily: fonts.LATOBOLD,
                      color: colors.BLUE
                    }}
                  >
                    £{idx(this.props, _ => _.jobInfo.sub_total.toFixed(2))}
                  </Text>
                  <Text
                    style={{
                      fontSize: moderateScale(13),
                      fontFamily: fonts.LATOBOLD,
                      color: colors.GREY
                    }}
                  >
                    {""} £{idx(this.props, _ => _.jobInfo.fee.toFixed(2))}
                  </Text>
                  {this.state.absoluteDiscount > 0 || newDiscountOne > 0 ? (
                    <Text
                      style={{
                        fontSize: moderateScale(13),
                        fontFamily: fonts.LATOREGULAR,
                        color: "green"
                      }}
                    >
                      £ -{this.state.absoluteDiscount || newDiscountOne}
                    </Text>
                  ) : null}
                  <View
                    style={{
                      // height: moderateScale(5),
                      // width: moderateScale(50),
                      borderTopWidth: 1
                    }}
                  >
                    <Text
                      style={{
                        fontSize: moderateScale(13),
                        fontFamily: fonts.LATOBOLD,
                        color: colors.BLUE
                      }}
                    >
                      £
                      {this.state.absolutePayment
                        ? this.state.absolutePayment
                        : grandTotal
                        ? grandTotal
                        : (
                            idx(this.props, _ => _.jobInfo.sub_total) +
                            idx(this.props, _ => _.jobInfo.fee)
                          ).toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>
        <View
          style={{
            flex: 0.25,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {!this.props.loading ? (
            <View
              style={{
                height: moderateScale(180),
                width: moderateScale(180),
                elevation: Platform.OS == "ios" ? 1 : 2,
                shadowOffset: {
                  width: Platform.OS == "ios" ? -0.5 : -0.4,
                  height: Platform.OS == "ios" ? -0.3 : -0.2
                },
                shadowColor: "black",
                shadowOpacity: 0.5,
                backgroundColor: "#f6f4f4",
                borderRadius: moderateScale(10),
                overflow: "hidden"
              }}
            >
              <Image
                resizeMode={"contain"}
                style={{
                  height: moderateScale(180),
                  width: moderateScale(180)
                }}
                source={{
                  uri: `${PROFILE_IMG_URL}${qrImage.image}`
                }}
              />
            </View>
          ) : (
            <View
              style={{
                height: moderateScale(200),
                width: moderateScale(200)
              }}
            >
              <ActivityIndicator />
            </View>
          )}
        </View>
        <View
          style={{
            flex: 0.05,
            paddingVertical: moderateScale(20),
            paddingHorizontal: moderateScale(10)
          }}
        >
          <Text
            style={{
              fontSize: moderateScale(15),
              fontFamily: fonts.LATOBOLD,
              color: colors.GREY,
              textAlign: "center"
            }}
          >
            {strings.startService.finishJob}
          </Text>
          <Text
            style={{
              fontSize: moderateScale(15),
              fontFamily: fonts.LATOBOLD,
              color: colors.GREY,
              textAlign: "center"
            }}
          >
            {strings.startService.code} {qrImage.OTP}
          </Text>
        </View>

        <View
          style={{
            flex: 0.39,
            alignItems: "flex-start",
            width: moderateScale(350),
            alignSelf: "center"
            // paddingHorizontal: moderateScale(10)
          }}
        >
          {this.props.walletIs == 0 ? null : (
            <Text
              style={{
                fontSize: moderateScale(15),
                fontFamily: fonts.LATOBOLD,
                color: colors.BLACK,
                textAlign: "center",
                paddingVertical: moderateScale(15)
              }}
            >
              {strings.startService.method}
            </Text>
          )}
          {this.props.walletIs == 0 ? null : (
            <View
              style={{
                height: moderateScale(100),
                width: moderateScale(350),
                justifyContent: "space-evenly",
                borderBottomColor: colors.GREY,
                borderBottomWidth: 0.7,
                flexDirection: "row"
              }}
            >
              <View
                style={{
                  flex: 0.6,
                  justifyContent: "space-evenly"
                }}
              >
                <Text
                  style={{
                    fontSize: moderateScale(15),
                    fontFamily: fonts.LATOBOLD
                  }}
                >
                  {strings.payment.title}
                </Text>
                <Text
                  style={{
                    fontSize: moderateScale(30),
                    fontFamily: fonts.LATOBOLD,
                    color: colors.BLUE
                  }}
                >
                  £{" "}
                  {(this.props.totalAmount &&
                    this.props.totalAmount.data &&
                    this.props.totalAmount.data.amount) ||
                    0}
                </Text>
                <TouchableOpacity onPress={this.addMoney}>
                  <Text
                    style={{
                      fontSize: moderateScale(13),
                      fontFamily: fonts.LATOBOLD
                    }}
                  >
                    {strings.payment.addMoney}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{ flex: 0.4, paddingHorizontal: moderateScale(10) }}>
                <View
                  style={{
                    flex: 0.2,
                    flexDirection: "row",
                    justifyContent: "flex-end"
                  }}
                >
                  <View style={{}}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          primaryCard: false,
                          primaryWallet: true
                        });
                      }}
                      style={{
                        borderWidth: 1,
                        borderRadius: moderateScale(100),
                        height: moderateScale(20),
                        width: !this.state.primaryWallet
                          ? moderateScale(75)
                          : moderateScale(55),
                        borderColor: this.state.primaryWallet
                          ? colors.BLUE
                          : colors.GREY,
                        backgroundColor: this.state.primaryWallet
                          ? colors.BLUE
                          : colors.GREY
                      }}
                    >
                      <Text
                        style={{
                          fontSize: moderateScale(12),
                          fontFamily: fonts.LATOBOLD,
                          textAlign: "center",
                          color: colors.WHITE
                        }}
                      >
                        {this.state.primaryWallet
                          ? strings.payment.primary
                          : strings.startService.set}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
          <View
            style={{
              height: moderateScale(100),
              width: moderateScale(350),
              alignSelf: "center",
              justifyContent: "space-evenly",
              borderBottomColor: colors.GREY,
              borderBottomWidth: 0.7
            }}
          >
            <Text
              style={{
                fontSize: moderateScale(16),
                fontFamily: fonts.LATOBOLD
              }}
            >
              {strings.payment.methods}
            </Text>
            {idx(this.props, _ => _.allCards.data.length > 0) ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Image
                  source={require("../../../assets/img/visa.png")}
                  resizeMode={"contain"}
                  style={{
                    height: moderateScale(35),
                    width: moderateScale(35),
                    alignSelf: "flex-start"
                  }}
                />
                <Text
                  style={{
                    fontSize: moderateScale(16),
                    fontFamily: fonts.LATOBOLD,
                    paddingRight: moderateScale(100)
                  }}
                >
                  *******
                  {idx(
                    this.props,
                    _ =>
                      _.allCards.data.slice(
                        this.props.allCards.data.length - 1
                      )[0].card_number
                  )}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ primaryCard: true, primaryWallet: false });
                  }}
                  style={{
                    borderWidth: 1,
                    borderRadius: moderateScale(100),
                    height: moderateScale(20),
                    width: !this.state.primaryCard
                      ? moderateScale(75)
                      : moderateScale(55),
                    borderColor: this.state.primaryCard
                      ? colors.BLUE
                      : colors.GREY,
                    backgroundColor: this.state.primaryCard
                      ? colors.BLUE
                      : colors.GREY,
                    justifyContent: "center",
                    paddingHorizontal:
                      this.props.myLanguage == "greek"
                        ? moderateScale(10)
                        : moderateScale(0)
                  }}
                >
                  <Text
                    style={{
                      fontSize:
                        this.props.myLanguage == "greek"
                          ? moderateScale(8)
                          : moderateScale(12),
                      fontFamily: fonts.LATOBOLD,
                      textAlign: "center",
                      color: colors.WHITE
                    }}
                  >
                    {this.state.primaryCard
                      ? strings.payment.primary
                      : strings.startService.set}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text
                  style={{
                    fontSize: moderateScale(15),
                    fontFamily: fonts.LATOBOLD,
                    color: colors.GREY
                  }}
                >
                  {strings.payment.noCard}
                </Text>
              </View>
            )}

            <TouchableOpacity onPress={this.addPaymentMethod}>
              <Text
                style={{
                  fontSize: moderateScale(13),
                  fontFamily: fonts.LATOBOLD
                }}
              >
                {strings.payment.addMethod} >
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: moderateScale(100),
              width: moderateScale(350),
              justifyContent: "space-evenly"
            }}
          >
            <Text
              style={{
                fontSize: moderateScale(16),
                fontFamily: fonts.LATOBOLD
              }}
            >
              {strings.payment.addPromo}
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderRadius: moderateScale(100),
                flex: 0.4,
                borderColor: colors.GREY,
                justifyContent: "center",
                flexDirection: "row",
                overflow: "hidden"
              }}
            >
              <View style={{ flex: 0.8, justifyContent: "center" }}>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder={"Enter code here"}
                  style={{
                    height: moderateScale(40),
                    paddingLeft: moderateScale(10),
                    fontFamily: fonts.LATOREGULAR
                  }}
                  onChangeText={promoCode => this.setState({ promoCode })}
                  value={this.state.promoCode}
                  autoCapitalize={"none"}
                  autoCorrect={false}
                />
              </View>
              <TouchableOpacity
                onPress={this.verifyCoupon}
                style={{
                  flex: 0.2,
                  backgroundColor: "#D1E5FF",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={{
                    fontSize:
                      this.props.myLanguage == "greek"
                        ? moderateScale(11)
                        : moderateScale(15),
                    fontFamily: fonts.LATOMEDIUM,
                    textAlign: "left",
                    color: colors.DGREY,
                    paddingLeft: moderateScale(10)
                  }}
                >
                  {strings.startService.apply}
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontSize: moderateScale(13),
                fontFamily: fonts.LATOMEDIUM,
                textAlign: "left",
                color: "green",
                paddingLeft: moderateScale(10)
              }}
            >
              {this.discountText()}
            </Text>
            {this.props.couponDetails1 &&
            this.props.couponDetails1.requestStatus == "success" ? (
              <Text
                style={{
                  fontSize: moderateScale(13),
                  fontFamily: fonts.LATOMEDIUM,
                  textAlign: "left",
                  color: "green",
                  paddingLeft: moderateScale(10)
                }}
              >
                {data.description}
              </Text>
            ) : null}
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  };

  // Rendering screen on request type.
  returnQrScreen = (item, qrImage, newDiscountOne) => {
    switch (this.state.qrStep) {
      case 1: //case 1
        return this.startJob(item, qrImage);
      case 2: //case 2
        return this.startBreak(item, qrImage);
      case 3:
        return this.finishJob(item, qrImage, newDiscountOne);
    }
  };

  // Verifying coupon code.
  verifyCoupon = () => {
    this.props.couponVerification1(this.state.promoCode, response => {
      if (response != 0) {
        let serviceFee = idx(this.props, _ => _.jobInfo.fee); // Service fee.
        let totalAmount = idx(this.props, _ => _.jobInfo.sub_total); // Total amount of a job.
        let totalDiscount = Number(idx(response, _ => _.data.discount_amount)); // Total discount applied.
        let newDiscount = totalDiscount / 100 || 0; // Discount converted to decimal.
        let grandTotal = totalAmount + (serviceFee - newDiscount); // Total amount after deducting discount
        this.setState({
          absolutePayment: grandTotal.toFixed(2)
        });
        this.setState({
          absoluteDiscount: newDiscount.toFixed(2)
        });
      } else {
        this.setState({
          absoluteDiscount: 0
        });
      }
    });
  };

  // Initiating payment
  validateAndPay = item => {
    let totalAmount = idx(this.props, _ => _.jobInfo.sub_total); // Total amount of a job.
    let serviceFee = idx(this.props, _ => _.jobInfo.fee); // Service fee.
    let subTotal = idx(this.props, _ => _.jobInfo.sub_total); // Sub total of job.
    let totalDiscount = Number(
      idx(this.props, _ => _.couponDetails.data.discount_amount)
    ); // Total discount applied.
    let newDiscount = totalDiscount / 100 || 0; // Discount converted to decimal.
    let grandTotal = totalAmount + (serviceFee - newDiscount); // Total amount after deducting discount.
    this.setState({
      absolutePayment: grandTotal.toFixed(2)
    });

    let data = {
      request_id: item.data.id,
      payment_method: this.state.primaryWallet ? "0" : "1",
      coupon_code: idx(this.props, _ => _.couponDetails.data.id) || null,
      coupon_discount:
        idx(this.props, _ => _.couponDetails.data.discount_amount) || null,
      user_id: item.data.user_id,
      job_duration: this.props.jobInfo && this.props.jobInfo.job_duration,
      total_price: grandTotal,
      admin_commission_percent:
        this.props.jobInfo && this.props.jobInfo.admin_commission_percent,
      fee: serviceFee,
      sub_total: subTotal
    };
    // Initiating payment.
    this.props.payMoney(data, response => {
      if (response) {
        socket.paymentSuccessfull(item.data.id);
        this.props.paymentSuccessModal(true);
      }
    });
  };

  // Discount text.
  discountText = () => {
    if (idx(this.props, _ => _.couponDetails.data.discount_amount)) {
      return `${idx(this.props, _ => _.couponDetails.data.discount_amount)} ${
        strings.startService.discountA
      }`;
    } else {
      return "";
    }
  };

  // Navigate to dashboard after submitting a review.
  submitReview = () => {
    this.props.getScheduledservices();
    this.setState({ rateModal: false });
    Navigation.pop(this.props.componentId);
  };

  render() {
    let newDiscount = idx(
      this.props,
      _ => _.couponDetails.data.discount_amount / 100
    ); // Discount applied.
    let newDiscountOne = newDiscount && newDiscount.toFixed(2); // New absolute discount.
    const { item, qrImage } = this.props;

    return (
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: moderateScale(10),
          backgroundColor: "#f6f4f4"
        }}
      >
        <View
          style={{
            height: moderateScale(50),
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: moderateScale(10)
          }}
        >
          <TouchableOpacity
            onPress={this.goToHome}
            style={{ flex: 0.1, paddingTop: moderateScale(8) }}
          >
            <Image
              source={require("../../../assets/img/back.png")}
              resizeMode={"contain"}
              style={{
                height: moderateScale(20),
                width: moderateScale(20),
                alignSelf: "flex-start"
              }}
            />
          </TouchableOpacity>
          <View style={{ flex: 0.8, paddingTop: moderateScale(8) }}>
            <Text
              style={{
                fontSize: moderateScale(18),
                textAlign: "center",
                fontFamily: fonts.LATOBOLD
              }}
            >
              {strings.startService.qr}
            </Text>
          </View>
          <View style={{ flex: 0.1 }} />
        </View>
        <View style={{ flex: 1 }}>
          {this.returnQrScreen(item, qrImage, newDiscountOne)}
        </View>
        {this.state.qrStep == 3 ? (
          <View
            style={{
              height: moderateScale(80),
              justifyContent: "flex-end",
              paddingBottom: moderateScale(20)
            }}
          >
            <TouchableOpacity
              onPress={() => this.validateAndPay(item)}
              disabled={this.props.paymentLoading}
              style={{
                height: moderateScale(45),
                width: moderateScale(300),
                backgroundColor: colors.BLUE,
                borderRadius: moderateScale(5),
                alignSelf: "center",
                justifyContent: "center"
              }}
            >
              {this.props.paymentLoading ? (
                <ActivityIndicator color={colors.WHITE} />
              ) : (
                <Text
                  style={{
                    fontSize: moderateScale(17),
                    fontFamily: fonts.LATOBOLD,
                    color: colors.WHITE,
                    textAlign: "center"
                  }}
                >
                  {strings.extendHire.validate}{" "}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        ) : null}
        {/* Rate the expert  */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.rateModal}
          onRequestClose={() => null}
        >
          <RateExpert
            submitReview={this.submitReview}
            expertId={idx(item, _ => _.data.expert_id)}
            expertName={idx(item, _ => _.data.expert.fullname)}
            job_id={idx(item, _ => _.data.id)}
          />
        </Modal>

        {this.props.paymentModal ? (
          <TouchableOpacity
            onPress={this.controlSearchModal}
            style={{
              backgroundColor: "white",
              elevation: Platform.OS == "ios" ? 1 : 10,
              shadowOffset: {
                width: Platform.OS == "ios" ? -0.2 : -0.4,
                height: Platform.OS == "ios" ? -0.1 : -0.2
              },
              shadowColor: "black",
              shadowOpacity: 0.5,
              position: "absolute",
              bottom: 0,
              width: moderateScale(380),
              height: moderateScale(200),
              alignSelf: "center"
            }}
          >
            <View
              style={{
                width: moderateScale(360),
                height: moderateScale(200),
                alignSelf: "center",
                paddingHorizontal: moderateScale(10)
              }}
            >
              <View
                style={{
                  height: moderateScale(35),
                  alignItems: "center",
                  justifyContent: "space-evenly"
                }}
              >
                <Text
                  style={{
                    fontSize: moderateScale(17),
                    textAlign: "center",
                    fontFamily: fonts.LATOBOLD
                  }}
                >
                  {strings.addMoney.success}
                </Text>
              </View>
              <View
                style={{
                  height: moderateScale(60),
                  alignItems: "center",
                  paddingTop: moderateScale(10)
                }}
              >
                <Text
                  style={{
                    fontSize: moderateScale(13),
                    textAlign: "center",
                    fontFamily: fonts.LATOBOLD
                  }}
                >
                  £{idx(this.props, _ => _.jobInfo.sub_total.toFixed(2))}{" "}
                  {strings.startService.wasPaid}{" "}
                  {idx(item, _ => _.expert.fullname) ||
                    idx(item, _ => _.data.expert.fullname)}{" "}
                  {strings.startService.trans} #
                  {idx(this.props, _ => _.item.data.ref_number)}{" "}
                </Text>
              </View>
              <View
                style={{
                  height: moderateScale(75),
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-end"
                }}
              >
                <TouchableOpacity
                  onPress={() => {
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
                          referenceNumber: idx(
                            this.props,
                            _ => _.item.data.ref_number
                          )
                        }
                      }
                    });
                  }}
                  style={{
                    height: moderateScale(50),
                    width: moderateScale(150),
                    alignItems: "center",
                    justifyContent: "center",
                    borderColor: "red",
                    borderWidth: 0.7,
                    borderRadius: moderateScale(5)
                  }}
                >
                  <Text
                    style={{
                      fontSize: moderateScale(17),
                      textAlign: "center",
                      fontFamily: fonts.LATOBOLD,
                      color: "red"
                    }}
                  >
                    {strings.expandHistory.report}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ rateModal: true }, () => {
                      this.props.paymentSuccessModal(false);
                    });
                  }}
                  style={{
                    height: moderateScale(50),
                    width: moderateScale(150),
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: colors.BLUE,
                    borderRadius: moderateScale(5)
                  }}
                >
                  <Text
                    style={{
                      fontSize: moderateScale(17),
                      textAlign: "center",
                      fontFamily: fonts.LATOBOLD,
                      color: colors.WHITE
                    }}
                  >
                    {strings.dashboard.ok}{" "}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ) : null}
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    qrImage: state.userList.qrCode,
    serviceType: state.userList.serviceType,
    loading: state.userList.loading,
    totalAmount: state.userList.walletDetails,
    couponDetails: state.userList.couponDetails1,
    successModalIs: state.userList.successModal,
    jobInfo: state.userList.jobInfo,
    paymentPossible: state.userList.paymentPossible,
    paymentLoading: state.userList.paymentLoading,
    allCards: state.userList.allCards,
    paymentModal: state.userList.paymentModal,
    myLanguage: state.language.language.title,
    walletIs:
      idx(state, _ => _.user.userData.wallet_connect_status) ||
      idx(state, _ => _.signup.data.wallet_connect_status)
  };
}

export default connect(
  mapStateToProps,
  {
    requestQr,
    getScheduledservices,
    couponVerification1,
    setSuccessModal,
    getFinshTime,
    serviceType1,
    payMoney,
    paymentSuccessModal,
    getWalletAmount
  }
)(StartService);
