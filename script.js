let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

function save(){
localStorage.setItem("tasks",JSON.stringify(tasks));
}

/* añadir */

function addTask(){

const input=document.getElementById("taskInput");
const title=input.value.trim();

if(!title) return;

tasks.push({
id:Date.now(),
title:title,
completed:false
});

input.value="";

save();
render();

}

/* render */

function render(){

const list=document.getElementById("taskList");
list.innerHTML="";

let filtered=[...tasks];

if(filter==="completed") filtered=tasks.filter(t=>t.completed);
if(filter==="pending") filtered=tasks.filter(t=>!t.completed);

const search=document.getElementById("search").value?.toLowerCase() || "";

filtered=filtered.filter(t=>t.title.toLowerCase().includes(search));

filtered.forEach(task=>{

const div=document.createElement("div");
div.className="task";

const text=document.createElement("span");
text.textContent=task.title;

if(task.completed){
text.style.textDecoration="line-through";
text.style.opacity=".6";
}

const actions=document.createElement("div");
actions.className="flex gap-2";

const done=document.createElement("button");
done.textContent="✔";
done.className="btn";

done.onclick=()=>{
task.completed=!task.completed;
save();
render();
};

const edit=document.createElement("button");
edit.textContent="✏";
edit.className="btn";

edit.onclick=()=>{
const newTitle=prompt("Editar tarea",task.title);
if(newTitle){
task.title=newTitle;
save();
render();
}
};

const del=document.createElement("button");
del.textContent="🗑";
del.className="btn";

del.onclick=()=>{
tasks=tasks.filter(t=>t.id!==task.id);
save();
render();
};

actions.append(done,edit,del);
div.append(text,actions);
list.appendChild(div);

});

updateStats();

}

/* estadísticas */

function updateStats(){

const total=tasks.length;
const completed=tasks.filter(t=>t.completed).length;

document.getElementById("stats").textContent=
`Completadas ${completed} de ${total}`;

const percent=total?completed/total*100:0;

document.getElementById("progressBar").style.width=percent+"%";

}

/* filtros */

function setFilter(type){
filter=type;
render();
}

/* buscar */

document.getElementById("search").addEventListener("input",render);

/* ordenar */

function sortTasks(){
tasks.sort((a,b)=>a.title.localeCompare(b.title));
save();
render();
}

/* completar todas */

function completeAll(){
tasks.forEach(t=>t.completed=true);
save();
render();
}

/* borrar completadas */

function deleteCompleted(){
tasks=tasks.filter(t=>!t.completed);
save();
render();
}

/* modo oscuro */

const toggle=document.getElementById("themeToggle");

toggle.onclick=()=>{

document.body.classList.toggle("dark");
document.body.classList.toggle("light");

toggle.textContent=document.body.classList.contains("dark")?"☀":"🌙";

};

/* modal */

function openWelcome(){
document.getElementById("welcomeModal").classList.remove("hidden");
}

function closeWelcome(){
document.getElementById("welcomeModal").classList.add("hidden");
}

render();