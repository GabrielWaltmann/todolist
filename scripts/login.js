import { app } from "../scripts/firebaseConfig.js"

import { signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signOut, signInWithPopup} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";
  
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export let userEmail = undefined

window.onload = event => {
    islogged()
    changeArea()
    hidePassword()
    eventListeners()
}

function eventListeners(){
        const loginbutton = document.querySelector(".Submitlogin")
        const registerButton = document.querySelector(".submitRegister")
        const Buttongoogle = [...document.querySelectorAll(".Buttongoogle")]

        registerButton.addEventListener("click", newUserWithEmail)
        loginbutton.addEventListener("click", loginWithEmail)
        Buttongoogle.forEach( button =>{button.addEventListener("click", loginWithGoogle)})

}

function newUserWithEmail(){
        let email = document.querySelector(".inputEmailOfRegisterArea")
        let password = document.querySelector(".inputPasswordOfRegisterArea")
        if(email != "" && password != ""){
            
            createUserWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
                alert(`Conta com o email ${email.value} criado com sucesso! Agora faça login com seu email e senha`)
            })
            .catch((error) => {
                console.log(error)

            });
    }else{
        alert(`Por favor informar um email e senha valido!`)
    }
}
    
function loginWithEmail(){
    let email = document.querySelector(".emailOfSingInArea")
    let password = document.querySelector(".passwordOfSingInArea")
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
        window.location.href = ('todolist.html')
    })
    .catch((error) => {
        alert(`Não foi possivel encontrar o usuário! Por favor tente novamente`)
    });
}

export function islogged(){
    getAuth().onAuthStateChanged(user => {
         if(window.location.href.indexOf("login.html") == -1 && user && window.location.href.indexOf("todolist.html") == -1) { 
            window.location.href = ('todolist.html')
        } else if(!user && window.location.href.indexOf("login.html") == -1){
            window.location.href = ('login.html')
        } 
    })

}

function changeArea(){
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
}

function hidePassword(){
    let eyes = [...document.getElementsByClassName("eye")]
     eyes.forEach(eye =>{
        eye.addEventListener("click", event =>{
            let element = event.target
            let input = element.parentElement.children[0]
            if(element.src.indexOf("eye.svg") != -1){
                element.src = "../images/eyeOff.svg"
                input.setAttribute("type", "text")
            }else {
                element.src = "../images/eye.svg"
                input.setAttribute("type", "password")
            }        
        })
    })

}

function loginWithGoogle(){
    signInWithPopup(auth, provider)
    .then( (result) => {
        window.location.href = ('todolist.html')
    })
    .catch((error) => {
        console.log(error)
    });
}

export function logOut(){
    signOut(auth).then(() => {
        window.location.href = ('login.html')
    }).catch((error) => {
        console.log(error)
    }); 
}