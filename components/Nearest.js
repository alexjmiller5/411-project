import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import MapView, { Polyline } from "react-native-maps";

const GOOGLE_MAPS_API_KEY = "AIzaSyAjT2oj1XyOv8yIF6RybC7NBWnUnZL-cBo";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [route, setRoute] = useState([]);

  // ask the user for permission to use their location, and store it in the location constant
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();

    // use the Google Maps API to find the best route to the nearest waterfountain
    const origin = "42.353808,-71.127289";
    const destination = "42.3505,-71.1054";

    // ADD CODE WITH WATERFOUNTAIN COORDINATES AND FIND THE CLOSEST ON TO THE ORIGIN AND SET THAT AS THE DESTINATION

    fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=walking&key=${GOOGLE_MAPS_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        const points = data.routes[0].overview_polyline.points;
        const decodedPoints = decodePolyline(points);
        setRoute(decodedPoints);
      });
  }, []);

  // code for accessing the user's location
  // let text = "Waiting..";
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   text = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`;
  // }

  // decode the directions to the nearest waterfountain as a "polyline"
  const decodePolyline = (encoded) => {
    const polyline = require("@mapbox/polyline");
    const decoded = polyline.decode(encoded);
    const coordinates = decoded.map((coords) => ({
      latitude: coords[0],
      longitude: coords[1],
    }));
    return coordinates;
  };

  // return the map as the page
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 42.353808,
          longitude: -71.127289,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        }}
      >
        <Polyline coordinates={route} strokeWidth={4} strokeColor="#0088FF" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});