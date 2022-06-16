const list = document.querySelector("#list")

const addButton = document.querySelector("#add")

const removeButton = document.querySelector("#remove")

const SVGchecked = "images/checked.svg"

const SVGcheck = "images/check.svg"

var tasks = []


addButton.addEventListener("click", createInput)

removeButton.addEventListener("click", remove)


function createInput(){

    let input = document.createElement("input")

    input.setAttribute("type","text")

    input.setAttribute("onfocusout", "addTask(event)")

    list.prepend(input)

}

function addTask(e){
    let data = e.target.value
    
    if(data != ""){
        list.innerHTML = ""

        tasks.push({data: data, state: 'check'})


        tasks.forEach((task)=>{
            list.innerHTML += `<li>
            
                                <ion-icon name="trash-outline" class="delete" ></ion-icon>

                                <img src="images/check.svg" class="check" onclick="checked(event)"></img>

                                <span>${task.data}</span>
                            </li>`
        })
    }
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

        let text = trash.parentElement.children[2].innerHTML

        tasks.forEach( task =>{
            if (task.data == text){
                tasks.splice(tasks.indexOf(task),1)
            }
        })
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
