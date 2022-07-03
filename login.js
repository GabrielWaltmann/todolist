
import { getFirestore, setDoc, doc, collection, addDoc} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";

import { signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signOut, signInWithPopup,
 signInWithRedirect, linkWithPopup, linkWithRedirect  } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";

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

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

    changeArea()

    login()

    hidePassword()

    /* window.onload = (event) => {
        try{
            connectionState()
        }catch{console.log
        }
        
    } */



function login(){
    try{
        let submitLogin = document.querySelector(".Submitlogin")

        let submitRegister = document.querySelector(".submitRegister")

        const Buttongoogle = [...document.querySelectorAll(".Buttongoogle")]
    

        Buttongoogle.forEach(button =>{
            button.addEventListener("click", ()=>{
                loginWithGoogle()

                signInWithPopup(auth, provider)
                .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;
                    // ...

                    console.log(credential, token, user)
                }).catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.customData.email;
                    // The AuthCredential type that was used.
                    const credential = GoogleAuthProvider.credentialFromError(error);
                    // ...
                });
            })
        })

        submitRegister.addEventListener("click",()=>{

            newUserWithEmail()
        
        })
        submitLogin.addEventListener("click", ()=>{

            loginWithEmail()

        })
    }catch{}

}

export function connectionState(){
    getAuth().onAuthStateChanged(user => {
        if(!user ) {
    
            window.location.href = ('login.html')

        }else{
            if(window.location.href.indexOf("todolist.html") == -1){
                isntLogin()
            }else if (window.location.href.indexOf("login.html") != -1){
                window.location.href = ('login.html')
            }
        }
    })
}

  

function isntLogin(){
    window.location.href = ("todolist.html")
}

function loginWithEmail(){
    let email = document.querySelector(".emailOfSingInArea").value

    let password = document.querySelector(".passwordOfSingInArea").value

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            window.location.href = ('todolist.html')
        })
        .catch((error) => {
            alert(`Não foi possivel encontrar o usuário! Por favor tente novamente`)
        });
 
}

function changeArea(){
    try{
        document.querySelector(".haveAccount").addEventListener("click", (event)=>{    

            let block = document.querySelector(".blockArea")
            if(block.className.indexOf("toRight") == -1){
                block.className = ("blockArea toRight")
                block.children[1].innerHTML = "Já possui uma conta?"
                block.children[2].innerHTML = "fazer login"
            }else{
                block.children[1].innerHTML = "primeiro acesso?"
                block.children[2].innerHTML = "Criar conta"
                block.className = ("blockArea toLeft")       
            }
    })    
    }catch{}
}

function hidePassword(){
    let eyes = document.getElementsByClassName("eye")
    eyes = [...eyes]
    eyes.forEach(eye =>{
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
    })

}

function newUserWithEmail(){
    let email = document.querySelector(".inputEmailOfRegisterArea").value

    let password = document.querySelector(".inputPasswordOfRegisterArea").value

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        newArray(email)
        alert(`Conta com o email ${userCredential.email} criado com sucesso! /n Agora faça login com seu email e senha`)
  })
  .catch((error) => {
    console.log(error)
  });
}

export async function newArray(userEmail){
    const docRef = await addDoc(collection(db, "users"), {
        email: userEmail,
        tasks: []
      });
    console.log(userEmail)
}

function loginWithGoogle(){
    
}