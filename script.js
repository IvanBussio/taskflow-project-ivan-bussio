let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let categories = JSON.parse(localStorage.getItem("categories")) || [];

function save(){
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("categories", JSON.stringify(categories));
}

/* 🧠 IA MEJORADA */
function suggestCategory(text){
  const base = ["Trabajo","Personal","Compras","Gym","Estudio","Salud"];

  return [...new Set([...base, ...categories])]
    .filter(cat => cat.toLowerCase().includes(text.toLowerCase()));
}

function renderSuggestions(){
  const input = document.getElementById("categoryInput").value;
  const box = document.getElementById("suggestions");
  box.innerHTML = "";

  if(!input) return;

  suggestCategory(input).forEach(cat=>{
    const div = document.createElement("div");
    div.innerText = cat;
    div.className = "cursor-pointer text-sm";
    div.onclick = ()=> {
      document.getElementById("categoryInput").value = cat;
      box.innerHTML = "";
    };
    box.appendChild(div);
  });
}

document.getElementById("categoryInput")
.addEventListener("input", renderSuggestions);

/* tareas */
function renderTasks(){
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const div = document.createElement("div");
    div.className = "task";

    div.innerHTML = `
      <div>
        <span>${task.text}</span>
        <div class="chip">${task.category}</div>
      </div>
      <button onclick="deleteTask(${index})">❌</button>
    `;

    list.appendChild(div);
  });
}

function addTask(){
  const text = document.getElementById("taskInput").value;
  const category = document.getElementById("categoryInput").value;

  if(!text.trim()) return;

  tasks.push({ text, category });

  if(category && !categories.includes(category)){
    categories.push(category);
  }

  document.getElementById("taskInput").value = "";
  document.getElementById("categoryInput").value = "";

  save();
  renderTasks();
}

function deleteTask(i){
  tasks.splice(i,1);
  save();
  renderTasks();
}

function sortTasks(){
  tasks.sort((a,b)=> a.text.localeCompare(b.text));
  save();
  renderTasks();
}

/* tema */
function toggleTheme(){
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
}

/* modal */
function openInfo(){
  document.getElementById("infoModal").classList.remove("hidden");
}

function closeInfo(e){
  if(!e || e.target.id === "infoModal"){
    document.getElementById("infoModal").classList.add("hidden");
  }
}

/* ✏️ FONDO LÁPIZ REAL */
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let lines = [];

for(let i=0;i<30;i++){
  lines.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    length:Math.random()*200,
    speed:0.5+Math.random()
  });
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  ctx.strokeStyle="rgba(0,0,0,0.1)";
  ctx.lineWidth=1;

  lines.forEach(l=>{
    ctx.beginPath();
    ctx.moveTo(l.x,l.y);
    ctx.lineTo(l.x+l.length,l.y);
    ctx.stroke();

    l.y += l.speed;
    if(l.y > canvas.height) l.y = 0;
  });

  requestAnimationFrame(draw);
}

draw();

renderTasks();