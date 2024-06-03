// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('postulacion-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm()) {
            displayCarta();
        }
    });

    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });

    fetchClima();
});

// Expresiones regulares para validación de campos
const expresiones = {
    rut: /^\d{9,10}$/, // 9 a 10 números.
    nombre: /^[a-zA-ZÀ-ÿ\s]{3,20}$/, // Letras y espacios, 3 a 20 caracteres.
    apellidoPaterno: /^[a-zA-ZÀ-ÿ\s]{3,30}$/, // Letras y espacios, 3 a 30 caracteres.
    apellidoMaterno: /^[a-zA-ZÀ-ÿ\s]{3,30}$/, // Letras y espacios, 3 a 30 caracteres.
    edad: /^(2[89]|[2-2][0-9]|35)$/, // Entre 18 y 35 años.
    correoElectronico: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Estructura básica de correo electrónico.
    fonoContacto: /^[6-9][0-9]{8}$/ // Comienza con un dígito entre 6 y 9 y tiene 9 dígitos en total.
};

// Estado de los campos del formulario
const campos = {
    rut: false,
    nombre: false,
    apellidoPaterno: false,
    apellidoMaterno: false,
    edad: false,
    correoElectronico: false,
    fonoContacto: false
};

// Función para validar un campo del formulario
function validarCampo(expresion, input, campo) {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
}

// Función para validar la edad
function validarEdad(valor) {
    const edad = parseInt(valor);
    if (edad >= 18 && edad <= 35) {
        document.getElementById('grupo__edad').classList.remove('formulario__grupo-incorrecto');
        document.getElementById('grupo__edad').classList.add('formulario__grupo-correcto');
        document.querySelector('#grupo__edad i').classList.add('fa-check-circle');
        document.querySelector('#grupo__edad i').classList.remove('fa-times-circle');
        document.querySelector('#grupo__edad .formulario__input-error').classList.remove('formulario__input-error-activo');
        campos['edad'] = true;
    } else {
        document.getElementById('grupo__edad').classList.add('formulario__grupo-incorrecto');
        document.getElementById('grupo__edad').classList.remove('formulario__grupo-correcto');
        document.querySelector('#grupo__edad i').classList.add('fa-times-circle');
        document.querySelector('#grupo__edad i').classList.remove('fa-check-circle');
        document.querySelector('#grupo__edad .formulario__input-error').classList.add('formulario__input-error-activo');
        campos['edad'] = false;
    }
}

// Obtener todos los inputs del formulario
const inputs = document.querySelectorAll('#postulacion-form input');

// Agregar eventos de validación a los inputs
inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

// Función para validar el formulario al hacer submit
const boton = document.getElementById('boton-enviar');
boton.addEventListener('click', (e) => {
    e.preventDefault();

    if (campos.rut && campos.nombre && campos.apellidoPaterno && campos.apellidoMaterno && campos.edad && campos.correoElectronico && campos.fonoContacto){
        formulario.reset();
        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
            location.reload();
        }, 3000);
    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
        }, 3000);
    }
});

// Función para validar todo el formulario
function validarFormulario(e) {
    switch (e.target.name) {
        case "rut":
            validarCampo(expresiones.rut, e.target, 'rut');
            break;
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;
        case "apellidoPaterno":
            validarCampo(expresiones.apellidoPaterno, e.target, 'apellidoPaterno');
            break;
        case "apellidoMaterno":
            validarCampo(expresiones.apellidoMaterno, e.target, 'apellidoMaterno');
            break;
        case "edad":
            validarEdad(e.target.value);
            break;
        case "correoElectronico":
            validarCampo(expresiones.correoElectronico, e.target, 'correoElectronico');
            break;
        case "fonoContacto":
            validarCampo(expresiones.fonoContacto, e.target, 'fonoContacto');
            break;
    }
}


function displayCarta() {
    const rut = document.getElementById('rut').value;
    const nombre = document.getElementById('nombre').value;
    const apellidoPaterno = document.getElementById('apellido-paterno').value;
    const apellidoMaterno = document.getElementById('apellido-materno').value;
    const edad = document.getElementById('edad').value;
    const email = document.getElementById('email').value;
    const fono = document.getElementById('fono').value;

    const carta = `
        <h2>Carta de Postulación</h2>
        <p><strong>RUT:</strong> ${rut}</p>
        <p><strong>Nombre:</strong> ${nombre} ${apellidoPaterno} ${apellidoMaterno}</p>
        <p><strong>Edad:</strong> ${edad}</p>
        <p><strong>Correo Electrónico:</strong> ${email}</p>
        <p><strong>Fono de Contacto:</strong> ${fono}</p>
    `;

    document.getElementById('carta-postulacion').innerHTML = carta;
}

function fetchClima() {
    const apiKey = 'YOUR_API_KEY_HERE'; // Reemplazar con tu propia API Key
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Chiloe&days=10`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const climaInfo = data.forecast.forecastday.map(day => {
                return `
                    <p><strong>${day.date}:</strong> ${day.day.condition.text}, ${day.day.avgtemp_c}°C</p>
                `;
            }).join('');

            document.getElementById('clima-info').innerHTML = climaInfo;
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
        });
}
