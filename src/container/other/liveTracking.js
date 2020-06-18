// Container for live tracking an Expert

import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  ActivityIndicator,
  Image
} from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  AnimatedRegion,
  Polyline
} from "react-native-maps";
import haversine from "haversine";
import { moderateScale } from "../../utilities/ResponsiveFonts";
import { connect } from "react-redux";
import { fonts, colors } from "../../constants/theme";
import { Navigation } from "react-native-navigation";
import Socket from "../../utilities/Socket";

const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;

class LiveTracking extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      destLatitude: LATITUDE,
      destLongitude: LONGITUDE,
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      coordinate: new AnimatedRegion({
        latitude:
          (this.props.myCoordinates && this.props.myCoordinates.latitudeOne) ||
          LATITUDE,
        longitude:
          (this.props.myCoordinates && this.props.myCoordinates.longitudeOne) ||
          LONGITUDE,
        latitudeDelta: 0,
        longitudeDelta: 0
      }),
      desCoordinate: new AnimatedRegion({
        latitude: 30.33341,
        longitude: 78.05682,
        latitudeDelta: 0,
        longitudeDelta: 0
      })
    };
  }

  // Foreming a line to expert coords
  getPolylineCode = val => {
    let url = `https://maps.googleapis.com/maps/api/directions/json?origin=${Number(
      this.state.latitude
    )},${Number(this.state.longitude)}&destination=${Number(
      this.state.destLatitude
    )},${Number(
      this.state.destLongitude
    )}&mode=driving&key=AIzaSyAb8v0MDaUBY_vpHjZW6Jc0Pa98cCYifEo`;

    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.routes.length) {
          this.setState({
            routeCoordinates: this.polylineDecode(
              responseJson.routes[0].overview_polyline.points
            ) // definition below
          });
        }
      })
      .catch(e => {});
  };

  polylineDecode = (t, e) => {
    for (
      var n,
        o,
        u = 0,
        l = 0,
        r = 0,
        d = [],
        h = 0,
        i = 0,
        a = null,
        c = Math.pow(10, e || 5);
      u < t.length;

    ) {
      (a = null), (h = 0), (i = 0);
      do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
      while (a >= 32);
      (n = 1 & i ? ~(i >> 1) : i >> 1), (h = i = 0);
      do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
      while (a >= 32);
      (o = 1 & i ? ~(i >> 1) : i >> 1),
        (l += n),
        (r += o),
        d.push([l / c, r / c]);
    }
    return (d = d.map(t => {
      return { latitude: t[0], longitude: t[1] };
    }));
  };

  componentDidMount() {
    const { coordinate } = this.state;

    this.requestCameraPermission(); // Requesing camera permission
    let latitudeNew =
      this.props.myCoordinates && this.props.myCoordinates.latitudeOne;
    let longitudeNew =
      this.props.myCoordinates && this.props.myCoordinates.longitudeOne;

    const newCoordinate = {
      latitudeNew,
      longitudeNew
    };
    this.setState(
      {
        latitude: latitudeNew,
        longitude: longitudeNew,
        distanceTravelled:
          this.state.distanceTravelled + this.calcDistance(newCoordinate),
        prevLatLng: newCoordinate
      },
      () => {
        this.getPolylineCode();
      }
    );

    if (this.props.expertCoords) {
      this.setState(
        {
          destLatitude:
            this.props.expertCoords.lat ||
            this.props.expertCoords.expert_latitude,
          destLongitude:
            this.props.expertCoords.long ||
            this.props.expertCoords.expert_longitude,
          desCoordinate: new AnimatedRegion({
            latitude: Number(
              this.props.expertCoords.lat ||
                this.props.expertCoords.expert_latitude
            ),
            longitude: Number(
              this.props.expertCoords.long ||
                this.props.expertCoords.expert_longitude
            ),
            latitudeDelta: 0,
            longitudeDelta: 0
          })
        },
        () => {
          this.getPolylineCode();
        }
      );
    }

    socket.liveTrackingExpert(response => {
      if (this.props.expertCoords) {
        this.setState(
          {
            destLatitude: response.lat,
            destLongitude: response.long,
            desCoordinate: new AnimatedRegion({
              latitude: Number(response.lat),
              longitude: Number(response.long),
              latitudeDelta: 0,
              longitudeDelta: 0
            })
          },
          () => {
            this.getPolylineCode();
          }
        );
      }
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  // Getting my region
  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

  // Clculating total distance between Customer and expert
  calcDistance = newLatLng => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Location Access Permission",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      } else {
      }
    } catch (err) {}
  };

  render() {
    let userMarker = require("../../assets/img/location.png");
    let expertMarker = require("../../assets/img/location_one.png");
    return (
      <View style={styles.container}>
        {this.state.routeCoordinates &&
        this.state.routeCoordinates.length > 0 ? (
          <MapView
            style={styles.map}
            // provider={PROVIDER_GOOGLE}
            showUserLocation
            followUserLocation
            loadingEnabled={true}
            region={this.getMapRegion()}
          >
            <Polyline
              coordinates={[
                {
                  latitude: this.props.latitude || this.state.latitude,
                  longitude: this.props.latitude || this.state.longitude
                }, // optional
                ...this.state.routeCoordinates,
                {
                  latitude: this.state.destLatitude,
                  longitude: this.state.destLongitude
                } // optional
              ]}
              strokeWidth={3}
              strokeColor={"#686868"}
            />

            <Marker.Animated coordinate={this.state.desCoordinate}>
              <Image
                source={expertMarker}
                ref={marker => {
                  this.marker = marker;
                }}
              />
            </Marker.Animated>

            <Marker.Animated coordinate={this.state.coordinate}>
              <Image
                source={userMarker}
                ref={marker => {
                  this.marker = marker;
                }}
              />
            </Marker.Animated>

            {/* <Marker.Animated coordinate={this.state.coordinate}>
              <Image source={userMarker} />
            </Marker.Animated> */}
          </MapView>
        ) : (
          <ActivityIndicator />
        )}

        <View
          style={{
            height: moderateScale(45),
            width: moderateScale(320),
            position: "absolute",
            bottom: moderateScale(60),
            alignSelf: "center",
            flexDirection: "row"
          }}
        >
          <TouchableOpacity
            style={{
              flex: 0.5,
              backgroundColor: "white",
              marginRight: moderateScale(5),
              borderColor: colors.BLUE,
              borderRadius: moderateScale(3),
              borderWidth: 0.5,
              alignItems: "center",
              justifyContent: "center"
            }}
            onPress={() => {
              if (this.props.openRequestModal) {
                this.props.openRequestModal(1);
              }
              Navigation.pop(this.props.componentId);
            }}
          >
            <Text
              style={{
                color: colors.BLUE,
                fontSize: moderateScale(17),
                fontFamily: fonts.LATOBOLD
              }}
            >
              Back
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 0.5,
              backgroundColor: colors.BLUE,
              marginLeft: moderateScale(5),
              borderColor: colors.PRIMARY,
              borderRadius: moderateScale(3),
              borderWidth: 0.5,
              alignItems: "center",
              justifyContent: "center"
            }}
            onPress={() => {
              Navigation.push(this.props.componentId, {
                component: {
                  name: "UserChat",
                  options: {
                    statusBar: {},
                    topBar: {
                      visible: false,
                      height: 0
                    }
                  }
                }
              });
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: moderateScale(17),
                fontFamily: fonts.LATOBOLD
              }}
            >
              Chat{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1
  },
  bubble: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  latlng: {
    width: 200,
    alignItems: "stretch"
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent"
  }
});

function mapStateToProps(state) {
  return {
    expertCoords: state.socket.expertCoords,
    myCoordinates: state.userList.myCoords
  };
}

export default connect(
  mapStateToProps,
  {
    // openStartJobModal
  }
)(LiveTracking);
