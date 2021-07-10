import firebase from "../firebase.js";
import store from '../store';

const db = firebase.ref();

class StallDataFunctions {

  getAll() {
    return db;
  }

  getAllStallMenu(uid) {
    return db.child(uid);
  }

 
}

export default new StallDataFunctions();
