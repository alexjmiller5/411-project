import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
    const [location, setLocation] = useState(null);
    const [route, setRoute] = useState(null);

    useEffect(() => {
        // Get the user's current location using the Geolocation API
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
            },
            error => console.error(error), { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }, []);

    const handleButtonClick = () => {
        if (location) {
            // Construct the Google Maps API URL with the user's location and BU's location
            const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${location.latitude},${location.longitude}&destination=Boston%20University&mode=driving&key=AIzaSyC-rirDQdBndY5rJwuo8YdVNQ1WNSVDVUc`;

            // Call the Google Maps API to get the route information
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.routes.length > 0) {
                        setRoute(data.routes[0]);
                    }
                })
                .catch(error => console.error(error));
        }
    };

    return ( <
            View style = { styles.container } >
            <
            TouchableOpacity onPress = { handleButtonClick } >
            <
            View style = { styles.button } >
            <
            Text style = { styles.buttonText } > Find route to BU < /Text> < /
            View > <
            /TouchableOpacity> {
            route && ( <
                View style = { styles.route } >
                <
                Text style = { styles.routeText } >
                Distance: { route.legs[0].distance.text } <
                /Text> <
                Text style = { styles.routeText } >
                Duration: { route.legs[0].duration.text } <
                /Text> <
                Text style = { styles.routeText } >
                Instructions: { route.legs[0].steps.map(step => step.instructions).join('\n') } <
                /Text> < /
                View >
            )
        } <
        /View>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    route: {
        marginTop: 16,
    },
    routeText: {
        fontSize: 16,
        color: '#007AFF',
    },
});