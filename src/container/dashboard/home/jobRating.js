// Container for Rating an Expert

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Modal
} from "react-native";
import idx from "idx";
import { moderateScale } from "../../../utilities/ResponsiveFonts";
import { connect } from "react-redux";
import { fonts } from "../../../constants/theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { rateToExpert } from "../../../actions/list/listAction";
import { RNToasty } from "react-native-toasty";
import styles from "../../../constants/styleSheets/home/jobRating";
import strings from "../../../constants/language";

class JobRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      like: false,
      dislike: false,
      comments: null,
      submitModal: false,
      isActive: false,
      step: 1,
      isChecked: false
    };
  }

  // Submit review
  submitRating = () => {
    this.props.submitReview();
  };

  // Submit rating
  submitCustomerRating = () => {
    if (this.state.dislike) {
      if (this.state.comments) {
        this.setState({ step: 3 });
        this.props.rateToExpert(
          {
            sender: this.props.userId,
            service_request_id: this.props.job_id,
            receiver: this.props.expertId,
            rate: -1,
            description: this.state.comments,
            re_hire: 0,
            user_type: 2
          },
          cb => {
            this.setState({ submitModal: true });
            socket.onSetRating(this.props.expertId); // Emmit an event to expert telling that rating has been given.
          }
        );
      } else {
        RNToasty.Warn({
          title: `${strings.modal.comment}`,
          withIcon: false
        });
      }
    } else {
      this.setState({ step: 2 });

      this.props.rateToExpert(
        {
          sender: this.props.userId,
          service_request_id: this.props.job_id,
          receiver: this.props.expertId,
          rate: 1,
          description: this.state.comments || "",
          re_hire: this.state.isChecked ? 1 : 0,
          user_type: 2
        },
        cb => {
          this.setState({ submitModal: true });
          socket.onSetRating(this.props.expertId); // Emmit an event to expert telling that rating has been given.
        }
      );
    }
  };

  // Dislike expert
  dislikedUs = () => {
    return (
      <View style={styles.dislikedContainer}>
        <View style={styles.space} />
        <View style={styles.dislike}>
          <View style={styles.ratingHeader}>
            <Text style={styles.ratingText}>{strings.modal.rating}</Text>
          </View>
          <View style={styles.thanksHeader}>
            <Text style={styles.thanksHeaderText}>{strings.modal.thanks}</Text>
          </View>

          <View style={styles.ok}>
            <TouchableOpacity
              style={styles.submitRate}
              onPress={() => this.submitRating()}
            >
              <Text style={styles.okText}>{strings.dashboard.ok}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  //Default rating
  defaultRating = () => {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps={"never"}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        innerRef={ref => {
          this.scroll = ref;
        }}
      >
        <Text style={styles.ratingHeaderOne}>{strings.modal.rating2}</Text>
        <Text style={styles.thankyouText}>
          {strings.modal.thanks2} {this.props.expertName}.
        </Text>
        <View style={styles.options}>
          <TouchableOpacity
            style={styles.likeButton}
            onPress={() =>
              this.setState({ like: true, dislike: false, isActive: true })
            }
          >
            <View
              style={[
                styles.extraImage,
                this.state.like && styles.buttonActive
              ]}
            >
              <Image
                source={require("../../../assets/img/like.png")}
                resizeMode={"contain"}
                style={{ flex: 1 }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dislikeButton}
            onPress={() =>
              this.setState({ like: false, dislike: true, isActive: true })
            }
          >
            <View
              style={[
                styles.extraImage,
                this.state.dislike && styles.buttonActive
              ]}
            >
              <Image
                source={require("../../../assets/img/dislike.png")}
                resizeMode={"contain"}
                style={{ flex: 1 }}
              />
            </View>
          </TouchableOpacity>
        </View>
        {this.state.like && (
          <View>
            <TouchableOpacity
              style={styles.checkBoxContainer}
              onPress={() =>
                this.setState({ isChecked: !this.state.isChecked })
              }
            >
              <View style={styles.checkStatus}>
                {this.state.isChecked ? (
                  <View style={styles.isChecked} />
                ) : null}
              </View>
              <Text style={styles.reuse}>{strings.modal.reuse}</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: "row", alignItems: "center" }} />
            <Text style={styles.commentHeader}>{strings.modal.comment2}</Text>
            <TextInput
              style={styles.commentInput}
              underlineColorAndroid={"transparent"}
              multiline={true}
              onChangeText={comments => this.setState({ comments })}
            />
          </View>
        )}
        {this.state.dislike && (
          <View style={{ marginTop: moderateScale(30) }}>
            <Text style={styles.improve}>
              {strings.modal.howCan} {this.props.expertName}{" "}
              {strings.modal.improve}
              <Text style={styles.mandatory}> {strings.modal.mandatory}</Text>
            </Text>
            <TextInput
              style={styles.commentInputText}
              underlineColorAndroid={"transparent"}
              multiline={true}
              onChangeText={comments => this.setState({ comments })}
            />
          </View>
        )}
        <TouchableOpacity
          disabled={!this.state.isActive}
          style={[
            styles.submitRateExpert,
            {
              backgroundColor: this.state.isActive ? "#1F5BA8" : "#1F5BA850",
              borderColor: this.state.isActive ? "#1F5BA8" : "#1F5BA850",
              marginTop: this.state.isActive
                ? moderateScale(20)
                : moderateScale(100)
            }
          ]}
          onPress={() => this.submitCustomerRating()}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: moderateScale(17),
              fontFamily: fonts.LATOBOLD
            }}
          >
            {strings.modal.submit}
          </Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.submitModal}
          onRequestClose={() => null}
        />
      </KeyboardAwareScrollView>
    );
  };

  // Like expert
  likedUs = () => {
    return (
      <View style={styles.likedContainer}>
        <View style={styles.spaceTwo} />
        <View style={styles.likedContainerChild}>
          <View style={styles.likedRatingHeader}>
            <Text style={styles.likedRatingHeaderText}>
              {strings.modal.rating}
            </Text>
          </View>
          <View style={styles.likeThanks}>
            <Text style={styles.likedThanksText}>{strings.modal.thanks}</Text>
          </View>

          <View style={styles.afterRateButton}>
            <TouchableOpacity
              style={styles.likeSubmit}
              onPress={() => this.submitRating()}
            >
              <Text style={styles.rateOnStore}>{strings.modal.rate}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.likedOk}
              onPress={() => this.submitRating()}
            >
              <Text style={styles.likedOkText}>{strings.dashboard.ok}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  // Render view on review type
  giveFeedback = () => {
    if (this.state.step == 1) {
      return this.defaultRating();
    } else if (this.state.step == 2) {
      return this.likedUs();
    } else if (this.state.step == 3) {
      return this.dislikedUs();
    }
  };
  render() {
    return this.giveFeedback();
  }
}

function mapStateToProps(state) {
  return {
    userId:
      idx(state, _ => _.user.userData.data.id) ||
      idx(state, _ => _.signup.data.data.user_id)
  };
}

export default connect(
  mapStateToProps,
  {
    rateToExpert
  }
)(JobRating);
