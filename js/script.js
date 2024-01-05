const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');
const customAlert = document.querySelector('.custom-alert');
const alertMessage = document.querySelector('.alertMessage');


const showAlert = (message, color) => {
    alertMessage.textContent = message;
    customAlert.style.backgroundColor = color;
    customAlert.style.display = 'block';
    
    setTimeout(() => {
        customAlert.style.display = 'none';
    }, 3000);
}

const todoAdd = (e) =>{
    e.preventDefault();
    if(input.value === ""){
        showAlert("Please enter todo!", '#f44336');
    }else{
        showAlert("Correct!", '#4CAF50')
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
}

form.onsubmit = todoAdd;