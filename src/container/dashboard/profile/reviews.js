import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { moderateScale } from "../../../utilities/ResponsiveFonts";
import Icon from "react-native-vector-icons/Ionicons";
import AIcon from "react-native-vector-icons/AntDesign";
import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";
import { fonts, colors } from "../../../constants/theme";
import idx from "idx";
import { PROFILE_IMG_URL } from "../../../constants/url";
import { CachedImage } from "react-native-cached-image";
import { getMyReviews } from "../../../actions/list/listAction";
import styles from "../../../constants/styleSheets/profile/reviews";
import strings from "../../../constants/language";

class Reviews extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.getMyReviews(); // Getting all reviews.
  }

  goToDashboard = () => {
    Navigation.pop(this.props.componentId); // Navgating to dashboard.
  };

  _keyExtractor = (item, index) => {
    return `${item.id}`;
  };

  render() {
    const { userDetails } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={this.goToDashboard}
          >
            <Image
              source={require("../../../assets/img/back.png")}
              resizeMode={"contain"}
              style={{
                height: moderateScale(20),
                width: moderateScale(20)
              }}
            />
          </TouchableOpacity>
          <View style={styles.title}>
            <Text style={styles.titleText}>{strings.review.review}</Text>
          </View>
          <View style={styles.spaceOne} />
        </View>
        <View style={styles.userDetails}>
          <View style={styles.userRating}>
            <View style={[styles.services, { flexDirection: "row" }]}>
              <Text
                style={[styles.servicesText, { fontFamily: fonts.LATOBOLD }]}
              >
                {userDetails.totalServices}{" "}
              </Text>
              <Text
                style={[styles.servicesText, { fontFamily: fonts.LATOMEDIUM }]}
              >
                {strings.review.services}
              </Text>
            </View>
            <View style={styles.seperator}>
              <Text style={styles.seperatorText}>|</Text>
            </View>
            <View style={styles.totalRating}>
              {/* <AIcon
                name="like1"
                size={moderateScale(17)}
                color={"#40D15D"}
                style={{ marginHorizontal: moderateScale(4) }}
              /> */}
              <Image
                source={require("../../../assets/img/thumbUp.png")}
                resizeMode={"contain"}
                style={{
                  height: moderateScale(18),
                  width: moderateScale(18)
                }}
              />
              <Text
                style={[styles.positiveRating, { fontFamily: fonts.LATOBOLD }]}
              >
                {" "}
                {idx(
                  this.props,
                  _ => _.userDetails.averageFeedback.toString().split(".")[0]
                ) || 0}
                %{" "}
              </Text>
              <Image
                source={require("../../../assets/img/thumbDown.png")}
                resizeMode={"contain"}
                style={{
                  height: moderateScale(18),
                  width: moderateScale(18)
                }}
              />
              {/* <AIcon
                name="dislike1"
                size={moderateScale(17)}
                color={"#F85C5C"}
                style={{ marginHorizontal: moderateScale(4) }}
              /> */}
              <Text
                style={[styles.negativeRating, { fontFamily: fonts.LATOBOLD }]}
              >
                {" "}
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
        {/* Displaying all reviews received */}
        <View style={{ flex: 0.8 }}>
          {idx(this.props, _ => _.myReviews.length > 0) ? (
            <FlatList
              data={this.props.myReviews}
              keyExtractor={this._keyExtractor}
              renderItem={item => {
                return (
                  <View style={styles.allReviews}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={styles.expertFeedback}>
                        <CachedImage
                          style={styles.expertImage}
                          source={{
                            uri: `${PROFILE_IMG_URL}${idx(
                              item,
                              _ => _.item.sender.profile_image
                            )}`
                          }}
                        />
                      </View>
                      <View style={styles.expertName}>
                        <Text style={styles.expertNameText}>
                          {idx(item, _ => _.item.sender.fullname)}{" "}
                        </Text>
                        {item.item.rate == "1" ? (
                          <Image
                            source={require("../../../assets/img/thumbUp.png")}
                            resizeMode={"contain"}
                            style={{
                              height: moderateScale(18),
                              width: moderateScale(18)
                            }}
                          />
                        ) : (
                          <Image
                            source={require("../../../assets/img/thumbDown.png")}
                            resizeMode={"contain"}
                            style={{
                              height: moderateScale(18),
                              width: moderateScale(18)
                            }}
                          />
                        )}
                      </View>
                    </View>
                    <Text style={styles.description}>
                      {idx(item, _ => _.item.description.length > 1)
                        ? idx(item, _ => _.item.description)
                        : "No comment"}
                    </Text>
                  </View>
                );
              }}
            />
          ) : (
            <Text style={styles.noReview}>{strings.review.noReview}</Text>
          )}
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    myReviews: state.userList.myReviews,
    userDetails: state.userList.userDetails
  };
}

export default connect(
  mapStateToProps,
  { getMyReviews }
)(Reviews);
