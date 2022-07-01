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

const auth = getAuth(app);

document.querySelector(".haveAccount").addEventListener("click", (event)=>{
    changeArea(event)

})

hidePassword() 

try{login()}catch{}

function login(){
    let submitLogin = document.querySelector("#Submitlogin")

    submitLogin.addEventListener("click", ()=>{

        let email = getEmailAndPassword().email

        let password = getEmailAndPassword().password

        loginWithEmail(email, password)
    })


}

export function connectionState(){
    getAuth().onAuthStateChanged(user => {
        if(!user ) {
    
            window.location.href = ('login.html')

        }else{
            if(window.location.href.indexOf("todolist.html") == -1){
                isntLogin()
            }else if (window.location.href.indexOf("login.html") != -1){
                window.open('login.html')
            }
        }
    })
}

function isntLogin(){
    window.location.href = ("todolist.html")
}


function loginWithEmail(email, password){

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            window.open('todolist.html')
        })
        .catch((error) => {
            alert(`Não foi possivel encontrar o usuário! Por favor tente novamente`)
        });
 
}

function getEmailAndPassword(){
        let inputEmail = document.querySelector("#inputEmail").value

        let inputPassword = document.querySelector("#inputPassword").value

        return {email: inputEmail, password: inputPassword}

}

function hidePassword(){
    try{
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
    }catch(error){}

}

function changeArea(event){
    let block = document.querySelector(".blocksingIn")
    if(block.className.indexOf("toRight") == -1){
        block.className = ("blocksingIn toRight")
        block.children[1].innerHTML = "Já possui uma conta?"
        block.children[2].innerHTML = "fazer login"
    }else{
        block.children[1].innerHTML = "primeiro acesso?"
        block.children[2].innerHTML = "Criar conta"
        block.className = ("blocksingIn toLeft")       
    }
}