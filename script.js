const list = document.querySelector("#list")

const addButton = document.querySelector("#add")

const removeButton = document.querySelector("#remove")

const SVGchecked = "images/checked.svg"

const SVGcheck = "images/check.svg"


var tasks = []

addButton.addEventListener("click", createTask)

removeButton.addEventListener("click", remove)


function createTask(){

    let input = document.createElement("input")
    input.setAttribute("type","text")
    input.setAttribute("onfocusout", "addTask(event)")

    list.appendChild(input)

}

function addTask(e){
    let data = e.target.value
    tasks.push({data: data})

    list.innerHTML = ""
    for(let task of tasks){
        list.innerHTML += `<li>
        
                            <ion-icon name="trash-outline" class="delete" ></ion-icon>

                            <img src="images/check.svg" class="check" onclick="checked(event)"></img>

                            <span>${task.data}</span>
                          </li>`
    }
}

function remove(){
    document.querySelectorAll(".delete").forEach(e => {
        let element = e.parentElement
        let icon = element.children[0]

        if(icon.style.display == "block"){
            icon.style.display = ""
        }else{
            icon.style.display = "block"

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

    tasks.forEach((task)=>{
        if( task.data == element.children[1].innerHTML){
            tasks.splice(element)
        }
    })
    element.style = "display: none"
}

function checked(e){

    changeCheckbox(e)
    
}

function changeCheckbox(e){

    let SVG = e.target
    if(SVG.src.indexOf(SVGcheck) != -1){
        SVG.src = SVGchecked
        strikethroughText(SVG)
    }else if(SVG.src.indexOf(SVGchecked) != -1){
        SVG.src = SVGcheck
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
