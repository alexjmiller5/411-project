import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text, Button } from "react-native";

import { 
  createUserWithEmailAndPassword, 
} from "firebase/auth";

import * as Google from "expo-auth-session/providers/google";

import {auth, baseUrl} from "../firebaseConfig.js"

import { createUser } from './REST.js';

import axios from 'axios';
import Custom_Input from './Custom_Input.js';
import Custom_Button from './Custom_Button.js';

const iosClientId = "376469778298-9i9pebmddj05js3csip2b4ofpb1pjtca.apps.googleusercontent.com"
const expoClientId = "376469778298-d1godfva9j2fg7ioba2kg6drlmgktkiv.apps.googleusercontent.com"
const androidClientId = ""



export default function CreateAccount({navigation}) {
  //  const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState(false); 
    
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState("");
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(false)

    const [signUpError, setSignUpError] = useState(false)

    function createUserWithUsername() {
        axios({
            method: 'get',
            url: `${baseUrl}/Users/${username}.json?print=pretty`,
          }).then((response) => {
            if (response.data == null) {
                createUser(username, email)
                navigation.navigate("Home")
            } else {
                setError(true)
            }
          }).catch(err => {
            console.log("\nget error: ",err);
          });
    }



    const [request, response, promptAsync] = Google.useAuthRequest({
      androidClientId: androidClientId,
      iosClientId: iosClientId,
      expoClientId: expoClientId,
    });
  
    useEffect(() => {
      if (response?.type === "success") {
        setToken(response.authentication.accessToken);
        googleSignUp();
      }
    }, [response, token]);
  
    async function googleSignUp() {
      try {
        const response = await fetch(
          "https://www.googleapis.com/userinfo/v2/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("google sign up")
        const user = await response.json();
        setUserInfo(user);
        setEmail(user.email)
        console.log("user enmail:  ", user.email)
        setLoggedIn(true)
        //navigation.navigate("Home")
       // navigation.navigate("Choose_Username", {email:user.email, navigation: navigation})
      } catch (error) {
        // Add your own error handler here
      }
    };

    function signUp() {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            //Sign in
            const user = userCredential.user;
            console.log("Manually Creating new user", email, "  ", username)
            createUserWithUsername()
            navigation.navigate("Home")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("error creating account\n", errorCode, "\n", errorMessage)
            setSignUpError(true)
        });
    };


    if (loggedIn) {
      return (
      <View>
        <Text style={styles.title}> Choose Username </Text>
        <Custom_Input 
                label="Username"
                autoCapitalize="none" 
                style={styles.input} 
                onChangeText={(value) => setUsername(value)}
        />
        {error === true ? (     
          <Text> Username taken try a new username </Text>
        ) : (
          <View>
          </View>
        )}
        <Custom_Button
              title="Create Account"
              onPress={createUserWithUsername}
        />
      </View>
      );
    }

    return (
      <View>
          <Text style={styles.title}> Create Account </Text>
          <Custom_Input 
              label="Username"
              autoCapitalize="none" 
              style={styles.input} 
              onChangeText={(value) => setUsername(value)}
          />
          {error === true ? (     
            <Text> Username taken try a new username </Text>
          ) : (
            <View>
            </View>
          )}
          <Custom_Input 
              label="Email"
              autoCapitalize="none" 
              style={styles.input} 
              onChangeText={(value) => setEmail(value)}
          />
          {signUpError === true ? (     
            <Text> Email taken </Text>
          ) : (
            <View>
            </View>
          )}
          <Custom_Input 
              label="Password"
              autoCapitalize="none" 
              style={styles.input} 
              secureTextEntry={true} 
              onChangeText={(value) => setPassword(value)}
          />
          <Custom_Button
              title="Create Account"
              onPress={signUp}
          />
          <Custom_Button
          title="Sign Up with Google"
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
        />
          <Custom_Button
              title="Already have an account?"
              onPress={() => navigation.navigate('Login')}
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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
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
  
