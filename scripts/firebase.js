import { app } from "../scripts/firebaseConfig.js"
import { refreshScreen } from "../scripts/todolist.js"

import { getFirestore, collection,  arrayRemove, setDoc, doc, arrayUnion, onSnapshot} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";

import { onAuthStateChanged, getAuth } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";


const db = getFirestore(app);

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
  const auth = getAuth(app);

  doc.forEach(element => {
    onAuthStateChanged(auth, (user) => {
        refreshScreen(element.data(), user) 
      })
  });
})

