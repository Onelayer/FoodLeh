import firebase from "../firebase.js";

const db = firebase.ref("/Menu");

class MenuDataFunctions {
  getAll() {
    return db;
  }

  getAllForStore(key) {
    return db.child(key);
  }

  create(tutorial) {
    return db.push(tutorial);
  }

  new(key, value) {
    return db.child(key).push(value);
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
