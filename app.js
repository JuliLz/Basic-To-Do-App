const input = document.querySelector(".todo-input")
const lista = document.querySelector(".todo-list")
const btnAgregar = document.querySelector(".add-btn")
const btnBorrar = document.querySelector(".delete-btn")
const btnClear = document.querySelector(".clear-btn")
const textoPendientes = document.querySelector(".tasks-left")
const form = document.getElementById("todo-form")

//si no hay nada en localstorage inicia array vacio,
//sino busca en localstorage el item con key "tareas"
let tareas = JSON.parse(localStorage.getItem("tareas")) || []

//guardar items en localstorage con el nombre de "tareas"
//convierto la lista a json y la guardo
const guardarEnLocalStorage = (listaTareas) => {
    localStorage.setItem("tareas", JSON.stringify(listaTareas))
}

const renderizarTareas = (listaTareas) =>  {
    lista.innerHTML = listaTareas.map((tarea) => {
        return `<li class="todo-item">
            <span class="todo-text">${tarea.name}</span>
            <button type="button" data-name="${tarea.name}" class="delete-btn">×</button>
          </li>`
    }).join("")
}

const chequearVacio = (listaTareas) => {
    if (!listaTareas.length){
        alert("No hay tareas a borrar");
        return;
    } 
}

const agregarTarea = (e) => {
    e.preventDefault()
    const nombreTarea = input.value.trim()
    if (!nombreTarea.length) {
        alert("Ingrese una tarea antes de agregar")
        return
    }

    tareas = [...tareas, {name: nombreTarea}]
    input.value = ""
    update()
}

const borrarTarea = (e) => {
    if (!e.target.classList.contains("delete-btn")) {
        return;
    }
    const nombre = e.target.dataset.name
    tareas = tareas.filter((tarea) => {
        return tarea.name !== nombre
    })
    update()
}

const ordenarAlfabeticamente = (tareas) => {
    tareas.sort((a,b) => {
        return a.name.localeCompare(b.name)
    })
}

const borrarTodas = (e) => {
    if (!tareas.length) {
        alert("No hay tareas a borrar")
        return;
    }
    if (!e.target.classList.contains("clear-btn")) {
        return;
    }
    tareas = [];
    update()
}

const update = () => {
    ordenarAlfabeticamente(tareas)
    renderizarTareas(tareas)
    guardarEnLocalStorage(tareas)
    mostrarCantidadPendientes(tareas) 
}

const mostrarCantidadPendientes = (tareas) => {
    let cantidad = tareas.length
    if (cantidad === 1) {
        return textoPendientes.innerHTML = `${cantidad} Tarea pendiente`
    } else {
        return textoPendientes.innerHTML = `${cantidad} Tareas pendientes`
    } 
}

const iniciar = () => {
    ordenarAlfabeticamente(tareas)
    renderizarTareas(tareas)
    btnAgregar.addEventListener("click", agregarTarea)
    lista.addEventListener("click", borrarTarea)
    btnClear.addEventListener("click", borrarTodas)
    mostrarCantidadPendientes(tareas)
}

iniciar()