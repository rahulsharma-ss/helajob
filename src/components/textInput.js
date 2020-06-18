// Text input component use in app
import React, { Component } from "react";
import FloatingLabel from "../vendors/react-native-floating-labels";

class TextInput extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <FloatingLabel
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        secureTextEntry={this.props.secureTextEntry}
        labelStyle={this.props.labelInput}
        inputStyle={this.props.input}
        style={this.props.formInput}
        value={this.props.text}
        onBlur={this.props.onBlur}
        onChangeText={this.props.onChangeText}
        onKeyPress={this.props.onKeyPress}
        keyboardType={this.props.keyboardType}
      >
        {this.props.label}
      </FloatingLabel>
    );
  }
}

export default TextInput;
