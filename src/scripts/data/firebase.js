// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import { getAuth  }from "firebase/auth";
import { getFirestore } from "firebase/firestore";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhnmZMIgaxpVyFvhY-Lm1yKerXM07bpvs",
  authDomain: "setok-89624.firebaseapp.com",
  databaseURL: "https://setok-89624-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "setok-89624",
  storageBucket: "setok-89624.appspot.com",
  messagingSenderId: "394421871277",
  appId: "1:394421871277:web:a945219e830069bb91dc24",
  measurementId: "G-4JQY27M2QV"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const user = auth.currentUser;
const db = getDatabase(app);
const dbRef = ref(db);
const fb = getFirestore(app);



// Initialize Firebase

export { firebaseConfig, app, auth, dbRef, db, fb};
