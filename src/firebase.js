import * as firebase from "firebase";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD9Y1A5dwPx1BFBveee1NoRuCzQRTJFpGw",
  authDomain: "foodleh-da2e9.firebaseapp.com",
  databaseURL: "https://foodleh-da2e9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "foodleh-da2e9",
  storageBucket: "foodleh-da2e9.appspot.com",
  messagingSenderId: "698154543422",
  appId: "1:698154543422:web:133dce1f44f4945aeb646f",
  measurementId: "G-CJ6BP0MS5Z"
};

firebase.initializeApp(firebaseConfig);

export default firebase.database();