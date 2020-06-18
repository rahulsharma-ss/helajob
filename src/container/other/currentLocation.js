import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
  Image,
  LayoutAnimation,
  NativeModules,
  Platform,
  FlatList
} from "react-native";
import { Navigation } from "react-native-navigation";
import { connect } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import Geocoder from "react-native-geocoder";
import styles from "../../constants/styleSheets/others/currentLocation";
import MapSearch from "../../components/mapSearch";
import { moderateScale } from "../../utilities/ResponsiveFonts";
import { colors, fonts } from "../../constants/theme";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import { RNToasty } from "react-native-toasty";
import ModalSwiper from "react-native-modal";
import idx from "idx";
import { ServiceRequestOne } from "../../components/serviceRequests/serviceRequestOne";
import { ServiceRequestTwo } from "../../components/serviceRequests/serviceRequestTwo";
import { ServiceRequestThree } from "../../components/serviceRequests/serviceRequestThree";
import { ServiceRequestFour } from "../../components/serviceRequests/serviceRequestFour";
import { ServiceRequestFive } from "../../components/serviceRequests/serviceRequestFive";
import { ServiceRequestSix } from "../../components/serviceRequests/serviceRequestSix";
import { ServiceRequestSeven } from "../../components/serviceRequests/serviceRequestSeven";
import strings from "../../constants/language";
import {
  setLocation,
  saveLocation,
  getSubCategories,
  cancelRequest,
  getScheduledservices,
  getAllAdddress,
  myLatLong,
  searchingModalStatus,
  jobDetails,
  getCards,
  getPolicyStatus,
  getCommission,
  serviceAvailability,
  notifiyMe,
  getUserDetails,
  getChatId,
  arrivalTime
} from "../../actions/list/listAction";

import {
  serviceRequestAccepted,
  serviceDetails,
  serviceRequestAccepted2
} from "../../actions/socket/SocketActions";

var _ = require("lodash");
const { UIManager } = NativeModules;
const CustomLayoutAnimation = {
  duration: 100,
  create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity
  },
  update: {
    type: LayoutAnimation.Types.easeIn
  }
};

class CurrentLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      mapRegion: null,
      lastLat: null,
      lastLong: null,
      selectedAddress: "",
      requestServiceModal: false,
      isDatePickerVisible: false,
      isTimePickerVisible: false,
      currentDate: moment().format("MMMM Do YYYY"),
      currentTime: moment().format("HH:mm a"),
      step: this.props.step ? 4 : 1,
      subCategoryId: this.props.subCategoryData
        ? this.props.subCategoryData.id
        : "",
      fromHomeScreen: false,
      formattedDate: moment().format("YYYY-MM-DD"),
      formattedTime: moment().format("HH:mm:ss"),
      categoryModal: false,
      categoryName: this.props.mainCategoryData
        ? this.props.mainCategoryData.service
        : strings.services.selectCat,
      categoryId: this.props.mainCategoryData
        ? this.props.mainCategoryData.id
        : "",
      subCategoryModal: false,
      subCategoryName: this.props.subCategoryData
        ? this.props.subCategoryData.service
        : strings.services.selectSub,
      price: this.props.subCategoryData ? this.props.subCategoryData.price : "",
      enableSearch: false,
      requestResponse: "",
      duration: "",
      referenceNumber: null,
      preRequestId: null,
      cardIs: false,
      firstLogin: false,
      scheduled: 0,
      notifyMe: false,
      city: null
    };
    this.backHandler = null;
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    this.goToHome = _.debounce(this.goToHome, 300);

    socket.onRequestAccept(response => {
      // this.requestAccepted(response);
      this.requestAccepted(true);
      this.props.serviceRequestAccepted(response);
      this.props.serviceDetails(response);
      this.initiateChat(response);
      this.getDistanceAndDuration();
    });

    socket.noExpertFound(response => {
      this.noExpertFound();
    });
  }

  noExpertFound = () => {
    this.setState({ step: 6 });
  }; // Called if no expert found

  requestAccepted = response => {
    let coords = {
      latitudeOne: this.state.lastLat,
      longitudeOne: this.state.lastLong
    };
    this.setState({ step: 1 });
    this.props.getScheduledservices();
    this.props.myLatLong(coords);
    this.goToDashboard();
    // this.goToHome();
  };

  componentDidMount() {
    notification.onReceivedNotification(notification => {
      let toggleIt = idx(
        notification,
        _ => _.payload.additionalData.forJobAccept
      );
      let data = idx(notification, _ => _.payload.additionalData);
      let noExpertFound = idx(
        notification,
        _ => _.payload.additionalData.noExpertFound
      );

      if (toggleIt) {
        this.requestAccepted(true);
        this.props.serviceRequestAccepted(data);
        this.props.serviceDetails(data);
        this.initiateChat(data);
        this.getDistanceAndDuration();
      }
      if (noExpertFound) {
        this.setState({ step: 6 });
        this.props.searchingModalStatus(false);
      }
    }); //new changes

    // let notifyMe = idx(this.props, _ => _.checkBox.data[0].notify_me);
    // this.setState({
    //   notifyMe: notifyMe ? true : false,
    //   step: !this.props.serviceAvailable ? 8 : 1
    // });
    this.props.getPolicyStatus();
    // On request accept by Expert
    this.props.getAllAdddress(); // Request all addresses
    this.props.getSubCategories(
      (this.props.mainCategoryData && this.props.mainCategoryData.id) || 1
    ); // Request all sub category
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackPress
    );

    // Fetching current position
    this.watchID = navigator.geolocation.getCurrentPosition(
      position => {
        let delta = this.getDelta(
          position.coords.latitude,
          position.coords.longitude,
          position.coords.accuracy
        );
        this.onRegionChange(delta, delta.latitude, delta.longitude);
        let coords = {
          latitudeOne: delta.latitude,
          longitudeOne: delta.longitude
        };
        // Saving my coords
        this.props.myLatLong(coords);
        Geocoder.geocodePosition({
          lat: delta.latitude,
          lng: delta.longitude
        }).then(res => {
          this.setState({ city: res[0].subAdminArea });
          this.props.serviceAvailability(
            {
              city:
                res[0].subAdminArea == "Greater London"
                  ? "London"
                  : res[0].subAdminArea || "London"
            },
            response => {
              if (!response) {
                // this.setState({ step: 8, fromHomeScreen: true });
              }
            }
          ); // Check for availibilty in a particular region
          this.setState({ selectedAddress: res[0].formattedAddress });
        });
      },
      error => {}
      // {
      //   timeout: 20000,
      //   maximumAge: 1000,
      //   distanceFilter: 10
      // }
    );
    this.props.getCards(response => {
      if (response.requestStatus == "success") {
        this.setState({ cardIs: true });
      } else {
        this.setState({ cardIs: false });
      }
    });
    this.props.getCommission();
    socket.extendHireStatus(response => {
      this.props.getScheduledservices();
    });
  }

  // Calculating distance between expert and customer
  getDistanceAndDuration = () => {
    let latOrigin = idx(this.props, _ =>
      _.myCoordinates.latitudeOne.toString()
    );

    let lngOrigin = idx(this.props, _ =>
      _.myCoordinates.longitudeOne.toString()
    );
    let latDest = idx(this.props, _ =>
      _.newServiceDetails.expert_latitude.toString()
    );

    let lngDest = idx(this.props, _ =>
      _.newServiceDetails.expert_longitude.toString()
    );

    let url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${latOrigin},${lngOrigin}&destinations=${latDest},${lngDest}&mode=driving&language=en-EN&key=AIzaSyAb8v0MDaUBY_vpHjZW6Jc0Pa98cCYifEo`;
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.rows && responseJson.rows.length > 0) {
          let duration = responseJson.rows[0].elements[0].duration.text;
          let arrival = responseJson.rows[0].elements[0].duration.value;
          let totalDistance = { duration: duration, arrival: arrival };
          this.props.arrivalTime(totalDistance);
        }
      })
      .catch(e => {});
  };

  initiateChat = expertDetails => {
    const { newUser } = this.props;
    this.props.getChatId(expertDetails.expert_id, response => {
      this.setState({
        chatId: response
      });
      let chatData = {
        receiver: {
          id: idx(expertDetails, _ => _.receiver.id),
          fullname: idx(expertDetails, _ => _.receiver.fullname)
        },
        sender: {
          id: newUser.id,
          fullname: idx(this.props, _ => _.newUser.fullname)
        },
        id: response
      };
      this.props.serviceRequestAccepted2(chatData);
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (props.fromHomescreen !== state.fromHomeScreen) {
      return {
        fromHomeScreen: true
      };
    }
    return null;
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    this.backHandler.remove();
    navigator.geolocation.clearWatch(this.watchID);
  }

  // Navigate to Services
  handleBackPress = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "Services",
        options: {
          statusBar: {},
          topBar: {
            visible: false,
            height: 0
          }
        }
      }
    });
    return true;
  };

  // Calculating coordinates
  getDelta = (lat, lng, distance) => {
    const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
    const latitudeDelta = distance / oneDegreeOfLatitudeInMeters;
    const longitudeDelta =
      distance /
      (oneDegreeOfLatitudeInMeters * Math.cos(lat * (Math.PI / 180)));

    return (result = {
      latitude: lat,
      longitude: lng,
      latitudeDelta,
      longitudeDelta
    });
  };

  // Claulating coordinates on region change
  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });
  }

  // Navigate to Dashboard
  back = () => {
    let { lastLat, lastLong } = this.state;
    this.props.saveLocation({ lastLat, lastLong });
    Navigation.pop(this.props.componentId);
  };

  // Gett my coordinates
  getCoordinates = details => {
    Geocoder.geocodePosition({
      lat: idx(details, _ => _.geometry.location.lat),
      lng: idx(details, _ => _.geometry.location.lng)
    }).then(res => {
      this.props.serviceAvailability(
        {
          city:
            res[0].subAdminArea == "Greater London"
              ? "London"
              : res[0].subAdminArea || "London"
        },
        response => {
          if (!response) {
            this.setState({ step: 8 });
            this.setState({ enableSearch: false });
          } else {
            this.setState({ step: 1 });
          }
        }
      );
    });
    // Check for availibilty in a particular region

    if (details.geometry) {
      let latitude = details.geometry.location.lat;
      let longitude = details.geometry.location.lng;
      let accuracy = 5;
      let delta = this.getDelta(latitude, longitude, accuracy);
      let latitudeDelta = delta.latitudeDelta;
      let longitudeDelta = delta.longitudeDelta;
      let data = {
        latitude,
        longitude,
        accuracy,
        latitudeDelta,
        longitudeDelta
      };
      this.onRegionChange(data, latitude, longitude);
      this.setState({
        selectedAddress: details.formatted_address,
        lastLat: details.geometry.location.lat,
        lastLong: details.geometry.location.lng
      });
      let coords = {
        latitudeOne: details.geometry.location.lat,
        longitudeOne: details.geometry.location.lng
      };
      // Saving my coords
      this.props.myLatLong(coords);
    }
  };

  goToDashboard = () => {
    if (this.props.fromHomescreen) {
      // Navigating to dashboard screen
      Navigation.pop(this.props.componentId, {
        component: {
          name: "Dashboard",
          passProps: {
            selectedAddress: this.props.onGetLocation(
              this.state.selectedAddress,
              this.state.currentDate,
              this.state.currentTime
            )
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
    } else {
      Navigation.push(this.props.componentId, {
        // Navigating to dashboard screen
        component: {
          name: "Dashboard",
          passProps: {
            selectedAddress: this.state.selectedAddress,
            selectedDate: this.state.currentDate,
            selectedTime: this.state.currentTime
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
    }
  };

  // Nvigate to Dashboard
  goToHome = () => {
    this.setState({ acceptedModal: false });
    if (this.state.step === 2) {
      this.setState({ step: 1 });
    } else {
      let coords = {
        latitudeOne: this.state.lastLat,
        longitudeOne: this.state.lastLong
      };
      this.props.myLatLong(coords);
      this.goToDashboard();
    }
  };

  showDatePicker = () => this.setState({ isDatePickerVisible: true }); // Show date picker
  hideDatePicker = () => this.setState({ isDatePickerVisible: false }); // Hide date picker

  handleDatePicked = date => {
    this.setState({
      currentDate: moment(date).format("MMMM DD YYYY"),
      formattedDate: moment(date).format("YYYY-MM-DD")
    });
    this.hideDatePicker();
  }; // Handle date picker

  showTimePicker = () => this.setState({ isTimePickerVisible: true }); // Show time picker
  hideTimePicker = () => this.setState({ isTimePickerVisible: false }); // Hide time picker

  handleTimePicked = date => {
    this.setState({
      currentTime: moment(date).format("hh:mm a"),
      formattedTime: moment(date).format("HH:mm:ss")
    });
    this.hideTimePicker();
  }; // Handle time picker

  // Send job request
  sendRequest = (type, scheduled) => {
    if (type == 3) {
      this.goToHome();
    } else if (type == 2) {
      this.commonCall(scheduled);
      this.setState({ step: 3 });
    } else if (type == 1) {
      if (this.state.subCategoryId == "") {
        RNToasty.Warn({
          title: `${strings.services.selectBoth}`,
          withIcon: false
        });
      } else {
        if (!this.props.policyStatus) {
          this.goToPolicy(scheduled);
        } else {
          this.commonCall(scheduled);
          this.setState({ step: scheduled == 0 ? 4 : 3 });
        }
        //
      }
    }
  };

  // Schedule service
  scheduleService = () => {
    if (this.state.subCategoryId == "") {
      RNToasty.Warn({
        title: `${strings.services.selectBoth}`,
        withIcon: false
      });
    } else {
      this.setState({ step: 2 });
    }
  };

  commonCall = scheduled => {
    const {
      lastLat,
      lastLong,
      subCategoryId,
      formattedDate,
      formattedTime,
      selectedAddress
    } = this.state;
    let accurateDate = moment(
      formattedDate + " " + formattedTime,
      "YYYY-MM-DD HH:mm:ss"
    );

    this.props.setLocation(lastLat, lastLong, selectedAddress, response => {
      this.props.getUserDetails(res => {});
      if (response == 1) {
        let details = {
          latitude: lastLat,
          logitude: lastLong,
          service: subCategoryId,
          user: this.props.userId,
          booking_date:
            scheduled === 0
              ? moment.utc().format("YYYY-MM-DD HH:mm:ss")
              : accurateDate.utc().format("YYYY-MM-DD HH:mm:ss"),
          formatted_address: selectedAddress,
          schedule: scheduled,
          local_booking_date:
            scheduled === 0
              ? moment().format("YYYY-MM-DD HH:mm:ss")
              : accurateDate.format("YYYY-MM-DD HH:mm:ss")
        };
        socket.onRequestService(details);
      }
    });

    socket.getReference(response => {
      this.setState({
        referenceNumber: response,
        preRequestId: response.requestId
      });
    });
  };

  // Expert searching
  searching = () => {
    this.props.searchingModalStatus(false);
    this.props.jobDetails(
      this.state.price,
      this.state.subCategoryName,
      this.state.categoryName
    );
    setTimeout(() => {
      this.goToHome();
      this.setState({
        formattedDate: moment().format("YYYY-MM-DD"),
        formattedTime: moment().format("hh:mm:ss")
      });
    }, 200);
  };

  openCategoryModal = () => {
    this.setState({ categoryModal: true });
  };
  openSubCategoryModal = () => {
    this.setState({ subCategoryModal: true });
  };

  // Render screen to make a request
  goToStepOne = () => {
    // this.setState({ step: 1 });
    if (this.state.scheduled === 0) {
      this.commonCall(0);
      this.goToStepFour();
    } else {
      this.commonCall(1);
      this.cancelJobRequest();
    }
  };

  rebookJob = rebook => {
    if (rebook) {
      this.setState({ step: 1 });
    } else {
      this.setState({ step: 1 });
      this.cancelJobRequest();
    }
  };

  // Render screen to make a future request
  goToStepTwo = () => {
    this.setState({ step: 2 });
  };

  // Render screen if the request is being processed
  goToStepThree = () => {
    this.sendRequest(1, 1);
  };

  // Render screen if the request is accepted
  goToStepFour = () => {
    this.setState({ step: 4 });
  };

  // Render screen if the request is being cancelled
  goToStepFive = () => {
    this.setState({ acceptedModal: false });
    this.setState({ step: 5 });
  };

  // Cancel service request
  cancelRequest = () => {
    this.props.searchingModalStatus(false);
    this.cancelJobRequest();
    this.goToHome();
  };

  // Render screen on basis of request lifecycle

  renderServiceSteps = () => {
    if (this.state.step === 1) {
      // Display request step 1 component
      return (
        <ServiceRequestOne
          details={this.state}
          openCategoryModal={this.openCategoryModal}
          openSubCategoryModal={this.openSubCategoryModal}
          openCalender={this.scheduleService}
          requestOne={() => {
            this.setState({ scheduled: 0 }, () => {
              this.sendRequest(1, 0);
            });
          }}
          addressPresent={this.state.selectedAddress}
        />
      );
    } else if (this.state.step === 2) {
      // Display request step 2 component
      return (
        <ServiceRequestTwo
          details={this.state}
          showDatePicker={this.showDatePicker}
          showTimePicker={this.showTimePicker}
          requestTwo={() => {
            this.setState({ scheduled: 1 }, () => {
              this.goToStepThree();
            });
          }}
        />
      );
    } else if (this.state.step === 3) {
      // Display request step 3 component
      return (
        <ServiceRequestThree
          details={this.state}
          stepOne={this.goToStepOne}
          stepTwo={this.enableSearch}
          requestThree={() => {
            this.goToHome(), this.props.getScheduledservices();
          }}
          referenceNumber={this.state.referenceNumber}
          rebookJob={() => this.rebookJob(true)}
          editDetails={() => this.rebookJob(false)}
        />
      );
    } else if (this.state.step === 4) {
      // Display request step 4 component
      return (
        <ServiceRequestFour
          stepFive={this.goToStepFive}
          searching={() => {
            this.searching(), this.props.searchingModalStatus(true);
          }}
        />
      );
    } else if (this.state.step === 5) {
      // Display request step 5 component
      return (
        <ServiceRequestFive
          details={this.state}
          stepOne={this.goToStepOne}
          stepFour={this.goToStepFour}
          cancelRequest={this.cancelRequest}
          subCategory={this.props.subCategoryData1}
        />
      );
    } else if (this.state.step === 6) {
      // Display request step 6 component
      return (
        <ServiceRequestSix
          goToHome={this.goToHome}
          goToStepOne={this.goToStepOne}
        />
      );
    } else if (this.state.step === 7) {
      // Display request step 7 component
      this.setState({ step: 1 });
    } else if (this.state.step === 8) {
      let notifyMe = idx(this.props, _ => _.checkBox.data[0].notify_me);

      return (
        <ServiceRequestSeven
          apply={this.apply}
          notifyMe={this.state.notifyMe}
          disabled={notifyMe === 1 ? true : false}
        />
      );
    }
  };

  apply = () => {
    this.setState({ notifyMe: true });
    this.props.notifiyMe(this.state.city);
    this.goToDashboard();
  };

  makeNewRequest = val => {
    if (val === 0) {
      this.commonCall(0);
      this.setState({ step: 4 });
    } else if (val === 1) {
      this.setState({ step: 3 });
      this.commonCall(1);
    }
  };

  goToPolicy = val => {
    const { categoryName, subCategoryName, price } = this.state;
    // Navigating to 4hr policy page
    Navigation.push(this.props.componentId, {
      component: {
        name: "Policy",
        passProps: {
          jobData: { categoryName, subCategoryName, price },
          requestJob: value => {
            this.makeNewRequest(val);
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
  };

  firstRequest = () => {
    if (!this.props.policyStatus) {
      this.goToPolicy(0);
    }
    this.setState({ enableSearch: false, fromHomeScreen: true, step: 1 });
  };

  // Render job categories
  rendercategories = val => {
    LayoutAnimation.configureNext(CustomLayoutAnimation);
    let data = val.item;
    return (
      <TouchableOpacity
        key={Math.random().toString()}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingRight: moderateScale(5),
          paddingVertical: moderateScale(12),
          backgroundColor:
            data.service === this.state.categoryName
              ? colors.BLUE
              : colors.WHITE,
          borderRadius: moderateScale(5)
        }}
        onPress={() => {
          this.setState(
            {
              categoryModal: !this.state.categoryModal,
              categoryName: data.service,
              categoryId: data.id,
              subCategoryName: "Select a subcategory",
              price: "",
              subCategoryId: ""
            },
            () => {
              this.props.getSubCategories(data.id);
            }
          );
        }}
      >
        <Text
          style={{
            fontSize: moderateScale(15),
            fontFamily: fonts.LATOMEDIUM,
            color:
              data.service === this.state.categoryName
                ? colors.WHITE
                : colors.DGREY,
            paddingLeft: moderateScale(5)
          }}
        >
          {data.service}
        </Text>
      </TouchableOpacity>
    );
  };

  // Render job sub categories
  renderSubcategories = val => {
    let data = val.item;
    LayoutAnimation.configureNext(CustomLayoutAnimation);
    return (
      <TouchableOpacity
        key={Math.random().toString()}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingRight: moderateScale(5),
          marginTop: moderateScale(5),
          // paddingVertical: moderateScale(12),
          backgroundColor:
            data.service === this.state.subCategoryName
              ? colors.BLUE
              : colors.WHITE,
          borderRadius: moderateScale(5),
          height: moderateScale(40),
          paddingVertical: moderateScale(10)
        }}
        onPress={() => {
          this.setState({
            subCategoryModal: !this.state.subCategoryModal,
            subCategoryName: data.service,
            subCategoryId: data.id,
            price: data.price
          });
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row"
          }}
        >
          <View style={{ flex: 0.65 }}>
            <Text
              style={{
                fontSize: moderateScale(15),
                color:
                  data.service === this.state.subCategoryName
                    ? colors.WHITE
                    : colors.DGREY,
                fontFamily: fonts.LATOMEDIUM,
                paddingLeft: moderateScale(5)
              }}
            >
              {data.service}
            </Text>
          </View>
          <View style={{ flex: 0.35 }}>
            <Text
              style={{
                fontSize: moderateScale(14),
                fontFamily: fonts.LATOMEDIUM,
                color:
                  data.service === this.state.subCategoryName
                    ? colors.WHITE
                    : colors.DGREY,
                textAlign: "right"
              }}
            >
              £{data.price}/hour
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  cancelJobRequest = () => {
    this.props.cancelRequest({
      expert_id:
        (this.state.requestResponse && this.state.requestResponse.expert_id) ||
        "",
      request_id:
        (this.state.requestResponse && this.state.requestResponse.request_id) ||
        this.state.preRequestId,
      reason: "",
      user_type: 1
    });
  };
  enableSearch = () => {
    this.setState({ enableSearch: true });
    if (this.state.step === 3) {
      this.cancelJobRequest();
    }
  };

  render() {
    let fav_places = [];
    this.props.allAddresses &&
      this.props.allAddresses.data.map(item => {
        fav_places.push({
          description: item.location_name || "Fovurite",
          geometry: {
            location: {
              lat: Number(item.latitude),
              lng: Number(item.longitude)
            }
          },
          formatted_address: item.address_line1 || item.formatted_address || ""
        });
      }); // Display favourite locations

    return (
      <View style={styles.container}>
        {this.state.newLat == 0 || this.state.selectedAddress == "" ? (
          <View style={{ flex: 1 }}>
            <ActivityIndicator
              color={colors.BLUE}
              style={{ marginTop: moderateScale(300) }}
            />
          </View>
        ) : (
          // Mapview component to display google map
          <MapView
            style={styles.map}
            region={this.state.mapRegion}
            showsUserLocation={true}
            followUserLocation={true}
            onRegionChange={() => this.onRegionChange.bind(this)}
          >
            {/* Marker component to display markers */}
            <Marker
              onPress={() => {
                if (this.state.step != 8) {
                  this.enableSearch();
                }
              }}
              key={"_" + Date.now()}
              coordinate={{
                latitude: this.state.lastLat || -36.82339,
                longitude: this.state.lastLong || -73.03569
              }}
            >
              <View
                style={{
                  height: moderateScale(80),
                  width: moderateScale(170),
                  backgroundColor: "transparent",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={{
                    fontSize: moderateScale(13),
                    backgroundColor: "white",
                    fontFamily: fonts.LATOREGULAR
                  }}
                >
                  Your current location
                </Text>

                <Image
                  source={require("../../assets/img/location.png")}
                  resizeMode={"contain"}
                  style={{
                    height: moderateScale(45),
                    width: moderateScale(45),
                    alignSelf: "center"
                  }}
                />
              </View>
            </Marker>
          </MapView>
        )}
        {!this.state.fromHomeScreen || this.state.enableSearch ? (
          <View style={[styles.locationSearch]}>
            <Text style={styles.locationSearchText}>
              {strings.currentLocation.location}
            </Text>
            {idx(this.state, _ => _.selectedAddress.length > 1) ? (
              // Map search component for searching places
              <MapSearch
                coordinates={this.getCoordinates}
                listOn={true}
                value={this.state.selectedAddress}
                predefinedPlaces={fav_places}
              />
            ) : (
              <View
                style={{
                  height: moderateScale(50),
                  width: moderateScale(300),
                  justifyContent: "center"
                }}
              >
                <ActivityIndicator
                  styles={{
                    marginLeft: moderateScale(200)
                  }}
                />
              </View>
            )}
          </View>
        ) : (
          <TouchableOpacity
            onPress={this.goToHome}
            style={styles.locationSearch}
          >
            <Image
              source={require("../../assets/img/back.png")}
              resizeMode={"contain"}
              style={{
                height: moderateScale(25),
                width: moderateScale(25),
                alignSelf: "flex-start"
              }}
            />
          </TouchableOpacity>
        )}
        {!this.state.fromHomeScreen || this.state.enableSearch ? (
          <View style={[styles.buttonContainer]}>
            <View style={[styles.buttons]}>
              <TouchableOpacity
                onPress={this.back}
                style={[styles.backButton, styles.back]}
              >
                <Text style={styles.backButtonText}>
                  {strings.services.back}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.space} />
            <View style={styles.buttons}>
              <TouchableOpacity
                disabled={
                  idx(this.state, _ => _.selectedAddress.length > 1)
                    ? false
                    : true
                }
                onPress={this.firstRequest}
                style={[styles.backButton]}
              >
                <Text style={[styles.backButtonText, { color: "white" }]}>
                  {strings.currentLocation.setLoc}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View
            style={{
              height:
                this.state.step === 4 || this.state.step === 6
                  ? moderateScale(180)
                  : this.state.step === 7
                  ? moderateScale(0) //360
                  : moderateScale(270)
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
                shadowOpacity: 0.2,
                backgroundColor: "white",
                justifyContent: "flex-end"
              }}
            >
              {this.renderServiceSteps()}
            </View>
          </View>
        )}
        {/* Display Date picker */}
        <DateTimePicker
          isVisible={this.state.isDatePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDatePicker}
          minimumDate={new Date()}
        />
        {/* Display Time picker */}
        <DateTimePicker
          isVisible={this.state.isTimePickerVisible}
          onConfirm={this.handleTimePicked}
          onCancel={this.hideTimePicker}
          mode="time"
          minimumDate={new Date()}
        />

        {/* Make request modal */}
        <ModalSwiper
          animationInTiming={1}
          animationOutTiming={1}
          isVisible={this.state.categoryModal}
          style={{ justifyContent: "flex-end", margin: 0 }}
          swipeDirection={null}
          onSwipeComplete={() => this.setState({ categoryModal: false })}
          hasBackdrop={false}
        >
          <View style={{ flex: 1, backgroundColor: "#0009" }}>
            <TouchableOpacity
              style={{ flex: 0.6 }}
              onPress={() => {
                this.setState({ categoryModal: false });
              }}
            />

            <View
              style={{
                backgroundColor: "white",
                paddingBottom: moderateScale(10),
                flex: 0.4
              }}
            >
              <View
                style={{
                  flex: 0.18,
                  justifyContent: "center",
                  marginHorizontal: moderateScale(10),
                  borderBottomWidth: 0.5,
                  borderBottomColor: "#707070",
                  marginBottom: moderateScale(5)
                }}
              >
                <Text
                  style={{
                    fontSize: moderateScale(17),
                    color: colors.BLUE,
                    fontFamily: fonts.LATOBOLD
                  }}
                >
                  {strings.services.selectCat}
                </Text>
              </View>
              <View style={{ marginHorizontal: moderateScale(10), flex: 0.82 }}>
                <FlatList
                  renderItem={this.rendercategories}
                  extraData={this.state}
                  data={idx(this.props, _ => _.services)}
                  key={Math.random.toString()}
                  keyExtractor={this._keyExtractor}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </View>
          </View>
        </ModalSwiper>

        <ModalSwiper
          animationInTiming={1}
          animationOutTiming={1}
          isVisible={this.state.subCategoryModal}
          style={{ justifyContent: "flex-end", margin: 0 }}
          swipeDirection={null}
          onSwipeComplete={() => this.setState({ subCategoryModal: false })}
          hasBackdrop={false}
        >
          <View style={{ flex: 1, backgroundColor: "#0009" }}>
            <TouchableOpacity
              style={{ flex: 0.6 }}
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
              <View
                style={{
                  flex: 0.18,
                  justifyContent: "center",
                  marginHorizontal: moderateScale(10),
                  borderBottomWidth: 0.5,
                  borderBottomColor: "#707070"
                }}
              >
                <Text
                  style={{
                    fontSize: moderateScale(17),
                    color: colors.BLUE,
                    fontFamily: fonts.LATOBOLD
                  }}
                >
                  {strings.services.selectCat}
                </Text>
              </View>
              <View style={{ marginHorizontal: moderateScale(10), flex: 0.82 }}>
                {idx(this.props, _ => _.subCategories.data.length) > 0 ? (
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    renderItem={this.renderSubcategories}
                    extraData={this.state}
                    data={idx(this.props, _ => _.subCategories.data)}
                    key={Math.random.toString()}
                    keyExtractor={this._keyExtractor}
                  />
                ) : null}
              </View>
            </View>
          </View>
        </ModalSwiper>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    previousLocation: state.userList.previousLocation,
    services: state.userList.listData,
    subCategories: state.userList.subCategories,
    userId:
      idx(state.user, _ => _.userData.data.id) ||
      idx(state.signup, _ => _.data.data.user_id),
    allAddresses: state.userList.allAddress,
    subCategoryData1: state.userList.subCategoryData,
    policyStatus: state.userList.policyStatus,
    serviceAvailable: state.userList.serviceAvailability,
    checkBox: state.userList.userDetails,
    newUser: idx(state, _ => _.userList.userDetails.data[0]),
    myCoordinates: state.userList.myCoords,
    newServiceDetails: state.socket.newServiceDetails
  };
}

export default connect(
  mapStateToProps,
  {
    setLocation,
    saveLocation,
    getSubCategories,
    cancelRequest,
    getScheduledservices,
    getAllAdddress,
    myLatLong,
    searchingModalStatus,
    jobDetails,
    getCards,
    getPolicyStatus,
    getCommission,
    serviceAvailability,
    notifiyMe,
    getUserDetails,
    serviceRequestAccepted,
    serviceDetails,
    serviceRequestAccepted2,
    getChatId,
    arrivalTime
  }
)(CurrentLocation);
