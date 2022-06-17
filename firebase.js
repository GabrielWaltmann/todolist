import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";

import { getFirestore, collection, getDocs, arrayRemove, setDoc, doc, arrayUnion} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";

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

const insetTask = await getDocs(collection(db, "todo"));

insetTask.forEach((doc) => {
  list.innerHTML = ""
  doc.data().data.forEach(task =>{
    list.innerHTML += `<li>
                                                              
                        <ion-icon name="trash-outline" class="delete" ></ion-icon>

                        <img src="images/check.svg" class="check" onclick="checked(event)"></img>

                        <span>${task}</span>
                      </li>`
  tasks.push({data: task, state: 'check'})  })
                      
})

setInterval(() => {
  if(sendTask != undefined && sendTask != ""){
    console.log(sendTask)
    addTaskToFirebase(sendTask)
    sendTask = ''
  }
  if(sendTrash != undefined && sendTrash != ""){
    console.log(sendTrash)
    removeTaskToFirebase(sendTrash)
    sendTrash = ""
  }
}, 500);


async function addTaskToFirebase(task) { 
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
