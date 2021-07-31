import firebase from "../firebase.js";
import store from '../store';

//const db = firebase.ref(((store.state.hawker.uid !== null) ? store.state.hawker.uid : '') + "/Order");
const db = firebase.ref();

class FeedbackService {
  getAll() {
    return db;
  }
  
  getAllForFeedback(uid) {
    return db.child(uid).child('Feedback');
  }

  createFeedback(uid, data) {
    return db.child(uid).child("Feedback").push(data);
  }

  delete(uid, key) {
    return db.child(uid).child('Feedback').child(key).remove();
  }
}

export default new FeedbackService();
