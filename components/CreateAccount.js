import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text, Button } from "react-native";

import { 
  createUserWithEmailAndPassword, 
} from "firebase/auth";

import * as Google from "expo-auth-session/providers/google";

import {auth, baseUrl} from "../firebaseConfig.js"

import { createUser } from '../backend/REST.js';

import axios from 'axios';

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

    return (
      <View>
        {loggedIn === true ? (
          <View>
            {error === false ? (
              <View>
              <Text> Username </Text>
              <TextInput 
                  style={styles.input} 
                  onChangeText={(value) => setUsername(value)}
              />      
              <Button style={styles.button} title="Select" onPress={createUserWithUsername}/>
              </View>
          ) : (
              <View>
              <Text> Username </Text>
              <TextInput 
                  style={styles.input} 
                  onChangeText={(value) => setUsername(value)}
              />      
              <Text> Username taken try a new username </Text>
              <Button style={styles.button} title="Select" onPress={createUserWithUsername}/>
              </View>
          )}
        </View>
        ) : (
          <View>
            {signUpError === true ? (
            <View>
                <Text> Username </Text>
                <TextInput 
                    autoCapitalize="none" 
                    style={styles.input} 
                    onChangeText={(value) => setUsername(value)}
                />
                <Text> Email </Text>
                <TextInput 
                    autoCapitalize="none" 
                    style={styles.input} 
                    onChangeText={(value) => setEmail(value)}
                />
                <Text> Email or Username already in use </Text>
                <Text> Password </Text>
                <TextInput 
                    autoCapitalize="none" 
                    style={styles.input} 
                    secureTextEntry={true} 
                    onChangeText={(value) => setPassword(value)}
                />
                <Button
                    title="Create Account"
                    onPress={signUp}
                />
                <Button
                title="Sign Up with Google"
                disabled={!request}
                onPress={() => {
                  promptAsync();
                }}
              />
                <Button
                    title="Already have an account?"
                    onPress={() => navigation.navigate('Login')}
                />
              </View>
              ) : (
                <View>
                                <Text> Username </Text>
                <TextInput 
                    autoCapitalize="none" 
                    style={styles.input} 
                    onChangeText={(value) => setUsername(value)}
                />
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
                    title="Create Account"
                    onPress={signUp}
                />
                <Button
                title="Sign Up with Google"
                disabled={!request}
                onPress={() => {
                  promptAsync();
                }}
              />
                <Button
                    title="Already have an account?"
                    onPress={() => navigation.navigate('Login')}
                />
              </View>
            )}
          </View>

        )}
      </View>
    );
}

const styles = StyleSheet.create({
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
  