import { getTasks, createTask, deleteTask } from "./js/api.js";

let tasks = [];

async function loadTasks() {
  tasks = await getTasks();
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(task => {
    const div = document.createElement("div");
    div.className = "task";

    div.innerHTML = `
      <span>${task.titulo}</span>
      <button onclick="removeTask(${task.id})">❌</button>
    `;

    list.appendChild(div);
  });

  document.getElementById("taskCount").innerText =
    `${tasks.length} tareas`;

  const progress = document.getElementById("progressBar");
  progress.style.width = tasks.length > 0 ? "100%" : "0%";
}

window.addTask = async function () {
  const input = document.getElementById("taskInput");

  if (!input.value.trim()) return;

  await createTask(input.value);

  input.value = "";
  loadTasks();
};

window.removeTask = async function (id) {
  await deleteTask(id);
  loadTasks();
};

loadTasks();