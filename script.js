let tasks = [];
let currentFilter = "all";

/* ============================= */
/* LOCAL STORAGE */
/* ============================= */

function saveTasks(){
localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks(){

const saved = localStorage.getItem("tasks");

if(saved){
tasks = JSON.parse(saved);
}

}

/* ============================= */
/* INICIAR */
/* ============================= */

loadTasks();

/* ============================= */
/* CREAR TAREA */
/* ============================= */

function addTask(){

const title = document.getElementById("taskTitle").value.trim();

if(title === "") return;

tasks.push({
title: title,
completed: false
});

document.getElementById("taskTitle").value = "";

saveTasks();
renderTasks();

}

/* ============================= */
/* RENDERIZAR */
/* ============================= */

function renderTasks(){

const list = document.getElementById("taskList");
list.innerHTML = "";

let filtered = [...tasks];

if(currentFilter === "completed"){
filtered = filtered.filter(t => t.completed);
}

if(currentFilter === "pending"){
filtered = filtered.filter(t => !t.completed);
}

const search = document.getElementById("searchTask").value.toLowerCase();

filtered = filtered.filter(t =>
t.title.toLowerCase().includes(search)
);

filtered.forEach((task,index)=>{

const div = document.createElement("div");
div.className = "task";

const text = document.createElement("span");
text.textContent = task.title;

if(task.completed){
text.classList.add("completed");
}

/* BOTONES */

const actions = document.createElement("div");

/* COMPLETAR */

const completeBtn = document.createElement("button");

completeBtn.textContent = task.completed ? "↩" : "✔";

completeBtn.style.background = task.completed ? "#6b7280" : "#22c55e";

completeBtn.onclick = () => {

task.completed = !task.completed;

saveTasks();
renderTasks();

};

/* EDITAR */

const editBtn = document.createElement("button");

editBtn.textContent = "✏️";
editBtn.style.background = "#eab308";

editBtn.onclick = () => {

const newText = prompt("Editar tarea:", task.title);

if(newText){

task.title = newText;

saveTasks();
renderTasks();

}

};

/* ELIMINAR */

const deleteBtn = document.createElement("button");

deleteBtn.textContent = "🗑";
deleteBtn.style.background = "#ef4444";

deleteBtn.onclick = () => {

tasks.splice(index,1);

saveTasks();
renderTasks();

};

actions.appendChild(completeBtn);
actions.appendChild(editBtn);
actions.appendChild(deleteBtn);

div.appendChild(text);
div.appendChild(actions);

list.appendChild(div);

});

}

/* ============================= */
/* BUSCAR */
/* ============================= */

document.getElementById("searchTask").addEventListener("input",renderTasks);

/* ============================= */
/* FILTROS */
/* ============================= */

function filterTasks(type,btn){

currentFilter = type;

document.querySelectorAll(".filters button").forEach(b =>
b.classList.remove("active")
);

btn.classList.add("active");

renderTasks();

}

/* ============================= */
/* ORDENAR */
/* ============================= */

function sortTasks(){

tasks.sort((a,b)=>
a.title.localeCompare(b.title)
);

renderTasks();

}

/* ============================= */
/* TEMA OSCURO / CLARO */
/* ============================= */

const toggle = document.getElementById("themeToggle");

toggle.onclick = () => {

const body = document.body;

if(body.classList.contains("light")){

body.classList.remove("light");
body.classList.add("dark");

toggle.textContent = "☀️";

}
else{

body.classList.remove("dark");
body.classList.add("light");

toggle.textContent = "🌙";

}

};

/* ============================= */
/* CARGAR TAREAS AL INICIAR */
/* ============================= */

renderTasks();