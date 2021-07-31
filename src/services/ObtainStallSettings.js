import firebase from "../firebase.js";
import store from '../store';

// const db = firebase.ref(((store.getters.user.data === null) ? '' : store.getters.user.data.uid) + "/Settings");
const db = firebase.ref();


class SettingsFunctions {

  getAllForStore(uid) {
    return db.child(uid).child('Settings');
  }

  set(uid, value) {
    return db.child(uid).child('Settings').set(value);
  }

}

export default new SettingsFunctions();
