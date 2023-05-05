import React, {useState} from 'react';
import { StyleSheet, View, Text, ImageBackground, Button, TouchableOpacity } from 'react-native';

import Custom_Button from './Custom_Button';

import { getRandomQuote } from './qoutes';

export default function Home({user, navigation}) {

  const [userInfo, setUserInfo] = useState("");
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  async function getQuote() {
    var resp = await getRandomQuote(0);
    console.log("\n\nresp: ",resp);

    if (resp != null) {
      setQuote(resp.content);
      setAuthor(resp.originator.name);
      console.log("\n\nresp: ",resp);
    }
  }

  getQuote()

  async function logout() {
      setUserInfo(null);
      navigation.navigate("Login");
  };
  
  return (
    <ImageBackground source={require('../assets/bountiful-water.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome!</Text>
        <View>
          <Text style= {styles.quote}> {quote} </Text>
          <Text style={styles.author}> - {author} </Text>  
        </View>
        <View style={styles.buttonsContainer}>
          <Custom_Button  
            title="Find Nearest Water Fountain" 
            big={true}
            onPress={() => navigation.navigate('Nearest')} 
          />
          <Custom_Button  
            title="Logout" 
            big={true}
            color='red'
            onPress={logout} 
          />        
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
  quote: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 32,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  author: {
    fontSize: 12,
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
