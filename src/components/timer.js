// Timer component for starting otp validation timer
import React from "react";
import { View } from "react-native";
import CountDown from "react-native-countdown-component";
import { moderateScale } from "../utilities/ResponsiveFonts";
import { colors } from "../constants/theme";
export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uniqueValue: 1
    };
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.forceRemount != this.props.forceRemount) this.forceRemount();
  };

  // Resetting timer on resend
  forceRemount = () => {
    this.setState({
      uniqueValue: this.state.uniqueValue + 1
    });
  };

  render() {
    return (
      <View key={this.state.uniqueValue}>
        <CountDown
          until={240}
          digitStyle={{
            alignSelf: "center",
            justifyContent: "center"
          }}
          digitTxtStyle={{
            color: colors.BLUE,
            fontSize: moderateScale(14),
            textAlign: "center",
            fontWeight: "bold",
            paddingBottom: moderateScale(2)
          }}
          timeLabelStyle={{ color: "red" }}
          separatorStyle={{
            color: "#1F5BA8",
            fontSize: moderateScale(12),
            paddingBottom: moderateScale(2)
          }}
          timeToShow={["M", "S"]}
          timeLabels={{ m: null, s: null }}
          showSeparator
          size={moderateScale(9)}
        />
      </View>
    );
  }
}
