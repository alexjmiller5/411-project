
// code snippet from expo google oauth documentation, linked below
// https://docs.expo.dev/guides/google-authentication/

import { useEffect, useState } from "react";
import { StyleSheet, Text, Image, View, Button, TextInput, TouchableHighlight } from "react-native";
import * as Google from "expo-auth-session/providers/google";

import { signInWithEmailAndPassword } from "firebase/auth";

import {app, auth, db, baseUrl} from "../firebaseConfig.js"

import {getUserData, createUser, createWaterFountain} from "../backend/REST.js"

const iosClientId = process.env.iosClientId
console.log("iosId" + iosClientId)
const expoClientId = process.env.expoClientId

export default function Login_Oauth({user,navigation}) {

  const [message, setMessage] = useState("");

  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signInError, setSignInError] = useState(false)

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: iosClientId,
    expoClientId: expoClientId
  });

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
      getUserInfo();
    }
  }, [response, token]);

  async function getUserInfo() {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      setUserInfo(user);
      setEmail(user.email)
      navigation.navigate("Home")
      //console.log(getUserData(user.id))

    } catch (error) {
      // Add your own error handler here
    }
  };

  function logUserIn() {
    console.log("Using Firebase Auth to create new user for email: ", email)
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        //Sign in
        const user = userCredential.user;
        //getUserData(username);
        //console.log(user.email)
        navigation.navigate("Home")
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Sign in Error: ", errorCode, "\n ", errorMessage)
  
        setSignInError(true)
    });
  };

  return (
    <View style={styles.container}>
      {signInError === false ? (
        <View>
          <Text> Email </Text>
            <TextInput
                autoCapitalize="none" 
                style={styles.input} 
                onChangeText={(value) => setEmail(value)}
              />
            <Text> Password </Text>
            <TextInput 
                autoCapitalize="none" 
                style={styles.input} 
                secureTextEntry={true} 
                onChangeText={(value) => setPassword(value)}
              />
            <Button
                title="Login"
                onPress={logUserIn}
            />
          <Button
            title="Sign in with Google"
            disabled={!request}
            onPress={() => {
              promptAsync();
            }}
          />
          <Button
            title="Create Account"
            onPress={() => navigation.navigate('CreateAccount')} 
          />
        </View>
      ): (
        <View>
          <Text> Email </Text>
            <TextInput 
                autoCapitalize="none"
                style={styles.input} 
                onChangeText={(value) => setEmail(value)}
              />
            <Text> Password </Text>
            <TextInput 
                autoCapitalize="none" 
                style={styles.input} 
                secureTextEntry={true} 
                onChangeText={(value) => setPassword(value)}
              />
            <Text> Incorrect username or password </Text>
            <Button
                title="Login"
                onPress={logUserIn}
            />
          <Button
            title="Sign in with Google"
            disabled={!request}
            onPress={() => {
              promptAsync();
            }}
          />
          <Button
            title="Create Account"
            onPress={() => navigation.navigate('CreateAccount')} 
          />
        </View>
      )}
      </View>
  );
}


const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
},
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#000',
    fontSize: 16,
  },
});
