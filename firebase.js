import {refreshScreen} from "./script.js"

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";

import { getFirestore, collection,  arrayRemove, setDoc, doc, arrayUnion, onSnapshot, updateDoc} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";

import { onAuthStateChanged, getAuth } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";

export let tasks = []

const firebaseConfig = {
  apiKey: "AIzaSyDGSmgg0DRMyqij2D1kmaJaTpb7kUS2J20",
  authDomain: "to-do-list-gabriel.firebaseapp.com",
  databaseURL: "https://to-do-list-gabriel-default-rtdb.firebaseio.com",
  projectId: "to-do-list-gabriel",
  storageBucket: "to-do-list-gabriel.appspot.com",
  messagingSenderId: "149369491980",
  appId: "1:149369491980:web:fa5176ad325df4d1579429"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export async function addTaskToFirebase(info, isChecked, email) {
  console.log(info, isChecked, email)
  await setDoc(doc(db, "users", email), {
    email: email,
      tasks: arrayUnion({data: info, status: isChecked}),
    },{merge: true})
}

export async function removeTaskFromFirebase(info, checked, email) { 
  console.log(info, checked, email)
  await setDoc(doc(db, "users", email), {
    email: email,
    tasks: arrayRemove({data: info, status: checked}),
  },{merge: true})
}

const updateOnFirebase = onSnapshot(collection(db, "users"), (doc) => {
  doc.forEach(element => {
    onAuthStateChanged(auth, (user) => {
      refreshScreen(element.data(), user) })
    
  });
})

