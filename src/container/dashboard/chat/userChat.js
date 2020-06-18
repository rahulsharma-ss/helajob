// Chat component for 1-o-1 chat with customer

import React from "react";
import { moderateScale } from "../../../utilities/ResponsiveFonts";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Keyboard,
  ActivityIndicator,
  Platform
} from "react-native";
import { connect } from "react-redux";
import { colors } from "../../../constants/theme";
import idx from "idx";
import Permissions from "react-native-permissions";
import { CustomAlert } from "../../../components/customAlert";
import {
  GiftedChat,
  InputToolbar,
  Send,
  Bubble
} from "../../../utilities/lib/react-native-gifted-chat";
import IconS from "react-native-vector-icons/FontAwesome5";
import { notificationDot } from "../../../actions/socket/SocketActions";
import { Navigation } from "react-native-navigation";
import { getMessages, chatList } from "../../../actions/list/listAction";
import ImagePicker from "react-native-image-picker";
import { PROFILE_IMG_URL, SERVER_URL } from "../../../constants/url";
import styles from "../../../constants/styleSheets/chat/userChat";
import moment from "moment";
const logo = "http://34.211.31.84:7039/img/mob_icon/logo@2x.png";
class UserChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      cameraPermission: "",
      photoPermission: "",
      showAlert: false
    };
  }

  componentWillMount() {
    // Refershing chat listing in case a new message is received
    socket.messageReceived(message => {
      this.receiveNewMessage(message);
      this.props.chatList();
    });

    // Keyboard listners
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );

    // Get messages between a Customer and expert
    this.props.getMessages({
      chat_id: this.props.chatData && this.props.chatData.id
    });

    // Requesting camera and gallery permission
    this.requestPermission();

    // Checking for camera and gallery permission
    Permissions.checkMultiple(["camera", "photo"]).then(response => {
      this.setState({
        cameraPermission: response.camera,
        photoPermission: response.photo
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.chat != this.props.chat) {
      this.setState({ messages: nextProps.chat });
    }
  }

  componentWillUnmount() {
    // Removing keyboard listners
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  // Display alert
  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };

  // Hide alert
  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  requestPermission = () => {
    Permissions.request("camera").then(response => {
      // Returns once the user has chosen to 'allow' or to 'not allow' access
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({
        cameraPermission: response
      });
    });
    Permissions.request("photo").then(response => {
      // Returns once the user has chosen to 'allow' or to 'not allow' access
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({
        photoPermission: response
      });
    });
  };

  // Receiving new message
  receiveNewMessage = message => {
    let newMessage = [
      {
        _id: message[0]._id,
        text: message[0].text,
        createdAt: message[0].createdAt,
        user: {
          _id: message[0].id,
          name: message[0].fullname,
          avatar: `${PROFILE_IMG_URL}${message[0].profile_image}`
        },
        image: message[0].image
      }
    ];

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, newMessage)
    }));
  };

  _keyboardDidShow() {}
  _keyboardDidHide() {}

  // Sending a new message
  onSend(messages = []) {
    messages[0].is_read = 1;
    let data = {
      sender: idx(this.props, _ => _.chatData.sender.id),
      receiver: idx(this.props, _ => _.chatData.receiver.id),
      message: messages[0].text,
      image: messages[0].image || "",
      chat_id: idx(this.props, _ => _.chatData.id)
    };

    socket.sendMessage(data);
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
    this.props.chatList();
  }

  // Render message input toolbar
  renderInputToolbar(props) {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          borderColor: "#E2E2E2",
          borderWidth: 1,
          borderRadius: moderateScale(22),
          marginHorizontal: moderateScale(15)
        }}
      />
    );
  }

  renderSend(props) {
    return <Send {...props} containerStyle={{ borderColor: "transparent" }} />;
  }

  // Opening camera
  cameraImagePicker = () => {
    Permissions.checkMultiple(["camera", "photo"]).then(response => {
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      if (response.camera == "authorized" && response.photo == "authorized") {
        this.allowGallery();
      } else {
        this.showAlert();
      }
    });
  };

  // Gallery access
  allowGallery = () => {
    const options = {
      title: "Select Image",
      storageOptions: {
        skipBackup: true,
        path: "images",
        loadingModal: false
      },
      quality: 0.1
    };

    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        let data = [
          {
            text: "",
            user: {
              _id: this.props.user_id,
              avatar: ``
            },
            createdAt: new Date(),
            _id: 112323,
            image: `data:image/jpeg;base64,${response.data}`
          }
        ];
        this.onSendImage(data);
        this.getUserChats();

        this.uploadImage(response, cb => {
          let data = [
            {
              text: "",
              user: {
                _id: this.props.user_id,
                avatar: ""
              },
              createdAt: new Date(),
              _id: 112323,
              image: `${PROFILE_IMG_URL}${cb.data && cb.data.image_path}`
            }
          ];
          let imageDate = {
            sender: idx(this.props, _ => _.chatData.sender.id),
            receiver: idx(this.props, _ => _.chatData.receiver.id),
            message: data[0].text,
            image: data[0].image || "",
            chat_id: idx(this.props, _ => _.chatData.id)
          };

          socket.sendMessage(imageDate); // Sending an image to message.
        });
      }
    });
  };

  // On image send
  onSendImage(messages = []) {
    messages[0].is_read = 1;
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }

  // Refreshing user chats
  getUserChats = () => {
    this.props.chatList();
  };

  //Upload an image
  uploadImage = (picture, cb) => {
    let photo = {
      uri: picture.uri,
      type: picture.type,
      name: `${Math.random()}.jpg`
    };
    let data = new FormData();
    data.append("image", photo);
    let token = this.props.token;
    fetch(`${SERVER_URL}uploadChatImage`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
        "X-Requested-With": "XMLHttpRequest"
      },
      body: data
    })
      .then(response => response.json())
      .then(responseJson => {
        cb(responseJson);
      })
      .catch(err => {
        cb(err);
      });
  };

  // Accessing gallery
  galleryImagePicker = () => {
    Permissions.checkMultiple(["camera", "photo"]).then(response => {
      if (response.camera == "authorized" && response.photo == "authorized") {
        this.allowCamera();
      } else {
        this.showAlert();
      }
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

  // Requesting permission on android
  androidPermission = () => {
    Permissions.request("camera").then(response => {
      this.setState({ cameraPermission: response });
    });
  };

  // Camera access allowed
  allowCamera = () => {
    const options = {
      title: "Select Image",
      storageOptions: {
        skipBackup: true,
        path: "images",
        loadingModal: false
      },
      quality: 0.1
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        let data = [
          {
            text: "",
            user: {
              _id: this.props.user_id,
              avatar: ""
            },
            createdAt: new Date(),
            _id: 112323,
            image: `data:image/jpeg;base64,${response.data}`
          }
        ];

        this.onSendImage(data);

        this.uploadImage(response, cb => {
          let data = [
            {
              text: "",
              user: {
                _id: this.props.user_id,
                avatar: ""
              },
              createdAt: new Date(),
              _id: 112323,
              image: `${PROFILE_IMG_URL}${cb.data && cb.data.image_path}`
            }
          ];

          let imageDate = {
            sender: idx(this.props, _ => _.chatData.sender.id),
            receiver: idx(this.props, _ => _.chatData.receiver.id),
            message: data[0].text,
            image: data[0].image || "",
            chat_id: idx(this.props, _ => _.chatData.id)
          };

          socket.sendMessage(imageDate); // Sending an image to message.
        });
      }
    });
  };

  // Rendering camera and gallery icons
  renderCustomActions = () => {
    return (
      <View style={styles.customChatActions}>
        <TouchableOpacity
          onPress={this.cameraImagePicker}
          style={styles.camera}
        >
          <Image
            source={require("../../../assets/img/photo-camera.png")}
            resizeMode={"contain"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.galleryImagePicker}
          style={styles.gallery}
        >
          <Image
            source={require("../../../assets/img/gallery.png")}
            resizeMode={"contain"}
          />
        </TouchableOpacity>
      </View>
    );
  };

  // Navigating to chat listing
  goToChatList = () => {
    this.props.notificationDot(false);
    Navigation.pop(this.props.componentId);
    if (this.props.fromCurrent) {
      this.props.openRequestModal(1);
    }
  };

  // Message bubble footer for displaying time and ticks.
  messageFooter = timeProps => {
    let isRead = timeProps.currentMessage.is_read;
    let time = moment(timeProps.currentMessage.createdAt).format("hh:mm a");
    if (timeProps.currentMessage.sender === this.props.user_id) {
      return (
        <View style={styles.messageFooter}>
          <Text style={styles.footerTime}>{time} </Text>
          {isRead ? (
            <IconS
              name={"check-double"}
              size={moderateScale(10)}
              color={colors.WHITE}
            />
          ) : (
            <IconS
              name={"check"}
              size={moderateScale(10)}
              color={colors.WHITE}
            />
          )}
        </View>
      );
    } else {
      return <Text style={styles.footerTimeBlack}> {time}</Text>;
    }
  };

  // Message bubble displaying message body.
  renderBubble = props => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: "white"
          },
          left: {
            color: "#3E3E3E"
          }
        }}
        wrapperStyle={{
          left: {
            backgroundColor: "#D1E5FF"
          },
          right: {
            backgroundColor: "#1F5BA8"
          }
        }}
      />
    );
  };

  render() {
    const { chatData, userDetails } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              this.goToChatList();
            }}
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
          <View
            style={{
              flex: 0.6,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={styles.expertName}>
              {idx(chatData, _ => _.receiver.fullname) ||
                idx(chatData, _ => _.expert_name) ||
                ""}
            </Text>
          </View>
          <View style={styles.space} />
        </View>
        <View style={styles.chatContainer}>
          {/* Chat listing of a perticular user */}
          <GiftedChat
            messages={this.state.messages || []}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: this.props.user_id,
              avatar: idx(userDetails, _ => _.data[0].profile_image)
                ? `${PROFILE_IMG_URL}${idx(
                    userDetails,
                    _ => _.data[0].profile_image
                  )}`
                : logo
            }}
            showUserAvatar={true}
            keyboardShouldPersistTaps={"never"}
            renderSend={this.renderSend}
            renderInputToolbar={this.renderInputToolbar}
            renderActions={this.renderCustomActions}
            isLoadingEarlier={true}
            renderBubble={this.renderBubble}
          />
        </View>
        {this.props.loading && (
          <View style={styles.loader}>
            <ActivityIndicator size={"large"} color={colors.PRIMARY} />
          </View>
        )}
        <CustomAlert
          show={this.state.showAlert}
          hideAlert={this.hideAlert}
          title={"Camera access is required"}
          messsage={"Please enable Camera access from settings"}
          confirmText={"Settings"}
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.confirmAlert();
          }}
          isChat={true}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    chat: idx(state, _ => _.userList.allChatDetails),
    loading: state.userList.loadingChat,
    user_id:
      idx(state.user, _ => _.userData.data.id) ||
      idx(state.signup, _ => _.data.data.user_id),
    userAvatar: idx(state, _ => _.userList.allChatDetails),
    token:
      idx(state.user, _ => _.userData.token) ||
      idx(state.signup, _ => _.data.token),
    chatData: state.socket.serviceRequestAccepted,
    userDetails: state.userList.userDetails
  };
}

export default connect(
  mapStateToProps,
  {
    getMessages,
    chatList,
    notificationDot
  }
)(UserChat);
