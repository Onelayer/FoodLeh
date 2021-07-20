import firebase from "../firebase.js";
import store from '../store';

//const db = firebase.ref(((store.state.hawker.uid !== null) ? store.state.hawker.uid : '') + "/Order");
const db = firebase.ref();

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

  update(uid, orderID, value) {
    return db.child(uid).child("Order").child(orderID).update(value);
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

  createFeedback(uid, data) {
    return db.child(uid).child("Feedback").push(data);
  }
}

export default new TutorialDataService();
