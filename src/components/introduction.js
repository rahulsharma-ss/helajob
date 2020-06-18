import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { fonts, colors } from "../constants/theme";
import { moderateScale } from "../utilities/ResponsiveFonts";
import AppIntroSlider from "../utilities/lib/react-native-app-intro-slider";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import strings from "../constants/language";
var _ = require("lodash");

const slides = [
  {
    key: "intro1",
    title: strings.intro.title1,
    text: strings.intro.text1,
    image: require("../assets/img/intro1.png"),
    backgroundColor: "#59b2ab"
  },
  {
    key: "intro2",
    title: strings.intro.title2,
    text: strings.intro.text2,
    image: require("../assets/img/intro2.png"),
    backgroundColor: "#59b2ab"
  },
  {
    key: "intro3",
    title: strings.intro.title3,
    text: strings.intro.text3,
    image: require("../assets/img/intro3.png"),
    backgroundColor: "#59b2ab"
  },
  {
    key: "intro4",
    title: strings.intro.title4,
    text: strings.intro.text4,
    image: require("../assets/img/intro4.png"),
    backgroundColor: "#59b2ab"
  },
  {
    key: "intro5",
    title: strings.intro.title5,
    text: strings.intro.text5,
    image: require("../assets/img/intro5.png"),
    backgroundColor: "#59b2ab"
  },
  {
    key: "intro6",
    title: strings.intro.title6,
    text: strings.intro.text6,
    image: require("../assets/img/intro6.png"),
    backgroundColor: "#59b2ab"
  },
  {
    key: "intro7",
    title: strings.intro.title7,
    text: strings.intro.text7,
    image: require("../assets/img/intro7.png"),
    backgroundColor: "#59b2ab"
  }
];

export default class Introduction extends React.Component {
  _renderItem = value => {
    let item = value.item;
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 0.6,
            alignItems: "center"
          }}
        >
          <Image
            source={item.image}
            resizeMode={"contain"}
            style={{ flex: 1 }}
          />
        </View>
        <View style={{ flex: 0.4, paddingHorizontal: moderateScale(17) }}>
          <Text
            style={{
              textAlign: "left",
              fontSize: moderateScale(45),
              color: colors.INTROBLACK,
              fontFamily: fonts.LATOMEDIUM
            }}
          >
            {item.title}
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text
              style={{
                fontSize: moderateScale(16),
                color: colors.INTROGREY,
                fontFamily: fonts.LATOREGULAR,
                paddingTop: moderateScale(10),
                textAlign: "justify",
                lineHeight: moderateScale(28)
              }}
            >
              {item.text}
            </Text>
          </ScrollView>
        </View>
      </View>
    );
  };

  _renderSkip = () => {
    return (
      <Text
        style={{
          textAlign: "left",
          fontSize: moderateScale(17),
          color: colors.INTROGREY,
          fontFamily: fonts.LATOMEDIUM,
          paddingTop: moderateScale(10)
        }}
      >
        {strings.intro.skip}
      </Text>
    );
  };

  _renderNext = () => {
    return (
      <View
        style={{
          height: moderateScale(45),
          width: moderateScale(45),
          borderRadius: moderateScale(8),
          backgroundColor: colors.BLUE,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Icon
          size={moderateScale(20)}
          name={"arrow-right"}
          color={colors.WHITE}
        />
      </View>
    );
  };

  _renderPrev = () => {
    return (
      <View
        style={{
          height: moderateScale(45),

          width: moderateScale(45),
          borderRadius: moderateScale(8),
          backgroundColor: colors.INTROGREY,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Icon
          size={moderateScale(20)}
          name={"arrow-left"}
          color={colors.WHITE}
        />
      </View>
    );
  };

  _onShare = () => {
    this.props.share();
  };

  _onFinish = () => {
    this.props.proceed();
  };

  render() {
    return (
      <AppIntroSlider
        renderItem={this._renderItem}
        slides={slides}
        onDone={this._onDone}
        buttonTextStyle={{ color: colors.BLUE }}
        dotStyle={{ backgroundColor: colors.GREY }}
        activeDotStyle={{ backgroundColor: colors.BLUE }}
        renderSkipButton={this._renderSkip}
        renderNextButton={this._renderNext}
        renderPrevButton={this._renderPrev}
        showSkipButton={true}
        showPrevButton={true}
        share={this._onShare}
        finish={this._onFinish}
        onSkip={this._onFinish}
      />
    );
  }
}
