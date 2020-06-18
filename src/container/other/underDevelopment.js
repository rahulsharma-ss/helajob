import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";
import { logout } from "../../actions/auth/loginActions";
class UnderDevelopment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goBack = () => {
    Navigation.pop(this.props.componentId);
  };

  logout = () => {
    this.props.logout(this.props.componentId);
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>UNDER DEVELOPMENT</Text>
        <TouchableOpacity onPress={this.goBack}>
          <Text style={{ fontSize: 25 }}>GO BACK</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.logout}>
          <Text style={{ fontSize: 25 }}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  { logout }
)(UnderDevelopment);
