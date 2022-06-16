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

        tasks.push({data: data, state: null})


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
    let click = document.querySelectorAll(".delete")
    click.forEach(e => {
        let element = e.parentElement
        let icon = element.children[0]
        let check = document.querySelector(".check").style.display

        if(icon.style.display == "block"){
            document.querySelector(".check").style = "display: block;"
            icon.style.display = ""
        }else{
            document.querySelector(".check").style = "display: none;"
            icon.style = "display: block; height: 30px; width: 30px;"

            let trashs = document.querySelectorAll(".delete")
            trashs = [...trashs]
        
            trashs.forEach((e)=>{
                let icon = e
                icon.addEventListener("click",()=>{
                    removeTask(icon)}
                )
            })
        }
    }); 

}

function removeTask(icon){
    let element = icon.parentElement

    element.style = "display: none;"

    tasks.forEach((task)=>{

        if( task.data == element.children[2].innerHTML){
            tasks.splice(element)
        }
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
    let taskState = SVG.src

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
