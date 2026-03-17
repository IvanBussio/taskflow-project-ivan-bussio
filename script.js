let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

const taskList = document.getElementById("taskList");
const stats = document.getElementById("stats");
const progressBar = document.getElementById("progressBar");

// GUARDAR
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// RENDER
function renderTasks() {
  taskList.innerHTML = "";

  let filtered = tasks.filter(t => {
    if (filter === "pending") return !t.done;
    if (filter === "completed") return t.done;
    return true;
  });

  const search = document.getElementById("search").value.toLowerCase();

  filtered = filtered.filter(t => t.text.toLowerCase().includes(search));

  filtered.forEach((task, index) => {
    const div = document.createElement("div");
    div.className = "task";

    div.innerHTML = `
      <span style="${task.done ? 'text-decoration:line-through;opacity:.6' : ''}">
        ${task.text}
      </span>
      <div class="flex gap-2">
        <button onclick="toggleTask(${index})">✔</button>
        <button onclick="deleteTask(${index})">🗑</button>
      </div>
    `;

    taskList.appendChild(div);
  });

  updateStats();
}

// AÑADIR
function addTask() {
  const input = document.getElementById("taskInput");

  if (input.value.trim() === "") return;

  tasks.push({ text: input.value, done: false });
  input.value = "";

  saveTasks();
  renderTasks();
}

// TOGGLE
function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

// BORRAR
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// COMPLETAR TODAS
function completeAll() {
  tasks.forEach(t => t.done = true);
  saveTasks();
  renderTasks();
}

// BORRAR COMPLETADAS
function deleteCompleted() {
  tasks = tasks.filter(t => !t.done);
  saveTasks();
  renderTasks();
}

// FILTRO
function setFilter(f) {
  filter = f;
  renderTasks();
}

// ORDENAR
function sortTasks() {
  tasks.sort((a, b) => a.done - b.done);
  renderTasks();
}

// STATS + PROGRESO
function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.done).length;

  stats.innerText = `${completed} de ${total} completadas`;

  const percent = total ? (completed / total) * 100 : 0;
  progressBar.style.width = percent + "%";
}

// MODAL
function openWelcome() {
  document.getElementById("welcomeModal").classList.remove("hidden");
}

function closeWelcome() {
  document.getElementById("welcomeModal").classList.add("hidden");
}

// MODO OSCURO
document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
};

// BUSCADOR
document.getElementById("search").addEventListener("input", renderTasks);

// INIT
renderTasks();