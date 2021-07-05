import firebase from "firebase/app";
import "firebase/database";
import store from './store';

let config = {
  apiKey: "AIzaSyD9Y1A5dwPx1BFBveee1NoRuCzQRTJFpGw",
  authDomain: "foodleh-da2e9.firebaseapp.com",
  databaseURL:
    "https://foodleh-da2e9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "foodleh-da2e9",
  storageBucket: "foodleh-da2e9.appspot.com",
  messagingSenderId: "698154543422",
  appId: "1:698154543422:web:133dce1f44f4945aeb646f",
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
  console.log(user);
});

export default firebase.database();
