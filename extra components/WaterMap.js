import React, { useState} from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';




export default function WaterMap() {

  const [mapRegion, setmapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <View style={styles.container}>
     <MapView
        style={{ alignSelf: 'stretch', height: '100%' }}
        region={mapRegion} 
        //provider={PROVIDER_GOOGLE}
      >
        <Marker coordinate={mapRegion} title='Marker' />
      </MapView>
    </View>
  );
}
// <MapView style={styles.map} provider={PROVIDER_GOOGLE} />
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});