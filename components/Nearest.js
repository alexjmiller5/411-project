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
      


      fountains = [
        ["42.35053,-71.10543", "The George Sherman Union (GSU)", "You are currently located at the red pin. Please follow the blue line to the water fountain. The GSU water fountain is in the basement, outside the theatre area. There is a staircase and an elevator at the back of the main dining area to the right, direct across from Basho."],
        ["42.34942,-71.10705", "Engineering Product Innovation Center (EPIC).", "You are currently located at the red pin. Please follow the blue line to the water fountain. Enter the building, go up the stairs, enter the doorway on the left, go stright, then left, and the water fountain is located next to the bathroom."],
        ["42.34957,-71.10563", "Crispy Crepe Cafe", "You are currently located at the red pin. Please follow the blue line to the water fountain. However, this is not a water fountain! This is a cafe! Enter, and politely ask the staff for a cup of water, and they will give you one."],
        ["42.34927,-71.09830", "Kenmore Classroom Building", "You are currently located at the red pin. Please follow the blue line to the water fountain. Enter the building, turn right until the right end of the building, go left, then right again, and the water fountain is located next to the bathroom"],
        ["42.34951,-71.09952", "Questrom School of Business", "You are currently located at the red pin. Please follow the blue line to the water fountain. The water fountain is located near the bathroom on the right on the first floor."]
      ]

      // Initialize variable to track the closest distance
      let closestDistance = Infinity;
      let destinationCoords = "";
      let destinationName = "";
      let destinationInstructions = ""

      // Loop through each set of coordinates in the list
      for (let i = 0; i < fountains.length; i++) {
        // Parse the coordinates string into latitude and longitude
        const [lat, lng] = fountains[i][0].split(',').map(parseFloat);

        // Calculate the distance between the input coordinates and the current set of coordinates
        const distance = Math.sqrt((location.coords.latitude - lat) ** 2 + (location.coords.longitude - lng) ** 2);

        // If this distance is closer than the current closest distance, update the closest distance and index
        if (distance < closestDistance) {
          destinationCoords = fountains[i][0];
          destinationName = fountains[i][1];
          destinationInstructions = fountains[i][2]
          closestDistance = distance;
        }
      }

      setDestination({
        name: destinationName,
        instructions: destinationInstructions
      });

      const originCoords = `${location.coords.latitude},${location.coords.longitude}`;

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
