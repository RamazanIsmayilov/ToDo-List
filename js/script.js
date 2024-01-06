// const firstCardBody = document.querySelectorAll(".card-body")[0];
// const secondCardBody = document.querySelectorAll(".card-body")[1];
const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');
const customAlert = document.querySelector('.custom-alert');
const alertMessage = document.querySelector('.alertMessage');

// * Dark - Light mode
const mode = document.querySelector('#mode');
const modeBtn = document.querySelector('.modebtn');

const changeMode = () => {
    if(mode.className == "light"){
        mode.className = "dark";
    }else{
        mode.className = 'light';
    }
}
modeBtn.onclick = changeMode;


// * Add todo
const todoAdd = (e) =>{
    e.preventDefault();
    const newtodo = input.value;
    if(input.value === ""){
        showAlert("Please enter todo!", "red");
    }else{
        showAlert("Todo added successfully!", "green");
        addTodoUI(newtodo);
        addTodoStorage(newtodo);
    }
}
form.onsubmit = todoAdd;

// * Add todoUI
const addTodoUI = () => {
    const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between";
        li.textContent = input.value;
        const a = document.createElement("a");
        a.href = "#";
        a.className = "delete-item";
        const i = document.createElement("li");
        i.className = "fa-solid fa-trash-can";
    
        a.appendChild(i);
        li.appendChild(a);
        ul.appendChild(li);
        input.value = "";
}

// * Notification message
const showAlert = (message, color) => {
    alertMessage.textContent = message;
    customAlert.style.backgroundColor = color;
    customAlert.style.display = 'block';
    
    setTimeout(() => {
        customAlert.style.display = 'none';
    }, 1500);
}































// * AddTodoStorage
const getTodosFromStorage = () => {
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

const addTodoStorage = (newtodo) => {
    let todos = getTodosFromStorage();
    todos.push(newtodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
