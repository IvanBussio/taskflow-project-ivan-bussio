# Experimentos con IA en programación

## Objetivo

En este documento se describen varios experimentos realizados para comparar la resolución de problemas de programación con y sin ayuda de inteligencia artificial.

Se evaluaron los siguientes aspectos:

- tiempo necesario para resolver el problema
- calidad del código generado
- nivel de comprensión del problema

---

# Experimento 1: Filtrar tareas completadas

## Sin IA

Primero intenté implementar la función manualmente.

Tiempo aproximado: 15 minutos.

El código funcionaba, pero era más largo y menos optimizado.

Ejemplo de código:

```javascript
function filterCompleted(tasks) {
  const result = [];
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].completed) {
      result.push(tasks[i]);
    }
  }
  return result;

}Con IA

Utilicé un asistente de IA para generar la función.

Tiempo aproximado: 4 minutos.

La función generada fue más corta y utilizó el método filter de JavaScript.

Ejemplo de código: 

function filterCompleted(tasks) {
  return tasks.filter(task => task.completed);
}
Conclusión

La IA ayudó a encontrar una solución más rápida y eficiente, utilizando métodos modernos de JavaScript.

⸻

Experimento 2: Ordenar tareas

Sin IA

Implementé una función para ordenar tareas manualmente.

Tiempo aproximado: 12 minutos.

Fue necesario revisar la documentación de JavaScript para recordar cómo ordenar arrays.

Con IA

Pedí a la IA que generara una función para ordenar tareas alfabéticamente.

Tiempo aproximado: 3 minutos.

La IA sugirió utilizar el método sort().

Ejemplo de código:

function sortTasks(tasks) {
  return tasks.sort((a, b) => a.title.localeCompare(b.title));
}
Experimento 3: Comprensión de código

Sin IA

Intenté analizar manualmente una función compleja.

Tiempo aproximado: 15 minutos.

Fue necesario revisar varias partes del código para entender cómo funcionaba.

Con IA

Pedí a la IA que explicara el código paso a paso.

Tiempo aproximado: 2 minutos.

La explicación permitió entender el funcionamiento de la función mucho más rápido.

Conclusión

La IA facilita mucho la comprensión de código existente.

⸻

Conclusión general

Los experimentos muestran que la inteligencia artificial puede acelerar significativamente el desarrollo de software.

Sin embargo, también es importante comprender el código generado y revisar las soluciones antes de utilizarlas en un proyecto real.