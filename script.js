import {addTaskToFirebase, removeTaskFromFirebase} from "./firebase.js";

export let list = document.querySelector("#list")

const SVGchecked = "images/checked.svg"

const SVGcheck = "images/check.svg"

const main = document.querySelector("main")



setInterval(()=>{

    const addInput = document.querySelector("#add")

    const removeTaskButton = document.querySelector("#remove")

    removeTaskButton.addEventListener("click", ()=>{removeTask()})

    addInput.addEventListener("click",()=>{
        createInput()
    })

},1000)

export function viewInScreen(array){
    list = document.querySelector("#list")
    list.innerHTML = ""
    array.forEach(item =>{
        list.innerHTML += `<li>
                                                            
                                <ion-icon name="trash-outline" class="delete" ></ion-icon>

                                <img src="images/check.svg" class="check" ></img>

                                <span>${item}</span>
                         </li>`

    })

}

function createInput(element){
    let inbox = `<input type="text">`
    main.innerHTML += inbox

    inbox = main.children[3]

    inbox.addEventListener('focusout', (e)=>{
        sendTask(inbox.value)
        if(inbox != undefined){inbox.style.display = "none"}
    })

    inbox.addEventListener("keypress",(e)=>{
        if (e.key == "Enter"){
            sendTask(inbox.value)
            try{
                inbox.remove()
                console.log(addInput)
            }catch(error){
                console.log(addInput)
            }
        }
    })


}

function sendTask(task){
    if(task != "" && task != undefined){
        addTaskToFirebase(task)
    }
}

function removeTask(){

    changeTrashCanIcon()

    
}

function changeTrashCanIcon(){
    list = document.querySelector("#list")
    let itens = [...list.children]
    itens.forEach(item=>{
        let trashCan = item.children[0]
        let check = item.children[1]


        if(trashCan.style.display != "block"){

            trashCan.style.display = "block"

            check.style.display = "none"

            trashCan.addEventListener("click", ()=>{
                let text = item.children[2].innerText
                removeTaskFromFirebase(text)
            })
        }else{
            trashCan.style.display = "none"
            check.style.display = "block"
        }


    })
}

/* function checked(e){

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

} */
