<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>TaskFlow</title>

  <script src="https://cdn.tailwindcss.com"></script>

  <script>
    tailwind.config = {
      darkMode: 'class',
    }
  </script>

  <style>
    *:focus {
      outline: none !important;
      box-shadow: none !important;
    }
  </style>
</head>

<body class="min-h-screen flex items-center justify-center 
bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">

  <!-- botón dark -->
  <button id="darkModeBtn"
    class="absolute top-4 right-4 text-xl">
    🌙
  </button>

  <!-- container -->
  <div class="w-full max-w-md bg-gray-900/80 backdrop-blur 
  p-6 rounded-2xl shadow-2xl border border-gray-700">

    <!-- título -->
    <div class="text-center mb-6">
      <h1 class="text-3xl font-bold">TaskFlow</h1>
      <p class="text-gray-400 text-sm">Organiza tu día 🚀</p>
    </div>

    <!-- input -->
    <div class="flex gap-2 mb-4">
      <input
        id="taskInput"
        type="text"
        placeholder="Agregar tarea..."
        class="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500"
      />

      <button id="addBtn"
        class="bg-green-500 hover:bg-green-600 px-4 rounded-lg font-bold">
        +
      </button>
    </div>

    <!-- acciones -->
    <div class="flex justify-between text-sm mb-3">
      <button id="sortBtn" class="text-blue-400 hover:underline">
        Ordenar
      </button>
      <button id="clearBtn" class="text-red-400 hover:underline">
        Eliminar completadas
      </button>
    </div>

    <!-- lista -->
    <ul id="taskList" class="space-y-2"></ul>

  </div>

  <script src="script.js"></script>
</body>
</html>