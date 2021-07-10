import firebase from "../firebase.js";
import store from '../store';

// const db = firebase.ref(((store.getters.user.data !== null) ? store.getters.user.data.uid : '') + "/Menu");
const db = firebase.ref();


class MenuDataFunctions {

  getAllForStore(uid) {
    return db.child(uid).child('Menu');
  }

  create(uid, tutorial) {
    return db.child(uid).child('Menu').push(tutorial);
  }

  new(uid, value) {
    return db.child(uid).child('Menu').push(value);
  }

  update(uid, key, value) {
    return db.child(uid).child('Menu').child(key).update(value);
  }

  delete(uid, key) {
    return db.child(uid).child('Menu').child(key).remove();
  }

  deleteAll(uid) {
    return db.child(uid).child('Menu').remove();
  }
}

export default new MenuDataFunctions();
