// Firbase Documentation: https://firebase.google.com/docs/web/setup#access-firebase

import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Initialize Firebase
const firebaseConfig = {
    apiKey: process.env.firebaseAPIKey,
    authDomain: process.env.firebaseAuthDomain,
    databaseURL: process.env.firbaseDatabaseURL,
    projectId: process.env.firebaseProjectId,
    storageBucket: process.env.firebaseStorageBucket,
    messagingSenderId: 'sender-id',
    appId: process.env.firebaseAppId,
    measurementId: 'G-measurement-id',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getDatabase(app)
const baseUrl = firebaseConfig.databaseURL

export { app, auth, db, baseUrl }