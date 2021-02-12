const checklistForm = document.querySelector(".js-checklist"),
    checklistinput = checklistForm.querySelector("input"),
    toDolist = document.querySelector(".js-toDolist"),
    complist = document.querySelector(".js-complist");

let COMPL = [];

function completeList(event) {
    const li = event.target.parentNode;
    const text = li.querySelector("span").innerText;

    addComLi(text);

    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id); //해당 이벤트가 일어난 요소를 제외한것만 리턴되어야한다.
    })
    toDos = cleanToDos;
    saveTodo()

    toDolist.removeChild(li);
    saveComplist();
}

function addComLi(text) {
    const addLi = document.createElement("li");
    const delBtn = document.createElement("button");
    const comLiid = COMPL.length + 1;

    addLi.id = comLiid;

    addLi.innerText = text;
    delBtn.innerHTML = "❌"
    delBtn.addEventListener("click",deleteComlist)

    complist.appendChild(addLi);
    addLi.appendChild(delBtn);

    const complObj = {
        id : comLiid,
        text : text
    }; 
    COMPL.push(complObj);
}

function deleteComlist(event) {
    const li = event.target.parentNode;
    complist.removeChild(li);

    const cleanComli = COMPL.filter(function(comli) {
        return comli.id !== parseInt(li.id); //해당 이벤트가 일어난 요소를 제외한것만 리턴되어야한다.
    })
    COMPL = cleanComli;
    saveComplist()
}

function deleteList(event) {
    const li = event.target.parentNode;
    toDolist.removeChild(li);
 
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id); //해당 이벤트가 일어난 요소를 제외한것만 리턴되어야한다.
    })
    toDos = cleanToDos;
    saveTodo()
}

let toDos = [];

function addLi(text) {
    const addLi = document.createElement("li");
    const delBtn = document.createElement("button");
    const okBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length +1;

    addLi.id = newId;

    okBtn.innerHTML = "🟢";
    delBtn.innerHTML = "❌";
    span.innerText = text;
    delBtn.addEventListener("click", deleteList)
    okBtn.addEventListener("click", completeList)

    addLi.appendChild(span);
    addLi.appendChild(okBtn);
    addLi.appendChild(delBtn);
    toDolist.appendChild(addLi);

    const toDoObj = {
        id : newId,
        text : text
    }; 
    toDos.push(toDoObj)
    saveTodo()
}

function saveTodo() {
    localStorage.setItem("toDo",JSON.stringify(toDos));
}

function saveComplist() {
    localStorage.setItem("complete",JSON.stringify(COMPL));
}

function loadTodo() {
    const loadedTodo = localStorage.getItem("toDo");
    if (loadedTodo === null) {
        console.log("nothing");
    } else {
        const parseTodo = JSON.parse(loadedTodo);
        parseTodo.forEach(function(toDo) {
            addLi(toDo.text);
        })
    }
}

function loadcompl() {
    const loadedcompl = localStorage.getItem("complete");
    if (loadedcompl === null) {
        console.log("nothing");
    } else {
        const parseTodo = JSON.parse(loadedcompl);
        parseTodo.forEach(function(COMPL) {
            addComLi(COMPL.text);
        })
    }
}

function handleSubmit(event) {
    event.preventDefault();
    const toDo = checklistinput.value;
    addLi(toDo);
    checklistinput.value = "";
}

function init() {
    loadTodo();
    loadcompl();
    checklistForm.addEventListener("submit", handleSubmit)
}

init();