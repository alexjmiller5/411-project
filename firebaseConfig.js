// Firbase Documentation: https://firebase.google.com/docs/web/setup#access-firebase

import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Initialize Firebase
const firebaseConfig = {
    apiKey: 'AIzaSyCnXfjykD-9uIkiOm_vcoqMbbpUP2GUoWA',
    authDomain: 'freewater-68d99.freewater.com',
    databaseURL: 'https://freewater-68d99.firebaseio.com',
    projectId: 'freewater-68d99',
    storageBucket: 'freewater-68d99.appspot.com',
    messagingSenderId: 'sender-id',
    appId: '1:329124636414:ios:fd3f26ab5b008d52bee7af',
    measurementId: 'G-measurement-id',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getDatabase(app)
const baseUrl = firebaseConfig.databaseURL

export { app, auth, db, baseUrl }