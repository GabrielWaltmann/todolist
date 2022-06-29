import { getFirestore  } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";

import { signInWithEmailAndPassword, getAuth  } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";

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

const eye = document.querySelector(".eye")

hidePassword()

function hidePassword(){
    eye.addEventListener("click", event =>{
        let element = event.target
        let input = element.parentElement.children[0]
        if(element.src.indexOf("eye.svg") != -1){
            element.src = "images/eyeOff.svg"
            input.setAttribute("type", "text")
        }else {
            element.src = "images/eye.svg"
            input.setAttribute("type", "password")
        }
    })
}

function loginWithEmail(){
    const loginButton = document.querySelector("#login")
    loginButton.addEventListener("click", (event)=>{
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, "gabrielwaltmann@gmail.com", "Toquinho2004")
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user.email)

                window.open("todolist.html")
                // ...
            })
            .catch((error) => {
                console.log(error.code,error.message)
            });
        })
    }
    



loginWithEmail()