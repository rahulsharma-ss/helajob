// Container for displaying all tabs and windows

import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Keyboard,
  BackHandler,
  Platform,
  SafeAreaView,
  Linking,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import { moderateScale } from "../../utilities/ResponsiveFonts";
import { Navigation } from "react-native-navigation";
import Add from "./add/add";
import Chat from "./chat/chat";
import History from "./history/history";
import Home from "./home/home";
import Profile from "./profile/profile";
import { logout } from "../../actions/auth/loginActions";
import { sessionManagement } from "../../actions/auth/signupActions";
import ModalSwiper from "react-native-modal";
import { PROFILE_IMG_URL } from "../../constants/url";
import { colors, fonts } from "../../constants/theme";
import moment from "moment";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import Share from "react-native-share";
import {
  cancelRequest,
  getScheduledservices,
  customerInvoice,
  getUserDetails,
  getWalletAmount,
  getCards,
  chatList,
  clearSession,
  checkPaymentMethod,
  listRecentTransactions,
  searchingModalStatus,
  getNotificationStatus,
  getMyReviews,
  getServices,
  getExpertDetails,
  introductionStatus,
  refreshUserDetails,
  getCommission
} from "../../actions/list/listAction";
import { createZendeskUser } from "../../actions/user/TicketActions";
import { serviceRequestAccepted2 } from "../../actions/socket/SocketActions";
import idx from "idx";
import { CachedImage } from "react-native-cached-image";
import {
  serviceRequestAccepted,
  serviceDetails
} from "../../actions/socket/SocketActions";
import { declineServiceRequest } from "../../actions/socket/SocketActions";
import { notificationDot } from "../../actions/socket/SocketActions";
import { getChatId } from "../../actions/list/listAction";
import strings from "../../constants/language";
import Introduction from "../../components/introduction";
import { MoreInfo } from "../../components/moreInfo";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedScreen: "Home",
      tabbar: 0.1,
      requestModal: false,
      arrival: 0,
      requestResponse: "",
      requestDate: this.props.selectedTime || "",
      requestTime: this.props.selectedTime || "",
      requestAddress: this.props.selectedAddress || "",
      cancelIs: false,
      chatId: "",
      keyOne: 1,
      flag: false,
      duration: 1
    };
    // socket.onRequestAccept(response => {
    //   this.requestedAccepted(response);
    // });
    socket.servicePopup(response => {
      this.togglePopup();
    });
  }

  // requestedAccepted = response => {
  //   setTimeout(() => {
  //     this.props.serviceRequestAccepted(response);
  //   }, 300);

  //   expert_id = {
  //     user_id: response.expert_id
  //   };
  //   this.setState({
  //     requestResponse: response
  //   });
  //   this.props.getScheduledservices();
  //   this.props.getExpertDetails(expert_id); // Get Expert details
  //   this.initiateChat(response);
  //   this.props.serviceDetails(response);
  //   this.getDistanceAndDuration(
  //     idx(this.props, _ => _.myCoordinates.latitudeOne.toString()),
  //     idx(this.props, _ => _.myCoordinates.longitudeOne.toString()),
  //     response.expert_latitude,
  //     response.expert_longitude
  //   );
  // };

  togglePopup = () => {
    this.jobTimer = setTimeout(() => {
      if (!this.state.flag) {
        this.setState({ selectedScreen: "Home1", flag: true });
      } else {
        this.setState({ selectedScreen: "Home", flag: false });
      }
    }, 5000);
  };

  componentDidMount() {
    strings.setLanguage(this.props.myLanguage);
    this.props.getCommission();
    if (idx(this.props, _ => _.userIntroStatus.data[0].introduction) != 1) {
      this.props.refreshUserDetails(); // Refreshing user details
    }
    this.props.getUserDetails(response => {
      // if (response.introduction === 0) {
      //   this.setState({ selectedScreen: "Intro" });
      // }
      this.zendeskConfigure(response); // configuring zendesk
    });
    this.props.getScheduledservices(); // Requesting scheduled services
    this.props.getServices(); // Get all services,
    this.props.chatList(); // Requesting chat list
    this.props.customerInvoice(); // Requesting jo history
    this.props.listRecentTransactions(); // Requesting recent transactions
    this.props.getNotificationStatus(response => {}); // Requesting notification status
    this.props.getMyReviews(); //Get my reviews
    this.props.getWalletAmount(response => {
      this.props.checkPaymentMethod(response.data.amount || 0);
    }); //Requesting wallet amount
    this.props.getCards(response => {}); // Requesting credit cards
    socket.onGetRating(response => {
      this.props.getUserDetails(res => {}); // Requesting user detaisl
    });

    socket.extendHireStatus(response => {
      this.props.getScheduledservices();
    });

    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this.keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this.keyboardDidHide
    );
    this.openThroughNotification();
  }

  openThroughNotification = () => {
    notification.onOpenNotification(notification => {
      if (idx(notification, _ => _.notification.payload.additionalData)) {
        let data = idx(
          notification,
          _ => _.notification.payload.additionalData
        );
        let chatData = {
          receiver: {
            id: data.sender,
            fullname: data.fullname
          },
          sender: {
            id: data.receiver,
            fullname: idx(this.props, _ => _.user.fullname)
          },
          id: data.chat_id
        };
        this.props.serviceRequestAccepted2(chatData);
        this.goChat();
        Navigation.push(this.props.componentId, {
          component: {
            name: "UserChat",
            options: {
              statusBar: {},
              topBar: {
                visible: false,
                height: 0
              }
            },
            animations: {
              push: {
                waitForRender: true
              }
            }
          }
        });
      }
    });
  };

  // initiateChat = expertDetails => {
  //   const { newUser } = this.props;

  //   this.props.getChatId(expertDetails.expert_id, response => {
  //     this.setState({
  //       chatId: response
  //     });
  //     let chatData = {
  //       receiver: {
  //         id: idx(this.props, _ => _.expertDetails.receiver.id),
  //         fullname: idx(this.props, _ => _.expertDetails.receiver.fullname)
  //       },
  //       sender: {
  //         id: newUser.id,
  //         fullname: idx(this.props, _ => _.newUser.fullname)
  //       },
  //       id: response
  //     };
  //     this.props.serviceRequestAccepted2(chatData);
  //   });
  // };

  componentWillUnmount() {
    // Remove backhandeler and keyboard listner
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    clearTimeout(this.jobTimer);
    clearTimeout(this.requestTimer);
    clearTimeout(this.logoutTimer);
  }

  share = () => {
    let shareOptions = {
      title: "Hela Job",
      message: `Hello, Your friend ${this.props.userName ||
        "Your friend"} has invited you to Hela Job. Hela Job is a fast, simple and secure employment app that I use to find job seekers in seconds.`,
      url: "https://www.helajob.com",
      subject: `${this.props.userName ||
        "Your friend"} Has Invited You To Join Hela Job"` //  for email
    };
    Share.open(shareOptions)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  proceed = () => {
    this.setState({ selectedScreen: "MoreInfo" });
  };

  getStarted = () => {
    this.props.introductionStatus();
    this.setState({ selectedScreen: "Home" });
  };

  submitTicket = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "SupportTicket",
        options: {
          statusBar: {
            drawBehind: true,
            backgroundColor: "white",
            style: "dark"
          },
          topBar: {
            visible: false,
            height: moderateScale(20),
            transparent: true
          }
        }
      }
    });
  };

  helpCenter = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "HelpCenter",
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
        }
      }
    });
  };

  zendeskConfigure = userDetails => {
    if (!this.props.zenddesk_id) {
      this.props.createZendeskUser({
        user: {
          name: userDetails.fullname,
          email: userDetails.email,
          role: "end-user"
        }
      });
    }
  };

  // // Calculating distance between expert and customer
  // getDistanceAndDuration = () => {
  //   let latOrigin = idx(this.props, _ =>
  //     _.myCoordinates.latitudeOne.toString()
  //   );

  //   let lngOrigin = idx(this.props, _ =>
  //     _.myCoordinates.longitudeOne.toString()
  //   );
  //   let latDest = idx(this.props, _ =>
  //     _.newServiceDetails.expert_latitude.toString()
  //   );

  //   let lngDest = idx(this.props, _ =>
  //     _.newServiceDetails.expert_longitude.toString()
  //   );

  //   let url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${latOrigin},${lngOrigin}&destinations=${latDest},${lngDest}&mode=driving&language=en-EN&key=AIzaSyAb8v0MDaUBY_vpHjZW6Jc0Pa98cCYifEo`;
  //   fetch(url)
  //     .then(response => response.json())
  //     .then(responseJson => {
  //       if (responseJson.rows && responseJson.rows.length > 0) {
  //         this.setState({
  //           duration: responseJson.rows[0].elements[0].duration.text,
  //           arrival: responseJson.rows[0].elements[0].duration.value
  //         });
  //       }
  //     })
  //     .catch(e => {});
  // };

  keyboardDidShow = () => {
    this.setState({ tabbar: 0.2 });
  };

  keyboardDidHide = () => {
    this.setState({ tabbar: 0.1 });
  };

  handleBackPress = () => {
    return true;
  };

  // Render Homescreen
  goHome = () => {
    this.setState({ selectedScreen: "Home" });
  };

  // Render History
  goHistory = () => {
    this.setState({ selectedScreen: "History" });
  };

  // Render Add
  goAdd = () => {
    this.setState({ selectedScreen: "Add" });
  };

  // Render chat
  goChat = () => {
    this.setState({ selectedScreen: "Chat" });
    this.props.notificationDot(false);
  };

  // Render profile
  goProfile = () => {
    this.setState({ selectedScreen: "Profile" });
  };

  // Navigating to current location
  goBack = () => {
    Navigation.pop(this.props.componentId);
  };

  // Navigating to expert profile
  expertProfile = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "ExpertProfile",
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
          expert: this.props.newServiceDetails,
          openRequestModal: res => {
            if (res) {
              this.props.serviceRequestAccepted(this.props.newServiceDetails);
            }
          }
        }
      }
    });
    this.closeRequestModal();
  };

  // Navigating to chat screen

  goToChat = () => {
    // const { expertDetails, user } = this.props;
    Navigation.push(this.props.componentId, {
      component: {
        name: "UserChat",
        passProps: {
          fromCurrent: true,
          openRequestModal: res => {
            if (res) {
              this.props.serviceRequestAccepted(this.props.newServiceDetails);
            }
          }
        },
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
        }
      }
    });

    this.closeRequestModal();
  };

  // Navigating to live tracking screen
  liveTracking = () => {
    this.closeRequestModal();
    const { expertDetails, newUser } = this.props;
    this.props.getChatId(expertDetails.expert_id, response => {
      this.setState({
        chatId: response
      });
      let chatData = {
        receiver: {
          id: idx(this.props, _ => _.expertDetails.receiver.id),
          fullname: idx(this.props, _ => _.expertDetails.receiver.fullname)
        },
        sender: {
          id: newUser.id,
          fullname: idx(this.props, _ => _.newUser.fullname)
        },
        id: response
      };
      this.props.serviceRequestAccepted2(chatData);

      this.requestTimer = setTimeout(() => {
        Navigation.push(this.props.componentId, {
          component: {
            name: "LiveTracking",
            options: {
              statusBar: {},
              topBar: {
                visible: false,
                height: 0
              }
            },
            passProps: {
              openRequestModal: res => {
                if (res) {
                  this.props.serviceRequestAccepted(
                    this.props.newServiceDetails
                  );
                }
              }
            },
            animations: {
              push: {
                waitForRender: true
              }
            }
          }
        });
      }, 300);
    });
  };

  cancelRequestModal = () => {
    this.props.getScheduledservices();
    this.setState({ cancelIs: true });
  };

  // Logout
  logout = () => {
    this.props.sessionManagement(false);
    this.props.clearSession();

    this.logoutTimer = setTimeout(() => {
      this.props.logout(this.props.componentId);
    }, 200);
  };

  closeRequestModal = () => {
    this.props.getScheduledservices();
    this.props.declineServiceRequest();
    this.props.searchingModalStatus(false);
    this.setState({ cancelIs: false });
  };

  extraData = (date, time, address) => {
    this.setState({
      requestDate: date,
      requestTime: time,
      requestAddress: address
    });
  };

  // Cancel current request
  cancelCurrentRequest = () => {
    this.props.cancelRequest({
      expert_id: this.props.newServiceDetails.expert_id,
      request_id: this.props.newServiceDetails.request_id,
      reason: ""
    });

    this.setState({ cancelIs: false }, () => {
      this.props.declineServiceRequest();
    });
  };

  render() {
    const { requestResponse } = this.state;
    let onGoing = idx(this.props, _ =>
      _.scheduledServices.data.filter(item => item.status === 3)
    );
    let timerProps = onGoing && onGoing.slice(onGoing.length - 1)[0];
    let expertMobile = idx(
      this.props,
      _ => _.expertMobile.data[0].mobile_number
    );
    // let introductionIs =
    //   this.state.selectedScreen === "Intro" ||
    //   this.state.selectedScreen === "MoreInfo"
    //     ? true
    //     : false;
    return (
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: moderateScale(25)
        }}
      >
        {this.props.userLoader ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color={"#1F5BA8"} />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <View style={{ flex: 0.92 }}>
              {/* Displaying home component */}
              {this.state.selectedScreen === "Home" && (
                <Home
                  address={this.props.selectedAddress}
                  componentId={this.props.componentId}
                  extraData={this.extraData}
                />
              )}
              {/* Displaying home component */}
              {this.state.selectedScreen === "Home1" && (
                <Home
                  address={this.props.selectedAddress}
                  componentId={this.props.componentId}
                  extraData={this.extraData}
                />
              )}
              {/* Displaying history component */}
              {this.state.selectedScreen === "History" && (
                <History
                  logout={this.logout}
                  componentId={this.props.componentId}
                />
              )}
              {/* Displaying add component */}
              {this.state.selectedScreen === "Add" && (
                <Add
                  logout={this.logout}
                  componentId={this.props.componentId}
                  goToHome={this.goHome}
                />
              )}
              {/* Displaying chat component */}
              {this.state.selectedScreen === "Chat" && (
                <Chat
                  logout={this.logout}
                  componentId={this.props.componentId}
                />
              )}
              {/* Displaying profile component */}
              {this.state.selectedScreen === "Profile" && (
                <Profile
                  logout={this.logout}
                  componentId={this.props.componentId}
                />
              )}

              {/* {this.state.selectedScreen === "Intro" && (
                <Introduction proceed={this.proceed} share={this.share} />
              )} */}

              {/* {this.state.selectedScreen === "MoreInfo" && (
                <MoreInfo
                  toLogin={this.getStarted}
                  submitTicket={this.submitTicket}
                  helpCenter={this.helpCenter}
                />
              )} */}
            </View>

            <View style={[styles.tabParent, { flex: this.state.tabbar }]}>
              <TouchableOpacity
                onPress={this.goHome}
                style={styles.tabIconHolder}
              >
                <Image
                  resizeMode={"contain"}
                  source={require("../../assets/img/home.png")}
                  style={[
                    styles.tabIcon,
                    {
                      tintColor:
                        this.state.selectedScreen === "Home" ? "#1F5BA8" : null
                    }
                  ]}
                />
                <Text style={styles.tabTitle}>{strings.dashboard.home}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.goHistory}
                style={styles.tabIconHolder}
              >
                <Image
                  resizeMode={"contain"}
                  style={[
                    styles.tabIcon,
                    {
                      tintColor:
                        this.state.selectedScreen === "History"
                          ? "#1F5BA8"
                          : null
                    }
                  ]}
                  source={require("../../assets/img/history.png")}
                />
                <Text style={styles.tabTitle}>{strings.dashboard.history}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.goAdd}
                style={styles.tabIconHolder}
              >
                <Image
                  style={{
                    height: moderateScale(50),
                    width: moderateScale(50)
                  }}
                  resizeMode={"contain"}
                  source={require("../../assets/img/add.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.goChat}
                style={styles.tabIconHolder}
              >
                {this.props.notificationAre ? (
                  <Image
                    resizeMode={"contain"}
                    style={[
                      {
                        height: moderateScale(6),
                        width: moderateScale(6),
                        marginLeft: moderateScale(15)
                      },
                      {
                        tintColor: this.state.selectedScreen === "red"
                      }
                    ]}
                    source={require("../../assets/img/notification.png")}
                  />
                ) : null}
                <Image
                  resizeMode={"contain"}
                  style={[
                    styles.tabIcon,
                    {
                      tintColor:
                        this.state.selectedScreen === "Chat" ? "#1F5BA8" : null
                    }
                  ]}
                  source={require("../../assets/img/chat.png")}
                />
                <Text style={styles.tabTitle}>{strings.dashboard.chat}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.goProfile}
                style={styles.tabIconHolder}
              >
                <Image
                  resizeMode={"contain"}
                  style={[
                    styles.tabIcon,
                    {
                      tintColor:
                        this.state.selectedScreen === "Profile"
                          ? "#1F5BA8"
                          : null
                    }
                  ]}
                  source={require("../../assets/img/profile.png")}
                />
                <Text style={styles.tabTitle}>{strings.dashboard.profile}</Text>
              </TouchableOpacity>
            </View>
            {/* Displaying cancel job */}
            <ModalSwiper
              animationInTiming={1}
              animationOutTiming={1}
              isVisible={this.props.serviceModal}
              style={{ justifyContent: "flex-end", margin: 0 }}
              onSwipeComplete={() => this.closeRequestModal()}
              hasBackdrop={false}
              swipeDirection={null}
            >
              {this.state.cancelIs ? (
                <View style={{ flex: 1, backgroundColor: "#0009" }}>
                  <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={this.closeRequestModal}
                  />
                  <View
                    style={{
                      height: moderateScale(250),
                      backgroundColor: "white",
                      paddingHorizontal: moderateScale(13),
                      elevation: Platform.OS == "ios" ? 1 : 10,
                      shadowOffset: {
                        width: Platform.OS == "ios" ? -0.5 : -15,
                        height: Platform.OS == "ios" ? -0.3 : -0.2
                      },
                      shadowColor: "black",
                      shadowOpacity: 0.2
                    }}
                  >
                    <View
                      style={{
                        flex: 0.3,
                        borderBottomColor: colors.GREY,
                        borderBottomWidth: 0.2,
                        paddingTop: moderateScale(10)
                      }}
                    >
                      <Text
                        style={{
                          fontSize: moderateScale(18),
                          fontFamily: fonts.LATOBOLD,
                          color: colors.BLACK,
                          textAlign: "center"
                        }}
                      >
                        {strings.dashboard.cancel}
                      </Text>
                      <Text
                        style={{
                          fontSize: moderateScale(12),
                          fontFamily: fonts.LATOMEDIUM,
                          color: colors.BLACK,
                          textAlign: "center"
                        }}
                      >
                        {strings.dashboard.warn}
                      </Text>
                    </View>
                    <View style={{ flex: 0.7 }}>
                      <View
                        style={{
                          flex: 0.3,
                          borderBottomColor: colors.GREY,
                          borderBottomWidth: 0.2
                        }}
                      >
                        <View
                          style={{
                            flex: 0.5,
                            flexDirection: "row",
                            paddingTop: moderateScale(10)
                          }}
                        >
                          <View style={{ flex: 0.7, justifyContent: "center" }}>
                            <Text
                              style={{
                                fontSize: moderateScale(12),
                                fontFamily: fonts.LATOMEDIUM,
                                color: colors.GREY
                              }}
                            >
                              {idx(
                                this.props,
                                _ => _.newServiceDetails.service_parent_name
                              )}
                            </Text>
                          </View>
                          <TouchableOpacity
                            style={{ flex: 0.3, justifyContent: "center" }}
                          >
                            <Text
                              style={{
                                fontSize: moderateScale(15),
                                fontFamily: fonts.LATOMEDIUM,
                                color: colors.BLUE,
                                textAlign: "right"
                              }}
                            >
                              {strings.dashboard.change}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View
                        style={{
                          flex: 0.3,
                          borderBottomColor: colors.GREY,
                          borderBottomWidth: 0.2
                        }}
                      >
                        <View
                          style={{
                            flex: 0.5,
                            flexDirection: "row",
                            paddingTop: moderateScale(10)
                          }}
                        >
                          <View
                            style={{
                              flex: 0.7,
                              justifyContent: "center"
                            }}
                          >
                            <Text
                              style={{
                                fontSize: moderateScale(12),
                                fontFamily: fonts.LATOMEDIUM,
                                color: colors.GREY
                              }}
                              numberOfLines={1}
                            >
                              {idx(
                                this.props,
                                _ => _.newServiceDetails.formatted_address
                              )}
                            </Text>
                          </View>
                          <TouchableOpacity
                            style={{ flex: 0.3, justifyContent: "center" }}
                          >
                            <Text
                              style={{
                                fontSize: moderateScale(15),
                                fontFamily: fonts.LATOMEDIUM,
                                color: colors.BLUE,
                                textAlign: "right"
                              }}
                            >
                              {strings.dashboard.change}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View
                        style={{
                          flex: 0.3,
                          flexDirection: "row",
                          paddingVertical: moderateScale(10)
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => this.setState({ cancelIs: false })}
                          style={{
                            flex: 0.48,
                            backgroundColor: colors.WHITE,
                            borderRadius: moderateScale(5),
                            justifyContent: "center",
                            alignItems: "center",
                            borderWidth: 0.7,
                            borderColor: colors.BLUE
                          }}
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
                          onPress={this.cancelCurrentRequest}
                          style={{
                            flex: 0.48,
                            backgroundColor: colors.BLUE,
                            borderRadius: moderateScale(5),

                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
                          <Text
                            style={{
                              fontSize: moderateScale(15),
                              fontFamily: fonts.LATOBOLD,
                              color: colors.WHITE
                            }}
                          >
                            {strings.dashboard.yes}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              ) : (
                <View style={{ flex: 1, backgroundColor: "#0009" }}>
                  <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={this.closeRequestModal}
                  />

                  <View
                    style={{
                      backgroundColor: "white",
                      paddingVertical: moderateScale(10),
                      height: moderateScale(370),
                      paddingHorizontal: moderateScale(13),
                      justifyContent: "space-evenly"
                    }}
                  >
                    <View
                      style={{
                        flex: 0.25,
                        flexDirection: "row"
                      }}
                    >
                      <View
                        style={{
                          flex: 0.3,
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <View
                          style={{
                            height: moderateScale(70),
                            width: moderateScale(70),
                            borderRadius: moderateScale(200),
                            overflow: "hidden",
                            borderWidth: 1,
                            borderColor: colors.BLUE,
                            justifyContent: "center"
                          }}
                        >
                          {idx(
                            this.props,
                            _ => _.newServiceDetails.expert_image
                          ) ? (
                            <CachedImage
                              source={{
                                uri: `${PROFILE_IMG_URL}${idx(
                                  this.props,
                                  _ => _.newServiceDetails.expert_image
                                )}`
                              }}
                              resizeMode={"contain"}
                              style={{
                                height: moderateScale(70),
                                width: moderateScale(70)
                              }}
                            />
                          ) : (
                            <Image
                              style={{
                                height: moderateScale(40),
                                width: moderateScale(40),
                                alignSelf: "center"
                              }}
                              source={require("../../assets/img/logo.png")}
                              resizeMode={"contain"}
                            />
                          )}
                        </View>
                      </View>
                      <View style={{ flex: 0.7 }}>
                        <View
                          style={{
                            flex: 0.4,

                            flexDirection: "row"
                          }}
                        >
                          <View style={{ flex: 0.5 }}>
                            <Text
                              style={{
                                fontFamily: fonts.LATOBOLD,
                                fontSize: moderateScale(16),
                                color: colors.BLUE
                              }}
                            >
                              {idx(
                                this.props,
                                _ => _.newServiceDetails.expert_name
                              )}
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 0.5,
                              flexDirection: "row",
                              justifyContent: "space-around",
                              alignItems: "center"
                            }}
                          >
                            <TouchableOpacity
                              onPress={this.expertProfile}
                              style={{
                                flex: 0.5,
                                justifyContent: "center",
                                alignItems: "center"
                              }}
                            >
                              <Image
                                source={require("../../assets/img/focus.png")}
                                resizeMode={"contain"}
                                style={{
                                  height: moderateScale(20),
                                  width: moderateScale(20)
                                }}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={this.goToChat}
                              style={{
                                flex: 0.5,
                                justifyContent: "center",
                                alignItems: "center"
                              }}
                            >
                              <Image
                                source={require("../../assets/img/phone-call.png")}
                                resizeMode={"contain"}
                                style={{
                                  height: moderateScale(20),
                                  width: moderateScale(20)
                                }}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => {
                                Linking.openURL(`tel:${expertMobile}`);
                              }}
                              style={{
                                flex: 0.5,
                                justifyContent: "center",
                                alignItems: "center"
                              }}
                            >
                              <Icon
                                size={moderateScale(25)}
                                name={"phone"}
                                color={colors.BLUE}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                        <View style={{ flex: 0.3 }}>
                          <Text
                            style={{
                              fontFamily: fonts.LATOBOLD,
                              fontSize: moderateScale(14)
                            }}
                          >
                            {idx(
                              this.props,
                              _ => _.newServiceDetails.expert_services > 0
                            )
                              ? idx(
                                  this.props,
                                  _ =>
                                    _.newServiceDetails.expert_feedback
                                      .toString()
                                      .split(".")[0]
                                )
                              : "0"}
                            %{" "}
                            <Text
                              style={{
                                fontFamily: fonts.LATOREGULAR,
                                fontSize: moderateScale(14)
                              }}
                            >
                              {strings.dashboard.feedback}{" "}
                            </Text>
                          </Text>
                        </View>
                        <View style={{ flex: 0.3 }}>
                          <Text
                            style={{
                              fontFamily: fonts.LATOREGULAR,
                              fontSize: moderateScale(12)
                            }}
                            numberOfLines={1}
                          >
                            {strings.dashboard.arriving}{" "}
                            {moment()
                              .add(
                                this.props.arrivalTime &&
                                  this.props.arrivalTime.arrival,
                                "s"
                              )
                              .format("hh:mm a")}{" "}
                            <Text>
                              (
                              {this.props.arrivalTime
                                ? this.props.arrivalTime &&
                                  this.props.arrivalTime.duration
                                : "1 min"}{" "}
                              {strings.dashboard.away})
                            </Text>
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        flex: 0.2,
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          this.liveTracking();
                        }}
                        style={{
                          height: moderateScale(45),
                          width: moderateScale(340),
                          backgroundColor: "white",
                          borderRadius: moderateScale(30),
                          alignItems: "center",
                          justifyContent: "center",
                          borderWidth: 1
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: fonts.LATOBOLD,
                            fontSize: moderateScale(14)
                          }}
                        >
                          {strings.dashboard.live}{" "}
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={{ flex: 0.4 }}>
                      <View
                        style={{
                          flex: 0.4,
                          borderBottomColor: colors.GREY,
                          borderBottomWidth: 0.4,
                          alignItems: "center",
                          justifyContent: "space-between",
                          flexDirection: "row"
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: fonts.LATOREGULAR,
                            fontSize: moderateScale(14),
                            color: colors.GREY
                          }}
                        >
                          {idx(
                            this.props,
                            _ => _.newServiceDetails.service_parent_name
                          )}{" "}
                          >{" "}
                          {idx(
                            this.props,
                            _ => _.newServiceDetails.job_category
                          )}
                          {"    "}
                        </Text>

                        <Text
                          style={{
                            fontFamily: fonts.LATOBOLD,
                            fontSize: moderateScale(14),
                            color: colors.BLUE
                          }}
                        >
                          £{idx(this.props, _ => _.newServiceDetails.job_cost)}/
                          {strings.dashboard.hour}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 0.6
                        }}
                      >
                        <View
                          style={{
                            flex: 0.5,
                            flexDirection: "row",
                            alignItems: "center"
                          }}
                        >
                          <View style={{ flex: 0.1 }}>
                            <Image
                              source={require("../../assets/img/calenderB.png")}
                              resizeMode={"contain"}
                              style={{
                                height: moderateScale(20),
                                width: moderateScale(20)
                              }}
                            />
                          </View>
                          <View style={{ flex: 0.7 }}>
                            <Text
                              style={{
                                fontFamily: fonts.LATOREGULAR,
                                fontSize: moderateScale(14),
                                color: colors.GREY
                              }}
                            >
                              {moment
                                .utc(requestResponse.booking_date)
                                .local()
                                .format("MMM DD, YYYY, hh:mmA")}
                            </Text>
                          </View>

                          <View style={{ flex: 0.2 }}>
                            <Text
                              style={{
                                fontFamily: fonts.LATOREGULAR,
                                fontSize: moderateScale(14),
                                color: colors.BLUE,
                                textAlign: "right"
                              }}
                            >
                              {strings.dashboard.change}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flex: 0.5,
                            flexDirection: "row",
                            alignItems: "center"
                          }}
                        >
                          <View style={{ flex: 0.1 }}>
                            <Image
                              source={require("../../assets/img/locationB.png")}
                              resizeMode={"contain"}
                              style={{
                                height: moderateScale(20),
                                width: moderateScale(20)
                              }}
                            />
                          </View>
                          <View style={{ flex: 0.7 }}>
                            <Text
                              style={{
                                fontFamily: fonts.LATOREGULAR,
                                fontSize: moderateScale(14),
                                color: colors.GREY
                              }}
                              numberOfLines={1}
                            >
                              {idx(
                                this.props,
                                _ => _.newServiceDetails.formatted_address
                              )}
                            </Text>
                          </View>

                          <View style={{ flex: 0.2 }}>
                            <Text
                              style={{
                                fontFamily: fonts.LATOREGULAR,
                                fontSize: moderateScale(14),
                                color: colors.BLUE,
                                textAlign: "right"
                              }}
                            >
                              {strings.dashboard.change}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        flex: 0.15,

                        justifyContent: "flex-end",
                        paddingBottom: moderateScale(12)
                      }}
                    >
                      <View
                        style={{
                          height: moderateScale(45)
                        }}
                      >
                        <View style={{ flex: 1, flexDirection: "row" }}>
                          <View
                            style={{
                              flex: 0.48,
                              borderWidth: 1,
                              borderColor: colors.BLUE,
                              borderRadius: moderateScale(3),
                              overflow: "hidden"
                            }}
                          >
                            <TouchableOpacity
                              onPress={this.cancelRequestModal}
                              style={{
                                backgroundColor: colors.WHITE,
                                justifyContent: "center",
                                alignItems: "center",
                                flex: 1
                              }}
                            >
                              <Text
                                style={{
                                  color: colors.BLUE,
                                  fontSize: moderateScale(15),
                                  fontFamily: fonts.LATOBOLD
                                }}
                              >
                                {strings.dashboard.cancel1}
                              </Text>
                            </TouchableOpacity>
                          </View>
                          <View style={{ flex: 0.04 }} />
                          <View
                            style={{
                              flex: 0.48,
                              borderWidth: 1,
                              borderColor: colors.BLUE,
                              borderRadius: moderateScale(3),
                              overflow: "hidden"
                            }}
                          >
                            <TouchableOpacity
                              disabled={this.props.loader ? true : false}
                              onPress={this.closeRequestModal}
                              style={{
                                backgroundColor: colors.BLUE,
                                justifyContent: "center",
                                alignItems: "center",
                                flex: 1
                              }}
                            >
                              <Text
                                style={{
                                  color: colors.WHITE,
                                  fontSize: moderateScale(15),
                                  fontFamily: fonts.LATOBOLD
                                }}
                              >
                                {strings.dashboard.ok}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            </ModalSwiper>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  tabIconHolder: { flex: 0.2, justifyContent: "center", alignItems: "center" },
  tabParent: {
    flexDirection: "row",
    borderTopWidth: 0.5,
    backgroundColor: "white",
    flex: 0.17
  },
  tabTitle: {
    fontSize: moderateScale(11),
    paddingTop: moderateScale(3)
  },
  tabIcon: {
    height: moderateScale(23),
    width: moderateScale(23)
  }
});

