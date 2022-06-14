const list = document.querySelector("#list")

const addButton = document.querySelector("#add")

const removeButton = document.querySelector("#remove")

var tasks = []

addButton.addEventListener("click", createTask)

removeButton.addEventListener("click", removeTask)


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
        list.innerHTML += `<li>${task.data}</li>`
    }
}

function removeTask(){
    for(let task of list.children){
        task.classList = ""
    }
}
