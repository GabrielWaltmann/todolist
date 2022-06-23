import {addTaskToFirebase, getDatas} from "./firebase.js";

const list = document.querySelector("#list")

const SVGchecked = "images/checked.svg"

const SVGcheck = "images/check.svg"

const main = document.querySelector("main")

const addInput = document.querySelector("#add")

var showInScreen

var addToFirebase

var removeToFirebase

main.addEventListener("change", updateList)

addInput.addEventListener("click", createInput)

function createInput(){

    let inbox = `<input type="text">`

    main.innerHTML += inbox

    inbox = main.children[3]

    inbox.addEventListener('focusout', (e)=>{
        sendTask(inbox.value)
    })

    inbox.addEventListener("keypress",(e)=>{
        if (e.key == "Enter"){
            sendTask(inbox.value)
        } 
    })
}

function sendTask(task){
    if(task != "" && task != undefined){
        console.log(task)
        addTaskToFirebase(task)
        getDatas()
    }
}

/* 
function sendTask(inbox){
    let getTask = inbox.parentElement.children[3]
    console.log(getTask.value)

}

function checkKey(event){

    if (event.key == "Enter"){
        let task = event.target
        addTask(task.value) 
    } 
}
 */
function updateList(){
    getDatas()
}

function addTask(task){

    addToFirebase = task

}



function deleteTask(){

    for(li of [...list.children]){
        if(li.children[0].style.display != "block"){
            li.children[0].style.display = "block"
            li.children[1].style.display = "none"

            removeTask(li.children[0])
        }else{
            li.children[0].style.display = "none"
            li.children[1].style.display = "block"
        }
    }
}

function removeTask(trash){
    trash.addEventListener("click", ()=>{

        trash.parentElement.style.display = "none"

        removeToFirebase = trash.parentElement.children[2].innerHTML

    })

}

function checked(e){

    changeCheckbox(e)
    
}

function changeCheckbox(e){

    let SVG = e.target

    if(SVG.src.indexOf(SVGcheck) != -1){
        SVG.src = SVGchecked
        setState(SVG)
        strikethroughText(SVG)
    }else if(SVG.src.indexOf(SVGchecked) != -1){
        SVG.src = SVGcheck
        setState(SVG)
        strikethroughText(SVG)
    }
}


function strikethroughText(SVG){

    let text = SVG.parentElement.children[2]

    if(SVG.src.indexOf(SVGchecked) != -1){
        text.style = "text-decoration: line-through" 
    }else if(SVG.src.indexOf(SVGcheck) != -1){
        text.style = "text-decoration: none" 
    }

}

function viewInScreen(content){
    showInScreen = undefined

    list.innerHTML += `<li>
                                                                
                          <ion-icon name="trash-outline" class="delete" ></ion-icon>

                          <img src="images/check.svg" class="check" onclick="checked(event)"></img>

                          <span>${content}</span>
                        </li>`

    

}

setInterval( ()=>{
} , 500);
