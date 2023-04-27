import { StyleSheet, View, Text, Image } from 'react-native';
import React from 'react'
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

import Button from './Button';

WebBrowser.maybeCompleteAuthSession();

export default function Login({user, navigation}) {
  const [accessToken, setAccessToken] = React.useState();
  const [userInfo, setUserInfo] = React.useState();

  const [request, response, promptAsync ] = Google.useAuthRequest({
    iosClientId: "376469778298-9i9pebmddj05js3csip2b4ofpb1pjtca.apps.googleusercontent.com",
    expoClientId: "376469778298-9i9pebmddj05js3csip2b4ofpb1pjtca.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken)
    }
  }, [response]);

  async function getUserData() {
    let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}`}
    });

    userInfoResponse.json().then(data => {
      setUserInfo(data);
    });

  }

  function showUserinfo() {
    if (userInfo) {
      return (
        <View >
          <Image source={{uri: userInfo.picture}}/>
          <Text> Welcome {userInfo.name} </Text>
          <Text> {userInfo.email} </Text>
        </View>
      )
    }
  }

  return (
    <View style={styles.footerContainer}>
      <Text>Welcome to Free Water please login or create an account to continue {user} </Text>
      {showUserinfo()}
      <Button 
        label={accessToken ? "Get User Data" : "Login" }
        onPress={accessToken ? getUserData : () => { promptAsync({showInRecents: true}) }}
      />



      <Button label="Create Account" />
      
      <Button 
        label="Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
    );
}
const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: 'black',
    flex: 3 / 3,
    alignItems: 'center',
  },
});

