import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import './assets/css/styles.css';
import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css';
import VueSimpleAlert from 'vue-simple-alert';
import firebase from './firebase';
import store from "./store";


/*
var firebaseConfig = {
  apiKey: "AIzaSyD9Y1A5dwPx1BFBveee1NoRuCzQRTJFpGw",
  authDomain: "foodleh-da2e9.firebaseapp.com",
  projectId: "foodleh-da2e9",
  storageBucket: "foodleh-da2e9.appspot.com",
  messagingSenderId: "698154543422",
  appId: "1:698154543422:web:133dce1f44f4945aeb646f",
  measurementId: "G-CJ6BP0MS5Z"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
*/
Vue.use(Vuesax, {
  // options here
})

Vue.use(VueSimpleAlert);

Vue.config.productionTip = false;


new Vue({
  router,
  data: {uid: ""},
  store,
  render: h => h(App)
}).$mount("#app");
