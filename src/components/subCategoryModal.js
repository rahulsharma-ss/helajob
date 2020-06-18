// Sub category modal for displaying sub categories of a Service
import React, { Component } from "react";
import { TouchableHighlight } from "react-native";
import { Navigation } from "react-native-navigation";
import { SwipeableModal } from "react-native-swipeable-modal";

export class ModalScreen extends Component {
  closeModal = () => {
    Navigation.dismissModal(this.props.componentId);
  };

  render() {
    return (
      <SwipeableModal
        closeModal={this.closeModal}
        direction={"top"}
        style={{
          backgroundColor: "#999999",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <TouchableHighlight title="Close" onPress={this.closeModal} />
      </SwipeableModal>
    );
  }
}
