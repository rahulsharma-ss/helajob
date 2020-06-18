//Component for extending an ongoing job
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
  TextInput,
  ActivityIndicator
} from "react-native";
import moment from "moment";
import { RNToasty } from "react-native-toasty";
import idx from "idx";
import DateTimePicker from "react-native-modal-datetime-picker";
import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";
import { fonts, colors } from "../../../constants/theme";
import { moderateScale } from "../../../utilities/ResponsiveFonts";
import { Calendar } from "react-native-calendars";
import {
  rescheduleService,
  addMoney,
  getCommission
} from "../../../actions/list/listAction";
import styles from "../../../constants/styleSheets/home/extendHire";
import strings from "../../../constants/language";

const nextDay = [];

class ExtendHire extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: 1,
      selectedDates: [],
      selectedDatesGlobal: [],
      startTimePickerVisible: false,
      endTimePickerVisible: false,
      index: 0,
      serviceDate: "",
      totalDates: 1,
      paymentBody: false,
      addMoney: "",
      startTime: 0,
      endTime: 0,
      totalTime: 0,
      allJobTime: 0,
      finalAmount: 0
    };
  }

  componentDidMount = () => {
    this.props.getCommission();
  };
  //Display start time picker
  showStartTimePicker = () => {
    const { selectedDates } = this.state;
    selectedDates[this.state.index].endTime = null;
    this.setState({ startTimePickerVisible: true });
  };

  // Hide start time picker
  hideStartTimePicker = () => this.setState({ startTimePickerVisible: false });

  // Selecting date
  handleStartTimePicked = date => {
    const {
      selectedDates,
      index,
      serviceDate,
      selectedDatesGlobal
    } = this.state;

    //Dates to display locally
    let startDateLocal = moment(date).format("YYYY-MM-DD HH:mm:ss");
    let serviceDateLocal = moment(serviceDate).format("YYYY-MM-DD HH:mm:ss");
    selectedDates[index].serviceDate = serviceDateLocal;
    selectedDates[index].startTime = startDateLocal;

    //Dates converted to UTC for server
    let startDateGlobal = moment(date)
      .add(2, "minutes")
      .utc()
      .format(`${nextDay[index]} HH:mm:ss`);
    selectedDatesGlobal[index].serviceDate = startDateGlobal;
    selectedDatesGlobal[index].startTime = startDateGlobal;
    this.setState({
      selectedDates,
      selectedDatesGlobal,
      startDate: startDateLocal
    });
    this.hideStartTimePicker();
  };

  // Display end time picker
  showEndTimePicker = () => {
    this.setState({ endTimePickerVisible: true });
  };

  // Hde end time picker
  hideEndTimePicker = () => this.setState({ endTimePickerVisible: false });

  // Selecting date
  handleEndTimePicked = date => {
    const {
      selectedDates,
      index,
      serviceDate,
      selectedDatesGlobal
    } = this.state;
    //Dates to display locally
    let endDateLocal = moment(date).format("YYYY-MM-DD HH:mm:ss");
    let serviceDateLocal = moment(serviceDate).format("YYYY-MM-DD HH:mm:ss");
    selectedDates[index].serviceDate = serviceDateLocal;
    selectedDates[index].endTime = endDateLocal;

    //Dates converted to UTC for server
    let endDateGlobal = moment(date)
      .utc()
      .format(`${nextDay[index]} HH:mm:ss`);
    let serviceDateGlobal = moment(serviceDate)
      .utc()
      .format("YYYY-MM-DD HH:mm:ss");
    selectedDatesGlobal[index].endTime = endDateGlobal;

    this.setState(
      { selectedDates, endDate: endDateLocal, serviceDateGlobal },
      () => {
        selectedDates[index].totalTime = Math.abs(
          moment(this.state.startDate).diff(moment(endDateLocal), "hours")
        );
        selectedDates[index].totalTimeSeconds = Math.abs(
          moment(this.state.startDate).diff(moment(endDateLocal), "hours", true)
        );
        this.setState({
          selectedDates
        });
      }
    );

    this.hideEndTimePicker();
  };

  // Navigating to dashboard
  goBack = () => {
    if (this.state.steps == 2) {
      this.setState({ steps: 1 });
    } else {
      Navigation.pop(this.props.componentId);
    }
    nextDay.length = 0;
  };

  // Display calender
  extendStepOne = () => {
    let newDaysObject = {};
    nextDay.forEach(day => {
      newDaysObject = {
        ...newDaysObject,
        [day]: {
          selected: true,
          marked: true
        }
      };
    });
    return (
      <View style={styles.container}>
        {/* Calander componet for displaying selected date */}
        <Calendar
          minDate={Date()}
          theme={{
            arrowColor: colors.BLUE,
            selectedDayTextColor: colors.BLUE,
            selectedDotColor: "transparent",
            selectedDayBackgroundColor: "#d8e7ff",
            textDayFontFamily: fonts.LATOREGULAR,
            textMonthFontFamily: fonts.LATOREGULAR,
            textDayHeaderFontFamily: fonts.LATOREGULAR,
            textDayFontSize: moderateScale(15),
            textMonthFontSize: moderateScale(13),
            textDayHeaderFontSize: moderateScale(13)
          }}
          onDayPress={day => {
            if (this.state.totalDates == 0) {
            } else {
              if (this.state.totalDates > nextDay.length) {
                if (nextDay.find(x => x == day.dateString)) {
                } else {
                  nextDay.push(day.dateString);
                  this.state.selectedDates.push({});
                  this.state.selectedDatesGlobal.push({});
                  this.setState({ a: 1 });
                }
              }
            }
          }}
          markedDates={newDaysObject}
          // Month format in calendar title
          monthFormat={"MMMM-yyyy"}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          hideExtraDays={true}
          disableMonthChange={true}
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
          firstDay={1}
          // Show week numbers to the left. Default = false
          showWeekNumbers={true}
          // Handler which gets executed when press arrow icon left. It receive a callback can go back month
          onPressArrowLeft={substractMonth => substractMonth()}
          // Handler which gets executed when press arrow icon left. It receive a callback can go next month
          onPressArrowRight={addMonth => addMonth()}
        />
      </View>
    );
  };

  // Calculating total time in minutes or hours
  totalTime = secs => {
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
  };

  // Rendering date listing
  renderDates = item => {
    let dateIs = moment(item.item).format("MMMM DD,YYYY");
    const { selectedDates } = this.state;
    let selectedStartTime =
      selectedDates &&
      selectedDates[item.index] &&
      selectedDates[item.index].startTime; // Start time of a job.
    let selectedEndTime =
      selectedDates &&
      selectedDates[item.index] &&
      selectedDates[item.index].endTime; // Endtime of a job
    let timeInMinutes =
      Math.abs(
        moment
          .utc(selectedStartTime)
          .diff(moment.utc(selectedEndTime), "minutes", true)
      ) / 60;

    let dec = "0.";
    let totalHour = timeInMinutes.toString().split(".")[0];
    let totalMinutes = dec.concat(timeInMinutes.toString().split(".")[1]); // Minutes in string
    let actualMinutes = Math.ceil(Number(totalMinutes) * 60);

    return (
      <View style={styles.dateComponent}>
        <View style={styles.renderDates}>
          <Text style={styles.dateIs}>{dateIs} </Text>
        </View>
        <View style={styles.jobDetails}>
          <View style={styles.jobStartTime}>
            <Text style={styles.jobStartText}>
              {strings.extendHire.startTime}
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.setState(
                  { index: item.index, serviceDate: dateIs },
                  () => {
                    this.showStartTimePicker();
                  }
                );
              }}
              style={styles.startTimePicker}
            >
              <View style={styles.startTimeText}>
                <Text style={styles.selectedStartTime}>
                  {selectedStartTime
                    ? moment(selectedStartTime).format("hh:mm a")
                    : ""}
                </Text>
              </View>
              <View style={styles.dropDown}>
                <Image
                  source={require("../../../assets/img/drop.png")}
                  resizeMode={"contain"}
                  style={styles.dropDownImage}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 0.35 }}>
            <Text style={styles.endTimeText}>{strings.extendHire.endTime}</Text>
            <TouchableOpacity
              onPress={() => {
                this.showEndTimePicker(), this.setState({ index: item.index });
              }}
              style={styles.endTimePicker}
            >
              <View style={[styles.endTime, { paddingLeft: moderateScale(2) }]}>
                <Text style={styles.endTimeText2}>
                  {selectedEndTime
                    ? moment(selectedEndTime).format("hh:mm a")
                    : ""}
                </Text>
              </View>
              <View style={styles.dropDown}>
                <Image
                  source={require("../../../assets/img/drop.png")}
                  resizeMode={"contain"}
                  style={styles.dropDownImage}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 0.3 }}>
            <Text style={styles.totalText}>
              {strings.expandHistory.total}:{" "}
            </Text>
            <TouchableOpacity style={styles.totalTimeJob}>
              {selectedStartTime && selectedEndTime ? (
                <Text style={styles.totalTimeText}>
                  {totalHour}.{actualMinutes || "00"}
                  {totalHour || actualMinutes ? "hr" : null}
                </Text>
              ) : null}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  // Rendering time input view
  extendStepTwo = (totalCost, totalFee, finalAmount) => {
    return (
      <View style={styles.stepTwo}>
        <View style={styles.selectedDates}>
          <Text style={styles.selectedDayText}>
            {strings.extendHire.selectedDates}{" "}
          </Text>
        </View>

        <View style={{ flex: 0.6 }}>
          <FlatList
            renderItem={item => this.renderDates(item)}
            extraData={this.state}
            data={nextDay}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={styles.jobInfo}>
          <View style={styles.subTotal}>
            <Text style={styles.subTotalText}>
              {strings.extendHire.subTotal}{" "}
            </Text>
            <Text style={styles.actualSubTotal}>
              £{isNaN(totalCost) ? 0 : totalCost}{" "}
            </Text>
          </View>
          <View style={styles.serviceFee}>
            <Text style={styles.serviceFeeText}>
              {strings.extendHire.serviceFee}
            </Text>
            <Text style={styles.actualServiceFee}>
              £{isNaN(totalFee) ? 0 : totalFee || 0}{" "}
            </Text>
          </View>
        </View>

        <View style={{ flex: 0.2 }}>
          <View style={styles.totalAmount}>
            <Text style={styles.totalAmountText}>
              {strings.expandHistory.total}
            </Text>
            <Text style={styles.actualTotalAmount}>
              £{isNaN(finalAmount) ? 0 : finalAmount}{" "}
            </Text>
          </View>
          <View style={{ flex: 0.6 }}>
            <Text style={styles.condition}>{strings.extendHire.info}</Text>
          </View>
        </View>
      </View>
    );
  };

  // Rendering all added cards view
  renderCards = data => {
    let number = data.item.card_number;
    return (
      <View style={styles.cardContainer}>
        <View style={styles.allCards}>
          <Image
            source={require("../../../assets/img/visa.png")}
            resizeMode={"contain"}
            style={styles.visaLogo}
          />
          <Text style={styles.cardNumber}>******{number}</Text>
          {data.index == 0 ? (
            <View style={styles.primaryCard}>
              <Text style={styles.primaryText}>{strings.payment.primary}</Text>
            </View>
          ) : (
            <View style={styles.space} />
          )}
        </View>
        <View style={styles.spaceTwo} />
      </View>
    );
  };

  renderSteps = (totalCost, totalFee, finalAmount) => {
    if (this.state.steps == 1) {
      return this.extendStepOne();
    } else if (this.state.steps == 2) {
      return this.extendStepTwo(totalCost, totalFee, finalAmount);
    }
  };

  // Hiding payment view
  goBackToSchedule = () => {
    this.setState({ paymentBody: false });
  };

  // Making payment request
  proceedPayment = (amount, fee, totalCost) => {
    let data = {
      total_days: this.state.totalDates,
      user_id: this.props.userId,
      service_id: this.props.service_id,
      dates: this.state.selectedDatesGlobal,
      sub_total: totalCost,
      service_fee: fee,
      total: amount,
      expert_id: this.props.expert_id,
      latitude: idx(this.props, _ => _.moreData.latitude),
      longitude: idx(this.props, _ => _.moreData.longitude),
      address: idx(this.props, _ => _.moreData.address),
      prev_job_id: idx(this.props, _ => _.moreData.id)
    };
    let card_Id = idx(
      this.props,
      _ =>
        _.allCards.data.slice(this.props.allCards.data.length - 1)[0]
          .stripe_card_id
    ); // Id of a selected job.
    this.props.addMoney(card_Id, amount, response => {
      if (response.requestStatus == "success") {
        this.props.rescheduleService(data, value => {
          socket.extendHireRequest(value.id);
        });
        Navigation.pop(this.props.componentId);
      }
      RNToasty.Success({
        title: `${strings.modal.success}`,
        withIcon: false
      });
      nextDay.length = 0;
    });
  };

  // Render payment view
  renderPayment = (amount, fee, totalCost) => {
    return (
      <View style={[styles.paymentContainer, {}]}>
        <View style={[styles.paymentHeader, { height: moderateScale(50) }]}>
          <TouchableOpacity
            onPress={this.goBackToSchedule}
            style={styles.paymentButton}
          >
            <Image
              source={require("../../../assets/img/back.png")}
              resizeMode={"contain"}
              style={styles.backImage}
            />
          </TouchableOpacity>
          <View
            style={{
              flex: 0.8,
              justifyContent: "center"
            }}
          >
            <Text style={styles.addMoneyText}>{strings.payment.addMoney}</Text>
          </View>
          <View style={styles.spaceThree} />
        </View>
        <View style={styles.availableBalance}>
          <View style={styles.balanceInfo}>
            <Text style={styles.availableBalanceText}>
              {strings.addMoney.balance}{" "}
            </Text>
            <Text style={styles.totalAmountDisplayed}>
              £{" "}
              {this.props.totalAmount &&
                this.props.totalAmount.data &&
                this.props.totalAmount.data.amount}
            </Text>
            <View
              style={{
                height: moderateScale(0.2),
                borderWidth: 0.5,
                borderColor: colors.GREY,
                borderRadius: 10
              }}
            />
            <Text style={styles.addMoneyToWalletText}>
              {strings.addMoney.add}
            </Text>
          </View>
          <View style={{ flex: 0.8 }}>
            <View style={{ flex: 0.1 }}>
              <TextInput
                editable={false}
                placeholder={amount}
                underlineColorAndroid="transparent"
                style={styles.amountInput}
                value={`£${amount}`}
                autoCapitalize={"none"}
                autoCorrect={false}
              />
            </View>
            <View style={{ flex: 0.07 }}>
              <Text style={styles.paymentMethod}>
                {strings.payment.methods}
              </Text>
            </View>
            <View
              style={{
                flex: 0.68,
                paddingTop: moderateScale(10)
              }}
            >
              <FlatList
                scrollEnabled={false}
                contentContainerStyle={{
                  height: moderateScale(180)
                }}
                renderItem={this.renderCards}
                extraData={this.state}
                data={idx(this.props, _ =>
                  _.allCards.data.slice(this.props.allCards.data.length - 1)
                )}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
              />
              <View style={{}}>
                <Text
                  style={{
                    fontSize: moderateScale(13.5),
                    fontFamily: fonts.LATOREGULAR,
                    color: colors.GREY,
                    textAlign: "left",
                    paddingTop: moderateScale(10)
                  }}
                >
                  <Text
                    style={{
                      fontSize: moderateScale(13.5),
                      fontFamily: fonts.LATOREGULAR,
                      color: "#40D15D",
                      textAlign: "left"
                    }}
                  >
                    {strings.policy.imp}{" "}
                  </Text>
                  {strings.policy.imp3}
                </Text>
              </View>
            </View>
            <View style={styles.loader}>
              <TouchableOpacity
                onPress={() => {
                  this.proceedPayment(amount, fee, totalCost);
                }}
                style={styles.validateButton}
              >
                {this.props.moneyLoader ? (
                  <ActivityIndicator color={colors.WHITE} />
                ) : (
                  <Text style={styles.validateText}>
                    {strings.extendHire.validate}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  // Displaying payment screen
  proceedToPay = finalAmount => {
    if (nextDay.length < 1) {
      RNToasty.Warn({
        title: `${strings.extendHire.dateError}`,
        withIcon: false
      });
    } else if (this.state.steps == 2) {
      if (finalAmount > 0) {
        this.setState({ paymentBody: true });
      } else {
        RNToasty.Warn({
          title: `${strings.extendHire.timeError}`,
          withIcon: false
        });
      }
    } else {
      this.setState({ steps: 2 });
    }
  };

  add = (accumulator, a) => {
    if (accumulator && a) {
      return accumulator + a;
    } else {
      return a;
    }
  };

  render() {
    let adminComission = idx(this.props, _ => _.commissionPercent);
    // let allJobTime = this.state.selectedDates.map(item => item.totalTime); // Filtering total time of all jobs.
    // let timeOfAll = allJobTime.reduce(this.add, 0); // Total time of a job.
    let allJobTime = this.state.selectedDates.map(
      item => item.totalTimeSeconds
    ); // Filtering total time of all jobs.
    let timeOfAll = Math.ceil(allJobTime.reduce(this.add, 0)); // Total time of a job.
    let totalCost = timeOfAll * idx(this.props, _ => _.service_details.price); // 4 hr policy implementation
    let totalFee = totalCost * adminComission; // Admin fees of application
    let finalAmount = totalCost + totalFee; // FInal amount to be paid.
    let selectedDate = idx(
      this.state,
      _ => _.selectedDates[this.state.index].startTime
    );
    let dateEnabled = moment().format("YYYY-MM-DD") == nextDay[0];

    return (
      <SafeAreaView style={styles.safeArea}>
        {this.state.paymentBody ? (
          this.renderPayment(
            finalAmount.toFixed(2),
            totalFee.toFixed(2),
            totalCost.toFixed(2)
          )
        ) : (
          <View style={{ flex: 1 }}>
            <View style={[styles.header, { height: moderateScale(50) }]}>
              <TouchableOpacity onPress={this.goBack} style={styles.backButton}>
                <Image
                  source={require("../../../assets/img/back.png")}
                  resizeMode={"contain"}
                  style={styles.backIcon}
                />
              </TouchableOpacity>
              <View style={{ flex: 0.8, paddingTop: moderateScale(5) }}>
                <Text style={styles.extendHireText}>
                  {strings.extendHire.extend}
                </Text>
              </View>
            </View>
            <View style={styles.question}>
              <View style={{ flex: 0.08 }}>
                <Text style={styles.questionText}>
                  {strings.extendHire.days}{" "}
                  {idx(this.props, _ => _.moreData.expert.fullname)}?
                </Text>
              </View>
              <View style={styles.selections}>
                <View style={styles.totalDays}>
                  <Text style={styles.totalDaysText}>
                    {strings.extendHire.totalDays}{" "}
                  </Text>
                </View>
                <View style={styles.dropDownContainer}>
                  <View style={styles.dropDownDay}>
                    {/* Input to enter the no of days job is to be extended */}
                    <TextInput
                      editable={this.state.steps != 1 ? false : true}
                      returnKeyType={"done"}
                      keyboardType={"number-pad"}
                      style={{
                        height: moderateScale(40),
                        width: moderateScale(70),
                        paddingLeft: moderateScale(10)
                        // alignSelf: "center",
                        // justifyContent: "center",
                      }}
                      onChangeText={totalDates => {
                        this.setState({ totalDates });
                      }}
                      value={`${this.state.totalDates}`}
                    />
                  </View>
                </View>
                <View style={styles.hourlyPrice}>
                  <Text style={styles.hourlyPriceText}>
                    £{idx(this.props, _ => _.service_details.price)}/hr{" "}
                  </Text>
                </View>
              </View>
              {this.renderSteps(
                totalCost.toFixed(2),
                totalFee.toFixed(2),
                finalAmount.toFixed(2)
              )}

              <View style={styles.proceedButton}>
                <TouchableOpacity
                  onPress={() => this.proceedToPay(finalAmount)}
                  style={styles.payButton}
                >
                  <Text style={styles.payButtonText}>
                    {this.state.steps == 1
                      ? strings.services.next
                      : strings.extendHire.extend}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* Tme picker for selecting job time */}
            <DateTimePicker
              isVisible={this.state.startTimePickerVisible}
              onConfirm={this.handleStartTimePicked}
              onCancel={this.hideStartTimePicker}
              mode="time"
              minimumDate={
                this.state.index === 0 && dateEnabled ? new Date() : null
              }
            />
            {/* Date picker for selecting job time */}
            <DateTimePicker
              isVisible={this.state.endTimePickerVisible}
              onConfirm={this.handleEndTimePicked}
              onCancel={this.hideEndTimePicker}
              mode="time"
              minimumDate={
                new Date(
                  moment(selectedDate)
                    .add(4, "hours")
                    .format("MMMM DD, YYYY HH:mm:ss")
                )
              }
              date={
                new Date(
                  moment(selectedDate)
                    .add(4, "hours")
                    .format("MMMM DD, YYYY HH:mm:ss")
                )
              }
            />
          </View>
        )}
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    allCards: state.userList.allCards,
    loader: state.userList.loadingR,
    loader2: state.userList.loadingC,
    totalAmount: state.userList.walletDetails,
    userId:
      idx(state.user, _ => _.userData.data.id) ||
      idx(state.signup, _ => _.data.data.user_id),
    moneyLoader: state.userList.moneyLoader,
    commissionPercent: state.userList.commissionPercent
  };
}

export default connect(
  mapStateToProps,
  { rescheduleService, addMoney, getCommission }
)(ExtendHire);
