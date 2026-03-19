let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function save(){
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(){
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const div = document.createElement("div");
    div.className = "task";

    div.innerHTML = `
      <span>${task}</span>
      <button onclick="deleteTask(${index})">❌</button>
    `;

    list.appendChild(div);
  });

  document.getElementById("taskCount").innerText =
    tasks.length + " tareas";

  document.getElementById("progressBar").style.width =
    tasks.length > 0 ? "100%" : "0%";
}

function addTask(){
  const input = document.getElementById("taskInput");

  if(!input.value.trim()) return;

  tasks.push(input.value);
  input.value = "";

  save();
  renderTasks();
}

function deleteTask(index){
  tasks.splice(index,1);
  save();
  renderTasks();
}

/* 🔥 ORDEN ALFABÉTICO */
function sortTasks(){
  tasks.sort((a,b)=> a.localeCompare(b));
  save();
  renderTasks();
}

/* tema */
function toggleTheme(){
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
}

/* modal */
function openWelcome(){
  document.getElementById("welcomeModal").classList.remove("hidden");
}

function closeWelcome(){
  document.getElementById("welcomeModal").classList.add("hidden");
}

/* primera vez */
if(!localStorage.getItem("visited")){
  openWelcome();
  localStorage.setItem("visited",true);
}

renderTasks();