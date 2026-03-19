/* =========================
   STORAGE
========================= */

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let categories = JSON.parse(localStorage.getItem("categories")) || [];

function save(){
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("categories", JSON.stringify(categories));
}

/* =========================
   IA CATEGORÍAS (REAL)
========================= */

function smartCategory(text){
  text = text.toLowerCase();

  if(text.includes("gym") || text.includes("entren")) return "Gym";
  if(text.includes("comprar") || text.includes("super")) return "Compras";
  if(text.includes("estudiar") || text.includes("curso")) return "Estudio";
  if(text.includes("trabajo") || text.includes("proyecto")) return "Trabajo";
  if(text.includes("medico") || text.includes("salud")) return "Salud";

  return null;
}

function suggestCategory(input){
  const base = ["Trabajo","Personal","Compras","Gym","Estudio","Salud"];

  return [...new Set([
    ...categories,
    ...base
  ])].filter(cat =>
    cat.toLowerCase().includes(input.toLowerCase())
  );
}

function renderSuggestions(){
  const input = document.getElementById("categoryInput").value;
  const taskText = document.getElementById("taskInput").value;
  const box = document.getElementById("suggestions");

  box.innerHTML = "";

  let suggestions = suggestCategory(input);

  /* IA automática */
  if(!input && taskText){
    const auto = smartCategory(taskText);
    if(auto) suggestions.unshift(auto);
  }

  suggestions.slice(0,5).forEach(cat=>{
    const div = document.createElement("div");
    div.innerText = cat;
    div.className = "cursor-pointer text-sm";
    div.onclick = ()=>{
      document.getElementById("categoryInput").value = cat;
      box.innerHTML="";
    };
    box.appendChild(div);
  });
}

document.getElementById("categoryInput")
.addEventListener("input", renderSuggestions);

document.getElementById("taskInput")
.addEventListener("input", renderSuggestions);

/* =========================
   RENDER TAREAS
========================= */

function renderTasks(){
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, i)=>{
    const div = document.createElement("div");
    div.className = "task";

    if(task.completed){
      div.classList.add("completed");
    }

    div.innerHTML = `
      <div class="flex items-center gap-2">
        <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleComplete(${i})">
        <span>${task.text}</span>
        <div class="chip">${task.category || "Personal"}</div>
      </div>

      <div class="flex gap-2">
        <button onclick="editTask(${i})">✏️</button>
        <button onclick="deleteTask(${i})">❌</button>
      </div>
    `;

    list.appendChild(div);
  });
}

/* =========================
   ACCIONES
========================= */

function addTask(){
  const text = document.getElementById("taskInput").value;
  let category = document.getElementById("categoryInput").value;

  if(!text.trim()) return;

  /* IA AUTO */
  if(!category){
    category = smartCategory(text) || "Personal";
  }

  tasks.push({
    text,
    category,
    completed:false
  });

  if(!categories.includes(category)){
    categories.push(category);
  }

  document.getElementById("taskInput").value="";
  document.getElementById("categoryInput").value="";

  save();
  renderTasks();
}

function deleteTask(i){
  tasks.splice(i,1);
  save();
  renderTasks();
}

function toggleComplete(i){
  tasks[i].completed = !tasks[i].completed;
  save();
  renderTasks();
}

function editTask(i){
  const nuevo = prompt("Editar tarea:", tasks[i].text);

  if(nuevo && nuevo.trim()){
    tasks[i].text = nuevo;
    save();
    renderTasks();
  }
}

function sortTasks(){
  tasks.sort((a,b)=> a.text.localeCompare(b.text));
  save();
  renderTasks();
}

/* =========================
   UI
========================= */

function toggleTheme(){
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
}

/* modal info */
function openInfo(){
  document.getElementById("infoModal").classList.remove("hidden");
}

function closeInfo(e){
  if(!e || e.target.id === "infoModal"){
    document.getElementById("infoModal").classList.add("hidden");
  }
}

/* =========================
   FONDO LÁPIZ VERTICAL
========================= */

const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let lines = [];

for(let i=0;i<50;i++){
  lines.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    length:100+Math.random()*200,
    speed:0.5+Math.random()
  });
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  ctx.strokeStyle="rgba(0,0,0,0.07)";
  ctx.lineWidth=1;

  lines.forEach(l=>{
    ctx.beginPath();
    ctx.moveTo(l.x,l.y);
    ctx.lineTo(l.x,l.y+l.length);
    ctx.stroke();

    l.y += l.speed;

    if(l.y > canvas.height){
      l.y = -l.length;
      l.x = Math.random()*canvas.width;
    }
  });

  requestAnimationFrame(draw);
}

draw();

/* =========================
   INIT
========================= */

renderTasks();