import firebase from "../firebase.js";
import store from '../store';

const db = firebase.ref(store.getters.user.data.uid + "/Order");

class TutorialDataService {
  getAll() {
    return db;
  }
  
  getAllForStore(key) {
    return db.child(key);
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
