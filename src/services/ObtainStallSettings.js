import firebase from "../firebase.js";
import store from '../store';

const db = firebase.ref(((store.getters.user.data !== null) ? store.getters.user.data.uid : '') + "/Settings");

class SettingsFunctions {

  getAllForStore() {
    return db;
  }

  create(tutorial) {
    return db.push(tutorial);
  }

  new(key, value) {
    return db.child(key).push(value);
  }

  update(value) {
    return db.update(value);
  }

  delete(key) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }
}

export default new SettingsFunctions();
