// Container to dispaly all Services and their sub categories

import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Platform,
  FlatList,
  ScrollView,
  LayoutAnimation,
  NativeModules,
  BackHandler
} from "react-native";
import { Navigation } from "react-native-navigation";
import { connect } from "react-redux";
import { moderateScale } from "../../utilities/ResponsiveFonts";
import Permissions from "react-native-permissions";
import {
  getSubCategories,
  getServices,
  notificationToken,
  getUserDetails,
  introductionStatus
} from "../../actions/list/listAction";
import styles from "../../constants/styleSheets/others/services";
import { IMAGE_URL } from "../../constants/url";
import idx from "idx";
import ModalSwiper from "react-native-modal";
import { CustomAlert } from "../../components/customAlert";
import { sessionManagement } from "../../actions/auth/signupActions";
import { colors, fonts } from "../../constants/theme";
import strings from "../../constants/language";
import Introduction from "../../components/introduction";
import { MoreInfo } from "../../components/moreInfo";
import Share from "react-native-share";

const { UIManager } = NativeModules;
const CustomLayoutAnimation = {
  duration: 300,
  create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity
  },
  update: {
    type: LayoutAnimation.Types.easeIn
  }
};

class Services extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationAccess: null,
      locationAccessIs: null,
      subCategoryModal: false,
      categoryTitle: "",
      subCategory: null,
      noCategoryModal: false,
      selectedId: null,
      selectedItem: "",
      showAlert: false,
      index: 0,
      mainCategoryData: null,
      subCategoryData: null,
      step: 1
    };
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  componentWillMount = () => {
    this.props.getUserDetails(response => {});
    socket.onSocketConnect(this.props.userId || 0); // Connecting to socket
    this.props.sessionManagement(true); // Session management
    this.props.getSubCategories(1); // Getting sub categories
    this.props.getServices(); // Requesting all services
    this.setNotifications(); // Setting notifications
    this.getPermissions(); // getting all permissions
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  // Navigating to Signin
  handleBackPress = () => {
    // Navigation.push(this.props.componentId, {
    //   component: {
    //     name: "SignIn",
    //     options: {
    //       statusBar: {},
    //       topBar: {
    //         visible: false,
    //         height: 0
    //       }
    //     }
    //   }
    // });
    return false;
  };

  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  confirmAlert = () => {
    this.setState({
      showAlert: false
    });
    if (Platform.OS === "ios") {
      setTimeout(() => {
        Permissions.openSettings();
      }, 400);
    } else {
      setTimeout(() => {
        this.androidPermission();
      }, 400);
    }
  };

  setNotifications = () => {
    if (!this.props.notificationData) {
      notification.getUserNotificationsDetail(userDetails => {
        let data = {
          device_token: userDetails.pushToken,
          device_type: Platform.OS === "android" ? "ANDROID" : "IOS",
          player_id: userDetails.userId,
          user_id: this.props.userId
        };
        this.props.notificationToken(data);
      });
    } else {
      this.props.notificationToken(this.props.notificationData);
    }
  };
  back = () => {
    if (this.props.fromDashboard) {
      // Navigating to dashboard
      Navigation.pop(this.props.componentId);
    } else {
      // Navigating to dashboard
      Navigation.push(this.props.componentId, {
        component: {
          name: "Dashboard",
          options: {
            statusBar: {},
            topBar: {
              visible: false,
              height: 0
            }
          }
        }
      });
    }
  };

  next = () => {
    if (this.state.subCategory) {
      Permissions.check("location").then(response => {
        this.setState({ locationAccessIs: response }, () => {
          this.currentLocation();
        });
      });
    } else {
      this.setState({ noCategoryModal: true });
    }
  };

  currentLocation = () => {
    if (this.state.locationAccessIs == "authorized") {
      // Navigating to current location
      Navigation.push(this.props.componentId, {
        component: {
          name: "CurrentLocation",
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
            fromHomescreen: false,
            mainCategoryData: this.state.mainCategoryData,
            subCategoryData: this.state.subCategoryData
          }
        }
      });
    } else {
      this.setState({ showAlert: true });
    }
  };

  androidPermission = () => {
    Permissions.request("location").then(response => {
      this.setState({ locationAccess: response });
    });
  };

  renderItem = (data, i) => {
    let { item } = data;
    return (
      <TouchableOpacity
        onPress={() => this.toggleSubview(item)}
        style={styles.serviceItem}
      >
        <View
          style={[
            styles.serviceImage,
            {
              backgroundColor:
                this.state.selectedId === item.id ? "#1F5BA8" : "#cfe6ff",
              borderColor: "#0d5da8"
            }
          ]}
        >
          <View
            style={{
              flex: 0.65,
              justifyContent: "center",
              alignItems: "center",
              paddingTop: moderateScale(20)
            }}
          >
            <Image
              resizeMode={"contain"}
              style={{
                height: moderateScale(75),
                width: moderateScale(75),
                tintColor:
                  this.state.selectedId === item.id ? "white" : "#0d5da8"
              }}
              defaultSource={require("../../assets/img/loader.png")}
              source={{
                uri: `${IMAGE_URL}${item.service_image}`
              }}
            />
          </View>
          <View style={styles.serviceText}>
            <Text
              style={[
                styles.serviceHeader,
                {
                  color:
                    this.state.selectedId === item.id ? "white" : "#0d5da8",
                  textAlign: "center"
                }
              ]}
            >
              {item.service}
            </Text>
            {this.state.selectedId === item.id ? (
              <Text
                numberOfLines={1}
                style={[
                  styles.serviceHeader,
                  {
                    color:
                      this.state.selectedId === item.id ? "white" : "#0d5da8"
                  }
                ]}
              >
                {this.state.selectedItem}
              </Text>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderPlaceholder = i => <View style={styles.item} key={i} />;

  // Requesting location permissions.
  getPermissions = () => {
    Permissions.request("location").then(response => {
      this.setState({ locationAccess: response });
    });
  };

  _keyExtractor = (item, index) => item.id;

  toggleSubview = data => {
    this.props.getSubCategories(data.id);
    this.setState({
      subCategoryModal: !this.state.subCategoryModal,
      selectedTitle: data.service,
      mainCategoryData: data
    });
  };

  // Displaying sub categories of service
  renderSubcategories = data => {
    LayoutAnimation.configureNext(CustomLayoutAnimation);
    return (
      <TouchableOpacity
        key={Math.random().toString()}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingRight: moderateScale(5),
          paddingVertical: moderateScale(10),
          backgroundColor:
            this.state.subCategory === data.service
              ? colors.BLUE
              : colors.WHITE,
          borderRadius: moderateScale(5),
          paddingLeft: moderateScale(5)
        }}
        onPress={() => {
          this.setState({
            subCategoryModal: !this.state.subCategoryModal,
            subCategory: data.service,
            selectedId: data.parent_id,
            selectedItem: data.service,
            subCategoryData: data
          });
        }}
      >
        <Text
          style={{
            fontSize: moderateScale(15),
            color:
              this.state.subCategory === data.service
                ? colors.WHITE
                : colors.DGREY,
            fontFamily: fonts.LATOMEDIUM
          }}
        >
          {data.service}
        </Text>
        <Text
          style={{
            fontSize: moderateScale(15),
            color:
              this.state.subCategory === data.service
                ? colors.WHITE
                : colors.DGREY,
            fontFamily: fonts.LATOMEDIUM
          }}
        >
          £ {data.price}/hr
        </Text>
      </TouchableOpacity>
    );
  };

  toLogin = () => {
    this.setState({ step: 3 });
    this.props.introductionStatus();
  };

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
    this.setState({ step: 2 });
  };

  renderIntroduction = () => {
    return <Introduction proceed={this.proceed} share={this.share} />;
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

  renderGetStarted = () => {
    return (
      <MoreInfo
        toLogin={this.toLogin}
        submitTicket={this.submitTicket}
        helpCenter={this.helpCenter}
      />
    );
  };

  renderAllServices = () => {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{strings.services.available}</Text>
          </View>
          {/* Displaying all available services */}
          <View style={styles.gridView}>
            {this.props.services && this.props.services.length > 0 ? (
              <FlatList
                renderItem={this.renderItem}
                extraData={this.state}
                data={this.props.services}
                numColumns={2}
                key={Math.random.toString()}
                keyExtractor={this._keyExtractor}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <ActivityIndicator style={{ alignSelf: "center" }} />
            )}
          </View>

          <View style={styles.buttonContainer}>
            <View style={styles.buttonChild}>
              <View style={styles.authButtons}>
                <TouchableOpacity
                  onPress={this.back}
                  style={[styles.loginBtn, styles.loginBtnText]}
                >
                  <Text style={[styles.btnText, styles.backText]}>
                    {strings.services.skip}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.space} />
              <View style={styles.authButtons}>
                <TouchableOpacity
                  onPress={this.next}
                  style={[styles.loginBtn, { marginLeft: moderateScale(5) }]}
                >
                  <Text style={styles.btnText}>{strings.services.next}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        {/* Sub category modal */}
        <ModalSwiper
          animationInTiming={1}
          animationOutTiming={1}
          isVisible={this.state.subCategoryModal}
          style={{ justifyContent: "flex-end", margin: 0 }}
          swipeDirection={null} // onSwipeComplete={() => this.setState({ subCategoryModal: false })}
          hasBackdrop={false}
        >
          <View style={[styles.subCategoryModal]}>
            <TouchableOpacity
              style={{ flex: 0.6, backgroundColor: "transparent" }}
              onPress={() => {
                this.setState({ subCategoryModal: false });
              }}
            />

            <View
              style={{
                backgroundColor: "white",
                paddingBottom: moderateScale(10),
                flex: 0.4
              }}
            >
              <View style={styles.subCategoryHeader}>
                <Text style={styles.subCategoryText}>
                  {strings.services.selectSub}
                </Text>
              </View>
              <View style={[styles.subCategoryTitle]}>
                <Text style={styles.subCategoryTitleText}>
                  {this.state.selectedTitle}
                </Text>

                {this.props.loadingSub ? (
                  <ActivityIndicator />
                ) : idx(this.props, _ => _.subCategories.data.length) > 0 ? (
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                      paddingVertical: moderateScale(5)
                    }}
                  >
                    {idx(this.props, _ => _.subCategories.data).map(item => {
                      return this.renderSubcategories(item);
                    })}
                  </ScrollView>
                ) : null}
              </View>
            </View>
          </View>
        </ModalSwiper>
        {/* All category modal */}
        <ModalSwiper
          animationInTiming={1}
          animationOutTiming={1}
          isVisible={this.state.noCategoryModal}
          style={{
            justifyContent: "flex-end",
            margin: 0
          }}
          swipeDirection={null}
          onSwipeComplete={() => this.setState({ noCategoryModal: false })}
          hasBackdrop={false}
        >
          <View style={styles.subCategoryModal}>
            <TouchableOpacity
              style={[styles.blurView, { flex: 0.7 }]}
              onPress={() => {
                this.setState({ noCategoryModal: false });
              }}
            />
            <View style={[styles.subCategoryListing, { flex: 0.3 }]}>
              <View style={styles.subCategoryHeader}>
                <Text style={styles.subCategoryModalText}>
                  {strings.services.selectCat}
                </Text>
              </View>
              <View style={styles.modalTextTwo}>
                <Text style={styles.modalSubtitle}>
                  {strings.services.selectBoth}
                </Text>
              </View>
              <View style={styles.okContainer}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ noCategoryModal: false });
                  }}
                  style={styles.okButton}
                >
                  <Text style={styles.okText}> {strings.services.ok}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View />
        </ModalSwiper>
        {/* Custom alert component */}
        <CustomAlert
          show={this.state.showAlert}
          hideAlert={this.hideAlert}
          title={"Location access is required"}
          messsage={"Please enable location access from settings"}
          confirmText={"Settings"}
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.confirmAlert();
          }}
        />
      </View>
    );
  };

  renderBody = () => {
    let userStatus = idx(this.props, _ => _.userStatus.data[0].introduction);
    if (userStatus === 0 && this.state.step == 1 && !this.props.fromDashboard) {
      return this.renderIntroduction();
    } else if (
      userStatus === 0 &&
      this.state.step == 2 &&
      !this.props.fromDashboard
    ) {
      return this.renderGetStarted();
    } else {
      return this.renderAllServices();
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.safeView}>
        {this.renderAllServices()}
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    services: state.userList.listData,
    subCategories: state.userList.subCategories,
    loader: state.userList.loading,
    userId:
      idx(state, _ => _.user.userData.data.id) ||
      idx(state, _ => _.signup.data.data.user_id),
    notificationDetails: state.notifications.notificationDetails,
    notificationData: state.notifications.notificationData,
    loadingSub: state.userList.loadingSub,
    userStatus: state.userList.userDetails,
    userName: idx(state, _ => _.userList.userDetails.data[0].fullname)
  };
}

export default connect(
  mapStateToProps,
  {
    getServices,
    getSubCategories,
    sessionManagement,
    notificationToken,
    getUserDetails,
    introductionStatus
  }
)(Services);
