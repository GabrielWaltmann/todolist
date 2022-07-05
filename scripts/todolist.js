import { islogged, auth, logOut } from "../scripts/login.js"
import { addTaskToFirebase, removeTaskFromFirebase } from "../scripts/firebase.js"

export const list = document.querySelector("#list")

const SVGchecked = "images/checked.svg"

const SVGcheck = "images/check.svg"

let userEmail = undefined

window.onload = event => {
    islogged()
    eventListeners()
     
    auth.onAuthStateChanged(user => {if(userEmail == undefined){userEmail = user.email}})
}

function eventListeners(){
    const removeTasks = document.querySelector("#removeTasks")
    const addInput = document.querySelector("#addInput")
    const ButtonlogOut = document.querySelector(".ButtonlogOut")

    ButtonlogOut.addEventListener("click", logOut)
    addInput.addEventListener("click", createInput)
    removeTasks.addEventListener("click", addTrashs)
}

function createInput(){
    let input = document.createElement("input")
    input.setAttribute("type", "text")
    list.append(input)

    let value = list.querySelector("input") 
    sendTask(value)
}

export function refreshScreen(object, user){
     if(user.email == object.email){
        list.innerHTML = ""
         object.tasks.forEach(task =>{
            if(task.status == false){
                list.innerHTML += `<li>
                                    <ion-icon name="trash-outline" class="delete" ></ion-icon>

                                    <img src="../images/check.svg" class="check"></img>

                                    <span>${task.data}</span>
                                </li>`

            }
            
            else{
                list.innerHTML += `<li>
                                    <ion-icon name="trash-outline" class="delete" ></ion-icon>

                                    <img src="../images/checked.svg" class="check"></img>

                                    <span>${task.data}</span>
                                </li>`
            }
    })
    let tasks = [...list.children]
    tasks.forEach(task =>{
        (task.children[1]).addEventListener("click",()=>{
            changeStatus(task)
        })
    })
}}

function changeStatus(element){
    if(isChecked(element.children) == false){
        let text = element.children[2].innerHTML
        removeTaskFromFirebase(text, false, userEmail)
        addTaskToFirebase(text, true, userEmail) 
    }else if(isChecked(element.children) == true){
        let text = element.children[2].innerHTML
        removeTaskFromFirebase(text, true, userEmail)
        addTaskToFirebase(text, false, userEmail) 
    }
    
}

function addTrashs(){
    let arrayTasks = [...list.children]
    arrayTasks.forEach(li => {
        let trashStyle = li.children[0].style
        let checkStyle = li.children[1].style

        if(trashStyle.display == "" || trashStyle.display == "none"){
            trashStyle.display = "block"
            checkStyle.display = "none"
            removeTask(li.children[0])
        }else if(trashStyle.display == "block"){
            trashStyle.display = "none"
            checkStyle.display = "block"
        }

    })
}

function removeTask(trash){
    trash.addEventListener("click", ()=>{
        let info = [...trash.parentElement.children][2].innerHTML
        let checked = isChecked([...trash.parentElement.children])
        removeTaskFromFirebase(info, checked, userEmail)
    })
}

function isChecked(element){
    if(element[1].src.indexOf(SVGchecked) == -1){
        return false
    }else{
        return true
    }
}

function sendTask(input){
    input.addEventListener('focusout', (e)=>{
        inputHasValue(input.value)

        input.style.display = "none"    
        input.value = ""
    })

    input.addEventListener("keypress",(e)=>{
        if (e.key == "Enter"){
            inputHasValue(input.value)

            input.style.display = "none"
            input.value = ""
        }
    })
}

function inputHasValue(value){
    if(value != ""){
        addTaskToFirebase(value, false, userEmail)
    }
}
