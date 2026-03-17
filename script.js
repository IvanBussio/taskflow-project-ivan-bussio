<script>
let categorias = [];
let categoriasSeleccionadas = [];
let tareas = [];

// 🔒 BACKUP antes de guardar
function backup() {
  const backupData = {
    categorias,
    tareas,
    fecha: new Date().toISOString()
  };
  localStorage.setItem("backup_taskflow", JSON.stringify(backupData));
}

// 🔧 Normalizar (soporta TODO)
function normalizarCategorias(cats) {
  return cats.map(cat => {
    if (typeof cat === "string") return { nombre: cat };
    if (cat && cat.nombre) return cat;
    return null;
  }).filter(Boolean);
}

function getNombre(cat) {
  return typeof cat === "object" ? cat.nombre : cat;
}

// 📦 Cargar datos (con recuperación automática)
function cargarDatos() {
  try {
    const cats = JSON.parse(localStorage.getItem("categorias")) || [];
    const tasks = JSON.parse(localStorage.getItem("tareas")) || [];

    categorias = normalizarCategorias(cats);
    tareas = tasks;

    // ⚠️ Si está vacío, intenta recuperar backup
    if (categorias.length === 0 && tareas.length === 0) {
      const backupData = JSON.parse(localStorage.getItem("backup_taskflow"));
      if (backupData) {
        categorias = normalizarCategorias(backupData.categorias || []);
        tareas = backupData.tareas || [];
        console.log("🔄 Datos recuperados del backup");
      }
    }

  } catch (e) {
    console.error("Error cargando datos:", e);
  }

  renderCategorias();
  renderTareas();
}

// 💾 Guardar seguro
function guardar() {
  backup(); // 👈 guarda copia antes

  localStorage.setItem("categorias", JSON.stringify(categorias));
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

// ➕ Categoría
function agregarCategoria() {
  const input = document.getElementById("inputCategoria");
  const nombre = input.value.trim();

  if (!nombre) return;

  if (categorias.some(c => getNombre(c) === nombre)) return;

  categorias.push({ nombre });
  input.value = "";

  guardar();
  renderCategorias();
}

// 🟠 Render categorías
function renderCategorias() {
  const select = document.getElementById("selectCategorias");
  select.innerHTML = `<option value="">Seleccionar categoría</option>`;

  categorias.forEach(cat => {
    const option = document.createElement("option");
    option.value = getNombre(cat);
    option.textContent = getNombre(cat);
    select.appendChild(option);
  });
}

// 🟠 Selección
document.getElementById("selectCategorias").addEventListener("change", (e) => {
  const value = e.target.value;
  if (!value) return;

  if (!categoriasSeleccionadas.includes(value)) {
    categoriasSeleccionadas.push(value);
    renderChips();
  }
});

// 🟠 Chips
function renderChips() {
  const container = document.getElementById("chips");
  container.innerHTML = "";

  categoriasSeleccionadas.forEach(cat => {
    const chip = document.createElement("div");
    chip.className = "bg-orange-500 text-white px-3 py-1 rounded-lg flex items-center gap-2";
    chip.innerHTML = `${cat} <button onclick="eliminarChip('${cat}')">✕</button>`;
    container.appendChild(chip);
  });
}

function eliminarChip(cat) {
  categoriasSeleccionadas = categoriasSeleccionadas.filter(c => c !== cat);
  renderChips();
}

// 🧹 Borrar
function borrarTodo() {
  categoriasSeleccionadas = [];
  renderChips();
}

// ✅ Tarea
function agregarTarea() {
  const input = document.getElementById("inputTarea");
  const texto = input.value.trim();

  if (!texto) return;

  tareas.push({
    texto,
    categorias: [...categoriasSeleccionadas],
    completada: false
  });

  input.value = "";
  categoriasSeleccionadas = [];

  guardar();
  renderChips();
  renderTareas();
}

// ✔️ Toggle
function toggleTarea(index) {
  tareas[index].completada = !tareas[index].completada;
  guardar();
  renderTareas();
}

// 📋 Render tareas
function renderTareas() {
  const lista = document.getElementById("listaTareas");
  lista.innerHTML = "";

  tareas.forEach((t, i) => {
    const div = document.createElement("div");
    div.className = "bg-white p-3 rounded-lg shadow flex justify-between items-center";

    div.innerHTML = `
      <div>
        <p class="${t.completada ? 'line-through text-gray-400' : ''}">
          ${t.texto}
        </p>
        <div class="flex gap-1 mt-1 flex-wrap">
          ${t.categorias.map(c => `<span class="text-xs bg-gray-200 px-2 rounded">${c}</span>`).join("")}
        </div>
      </div>
      <input type="checkbox" ${t.completada ? "checked" : ""} onchange="toggleTarea(${i})"/>
    `;

    lista.appendChild(div);
  });
}

// 🎯 Eventos
document.getElementById("btnAgregarCat").onclick = agregarCategoria;
document.getElementById("btnAgregarTarea").onclick = agregarTarea;
document.getElementById("btnBorrar").onclick = borrarTodo;

document.getElementById("inputCategoria").addEventListener("keydown", (e) => {
  if (e.key === "Enter") agregarCategoria();
});

// 🚀 Init
cargarDatos();
</script>