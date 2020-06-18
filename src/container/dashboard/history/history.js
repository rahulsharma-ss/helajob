// Component all jobs user has requested

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  Platform
} from "react-native";
import { connect } from "react-redux";
import { moderateScale } from "../../../utilities/ResponsiveFonts";
import styles from "../../../constants/styleSheets/history/history";
import moment from "moment";
import idx from "idx";
import { PROFILE_IMG_URL } from "../../../constants/url";
import { Navigation } from "react-native-navigation";
import { CachedImage } from "react-native-cached-image";
import { customerInvoice } from "../../../actions/list/listAction";
import { colors } from "../../../constants/theme";
import strings from "../../../constants/language";

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      service: ""
    };
  }

  componentDidMount = () => {
    this.props.customerInvoice();
  };

  // Navigate to expand history screen
  expandHistory = item => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "ExpandHistory",
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
        passProps: { selectedHistory: item }
      }
    });
  };

  // Extracting a unique key for flatlist
  _keyExtractor = (item, index) => item.id;

  // Render completed jobs
  renderHistory = history => {
    const { item } = history;
    let parent = idx(item, _ => _.service.service_parent[0].service); //Service parent details
    return (
      <TouchableOpacity
        onPress={() => this.expandHistory(item)}
        style={styles.historyCard}
      >
        <View style={styles.logoContainer}>
          <View
            style={{
              height: moderateScale(55),
              width: moderateScale(55),
              justifyContent: "center",
              borderRadius: moderateScale(200),
              overflow: "hidden",
              borderWidth: 1
            }}
          >
            <CachedImage
              source={{
                uri: idx(item, _ => _.expert.profile_image)
                  ? `${PROFILE_IMG_URL}${idx(
                      item,
                      _ => _.expert.profile_image
                    )}`
                  : "https://www.plaxis.com/content/uploads/2016/08/dummy-user-300x300.png"
              }}
              resizeMode={"contain"}
              style={styles.userLogo}
            />
          </View>
        </View>
        <View style={styles.details}>
          <View style={styles.mainDetails}>
            <Text style={styles.userName}>
              {(item.expert && item.expert.fullname) || "John Doe"}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.day}>
                {moment
                  .utc(item.created_at)
                  .local()
                  .startOf("second")
                  .fromNow()}
              </Text>
              <View
                style={{
                  height: moderateScale(3),
                  width: moderateScale(3),
                  borderWidth: 1,
                  borderRadius: 200,
                  backgroundColor: colors.GREY,
                  borderColor: colors.GREY,
                  alignSelf: "center",
                  marginHorizontal: moderateScale(4)
                }}
              />
              <Text style={styles.time}>
                {moment
                  .utc(item.created_at)
                  .local()
                  .format("HH:mm a")}
              </Text>
            </View>
          </View>
          <View style={styles.serviceType}>
            <Text style={styles.serviceTypeText}>{item.service.service}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <View style={styles.ratingDetails}>
              <Image
                source={require("../../../assets/img/thumbUp.png")}
                resizeMode={"contain"}
                style={styles.ratingImage}
              />
              <Text style={styles.ratingText}>
                {idx(item, _ => _.service_feedback.rate == "1") ||
                !idx(item, _ => _.service_feedback.rate)
                  ? "100"
                  : "0"}
                %{" "}
              </Text>
              <View style={styles.spaceThree} />
              <Image
                source={require("../../../assets/img/thumbDown.png")}
                resizeMode={"contain"}
                style={styles.ratingImage}
              />
              <Text style={styles.ratingText}>
                {idx(item, _ => _.service_feedback.rate == "1") ||
                !idx(item, _ => _.service_feedback.rate)
                  ? "0"
                  : "100"}
                %{" "}
              </Text>
            </View>
            <View
              style={[
                styles.serviceProvided,
                { paddingHorizontal: moderateScale(5) }
              ]}
            >
              <Text style={styles.providedServiceText}>{parent}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    let completedServices = idx(this.props, _ =>
      _.customerJobHistory.data.filter(
        item =>
          item.service.service
            .toLowerCase()
            .includes(this.state.service.toLowerCase()) &&
          item.status == 2 &&
          item.expert
      )
    );

    return (
      <View style={[styles.container]}>
        <View style={[styles.header]}>
          <Text style={styles.headerTitle}>{strings.history.history}</Text>
          <View style={styles.space} />
          <View style={styles.searchContainer}>
            <View style={styles.searchImage}>
              <Image
                source={require("../../../assets/img/search.png")}
                resizeMode={"contain"}
              />
            </View>
            <View style={styles.searchInput}>
              <TextInput
                placeholder={strings.history.search}
                autoCapitalize="none"
                onChangeText={service => this.setState({ service })}
                autoCorrect={false}
                style={{ textAlign: "left" }}
              />
            </View>
          </View>
        </View>
        <View style={styles.spaceTwo} />
        <View style={{ flex: 1 }}>
          {this.props.loading ? (
            <View
              style={{
                flex: 1,
                paddingTop: moderateScale(240)
              }}
            >
              <ActivityIndicator />
            </View>
          ) : completedServices && completedServices.length > 0 ? (
            <FlatList
              renderItem={this.renderHistory}
              showsVerticalScrollIndicator={false}
              extraData={this.state}
              data={completedServices}
              key={Math.random.toString()}
              keyExtractor={(item, index) => index.toString()}
              onRefresh={() => {
                this.props.customerInvoice();
              }}
              refreshing={this.props.loading}
            />
          ) : (
            <Text
              style={[
                styles.userName,
                { textAlign: "center", paddingTop: moderateScale(250) }
              ]}
            >
              {strings.home.noService}{" "}
            </Text>
          )}
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    scheduledServices: state.userList.scheduledServices,
    customerJobHistory: state.userList.userHistory,
    loading: state.userList.loading
  };
}

export default connect(
  mapStateToProps,
  { customerInvoice }
)(History);