function mapStateToProps(state) {
  return {
    expertDetails: state.socket.newServiceDetails,
    serviceModal: state.socket.serviceModal,
    notificationAre: state.socket.notificationsAre,
    myCoords: state.userList.myCoords,
    userId:
      idx(state, _ => _.user.userData.data.id) ||
      idx(state, _ => _.signup.data.data.user_id),
    user:
      idx(state, _ => _.user.userData.data) ||
      idx(state, _ => _.signup.data.data),
    zenddesk_id: idx(state, _ => _.userList.userDetails.data[0].zenddesk_id),
    newUser: idx(state, _ => _.userList.userDetails.data[0]),
    myCoordinates: state.userList.myCoords,
    scheduledServices: state.userList.scheduledServices,
    newRequestData: state.socket.serviceRequestAccepted,
    newServiceDetails: state.socket.newServiceDetails,
    myLanguage: state.language.language.title,
    expertMobile: state.userList.expertDetails,
    userIntroStatus: state.userList.userDetails,
    userName: idx(state, _ => _.userList.userDetails.data[0].fullname),
    userLoader: state.userList.userLoader,
    arrivalTime: state.userList.arrivalTime
  };
}

export default connect(
  mapStateToProps,
  {
    logout,
    sessionManagement,
    cancelRequest,
    serviceRequestAccepted,
    getScheduledservices,
    declineServiceRequest,
    notificationDot,
    customerInvoice,
    getUserDetails,
    getWalletAmount,
    getCards,
    serviceRequestAccepted2,
    chatList,
    clearSession,
    getChatId,
    checkPaymentMethod,
    listRecentTransactions,
    searchingModalStatus,
    getNotificationStatus,
    createZendeskUser,
    getMyReviews,
    getServices,
    getExpertDetails,
    serviceDetails,
    introductionStatus,
    refreshUserDetails,
    getCommission
  }
)(Dashboard);
