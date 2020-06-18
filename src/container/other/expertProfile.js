// Container to display Experts profile

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
  Platform
} from "react-native";
import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";
import { fonts, colors } from "../../constants/theme";
import { moderateScale } from "../../utilities/ResponsiveFonts";
import { getExpertDetails } from "../../actions/list/listAction";
import { PROFILE_IMG_URL } from "../../constants/url";
import { CachedImage } from "react-native-cached-image";
import idx from "idx";
import strings from "../../constants/language";

var _ = require("lodash");

class ExpertProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.liveTracking = _.debounce(this.liveTracking, 300);
  }

  componentDidMount = () => {
    expert_id = {
      user_id: this.props.expert && this.props.expert.expert_id
    };
    this.props.getExpertDetails(expert_id); // Get Expert details
  };

  // Navigate to current location
  goToMap = () => {
    this.props.openRequestModal(1);
    Navigation.pop(this.props.componentId);
  };

  // Navigate to live tracking
  liveTracking = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "LiveTracking",
        options: {
          statusBar: {},
          topBar: {
            visible: false,
            height: 0
          }
        }
      }
    });
  };

  // Render expert feedbacks
  renderFeedbacks = item => {
    return (
      <View
        style={{
          height: moderateScale(70)
        }}
      >
        <View
          style={{
            flexDirection: "row",
            flex: 0.3
          }}
        >
          <Text
            style={{
              fontSize: moderateScale(18),
              fontFamily: fonts.LATOBOLD,
              color: colors.BLUE
            }}
          >
            {idx(item, _ => _.item.sender.fullname) || "John Doe"}
          </Text>
          <View
            style={{
              height: moderateScale(5),
              width: moderateScale(15)
            }}
          />
          <Image
            source={require("../../assets/img/thumbUp.png")}
            resizeMode={"contain"}
            style={{
              height: moderateScale(20),
              width: moderateScale(20),
              paddingTop: moderateScale(2),
              paddingLeft: moderateScale(5)
            }}
          />
        </View>
        <View
          style={{
            flex: 0.7
          }}
        >
          <Text
            numberOfLines={3}
            style={{
              fontSize: moderateScale(15),
              fontFamily: fonts.LATOBOLD,
              color: colors.BLACK
            }}
          >
            {idx(item, _ => _.item.description) || "No comment"}
          </Text>
        </View>
      </View>
    );
  };

  render() {
    const { expertDetails, expert } = this.props;
    const data = expertDetails ? expertDetails : ""; // Expert details.
    let expertImage = idx(
      this.props,
      _ => _.expertDetails.data[0].profile_image
    ); // Expert profile image.
    let expertFeedback = idx(this.props, _ => _.expertDetails.averageFeedback); // Expert total feedbacks.
    let expertName = idx(this.props, _ => _.expertDetails.data[0].fullname); // Expert name.
    let recentFeedbacks = idx(this.props, _ => _.expertDetails.recentFeedbacks); // Experts recent feedbacks.
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            height: moderateScale(50),
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: moderateScale(13),
            paddingTop: Platform.OS === "android" ? moderateScale(40) : 0
          }}
        >
          <TouchableOpacity
            onPress={this.goToMap}
            style={{ flex: 0.1, justifyContent: "center" }}
          >
            <Image
              source={require("../../assets/img/back.png")}
              resizeMode={"contain"}
              style={{
                height: moderateScale(20),
                width: moderateScale(20),
                alignSelf: "flex-start"
              }}
            />
          </TouchableOpacity>
          <View style={{ flex: 0.8 }}>
            <Text
              style={{
                fontSize: moderateScale(18),
                textAlign: "center",
                fontFamily: fonts.LATOBOLD
              }}
            >
              {strings.expert.profile}
            </Text>
          </View>
          <View style={{ flex: 0.1 }} />
        </View>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 0.2,
              flexDirection: "row",
              borderBottomColor: colors.GREY,
              borderBottomWidth: 0.5,
              marginHorizontal: moderateScale(10)
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
                  height: moderateScale(60),
                  width: moderateScale(60),
                  borderRadius: moderateScale(200),
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden"
                }}
              >
                <CachedImage
                  style={{
                    height: moderateScale(60),
                    width: moderateScale(60)
                  }}
                  source={{
                    uri: `${PROFILE_IMG_URL}${expertImage}`
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flex: 0.7
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "space-evenly"
                }}
              >
                <Text
                  style={{
                    fontSize: moderateScale(16),
                    fontFamily: fonts.LATOBOLD,
                    color: colors.BLUE
                  }}
                >
                  {expertName}
                </Text>
                {data.serviceCount > 0 ? (
                  <Text
                    style={{
                      fontSize: moderateScale(15),
                      fontFamily: fonts.LATOBOLD,
                      color: colors.BLACK
                    }}
                  >
                    {expertFeedback}% {strings.dashboard.feedback}
                  </Text>
                ) : null}

                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: moderateScale(14),
                    fontFamily: fonts.LATOREGULAR,
                    color: colors.BLACK
                  }}
                >
                  {expert.service_parent_name} > {expert.job_category}
                </Text>
                <Text
                  style={{
                    fontSize: moderateScale(15),
                    fontFamily: fonts.LATOREGULAR,
                    color: colors.DGREY
                  }}
                >
                  £{expert.job_cost}/{strings.dashboard.hour}
                </Text>
                <Text
                  style={{
                    fontSize: moderateScale(15),
                    fontFamily: fonts.LATOREGULAR,
                    color: colors.DGREY
                  }}
                >
                  Work Experience{" "}
                  {idx(this.props, _ => _.expertDetails.workExperience)}+{" "}
                  {strings.dashboard.hour}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 0.25,
              paddingHorizontal: moderateScale(10),
              paddingTop: moderateScale(5)
            }}
          >
            <Text
              style={{
                fontSize: moderateScale(18),
                fontFamily: fonts.LATOBOLD,
                color: colors.BLACK
              }}
            >
              {strings.expert.about} {expertName}
            </Text>
            <Text
              numberOfLines={5}
              style={{
                fontSize: moderateScale(15),
                fontFamily: fonts.LATOBOLD,
                color: colors.GREY,
                paddingLeft: moderateScale(5)
              }}
            >
              {idx(this.props, _ => _.expertDetails.data[0].profile.about)
                ? idx(this.props, _ => _.expertDetails.data[0].profile.about)
                : strings.expert.noInfo}
            </Text>
          </View>
          <View style={{ flex: 0.45, paddingHorizontal: moderateScale(10) }}>
            <View style={{ flex: 0.1 }}>
              <Text
                style={{
                  fontSize: moderateScale(18),
                  fontFamily: fonts.LATOBOLD,
                  color: colors.BLACK
                }}
              >
                {strings.expert.feedback}{" "}
              </Text>
            </View>

            <View
              style={{
                flex: 0.9
              }}
            >
              {recentFeedbacks && recentFeedbacks.length > 0 ? (
                <FlatList
                  scrollEnabled={true}
                  contentContainerStyle={
                    {
                      // height: moderateScale(200)
                    }
                  }
                  renderItem={this.renderFeedbacks}
                  extraData={this.state}
                  data={recentFeedbacks}
                  keyExtractor={(item, index) => index.toString()}
                  showsVerticalScrollIndicator={false}
                />
              ) : (
                <Text
                  style={{
                    fontSize: moderateScale(15),
                    fontFamily: fonts.LATOBOLD,
                    color: colors.BLACK,
                    textAlign: "center"
                  }}
                >
                  {strings.expert.noFeedback}
                </Text>
              )}
            </View>
          </View>
          <View
            style={{
              flex: 0.1,

              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              onPress={this.liveTracking}
              style={{
                height: moderateScale(45),
                width: moderateScale(300),
                backgroundColor: colors.BLUE,
                borderRadius: moderateScale(5),
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontSize: moderateScale(18),
                  fontFamily: fonts.LATOBOLD,
                  color: colors.WHITE
                }}
              >
                {strings.dashboard.live}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.userList.loading,
    expertDetails: state.userList.expertDetails
  };
}

export default connect(
  mapStateToProps,
  { getExpertDetails }
)(ExpertProfile);
