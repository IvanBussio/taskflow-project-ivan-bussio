const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");
const sortBtn = document.getElementById("sortBtn");
const themeBtn = document.getElementById("themeBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// IA simple
function detectCategory(text) {
  text = text.toLowerCase();
  if (text.includes("comprar")) return "Compras";
  if (text.includes("gym") || text.includes("entreno")) return "Entreno";
  if (text.includes("estudiar")) return "Estudio";
  return "General";
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const search = searchInput.value.toLowerCase();
  taskList.innerHTML = "";

  tasks
    .filter(t => t.text.toLowerCase().includes(search))
    .forEach(task => {

      const div = document.createElement("div");

      div.className = `
        flex items-center justify-between px-4 py-3 rounded-xl transition
        ${task.completed ? "opacity-50 line-through" : "hover:bg-gray-200 dark:hover:bg-gray-700"}
      `;

      div.innerHTML = `
        <div class="flex items-center gap-3">
          <button class="checkBtn w-6 h-6 flex items-center justify-center rounded-full border 
          ${task.completed ? "bg-gray-400 border-gray-400" : "border-gray-400"}">
            ${task.completed ? "✓" : ""}
          </button>

          <span class="text-gray-800 dark:text-white text-base md:text-lg">
            ${task.text}
          </span>

          <span class="text-xs px-2 py-1 rounded bg-blue-200 text-blue-800">
            ${task.category}
          </span>
        </div>

        <div class="flex gap-2">
          <button class="editBtn">✏️</button>
          <button class="deleteBtn text-red-500">✕</button>
        </div>
      `;

      div.querySelector(".checkBtn").onclick = () => {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
      };

      div.querySelector(".deleteBtn").onclick = () => {
        tasks = tasks.filter(t => t.id !== task.id);
        saveTasks();
        renderTasks();
      };

      div.querySelector(".editBtn").onclick = () => {
        const nuevo = prompt("Editar tarea:", task.text);
        if (nuevo) {
          task.text = nuevo;
          saveTasks();
          renderTasks();
        }
      };

      taskList.appendChild(div);
    });
}

function addTask() {
  if (!taskInput.value.trim()) return;

  tasks.push({
    id: Date.now(),
    text: taskInput.value,
    completed: false,
    category: detectCategory(taskInput.value)
  });

  taskInput.value = "";
  saveTasks();
  renderTasks();
}

function clearCompleted() {
  tasks = tasks.filter(t => !t.completed);
  saveTasks();
  renderTasks();
}

function showInfo() {
  alert("TaskFlow con categorías inteligentes 🚀");
}

sortBtn.onclick = () => {
  tasks.sort((a, b) => a.text.localeCompare(b.text));
  renderTasks();
};

searchInput.oninput = renderTasks;

themeBtn.onclick = () => {
  document.documentElement.classList.toggle("dark");
};

addBtn.onclick = addTask;

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

renderTasks();