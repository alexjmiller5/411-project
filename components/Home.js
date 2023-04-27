import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import Button from './Button';

export default function Home({user, navigation}) {

  const [userInfo, setUserInfo] = useState(user)

  async function logout() {
      setUserInfo(null);
      navigation.navigate("Login");
  };
 
  return (
    <ImageBackground source={require('../assets/bountiful-water.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome, {user}!</Text>
        <View style={styles.buttonsContainer}>
          <Button label="Find Nearby Fountains" onPress={() => navigation.navigate('WaterMap')} />
          <Button label="Find Nearest Water Fountain" onPress={() => navigation.navigate('Nearest')} />
          <Button label="Add Nearby Fountains" />
          <Button label="Show Eco Stats" />
          <Button title="Logout" onPress={logout} />        
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 32,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  buttonsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
