// Home component displaying ongoing and scheduled service

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  ActivityIndicator,
  Platform,
  Modal,
  Linking
} from "react-native";
import Geocoder from "react-native-geocoder";
import moment from "moment";
import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";
import { moderateScale } from "../../../utilities/ResponsiveFonts";
import { IMAGE_URL } from "../../../constants/url";
import idx from "idx";
import OngoingJobModal from "../../../components/ongoingJobModal";
import styles from "../../../constants/styleSheets/home/home";
import { colors } from "../../../constants/theme";
import ServiceTimer from "../../../components/serviceTimer";
import * as Progress from "react-native-progress";
import {
  getChatId,
  manageTimer,
  setPauseTimer,
  serviceType1,
  getScheduledservices,
  searchingModalStatus,
  myLatLong,
  serviceAvailability,
  setNotificationDetails,
  notificationToken
} from "../../../actions/list/listAction";
import {
  serviceRequestAccepted2,
  serviceRequestAccepted,
  serviceDetails,
  trackExpertLocation
} from "../../../actions/socket/SocketActions";
import { CachedImage } from "react-native-cached-image";
import strings from "../../../constants/language";

var _ = require("lodash");

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAddress: "",
      trackingModal: false,
      searchText: "",
      onGoingModal: false,
      selectedService: "",
      breakIs: false,
      chatId: null,
      step: 1,
      a: true,
      categoryData: "",
      emergencyContact: "",
      price: "",
      sub: "",
      emergencyView: false,
      resetTime: 0,
      selectedIndex: null
    };
    this.goToStartService = _.debounce(this.goToStartService, 300);
    this.selectService = _.debounce(this.selectService, 300);
    this.serviceListing = _.debounce(this.serviceListing, 300);
  }

  componentWillMount = () => {
    // Requesting scheduled services
    this.props.getScheduledservices();

    // Fetching current position
    this.watchID = navigator.geolocation.getCurrentPosition(
      position => {
        let delta = this.getDelta(
          position.coords.latitude,
          position.coords.longitude,
          position.coords.accuracy
        );
        this.onRegionChange(delta, delta.latitude, delta.longitude);
        Geocoder.geocodePosition({ lat: delta.latitude, lng: delta.longitude })
          .then(res => {
            this.setState({ selectedAddress: res[0].formattedAddress });
            let coords = {
              latitudeOne: delta.latitude,
              longitudeOne: delta.longitude
            };
            // Saving my coords
            this.props.myLatLong(coords);

            this.props.serviceAvailability(
              {
                city: res[0].subAdminArea
              },
              res => {}
            );
          })
          .catch(err => {});
      },
      error => {}
    );

    // On receiveing event from servie start/pause/resume
    socket.servicePopup(response => {
      this.setState({ a: !this.state.a });
    });
  };

  componentWillUnmount = () => {
    navigator.geolocation.clearWatch(this.watchID);
  };
  // Calculating latitude and longitude
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

  // Calculating latitude and longitude on region change
  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });
  }

  //Rendering all services
  renderItem = (data, i) => {
    let { item } = data;
    return (
      <TouchableOpacity
        key={Math.random.toString()}
        onPress={() => this.selectService(item)}
        style={styles.allServices}
      >
        <View style={styles.servicesView}>
          <View style={styles.serviceImageContainer}>
            <CachedImage
              resizeMode={"contain"}
              style={styles.serviceLogo}
              source={{
                uri: `${IMAGE_URL}${item.service_image}`
              }}
            />
          </View>
          <View style={styles.serviceTitle}>
            <Text style={styles.serviceTitleText}>{item.service}</Text>
          </View>
        </View>
        <View style={styles.spaceThree} />
      </TouchableOpacity>
    );
  };

  //Navigating to current locations
  selectService = mainCategoryData => {
    this.setState({ categoryData: mainCategoryData });
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
          fromHomescreen: true,
          mainCategoryData,
          onGetLocation: (address, date, time) => {
            this.setState({ selectedAddress: address });
            this.props.extraData(date, time, address);
          }
        }
      }
    });
  };

  // Job status
  status = status => {
    if (status == 0) {
      return "Pending";
    } else if (status == 1) {
      return "Confirmed";
    } else if (status == 2) {
      return "Completed";
    } else if (status == 3) {
      return "Ongoing";
    } else if (status == 4) {
      return "Cancelled";
    } else {
      return "Pending";
    }
  };

  // Navigating to start service
  goToStartService = (item, type) => {
    this.props.serviceType1(type);
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

  // Rendering scheduled services listing
  scheduledServices = data => {
    const { item } = data;
    jobDate = moment(item.booking_date)
      .local()
      .format("MMMM-DD hh:mm:ss");
    todaysDate = moment().format("MMMM-DD hh:mm:ss");
    disabledIs = moment(jobDate).isAfter(todaysDate);

    let inProgress = idx(item, _ => _.status != 1);

    return (
      <View key={Math.random.toString()} style={styles.cardView}>
        <View style={styles.jobDetails}>
          <Text style={styles.jobText} numberOfLines={1}>
            {idx(item, _ => _.service.service_parent[0].service)} >{" "}
            {idx(item, _ => _.service.service)}
          </Text>
          <View style={styles.space} />
          <Text style={styles.username}>
            {idx(item, _ => _.expert.fullname)}
          </Text>
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
          <View style={styles.scheduledStatus}>
            <View style={styles.confirmContainer}>
              <Text style={styles.confirmText}>{this.status(item.status)}</Text>
            </View>
          </View>

          <View style={styles.scheduledQr}>
            {idx(item, _ => _.status == 1) ? (
              <TouchableOpacity
                disabled={inProgress}
                onPress={() => this.goToStartService(item, "START")}
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
        </View>
      </View>
    );
  };

  // Navigating to scheduled services
  serviceListing = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "ScheduledServices",
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
          editServiceRequest: value => console.log(value, "BOOOOOM")
        }
      }
    });
  };

  // Navigating to services
  goToAllServices = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "Services",
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
          fromDashboard: true
        }
      }
    });
  };

  // If Finish job button is pressed.
  onPressFinish = data => {
    this.setState({ onGoingModal: false });
    this.goToStartService(data, "FINISH");
  };

  // If start break button is pressed.
  onPressBreak = data => {
    this.setState({ onGoingModal: false }, () => {
      if (data.data.break_start && !data.databreak_end) {
        this.goToStartService(data, "BREAK END");
      } else {
        this.goToStartService(data, "BREAK");
      }
    });
  };

  // Navigating to chat screen
  goToChat = () => {
    const { selectedService, chatId } = this.state;
    let chatData = {
      receiver: {
        id: selectedService.expert_id,
        fullname: selectedService.expert.fullname || ""
      },
      sender: {
        id: selectedService.user_id,
        fullname: idx(this.props, _ => _.user.fullname)
      },
      id: chatId
    }; // Chat data for initiating chat with the Expert.
    this.props.serviceRequestAccepted2(chatData); // Saving chat data.
    this.setState({ onGoingModal: false });

    // Navigating to UserChat componet for chatting.
    Navigation.push(this.props.componentId, {
      component: {
        name: "UserChat",
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

  // Navigating to extend hire
  extendHire = item => {
    this.setState({ onGoingModal: false }, () => {
      Navigation.push(this.props.componentId, {
        component: {
          name: "ExtendHire",
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
            service_id: item.service_id,
            expert_id: item.expert_id,
            service_details: item.service,
            moreData: item
          }
        }
      });
    });
  };

  controlSearchModal = () => {
    this.props.searchingModalStatus(false);
    setTimeout(() => {
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
            fromHomescreen: true,
            mainCategoryData: this.state.categoryData,
            onGetLocation: (address, date, time) => {
              this.setState({ selectedAddress: address });
              this.props.extraData(date, time, address);
            },
            step: 4
          }
        }
      });
    }, 200);
  };

  // Making a call to emergency contact
  call = () => {
    this.setState({ emergencyView: true });
  };

  // Naviating to Support ticket screen
  reportExpert = (referenceNumber, jobId) => {
    this.setState({ onGoingModal: false });
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
          referenceNumber,
          jobId
        }
      }
    });
  };

  // Displaying all ongoing services.
  renderOngoingServices = value => {
    let item = value.item;
    let onGoing = idx(this.props, _ =>
      _.scheduledServices.data.filter(item => item.status === 3)
    );
    let emergencyContact = idx(
      onGoing,
      _ => _.expert.profile.emergency_contact_number
    );
    let initialPopup = {
      booking_date: idx(value, _ => _.item.booking_date),
      expert_feedback: idx(value, _ => _.item.expert.averageFeedback),
      expert_id: idx(value, _ => _.item.expert.id),
      expert_image: idx(value, _ => _.item.expert.profile_image),
      expert_latitude: idx(value, _ => _.item.expert.address.latitude),
      expert_longitude: idx(value, _ => _.item.expert.address.longitude),
      expert_name: idx(value, _ => _.item.expert.fullname),
      formatted_address: idx(value, _ => _.item.address),
      job_category: idx(value, _ => _.item.service.service),
      job_cost: idx(value, _ => _.item.service.price),
      receiver: {
        id: idx(value, _ => _.item.expert.id),
        fullname: idx(value, _ => _.item.expert.fullname)
      },
      request_id: idx(value, _ => _.item.id),
      sender: {
        id: idx(value, _ => _.item.customer.id),
        fullname: idx(value, _ => _.item.customer.fullname)
      },
      service_parent_name: idx(
        value,
        _ => _.item.service.service_parent[0].service
      )
    };
    let coords = {
      latitudeOne: idx(value, _ => _.item.latitude),
      longitudeOne: idx(value, _ => _.item.longitude)
    };
    return (
      <View key={Math.random.toString()} style={styles.cardView}>
        <TouchableOpacity
          disabled={true}
          onPress={() => {
            this.props.getChatId(
              idx(value, _ => _.item.expert.id),
              response => {
                let chatData = {
                  receiver: {
                    id: item.expert_id,
                    fullname: item.expert.fullname || ""
                  },
                  sender: {
                    id: item.user_id,
                    fullname: idx(this.props, _ => _.user.fullname)
                  },
                  id: response
                }; // Chat data for initiating chat with the Expert.
                this.props.serviceRequestAccepted(chatData);
              }
            );

            this.props.myLatLong(coords); // Saving my coords
            this.props.serviceDetails(initialPopup); // Storing data for initial ppup
            this.props.trackExpertLocation(initialPopup); // Storing initial location of an expert
          }}
          style={{ flex: 0.6, justifyContent: "center" }}
        >
          <Text style={styles.jobText} numberOfLines={1}>
            {idx(item, _ => _.service.service_parent[0].service)} >{" "}
            {idx(item, _ => _.service.service)}
          </Text>
          <View style={styles.space} />
          <Text style={styles.username}>
            {idx(item, _ => _.expert.fullname)}
          </Text>
          <View style={{ height: moderateScale(8) }} />
          <Text style={styles.jobDate}>
            {moment
              .utc(idx(value, _ => _.item.booking_date))
              .local()
              .format("MMM DD")}
            <Text style={[styles.jobTime, { color: "#E2E2E2" }]}> |</Text>
            <Text style={styles.jobTime}>
              {" "}
              {moment
                .utc(idx(value, _ => _.item.booking_date))
                .local()
                .format("hh:mm a")}
            </Text>
          </Text>
        </TouchableOpacity>
        <View style={{ flex: 0.4, justifyContent: "center" }}>
          <View style={styles.spaceTwo} />
          <View
            style={{
              height: moderateScale(40),
              paddingRight: moderateScale(5)
            }}
          >
            <Text style={styles.onGoingText}>
              {strings.home.onGoing}
              <Text style={styles.seperator}> | </Text>
              <ServiceTimer
                serviceStartTime={value.item && value.item.service_start_time}
                startTimer={
                  value.item &&
                  value.item.service_start_time &&
                  !value.item.service_end_time
                    ? 1
                    : 0
                }
                endTimer={value.item && value.item.service_end_time ? 1 : 0}
                breakStart={value.item && value.item.break_start}
                breakEnd={value.item && value.item.break_end}
                breakDuration={(value.item && value.item.break_duration) || 0}
              />
            </Text>
          </View>
          <View style={styles.moreOption}>
            <TouchableOpacity
              onPress={() => {
                this.props.getChatId(
                  idx(value, _ => _.item.expert.id),
                  response => {
                    this.setState({
                      chatId: response
                    });
                  }
                );

                this.setState({
                  onGoingModal: true,
                  selectedService: item,
                  emergencyContact: emergencyContact,
                  selectedIndex: value.index
                });
              }}
              style={styles.moreButton}
            >
              <Text
                style={[
                  styles.moreText,
                  {
                    fontSize:
                      this.props.myLanguage === "greek"
                        ? moderateScale(8)
                        : moderateScale(14)
                  }
                ]}
              >
                {strings.home.more} >
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  render() {
    let onGoing = idx(this.props, _ =>
      _.scheduledServices.data.filter(item => item.status === 3)
    ); // Filtering services on active status.
    let item = onGoing && onGoing.slice(onGoing.length - 1)[0];
    let emergencyContact = idx(
      item,
      _ => _.expert.profile.emergency_contact_number
    ); // Emergency contact number of expert.
    let newStyle =
      this.props.scheduledServices &&
      this.props.scheduledServices.data.filter(
        item => item.status == 1 || item.status == 0
      ).length > 0; // Style changed on basis of data present.
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <View style={styles.searchImage}>
              <Image
                source={require("../../../assets/img/search.png")}
                resizeMode={"contain"}
              />
            </View>
            <View style={styles.textInput}>
              <TextInput
                style={{ paddingRight: moderateScale(15), textAlign: "left" }}
                placeholder={strings.home.search}
                autoCapitalize="none"
                onChangeText={searchText => this.setState({ searchText })}
                autoCorrect={false}
                value={this.state.searchText}
              />
            </View>
          </View>
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>{strings.home.location}</Text>
            {this.props.address || this.state.selectedAddress ? (
              <Text style={styles.addressText} numberOfLines={1}>
                {this.props.address || this.state.selectedAddress}
              </Text>
            ) : (
              <ActivityIndicator />
            )}
          </View>
        </View>
        {/* Rendering all services */}
        <View style={styles.servicesContainer}>
          <View style={styles.services}>
            <Text style={styles.serviceHeader}>{strings.home.allServices}</Text>
            <TouchableOpacity
              style={styles.nextImageContainer}
              onPress={_.debounce(this.goToAllServices, 300)}
            >
              <Image
                source={require("../../../assets/img/next.png")}
                resizeMode={"contain"}
                style={styles.serviceImage}
              />
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.serviceListing,
              { justifyContent: "center", alignItems: "center" }
            ]}
          >
            {idx(this.props, _ => _.services.length > 0) ? (
              this.props.services.filter(item =>
                item.service
                  .toLowerCase()
                  .includes(this.state.searchText.toLowerCase())
              ).length > 0 ? (
                <FlatList
                  horizontal={true}
                  renderItem={this.renderItem}
                  extraData={this.state}
                  data={this.props.services.filter(item =>
                    item.service
                      .toLowerCase()
                      .includes(this.state.searchText.toLowerCase())
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  showsHorizontalScrollIndicator={false}
                />
              ) : (
                <Text style={styles.noService}>{strings.home.noService}</Text>
              )
            ) : (
              <ActivityIndicator style={styles.loader} />
            )}
          </View>
        </View>
        {/* Rendering ongoging services */}
        <View
          style={
            newStyle
              ? styles.onGoingContainer
              : {
                  height: moderateScale(250),
                  paddingHorizontal: moderateScale(13)
                }
          }
        >
          <View
            style={newStyle ? styles.onGoing : { height: moderateScale(25) }}
          >
            <Text style={styles.locationText}>
              {strings.home.onGoingService}
            </Text>
          </View>

          <View
            style={
              newStyle
                ? styles.onGoingList
                : { height: moderateScale(225), justifyContent: "center" }
            }
          >
            {onGoing && onGoing.length > 0 ? (
              <FlatList
                data={onGoing}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this.renderOngoingServices}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                onRefresh={() => {
                  this.props.getScheduledservices();
                }}
                refreshing={this.props.servicesLoader}
              />
            ) : (
              <Text style={styles.noOnGoingText}>{strings.home.noOngoing}</Text>
            )}
          </View>
        </View>

        <View
          style={{
            flex: onGoing && onGoing.length > 0 ? 0.5 : 1,
            paddingHorizontal: moderateScale(13)
          }}
        >
          <View style={styles.scheduledServicesHeader}>
            <Text style={styles.scheduledServicesText}>
              {this.props.scheduledServices &&
              this.props.scheduledServices.data.filter(
                item => item.status == 1 || item.status == 0
              ).length > 0
                ? "Scheduled Services"
                : ""}
            </Text>
            <TouchableOpacity
              onPress={this.serviceListing}
              style={styles.moreServices}
            >
              {this.props.scheduledServices &&
              this.props.scheduledServices.data.filter(
                item => item.status == 1 || item.status == 0
              ).length > 0 ? (
                <Image
                  source={require("../../../assets/img/next.png")}
                  resizeMode={"contain"}
                  style={styles.nextLogo}
                />
              ) : null}
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center"
            }}
          >
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              renderItem={this.scheduledServices}
              extraData={this.state}
              numColumns={1}
              data={
                this.props.scheduledServices &&
                this.props.scheduledServices.data.filter(
                  item => item.status == 1 || item.status == 0
                )
              }
              keyExtractor={(item, index) => index.toString()}
              onRefresh={() => {
                this.props.getScheduledservices();
              }}
              refreshing={this.props.servicesLoader}
            />
          </View>
        </View>
        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.onGoingModal}
          onRequestClose={() => null}
        >
          {!this.state.emergencyView ? (
            <OngoingJobModal
              closeOngoingJobModal={() => {
                this.setState({ onGoingModal: false });
              }}
              data={this.state.selectedService}
              onPressFinish={this.onPressFinish}
              onPressBreak={this.onPressBreak}
              isBreak={this.state.breakIs}
              chat={this.goToChat}
              extendHire={() => this.extendHire(this.state.selectedService)}
              call={this.call}
              reportExpert={(id, jobId) => this.reportExpert(id, jobId)}
            />
          ) : (
            // Emergency details modal
            <View style={styles.emergencyContainer}>
              <View style={styles.spaceFour} />
              <View style={styles.emergencyChild}>
                <View style={styles.emergencyInfo}>
                  <Text style={styles.emergencyHeader}>
                    {strings.home.emergencyInfo}
                  </Text>
                  <Text style={styles.contactNameHeader}>
                    {strings.home.name}{" "}
                  </Text>
                  <Text style={styles.contactName}>
                    {idx(item, _ => _.expert.profile.emergency_contact_name) ||
                      "John Doe"}{" "}
                  </Text>
                  <Text style={styles.relationHeader}>
                    {strings.home.relation}{" "}
                  </Text>
                  <Text style={styles.relation}>
                    {idx(
                      item,
                      _ => _.expert.profile.emergency_contact_relationship
                    ) || "Father"}{" "}
                  </Text>
                </View>
                <View style={styles.emergencyButton}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ emergencyView: false });
                    }}
                    style={styles.backButtonEmergency}
                  >
                    <Text style={styles.buttonBackText}>
                      {strings.home.back}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(`tel:${emergencyContact}`);
                    }}
                    style={styles.callButton}
                  >
                    <Text style={styles.callText}>{strings.home.call}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </Modal>
        {this.props.searchingModal ? (
          <TouchableOpacity
            onPress={this.controlSearchModal}
            style={[
              styles.searchingNew,
              {
                elevation: Platform.OS == "ios" ? 1 : 10,
                shadowOffset: {
                  width: Platform.OS == "ios" ? -0.2 : -0.4,
                  height: Platform.OS == "ios" ? -0.1 : -0.2
                }
              }
            ]}
          >
            {/* Progress bar while searching for expert */}
            <View style={{ flex: 0.05 }}>
              <Progress.Bar
                width={moderateScale(380)}
                borderRadius={0}
                borderWidth={0}
                color={colors.BLUE}
                unfilledColor={colors.WHITE}
                useNativeDriver={true}
                indeterminateAnimationDuration={2000}
                animated={true}
                indeterminate={true}
                height={moderateScale(2)}
              />
            </View>
            <View
              style={{
                height: moderateScale(100)
              }}
            >
              <Text style={styles.searchingText}>{strings.home.searching}</Text>
              <Text style={styles.searchingInfo}>
                {strings.home.titleOne}
                {"\n"} {strings.home.titleTwo}
              </Text>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    services: state.userList.listData,
    scheduledServices: state.userList.scheduledServices,
    loading: state.userList.loading,
    chatId: state.userList.chatId,
    timerStatus: state.userList.timerStatus,
    timerValue: state.userList.timerValue,
    searchingModal: state.userList.searchingModal,
    user:
      idx(state, _ => _.user.userData.data) ||
      idx(state, _ => _.signup.data.data),
    myCoordinates: state.userList.myCoords,
    servicesLoader: state.userList.loadingServices,
    myLanguage: state.language.language.title,
    userId:
      idx(state.user, _ => _.userData.data.id) ||
      idx(state.signup, _ => _.data.data.user_id)
  };
}

export default connect(
  mapStateToProps,
  {
    // getServices,
    getScheduledservices,
    serviceRequestAccepted2,
    getChatId,
    manageTimer,
    setPauseTimer,
    serviceType1,
    searchingModalStatus,
    myLatLong,
    serviceRequestAccepted,
    serviceDetails,
    trackExpertLocation,
    serviceAvailability,
    setNotificationDetails,
    notificationToken
  }
)(Home);
