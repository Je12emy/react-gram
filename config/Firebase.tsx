import * as firebase from 'firebase';
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyDhd7xtdnm6PHRTBCNJUnSB80bea5s1vu4",
  authDomain: "instagram-clone-6a8bf.firebaseapp.com",
  projectId: "instagram-clone-6a8bf",
  storageBucket: "instagram-clone-6a8bf.appspot.com",
  messagingSenderId: "565101413387",
  appId: "1:565101413387:web:8fb771ce13c8b0d98ab30e",
  measurementId: "G-89PPBW49SF",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;