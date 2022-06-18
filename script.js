
const list = document.querySelector("#list")

const SVGchecked = "images/checked.svg"

const SVGcheck = "images/check.svg"

var showInScreen

var addToFirebase

var removeToFirebase



function createInput(){

    let input = document.createElement("input")

    input.setAttribute("type","text")

    input.setAttribute("onfocusout", "addTask(event)")

    list.prepend(input)

}

function addTask(e){

    input = e.target

    addToFirebase = input.value

    input.remove()

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

function pushInScreen(content){

    list.innerHTML += `<li>
                                                                
                          <ion-icon name="trash-outline" class="delete" ></ion-icon>

                          <img src="images/check.svg" class="check" onclick="checked(event)"></img>

                          <span>${content}</span>
                        </li>`

    showInScreen = undefined

}

setInterval( ()=>{
    if(showInScreen != undefined){
        pushInScreen(showInScreen)
        console.log(showInScreen)
    }
} , 200);
