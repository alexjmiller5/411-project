
// code snippet from expo google oauth documentation, linked below
// https://docs.expo.dev/guides/google-authentication/

import { useEffect, useState } from "react";
import { StyleSheet, Text, Image, View, TextInput, TouchableHighlight } from "react-native";
import * as Google from "expo-auth-session/providers/google";

import { signInWithEmailAndPassword } from "firebase/auth";

import {app, auth, db, baseUrl} from "../firebaseConfig.js"

import Custom_Button from "./Custom_Button.js";
import Custom_Input from "./Custom_Input.js";

import {getUserData, createUser, createWaterFountain} from "./REST.js"

const iosClientId = "376469778298-9i9pebmddj05js3csip2b4ofpb1pjtca.apps.googleusercontent.com"
const expoClientId = "376469778298-d1godfva9j2fg7ioba2kg6drlmgktkiv.apps.googleusercontent.com"
const androidClientId = ""




export default function Login_Oauth({user,navigation}) {

  const [message, setMessage] = useState("");

  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signInError, setSignInError] = useState(false)

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
          <Text style={styles.title}> Login </Text>
            <Custom_Input
                label="Email" 
                autoCapitalize="none"
                style={styles.input} 
                onChangeText={(value) => setEmail(value)}
              />
            <Custom_Input
                label="Password" 
                autoCapitalize="none" 
                secureTextEntry={true} 
                onChangeText={(value) => setPassword(value)}
              />
            {signInError === false ? (
              <View>
              </View>
            ) : ( 
              <View>
                <Text style={styles.errorText}> Incorrect username or password </Text>
              </View>
            )}
            <Custom_Button
                title="Login"
                onPress={logUserIn}
                big={false}
            />
          <Custom_Button
            title="Sign in with Google"
            disabled={!request}
            big={false}
            onPress={() => {
              promptAsync();
            }}
          />
          <Custom_Button
            title="Create Account"
            onPress={() => navigation.navigate('CreateAccount')} 
          />
        </View>
  );        
}


const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
  },
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
