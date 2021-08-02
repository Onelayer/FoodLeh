import firebase from "firebase/app";
import "firebase/database";
import store from './store';

require('dotenv').config();

console.log(process.env);

let config_firebase = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
};

// console.log(config);

firebase.initializeApp(config_firebase);

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
  console.log(user);
});

export default firebase.database();
