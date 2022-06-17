const list = document.querySelector("#list")

const addButton = document.querySelector("#add")

const removeButton = document.querySelector("#remove")

const SVGchecked = "images/checked.svg"

const SVGcheck = "images/check.svg"

var tasks = []

var sendTask
var sendTrash

addButton.addEventListener("click", createInput)

removeButton.addEventListener("click", remove)


function createInput(){

    let input = document.createElement("input")

    input.setAttribute("type","text")

    input.setAttribute("onfocusout", "activeTask(event)")

    list.prepend(input)

}

function activeTask(e){

    sendTask = e.target.value

}

function remove(){

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

        sendTrash = trash.parentElement.children[2].innerHTML

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

function setState(SVG){
    
    let taskData = SVG.parentElement.children[2].innerHTML


    tasks.forEach(task =>{
        if(taskData == task.data){
            if(SVG.src.indexOf(SVGcheck) != -1){
                task.state = "check"
            }else if(SVG.src.indexOf(SVGchecked) != -1){
                task.state = "checked"
            }    
        }
    })
     
}

function strikethroughText(SVG){

    let text = SVG.parentElement.children[2]

    if(SVG.src.indexOf(SVGchecked) != -1){
        text.style = "text-decoration: line-through" 
    }else if(SVG.src.indexOf(SVGcheck) != -1){
        text.style = "text-decoration: none" 
    }

}
