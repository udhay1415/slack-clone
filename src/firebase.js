import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyDO4LAQayLxhczGwZSkHGuZ3aSd73CGvmQ",
    authDomain: "slack-clone-44283.firebaseapp.com",
    databaseURL: "https://slack-clone-44283.firebaseio.com",
    projectId: "slack-clone-44283",
    storageBucket: "",
    messagingSenderId: "159881543169",
    appId: "1:159881543169:web:3bea456f095a8606"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  
export default firebase;