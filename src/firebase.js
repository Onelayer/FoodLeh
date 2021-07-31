import firebase from "firebase/app";
import "firebase/database";
import store from './store';

// const dotenv = require('dotenv');
// dotenv.config();

console.log(process.env);

// let config = {
//   apiKey: "AIzaSyD9Y1A5dwPx1BFBveee1NoRuCzQRTJFpGw",
//   authDomain: "foodleh-da2e9.firebaseapp.com",
//   databaseURL:
//     "https://foodleh-da2e9-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "foodleh-da2e9",
//   storageBucket: "foodleh-da2e9.appspot.com",
//   messagingSenderId: "698154543422",
//   appId: "1:698154543422:web:133dce1f44f4945aeb646f",
// };

console.log(process.env.VUE_APP_API_KEY);
console.log(process.env.VUE_APP_AUTH_DOMAIN);
console.log(process.env.VUE_APP_DATABASE_URL);
console.log(process.env.VUE_APP_PROJECT_ID);
console.log(process.env.VUE_APP_STORAGE_BUCKET);
console.log(process.env.VUE_APP_MESSAGING_SENDER_ID);
console.log(process.env.VUE_APP_APP_ID);



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
