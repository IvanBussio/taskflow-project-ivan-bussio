function addTask() {

const input = document.getElementById("taskInput");
const taskText = input.value;

if(taskText === "") return;

const list = document.getElementById("taskList");

const li = document.createElement("li");

li.className = "bg-gray-800 p-3 rounded-lg flex justify-between";

li.innerHTML = `
<span>${taskText}</span>
<button onclick="this.parentElement.remove()" class="text-red-400">✕</button>
`;

list.appendChild(li);

input.value = "";

}