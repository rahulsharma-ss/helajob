// Map search component for searching a location

import React from "react";
import { View, Platform, TouchableOpacity, Text, Image } from "react-native";
import { moderateScale } from "../utilities/ResponsiveFonts";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { fonts, colors } from "../constants/theme";

export default class MapSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View>
        <GooglePlacesAutocomplete
          ref={instance => {
            this.GooglePlacesRef = instance;
          }}
          placeholder="Search location"
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={"search"} // Can be left out for default return key
          listViewDisplayed={false} // true/false/undefined
          fetchDetails={true}
          enablePoweredByContainer={false}
          onPress={(data, details) => {
            // 'details' is provided when fetchDetails = true
            this.props.coordinates(details);
          }}
          textInputProps={{
            onBlur: () => this.setState({ showPlacesList: false })
          }}
          getDefaultValue={() => this.props.value}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: "AIzaSyAb8v0MDaUBY_vpHjZW6Jc0Pa98cCYifEo",
            language: "en" // language of the results
          }}
          styles={{
            textInputContainer: {
              alignSelf: "center",
              width: moderateScale(320),
              height: moderateScale(50),
              backgroundColor: "transparent",
              borderTopWidth: 0,
              borderBottomWidth: 0
            },
            listView: {
              backgroundColor: "white",
              width: moderateScale(320),
              alignSelf: "center"
            },

            description: {
              fontFamily: fonts.LATOREGULAR,
              color: colors.GREY,
              fontSize: moderateScale(12)
            },
            predefinedPlacesDescription: {
              color: colors.BLUE
            },
            textInput: {
              borderRadius: moderateScale(50),
              height: moderateScale(36),
              elevation: 2,
              shadowOffset: { width: 10, height: 10 },
              shadowColor: "black",
              shadowOpacity: 0.1,
              backgroundColor: "white",
              color: colors.GREY
            }
          }}
          // nearbyPlacesAPI={"GoogleReverseGeocoding"}
          predefinedPlaces={this.props.predefinedPlaces}
          currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
          filterReverseGeocodingByTypes={["locality"]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
          debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        />
        {Platform.OS === "android" ? (
          <TouchableOpacity
            style={{
              height: moderateScale(30),
              width: moderateScale(30),
              position: "absolute",
              right: moderateScale(15),
              top: moderateScale(10),
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              overflow: "hidden"
            }}
            onPress={() => this.GooglePlacesRef.setAddressText("")}
          >
            <Image
              source={require("../assets/img/cross.png")}
              resizeMode={"contain"}
              style={{
                height: moderateScale(15),
                width: moderateScale(15),
                alignSelf: "center"
              }}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}
