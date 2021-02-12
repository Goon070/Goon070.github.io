const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greeting");


function fillName(text) {
    form.classList.remove("showing") // form에 block되어있던걸 풀고 greeting으로 넘어가면서 텍스트를 넣게된다.
    greeting.classList.add("showing");
    greeting.innerText = `Hello ${text}`;
}

function saveName(name) {
    localStorage.setItem("name", name)
}

function handleSubmit(event) {
    event.preventDefault();
    const currentUser = input.value;
    fillName(currentUser);
    saveName(currentUser);
}

function askName() {
    form.classList.add("showing");
    form.addEventListener("submit", handleSubmit)
} // showing 이 class에 들어가면 block 되면서 form에 적용시켰던 display none 이 사라진다.

function loadName() {
    const loadedName = localStorage.getItem("name")
    if (loadedName === null) {
        askName();
    } else {
        fillName(loadedName);
    }
}

function init() {
    loadName();
}

init();