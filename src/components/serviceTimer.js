import React from "react";
import { Text } from "react-native";
import { moderateScale } from "../utilities/ResponsiveFonts";
import moment from "moment";

export default class ServiceTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: { h: 0, m: 0, s: 0 }, seconds: 0 };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds
    };
    return obj;
  }

  timeToSeconds(time) {
    let hms = time; // your input string
    let a = hms.split(":"); // split it at the colons
    let hourSeconds = Number(a[0]) * 60 * 60;
    let minuteSeconds = Number(a[1]) * 60;
    let seconds = hourSeconds + minuteSeconds + Number(a[2]);
    return seconds;
  }

  componentDidMount() {
    if (this.props.startTimer == 1 && this.props.serviceStartTime) {
      let now = moment()
        .utc()
        .format("YYYY-MM-DD HH:mm:ss");
      let then = moment
        .utc(this.props.serviceStartTime)
        .format("YYYY-MM-DD HH:mm:ss");

      let difference = moment(moment(now).diff(moment(then)))
        .utc()
        .format("HH:mm:ss");

      // let difference = moment(now).diff(moment(then), "seconds", true);
      // let totalSeconds = difference;
      let totalSeconds = Number(this.timeToSeconds(difference));

      if (!this.props.breakStart && this.props.breakDuration >= 0) {
        let seconds = totalSeconds - this.props.breakDuration;
        this.setState({ seconds: seconds });
        this.startTimer();
      }

      if (this.props.breakStart && !this.props.breakEnd) {
        let now = moment
          .utc(this.props.breakStart)
          .format("YYYY-MM-DD HH:mm:ss");
        let then = moment(this.props.serviceStartTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );

        // let difference = moment(now).diff(moment(then), "seconds", true);
        // let totalSeconds = difference;
        let difference = moment(moment(now).diff(moment(then)))
          .utc()
          .format("HH:mm:ss");

        let totalSeconds = Number(this.timeToSeconds(difference));

        let timeLeftVar = this.secondsToTime(
          totalSeconds - this.props.breakDuration
        );

        this.setState({ time: timeLeftVar });
      }
    }
    if (this.props.endTimer == 1) {
      clearInterval(this.timer);
    }
  }

  componentWillUnmount = () => {
    clearInterval(this.timer);
  };

  getTimeZoneSeconds = offset => {
    let offsetSeconds = offset * 60; // convert offset minutes into seconds
    return Math.abs(offsetSeconds);
  };

  startTimer() {
    if (this.timer == 0 && this.state.seconds >= 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Add one second, set state so a re-render happens.
    let seconds = this.state.seconds + 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds
    });
  }

  pad = n => {
    return n < 10 ? "0" + n : n;
  };

  render() {
    return (
      <Text
        style={
          this.props.style
            ? this.props.style
            : {
                color: "#707070",
                fontFamily: "segoeui",
                fontSize: moderateScale(12)
              }
        }
      >
        {this.pad(this.state.time.h)}:{this.pad(this.state.time.m)}:
        {this.pad(this.state.time.s)}
      </Text>
    );
  }
}
