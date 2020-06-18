import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler
} from "react-native";
import { Navigation } from "react-native-navigation";
import { connect } from "react-redux";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import styles from "../../constants/styleSheets/currentLocation";
import MapSearch from "../../components/mapSearch";
import { moderateScale } from "../../utilities/ResponsiveFonts";
import { colors } from "../../constants/theme";

class NewServiceMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      mapRegion: null,
      lastLat: null,
      lastLong: null,
      extraOptions: false
    };
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);

    this.watchID = navigator.geolocation.watchPosition(
      position => {
        let delta = this.getDelta(
          position.coords.latitude,
          position.coords.longitude,
          position.coords.accuracy
        );
        this.onRegionChange(delta, delta.latitude, delta.longitude);
      },
      error => {}
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    navigator.geolocation.clearWatch(this.watchID);
  }

  handleBackPress = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "Services",
        options: {
          statusBar: {},
          topBar: {
            visible: false,
            height: 0
          }
        }
      }
    });
    return true;
  };

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

  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });
  }

  back = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "Services",
        options: {
          statusBar: {},
          topBar: {
            visible: false,
            height: 0
          }
        }
      }
    });
  };

  getCoordinates = details => {
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
        lastLat: details.geometry.location.lat,
        lastLong: details.geometry.location.lng
      });
    }
  };

  goDashboard = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "Dashboard",
        options: {
          statusBar: {},
          topBar: {
            visible: false,
            height: 0
          }
        }
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.newLat == 0 ? (
          <ActivityIndicator color={colors.BLUE} style={styles.loader} />
        ) : (
          <MapView
            style={styles.map}
            loadingEnabled
            region={this.state.mapRegion}
            showsUserLocation={true}
            followUserLocation={true}
            onRegionChange={() => this.onRegionChange.bind(this)}
            provider={PROVIDER_GOOGLE}
          >
            <MapView.Marker
              coordinate={{
                latitude: this.state.lastLat || -36.82339,
                longitude: this.state.lastLong || -73.03569
              }}
            />
          </MapView>
        )}

        {this.state.extraOptions ? (
          <View style={styles.locationSearch}>
            <Text style={styles.locationSearchText}>Set Your Location</Text>
            <MapSearch coordinates={this.getCoordinates} listOn={true} />
          </View>
        ) : null}
        <View style={[styles.buttonContainer]}>
          <View style={[styles.buttons, { height: moderateScale(50) }]}>
            <TouchableOpacity
              onPress={this.back}
              style={[styles.backButton, styles.back]}
            >
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.space} />
          <View style={styles.buttons}>
            <TouchableOpacity
              onPress={this.goDashboard}
              style={[styles.backButton]}
            >
              <Text style={[styles.backButtonText, { color: "white" }]}>
                Set Location
              </Text>
            </TouchableOpacity>
          </View>
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
)(NewServiceMap);
