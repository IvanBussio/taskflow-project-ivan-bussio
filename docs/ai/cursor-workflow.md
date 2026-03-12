# Cursor Workflow

## Objective

This document describes how the Cursor IDE was used during the development of the TaskFlow project.

It includes:

- exploration of Cursor features
- examples of AI-assisted code improvements
- keyboard shortcuts used frequently
- situations where Cursor helped improve the code.

---

# Instalación de Cursor

Cursor fue descargado desde su sitio oficial:

https://cursor.sh

Después de la instalación, abrí el proyecto TaskFlow desde el menú:

File → Open Folder

Esto permitió utilizar las herramientas de inteligencia artificial directamente dentro del editor.

---

# Exploración de la interfaz

Cursor tiene una interfaz muy similar a Visual Studio Code, por lo que es fácil de utilizar si ya se está familiarizado con ese editor.

Las principales partes de la interfaz son:

- explorador de archivos
- editor de código
- terminal integrada
- chat de inteligencia artificial

Estas herramientas permiten interactuar con el código y recibir sugerencias automáticas para mejorar la implementación.

---

# Autocompletado con IA

Una de las funcionalidades más útiles de Cursor es el autocompletado inteligente.

Por ejemplo, al escribir un comentario describiendo una función:

```javascript
// function to filter completed tasks
Cursor sugirió automáticamente una posible implementación:
function filterCompletedTasks(tasks) {
  return tasks.filter(task => task.completed);
}Esto permite generar código base rápidamente y acelerar el desarrollo.
Chat contextual

Cursor incluye un chat de inteligencia artificial que permite hacer preguntas sobre el código directamente desde el editor.

Por ejemplo, se puede seleccionar una función y preguntar:

Explain what this function does.

Cursor analiza el código y proporciona una explicación clara del funcionamiento de la función.

Esto es especialmente útil para entender código complejo o revisar funciones existentes.

⸻

Edición inline

Cursor también permite modificar código utilizando instrucciones escritas directamente en el editor.

Por ejemplo, se puede seleccionar una función y pedir:

Refactor this function to improve readability.

Cursor genera automáticamente una versión mejorada del código.

Ejemplo:

Antes:function addTask(t){
  tasks.push(t)
}Después:function addTask(task) {
  if (!task) return;

  tasks.push({
    ...task,
    completed: false
  });
}Esto mejora la legibilidad y estructura del código.
Uso de Composer

La herramienta Composer permite realizar cambios que afectan a varios archivos del proyecto al mismo tiempo.

Por ejemplo, se puede utilizar para:
	•	reorganizar funciones
	•	mejorar nombres de variables
	•	añadir validaciones adicionales

Esta herramienta es útil cuando se necesita hacer cambios estructurales en el proyecto.

⸻

Atajos de teclado útiles

Durante el uso de Cursor se utilizaron algunos atajos de teclado que facilitan el trabajo con la IA.

Los más utilizados fueron:

Cmd + K → editar código usando IA
Cmd + L → abrir chat de IA
Cmd + Enter → aplicar sugerencia generada

Estos atajos permiten interactuar rápidamente con las herramientas de inteligencia artificial.

⸻

Conclusión

El uso de Cursor facilitó varias tareas durante el desarrollo del proyecto TaskFlow.

Las herramientas de inteligencia artificial permitieron generar código más rápido, mejorar la legibilidad del código y comprender mejor partes del proyecto.

Sin embargo, es importante revisar siempre el código generado por la IA antes de utilizarlo en un proyecto real.