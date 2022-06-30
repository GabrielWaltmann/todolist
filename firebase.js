import {refreshScreen} from "./script.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";

import { getFirestore, collection, getDocs, arrayRemove, setDoc, doc, arrayUnion, onSnapshot, query,where} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";


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

export async function addTaskToFirebase(info, isChecked) {
  console.log(info, isChecked) 
  await setDoc(doc(db, "todo", "Q41vEBv2IFoVb7uTNcOl"), {
    task: arrayUnion({data: info, status: isChecked}),
  },{merge: true})
}

export async function removeTaskFromFirebase(info, checked) { 
  console.log(info, checked)
  await setDoc(doc(db, "todo", "Q41vEBv2IFoVb7uTNcOl"), {
    task: arrayRemove({data: info, status: checked}),
  },{merge: true})
}

const updateOnFirebase = onSnapshot(collection(db, "todo"), (doc) => {
  doc.forEach(element => {
    refreshScreen(element.data())
  });
})

