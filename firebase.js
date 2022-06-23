import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";

import { getFirestore, collection, getDocs, arrayRemove, setDoc, doc, arrayUnion, onSnapshot, query,where} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";


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



export async function getDatas(){

  const data = await getDocs(collection(db, "todo"));

  const query = await query(collection(db, "todo"));
  const snapshotInQuery = onSnapshot(query, (querySnapshot) => {
  const array = [];
  querySnapshot.forEach((doc) => {
      array.push(doc.data());
  });
  console.log(array[0].data);
});

  data.forEach((doc) => {
    const array = doc.data().data
/*     console.log(array)
 */                     
  })



}

export async function addTaskToFirebase(task) { 
  await setDoc(doc(db, "todo", "Q41vEBv2IFoVb7uTNcOl"), {
    data: arrayUnion(task),
  },{merge: true})
  .then(console.log())
  .catch(error => console.log(error))
}

async function removeTaskToFirebase(trash) { 
  await setDoc(doc(db, "todo", "Q41vEBv2IFoVb7uTNcOl"), {
    data: arrayRemove(trash),
  },{merge: true})
  .then(console.log())
  .catch(error => console.log(error))
}

