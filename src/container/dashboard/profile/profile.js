import React from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";
import { moderateScale } from "../../../utilities/ResponsiveFonts";
import { fonts, colors } from "../../../constants/theme";
import ModalSwiper from "react-native-modal";
import idx from "idx";
import { PROFILE_IMG_URL } from "../../../constants/url";
import { CachedImage } from "react-native-cached-image";
import styles from "../../../constants/styleSheets/profile/profile";
import strings from "../../../constants/language";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        strings.profile.editProfile,
        strings.profile.location,
        strings.profile.payment,
        strings.profile.reviews,
        strings.profile.scheduled,
        strings.profile.help,
        strings.profile.notifications,
        strings.profile.settings,
        strings.profile.logout
      ],
      logoutModal: false
    };
  }

  selectedOption = optionName => {
    if (optionName === 0) {
      // Navigate to edit profile screen
      Navigation.push(this.props.componentId, {
        component: {
          name: "EditProfile",
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
    } else if (optionName === 1) {
      // Navigate to edit location screen
      Navigation.push(this.props.componentId, {
        component: {
          name: "Locations",
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
    } else if (optionName === 2) {
      // Navigate to edit payment screen
      Navigation.push(this.props.componentId, {
        component: {
          name: "Payment",
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
    } else if (optionName === 3) {
      // Navigate to edit reviews screen
      Navigation.push(this.props.componentId, {
        component: {
          name: "Reviews",
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
    } else if (optionName === 4) {
      // Navigate to edit selected service screen
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
          }
        }
      });
    } else if (optionName === 5) {
      // Navigate to edit help center screen
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
    } else if (optionName === 6) {
      // Navigate to edit notifications screen
      Navigation.push(this.props.componentId, {
        component: {
          name: "Notifications",
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
    } else if (optionName === 7) {
      // Navigate to edit app settings screen
      Navigation.push(this.props.componentId, {
        component: {
          name: "AppSettings",
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
    } else if (optionName === 8) {
      this.setState({ logoutModal: true });
    }
  };

  // Render profile screen options
  renderOptions = option => {
    return (
      <TouchableOpacity
        onPress={() => this.selectedOption(option.index)}
        style={styles.optionsContainer}
      >
        <View style={styles.itemContainer}>
          <Text style={styles.item}>{option.item}</Text>
        </View>
        <View style={styles.selected}>
          <Image
            source={require("../../../assets/img/next.png")}
            resizeMode={"contain"}
            style={styles.selectedImage}
          />
        </View>
      </TouchableOpacity>
    );
  };

  // Logout of device
  logoutConfirm = () => {
    this.setState({ noCategoryModal: false });
    setTimeout(() => {
      this.props.logout();
    }, 300);
  };

  render() {
    const { userDetails } = this.props;
    let imagePresent = idx(
      this.props,
      _ => _.userDetails.data[0].profile_image
    );
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.userImageContainer}>
            <View style={styles.userImage}>
              {imagePresent ? (
                <CachedImage
                  source={{
                    uri: `${PROFILE_IMG_URL}${idx(
                      this.props,
                      _ => _.userDetails.data[0].profile_image
                    )}`,
                    cache: "force-cache"
                  }}
                  style={styles.userImageStyle}
                  resizeMode={"contain"}
                />
              ) : (
                <Image
                  source={require("../../../assets/img/logo.png")}
                  resizeMode={"contain"}
                  style={{
                    height: moderateScale(70),
                    width: moderateScale(70)
                  }}
                />
              )}
            </View>
          </View>
          <View style={styles.fullName}>
            <Text style={styles.fullNameText}>
              {idx(this.props, _ => _.userDetails.data[0].fullname)}
            </Text>
          </View>
          <View style={styles.address}>
            <Text style={styles.addressText} numberOfLines={1}>
              {idx(
                this.props,
                _ => _.userDetails.data[0].addresses[0].formatted_address
              ) ||
                idx(
                  this.props,
                  _ => _.userDetails.data[0].addresses[1].formatted_address
                )}
            </Text>
          </View>
          <View style={styles.userDetailsExtra}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.totalService}>
                {userDetails.totalServices}{" "}
              </Text>
              <Text
                style={{
                  fontSize: moderateScale(15),
                  fontFamily: fonts.LATOMEDIUM,
                  color: colors.GREY
                }}
              >
                {strings.profile.services} |
              </Text>
            </View>

            <View style={styles.space} />
            <View style={styles.rating}>
              <Image
                source={require("../../../assets/img/thumbUp.png")}
                resizeMode={"contain"}
                style={styles.thumbUp}
              />
              <Text
                style={{
                  fontSize: moderateScale(15),
                  fontFamily: fonts.LATOBOLD,
                  paddingLeft: moderateScale(10),
                  color: colors.DGREY
                }}
              >
                {userDetails.totalServices === 0
                  ? 0
                  : idx(
                      this.props,
                      _ =>
                        _.userDetails.averageFeedback.toString().split(".")[0]
                    )}
                %{" "}
              </Text>
              <View style={styles.space} />
              <Image
                source={require("../../../assets/img/thumbDown.png")}
                resizeMode={"contain"}
                style={{
                  height: moderateScale(15),
                  width: moderateScale(15),
                  alignSelf: "center"
                }}
              />
              <Text
                style={{
                  fontSize: moderateScale(15),
                  fontFamily: fonts.LATOBOLD,
                  paddingLeft: moderateScale(10),
                  color: colors.DGREY
                }}
              >
                {idx(this.props, _ => _.userDetails.averageFeedback == 0)
                  ? 0
                  : (100 - idx(this.props, _ => _.userDetails.averageFeedback))
                      .toString()
                      .split(".")[0]}
                %{" "}
              </Text>
            </View>
          </View>
        </View>
        {/* Render profile screen options */}
        <View style={styles.body}>
          <View style={styles.spaceTwo} />
          <FlatList
            renderItem={this.renderOptions}
            showsVerticalScrollIndicator={false}
            extraData={this.state}
            data={this.state.options}
            key={Math.random.toString()}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        {/* Display logout modal */}
        <ModalSwiper
          animationInTiming={1}
          animationOutTiming={1}
          isVisible={this.state.logoutModal}
          style={{
            justifyContent: "flex-end",
            margin: 0
          }}
          swipeDirection="down"
          onSwipeComplete={() => this.setState({ logoutModal: false })}
          hasBackdrop={false}
        >
          <View style={styles.logoutContainer}>
            <TouchableOpacity
              style={{ flex: 0.7 }}
              onPress={() => {
                this.setState({ logoutModal: false });
              }}
            />
            <View style={styles.proceed}>
              <View style={styles.logoutAsk}>
                <Text style={styles.logoutText}>{strings.profile.logout1}</Text>
              </View>
              <View style={styles.extraInfo}>
                <Text style={styles.extraInfoText}>{strings.profile.warn}</Text>
              </View>
              <View style={styles.noContainer}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ logoutModal: false });
                  }}
                  style={styles.noButton}
                >
                  <Text style={styles.noButtonText}>
                    {strings.dashboard.no}
                  </Text>
                </TouchableOpacity>
                <View style={styles.space} />
                <TouchableOpacity
                  onPress={() => {
                    this.logoutConfirm();
                  }}
                  style={styles.yesButton}
                >
                  <Text style={styles.yes}>{strings.profile.yes}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View />
        </ModalSwiper>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    userDetails: state.userList.userDetails
  };
}

export default connect(
  mapStateToProps,
  {}
)(Profile);
