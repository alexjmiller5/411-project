
// code snippet from expo google oauth documentation, linked below
// https://docs.expo.dev/guides/google-authentication/

import { useEffect, useState } from "react";
import { StyleSheet, Text, Image, View, Button } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";


const iosClientId = "376469778298-9i9pebmddj05js3csip2b4ofpb1pjtca.apps.googleusercontent.com"
const expoClientId = "376469778298-d1godfva9j2fg7ioba2kg6drlmgktkiv.apps.googleusercontent.com"
const androidClientId = ""

//WebBrowser.maybeCompleteAuthSession();


export default function Login_Oauth({user, navigation}) {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: androidClientId,
    iosClientId: iosClientId,
    expoClientId: expoClientId,
  });

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
      getUserInfo();
    }
  }, [response, token]);

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      setUserInfo(user);
    } catch (error) {
      // Add your own error handler here
    }
  };

  const logout = async () => {
    setUserInfo(null);
  };

  return (
    <View style={styles.container}>
      {userInfo === null ? (
        <Button
          title="Sign in with Google"
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
        />
      ) : (
        <View>
          <Text style={styles.text}>{userInfo.name}</Text>
          <Image style={styles.image} source={userInfo.Image}/>
          <Button title="Home" onPress={() => navigation.navigate('Home')} />        
          <Button title="Logout" onPress={logout} />        
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: 66,
    height: 58,
  }
});
