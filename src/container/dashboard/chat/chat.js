// Chat component, listing all User chats

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  ActivityIndicator,
  Platform
} from "react-native";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Navigation } from "react-native-navigation";
import { chatList } from "../../../actions/list/listAction";
import moment from "moment";
import { PROFILE_IMG_URL } from "../../../constants/url";
import {
  serviceRequestAccepted2,
  notificationDot
} from "../../../actions/socket/SocketActions";
import idx from "idx";
import { CachedImage } from "react-native-cached-image";
import styles from "../../../constants/styleSheets/chat/chat";
import { moderateScale } from "../../../utilities/ResponsiveFonts";
import strings from "../../../constants/language";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ""
    };
  }

  componentDidMount = () => {
    //Requesting all chats listing
    this.props.chatList();

    //Refreshing chatlist if a message is received
    socket.messageReceived(message => {
      this.props.chatList();
    });
  };

  // Navigating to User chat screen
  expandChat = item => {
    this.props.notificationDot(false);

    this.props.serviceRequestAccepted2(item);
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

  // Extracting a unique key for flatlist
  _keyExtractor = (item, index) => item.id;

  // Rendering chat listing
  renderChat = chatData => {
    const { item } = chatData;
    return (
      <TouchableOpacity
        onPress={() => this.expandChat(item)}
        style={styles.chatListing}
      >
        <View style={styles.expertImageContainer}>
          <View style={styles.expertImage}>
            {idx(item, _ => _.receiver.profile_image) ? (
              <CachedImage
                // defaultSource={require("../../../assets/img/loader.png")}
                source={{
                  uri: `${PROFILE_IMG_URL}${idx(
                    item,
                    _ => _.receiver.profile_image
                  )}`
                }}
                resizeMode={"cover"}
                style={styles.expertPicture}
              />
            ) : (
              <Image
                style={{
                  height: moderateScale(40),
                  width: moderateScale(40)
                }}
                source={require("../../../assets/img/logo.png")}
                resizeMode={"contain"}
              />
            )}
          </View>
        </View>
        <View style={styles.expertDetails}>
          <View style={styles.expertInfo}>
            <Text style={styles.expertName}>
              {idx(item, _ => _.item.receiver.fullname) ||
                idx(item, _ => _.receiver.fullname)}
            </Text>

            <Text style={styles.chatTime}>
              {" "}
              {moment
                .utc(
                  idx(item, _ => _.updated_at) ||
                    idx(item, _ => _.message.updated_at)
                )
                .local()
                .format("hh:mm a")}
            </Text>
          </View>
          <View style={{ flex: 0.3 }}>
            <Text style={styles.message}>
              {idx(item, _ => _.message.text)
                ? idx(item, _ => _.message.text)
                : idx(item, _ => _.message.image)
                ? "Photo"
                : ""}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    let chat_length = idx(
      this.props,
      _ =>
        _.chatDetails.data.filter(item =>
          idx(item, _ =>
            _.receiver.fullname
              .toLowerCase()
              .includes(this.state.searchText.toLowerCase())
          )
        ).length > 0
    ); // Getting number of chats.

    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.chatHeader}>{strings.chat.chat}</Text>
          <View style={styles.space} />
          <View
            style={[
              styles.searchBar,
              {
                elevation: Platform.OS == "ios" ? 1 : 10,
                shadowOffset: {
                  width: Platform.OS == "ios" ? -0.5 : -15,
                  height: Platform.OS == "ios" ? -0.3 : -0.2
                }
              }
            ]}
          >
            <View style={styles.searchLogo}>
              <Image
                source={require("../../../assets/img/search.png")}
                resizeMode={"contain"}
              />
            </View>
            <View style={{ flex: 0.9 }}>
              <TextInput
                style={{ paddingRight: moderateScale(15) }}
                placeholder="Search Chat"
                autoCapitalize="none"
                onChangeText={searchText => this.setState({ searchText })}
                autoCorrect={false}
                value={this.state.searchText}
              />
            </View>
          </View>
        </View>
        <View style={styles.spaceTwo} />
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          {this.props.loading ? (
            <ActivityIndicator />
          ) : chat_length ? (
            // Rendering all chats
            <FlatList
              renderItem={this.renderChat}
              showsVerticalScrollIndicator={false}
              extraData={this.state}
              data={this.props.chatDetails.data.filter(item =>
                idx(
                  item,
                  _ =>
                    _.receiver.fullname
                      .toLowerCase()
                      .includes(this.state.searchText.toLowerCase()) &&
                    item.receiver &&
                    item.status == 1
                )
              )}
              key={Math.random.toString()}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <Text style={styles.noChat}>{strings.chat.noChat}</Text>
          )}
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    chatDetails: state.userList.chatDetails,
    loading: state.userList.loading,
    lastChat: state.userList.allChatDetails,
    userId:
      idx(state, _ => _.user.userData.data.id) ||
      idx(state, _ => _.signup.data.data.user_id)
  };
}

export default connect(
  mapStateToProps,
  { chatList, serviceRequestAccepted2, notificationDot }
)(Chat);
