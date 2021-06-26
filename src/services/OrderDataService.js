import firebase from "../firebase.js";

const db = firebase.ref("/Order");

class TutorialDataService {
  getAll() {
    return db;
  }

  create(tutorial) {
    return db.push(tutorial);
  }

  update(value) {
    return db.update(value);
  }

  change(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove(); 
  }
}

export default new TutorialDataService();
