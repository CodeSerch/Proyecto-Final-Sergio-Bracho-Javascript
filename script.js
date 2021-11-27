class Usuario {
    constructor(id, nombre, correo, placas) {
        this.id = id;
        this.nombre = nombre;
        this.placas = placas;
        this.correo = correo;
    }
}
function IngresarDato(dato) {
    return prompt("Ingresa tu " + dato);
}

$(function () {
    $("#nav-placeholder").load("nav.html");
});

function addUser(nombre, correo, placas) {
    if (!(localStorage.getItem('arrayUsuarios'))) {
        console.log("no existe el array, creando uno...");
        let arrayUsuarios = new Array;
        localStorage.setItem('arrayUsuarios', JSON.stringify(arrayUsuarios));
    }
    let arrayUsuarios = JSON.parse(localStorage.getItem('arrayUsuarios'));
    let id = arrayUsuarios.length + 1;
    console.log("id: " + id);
    const usuario1 = new Usuario(id, nombre, correo, placas);
    console.log("usuario1: " + JSON.stringify(usuario1));
    arrayUsuarios.push(usuario1);
    document.getElementById("newUser").innerHTML = ('ultimo usuario nuevo añadido: ' + JSON.stringify(arrayUsuarios[id-1]));
    console.log("objeto añadido: " + JSON.stringify(arrayUsuarios[id]));
    localStorage.setItem('arrayUsuarios', JSON.stringify(arrayUsuarios));
    console.log("setItem: " + JSON.stringify(arrayUsuarios));
}
function update() {
    let listaOrdenada = JSON.parse(localStorage.getItem('arrayUsuarios')).sort(function (a, b) {
        return (b.placas - a.placas)
    })
    document.getElementById("objeto").innerHTML = JSON.stringify(listaOrdenada);
}

function clear() {
    localStorage.removeItem('arrayUsuarios');
    console.log("variables locales borradas..");
    alert("se limpio el almacenamiento local")
}

let test = document.getElementById("cuadrado");

test.addEventListener("mouseenter", function (event) {
    // highlight the mouseenter target
    event.target.style.backgroundColor = 'green';
    setTimeout(function () {
        event.target.style.backgroundColor = 'brown';
    }, 500);
}, false);
test.addEventListener("mouseover", function (event) {
    event.target.style.color = "blue";
    setTimeout(function () {
        event.target.style.color = "";
    }, 1000);
}, false);


document.getElementById("update").addEventListener("click", update, false);
document.getElementById("clear").addEventListener("click", clear, false);

function f1() {
    console.log("hola")
    $(".bloque1").hide(1000)
}




$("#send").click(function () {
    console.log("funcion enviar!");
    let nombre = document.getElementById('nombre').value;
    let correo = document.getElementById('correo').value;
    let placas = document.getElementById('placas').value;

    addUser(nombre, correo, placas);

    let data = "<h1>Nombre: " + nombre + '<br/>' + " Correo: " + correo + '<br/>' + " Placas: " + placas + "<h1/>";
    console.log("data a enviar: " + data);
    $.ajax({
        type: 'get',
        data: data,
        url: 'send.php',
        beforeSend: function () {
            alert('Processing form...');
        },
        success: function () {
            $("#respa").html(data);
        }
    })
    return false;
});






