import firebase from "../firebase.js";
import store from '../store';

const db = firebase.ref(store.getters.user.data.uid + "/Menu");

class MenuDataFunctions {

    // "key" represents stall account uid, 
    // "menuKey" represents menu item id.

  getAllForStore() {
    return db;
  }

  create(tutorial) {
    return db.push(tutorial);
  }

  new(value) {
    return db.push(value);
  }

  update(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }
}

export default new MenuDataFunctions();
