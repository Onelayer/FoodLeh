import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import './assets/css/styles.css';
import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css';
import VueSimpleAlert from 'vue-simple-alert';
import firebase from './firebase';
import store from "./store";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);

Vue.use(Vuesax, {
  // options here
})

Vue.use(VueSimpleAlert);

Vue.config.productionTip = false;



new Vue({
  router,
  data: { 
    uid: "",
  },
  store,
  render: h => h(App)
}).$mount("#app");
