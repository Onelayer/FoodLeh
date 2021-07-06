import firebase from "../firebase.js";

const db = firebase.ref("/Order");

class TutorialDataService {
  getAll() {
    return db;
  }

  create(tutorial) {
    return db.push(tutorial);
  }

  update(orderID, value) {
    return db.child(orderID).update(value);
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
