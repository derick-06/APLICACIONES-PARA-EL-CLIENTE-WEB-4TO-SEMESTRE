// Obtener formulario
const formulario = document.getElementById("formulario");

// Obtener tabla
const tabla = document.getElementById("tablaEstudiantes");

// Expresiones regulares
const regexCedula = /^[0-9]{10}$/;
const regexTexto = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
const regexTelefono = /^09[0-9]{8}$/;
const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Función para mostrar errores
function mostrarError(id, mensaje){
    document.getElementById(id).textContent = mensaje;
}

// Función para limpiar errores
function limpiarErrores(){
    const errores = document.querySelectorAll("small");
    errores.forEach(error => {
        error.textContent = "";
    });
}

// Evento del formulario
formulario.addEventListener("submit", function(e){

    // Evitar recarga
    e.preventDefault();

    // Limpiar errores anteriores
    limpiarErrores();

    // Obtener datos
    const cedula = document.getElementById("cedula").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const nombres = document.getElementById("nombres").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const facultad = document.getElementById("facultad").value.trim();
    const nivel = document.getElementById("nivel").value.trim();
    const paralelo = document.getElementById("paralelo").value.trim();

    let valido = true;

    // Validar cédula
    if(!regexCedula.test(cedula)){
        mostrarError("errorCedula", "La cédula debe tener 10 números");
        valido = false;
    }

    // Validar apellidos
    if(!regexTexto.test(apellidos)){
        mostrarError("errorApellidos", "Ingrese apellidos válidos");
        valido = false;
    }

    // Validar nombres
    if(!regexTexto.test(nombres)){
        mostrarError("errorNombres", "Ingrese nombres válidos");
        valido = false;
    }

    // Validar teléfono
    if(!regexTelefono.test(telefono)){
        mostrarError("errorTelefono", "Ingrese un teléfono válido");
        valido = false;
    }

    // Validar correo
    if(!regexCorreo.test(correo)){
        mostrarError("errorCorreo", "Ingrese un correo válido");
        valido = false;
    }

    // Validar facultad
    if(facultad === ""){
        mostrarError("errorFacultad", "Ingrese la facultad");
        valido = false;
    }

    // Validar nivel
    if(nivel < 1 || nivel > 10){
        mostrarError("errorNivel", "Nivel inválido");
        valido = false;
    }

    // Validar paralelo
    if(paralelo === ""){
        mostrarError("errorParalelo", "Ingrese el paralelo");
        valido = false;
    }

    // Detener si hay errores
    if(!valido){
        return;
    }

    // Crear objeto estudiante
    const estudiante = {
        cedula,
        apellidos,
        nombres,
        direccion,
        telefono,
        correo,
        facultad,
        nivel,
        paralelo
    };

    // Obtener datos guardados
    let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];

    // Agregar nuevo estudiante
    estudiantes.push(estudiante);

    // Guardar en localStorage
    localStorage.setItem("estudiantes", JSON.stringify(estudiantes));

    // Mostrar tabla
    mostrarEstudiantes();

    // Limpiar formulario
    formulario.reset();
});

// Función para mostrar estudiantes
function mostrarEstudiantes(){

    // Limpiar tabla
    tabla.innerHTML = "";

    // Obtener estudiantes
    let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];

    // Recorrer estudiantes
    estudiantes.forEach(estudiante => {

        // Crear fila
        tabla.innerHTML += `
            <tr>
                <td>${estudiante.cedula}</td>
                <td>${estudiante.apellidos}</td>
                <td>${estudiante.nombres}</td>
                <td>${estudiante.correo}</td>
                <td>${estudiante.facultad}</td>
                <td>${estudiante.nivel}</td>
                <td>${estudiante.paralelo}</td>
                <td>${estudiante.telefono}</td>
                <td>${estudiante.direccion}</td>
            </tr>
        `;
    });
}

// Mostrar datos al iniciar
mostrarEstudiantes();

// Botón para descargar JSON
document.getElementById("descargar").addEventListener("click", function(){

    // Obtener estudiantes
    let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];

    // Convertir a formato JSON
    const datos = JSON.stringify(estudiantes, null, 2);

    // Crear archivo
    const blob = new Blob([datos], {type: "application/json"});

    // Crear enlace temporal
    const enlace = document.createElement("a");

    // Crear URL del archivo
    enlace.href = URL.createObjectURL(blob);

    // Nombre del archivo
    enlace.download = "estudiantes.json";

    // Descargar archivo
    enlace.click();
});