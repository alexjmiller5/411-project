import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import MapView, { Polyline, Marker } from "react-native-maps";

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [route, setRoute] = useState([]);
  const [destination, setDestination] = useState({
    name: "",
    instructions: ""
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.watchPositionAsync({}, setLocation);
      console.log(location)
      setLocation(location);
      console.log(location)
    })();
  }, []);

  useEffect(() => {
    if (location != null && location.coords != null) {
      const originCoords = `${location.coords.latitude},${location.coords.longitude}`;

      // query closet water fountain -- replace these variables with the query
      const destinationCoords = "42.3505,-71.1054";
      const destinationName = "The George Sherman Union (GSU)";
      const destinationInstructions = "You are currently located at the red pin. Please follow the blue line to the water fountain. The GSU water fountain is in the basement, outside the theatre area. There is a staircase and an elevator at the back of the main dining area to the right, direct across from Basho."

      setDestination({
        name: destinationName,
        instructions: destinationInstructions
      });

      fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${originCoords}&destination=${destinationCoords}&mode=walking&key=${GOOGLE_MAPS_API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          const points = data.routes[0].overview_polyline.points;
          const decodedPoints = decodePolyline(points);
          setRoute(decodedPoints);
        });
    }
  }, [location]);

  const decodePolyline = (encoded) => {
    const polyline = require("@mapbox/polyline");
    const decoded = polyline.decode(encoded);
    const coordinates = decoded.map((coords) => ({
      latitude: coords[0],
      longitude: coords[1],
    }));
    return coordinates;
  };

  return (
    <View style={styles.container}>
      {location != null && location.coords != null && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
          }}
        >
          <Polyline coordinates={route} strokeWidth={4} strokeColor="#0088FF" />

          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          />
        </MapView>
      )}
      <View style={styles.infoWrapper}>
        <Text style={styles.title}>{destination.name}</Text>
        <Text style={styles.description}>{destination.instructions}</Text>
      </View>
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
    infoWrapper: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
  },
});
