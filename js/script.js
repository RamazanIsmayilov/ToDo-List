const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');
const filter = document.querySelector('.filter');
const clearButton = document.querySelector('.clearbtn');
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
    const newtodo = input.value;
    if(input.value === ""){
        showAlert("Please enter todo!", "red");
    }else{
        showAlert("Todo added successfully!", "green");
        addTodoUI(newtodo);
        addTodoStorage(newtodo);
    }
    e.preventDefault();
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

// * DeleteTodoUI
const  deleteTodoUI = (e) => {
    if(e.target.className === "fa-solid fa-trash-can"){
        e.target.parentElement.parentElement.remove();
        deleteTodoStorage(e.target.parentElement.parentElement.textContent)
        showAlert("Todo was successfully deleted!", "green");
    }
}
secondCardBody.onclick = deleteTodoUI;

// * DeleteTodoStorage
const deleteTodoStorage = (deletetodo) =>{
    let todos = getTodosFromStorage();

    todos.forEach(function(todo, index){
        if(todo === deletetodo){
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}


// * FilterTodo
const filterTodos = (e) =>{
    const filterValue = e.target.value.toLowerCase();
    const li = document.querySelectorAll('.list-group-item')

    li.forEach(function(li){
        const text = li.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1){
            li.setAttribute('style', "display: none !important");
        }else{
            li.setAttribute('style', "display: block");
        }
    });
}
filter.addEventListener("keyup", filterTodos);


// * AllTodosClear
const allTodosClear = () =>{
    if(confirm("Are you sure you have deleted all ToDo's ?")){
        while(ul.firstElementChild != null){
            ul.removeChild(ul.firstElementChild);
        }
        localStorage.removeItem('todos');
        showAlert("All Todo's was successfully deleted!", "green");
    }else{
        showAlert("Todos could not be deleted!", "red");

    }
}
clearButton.onclick = allTodosClear;


