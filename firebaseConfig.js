import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
import { getAuth } from "firebase/auth";
import { getDatabase} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

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
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

const auth = getAuth(app)

const db = getDatabase(app)

const baseUrl = firebaseConfig.databaseURL

export { app, auth, db, baseUrl }