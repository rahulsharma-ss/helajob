/* Map Component
  Rendered while adding a new address */

import React from "react";
import { View, Text, TouchableOpacity, Image, Platform } from "react-native";
import { connect } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import { moderateScale } from "../utilities/ResponsiveFonts";
import Geocoder from "react-native-geocoder";
import { fonts, colors } from "../constants/theme";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

class AddAddressMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAddress: "",
      location: null,
      mapRegion: null,
      lastLat: null,
      lastLong: null,
      lastLat1: null,
      lastLong1: null,
      postalCode: "",
      alldetails: "",
      streetName: ""
    };
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  componentWillMount = () => {
    // Getting current location
    this.watchID = navigator.geolocation.getCurrentPosition(
      position => {
        let delta = this.getDelta(
          position.coords.latitude,
          position.coords.longitude,
          position.coords.accuracy
        );
        this.onRegionChange(delta, delta.latitude, delta.longitude);
        Geocoder.geocodePosition({ lat: delta.latitude, lng: delta.longitude })
          .then(res => {
            this.setState({
              selectedAddress: res[0].streetName,
              lastLat1: res[0].position.lat,
              lastLong1: res[0].position.lng,
              postalCode: res[0].postalCode
            });
          })
          .catch(err => {});
      },
      error => {},
      {
        timeout: 30000,
        maximumAge: 1000,
        distanceFilter: 10
      }
    );
  };

  // Called when region is changed
  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });
  }

  // Calculating latitude and longitude
  getDelta = (lat, lng, distance) => {
    const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
    const latitudeDelta = distance / oneDegreeOfLatitudeInMeters;
    const longitudeDelta =
      distance /
      (oneDegreeOfLatitudeInMeters * Math.cos(lat * (Math.PI / 180)));

    return (result = {
      latitude: lat,
      longitude: lng,
      latitudeDelta,
      longitudeDelta
    });
  };

  // Getting coordinates
  coordinates = details => {
    if (details.geometry) {
      let latitude = details.geometry.location.lat;
      let longitude = details.geometry.location.lng;
      let accuracy = 5;
      let delta = this.getDelta(latitude, longitude, accuracy);
      let latitudeDelta = delta.latitudeDelta;
      let longitudeDelta = delta.longitudeDelta;
      let data = {
        latitude,
        longitude,
        accuracy,
        latitudeDelta,
        longitudeDelta
      };
      this.onRegionChange(data, latitude, longitude);
      this.setState({
        selectedAddress: details.name,
        lastLat: details.geometry.location.lat,
        lastLong: details.geometry.location.lng,
        alldetails: details
      });
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* Map view component for displaying map */}
        <MapView
          style={{ flex: 1 }}
          region={this.state.mapRegion}
          showsUserLocation={true}
          followUserLocation={true}
          onRegionChange={() => this.onRegionChange.bind(this)}
        >
          {/* Marker  component for displaying marker in map */}
          <Marker
            key={"_" + Date.now()}
            image={require("../assets/img/location.png")}
            coordinate={{
              latitude: this.state.lastLat || -36.82339,
              longitude: this.state.lastLong || -73.03569
            }}
          />
        </MapView>
        <View
          style={{
            position: "absolute",
            paddingTop: moderateScale(30),
            paddingLeft: moderateScale(15)
          }}
        >
          {/* Google search bar for searching places */}
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
            renderDescription={row => row.description} // custom description render
            enablePoweredByContainer={false}
            onPress={(data, details) => {
              // 'details' is provided when fetchDetails = true
              this.coordinates(details);
            }}
            textInputProps={{
              onBlur: () => this.setState({ showPlacesList: false })
            }}
            getDefaultValue={() => this.state.selectedAddress}
            query={{
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
                color: "#1faadb"
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
            currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
            filterReverseGeocodingByTypes={[
              "locality",
              "administrative_area_level_3"
            ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
            debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
          />
          {Platform.OS === "android" ? (
            <TouchableOpacity
              style={{
                height: moderateScale(30),
                width: moderateScale(30),
                position: "absolute",
                right: moderateScale(15),
                top: moderateScale(35),
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
        <View
          style={{
            position: "absolute",
            bottom: moderateScale(10),
            flexDirection: "row",
            justifyContent: "center",
            height: moderateScale(60),
            width: moderateScale(350),
            alignSelf: "center",
            paddingVertical: moderateScale(10)
          }}
        >
          <TouchableOpacity
            onPress={this.props.closeAddressModal}
            style={{
              flex: 0.48,
              alignItems: "center",
              backgroundColor: colors.WHITE,
              borderRadius: moderateScale(5),
              borderWidth: 0.5,
              borderColor: colors.BLUE,
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                color: colors.BLUE,
                fontSize: moderateScale(15),
                fontFamily: fonts.LATOBOLD
              }}
            >
              Back
            </Text>
          </TouchableOpacity>
          <View style={{ flex: 0.04 }} />

          <TouchableOpacity
            onPress={() =>
              this.props.addressIs(
                this.state.alldetails,
                this.state.selectedAddress,
                this.state.lastLat1,
                this.state.lastLong1,
                this.state.postalCode
              )
            }
            disabled={!this.state.selectedAddress}
            style={{
              flex: 0.48,
              alignItems: "center",
              backgroundColor: colors.BLUE,
              borderRadius: moderateScale(5),
              borderWidth: 0.5,
              borderColor: colors.BLUE,
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                color: colors.WHITE,
                fontSize: moderateScale(15),
                fontFamily: fonts.LATOBOLD
              }}
            >
              Set Location
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  {}
)(AddAddressMap);
