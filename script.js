class Usuario {
    constructor(id, nombre, placas, ethereum, gastoElectrico) {
        this.id = id;
        this.nombre = nombre;
        this.placas = placas;
        this.ethereum = ethereum;
        this.gastoElectrico = gastoElectrico;
    }
}
function IngresarDato(dato) {
    return prompt("Ingresa tu " + dato);
}

function addUser() {
    if (!(localStorage.getItem('arrayUsuarios'))) {
        console.log("no existe el array, creando uno...");
        let arrayUsuarios = new Array;
        localStorage.setItem('arrayUsuarios', JSON.stringify(arrayUsuarios));
    }
    let arrayUsuarios = JSON.parse(localStorage.getItem('arrayUsuarios'));
    let arrayLength = arrayUsuarios.length;
    console.log("se entro a addUser, el array length es: " + arrayLength);
    let cantidadDeUsuarios = prompt("ingresa el numero de objetos a ingresar");
    let nCondicional = arrayLength + parseInt(cantidadDeUsuarios);

    console.log("el limite de for es " + nCondicional);
    for (i = arrayLength; i < nCondicional; i++) {
        let nombre = IngresarDato("nombre");
        let placas = IngresarDato("placas");
        let ethereum = IngresarDato("ethereum");
        let gastoElectrico = IngresarDato("gastoElectrico");
        let id = i + 1;
        arrayUsuarios[i] = new Usuario(id, nombre, placas, ethereum, gastoElectrico);
        document.getElementById("newUser").innerHTML = ('ultimo usuario nuevo añadido: ' + JSON.stringify(arrayUsuarios[i]));
        console.log("objeto añadido: " + JSON.stringify(arrayUsuarios[i]));
        localStorage.setItem('arrayUsuarios', JSON.stringify(arrayUsuarios));
        console.log("setItem: " + JSON.stringify(arrayUsuarios));
    }
}
function update() {
    let listaOrdenada = JSON.parse(localStorage.getItem('arrayUsuarios')).sort(function (a, b) {
        return (a.ethereum - b.ethereum)
    })
    document.getElementById("objeto").innerHTML = JSON.stringify(listaOrdenada);
}

function clear() {
    localStorage.removeItem('arrayUsuarios');
    console.log("variables locales borradas..")
}

let test = document.getElementById("cuadrado");
let Concatenar = document.getElementById("concatenar");
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
Concatenar.addEventListener("mouseover", function (event) {
    $('.concatenar').hide(1000);
    setTimeout(function () {
        $('.concatenar').show(1000);
    }, 1000);
}, false);


document.getElementById("addUser").addEventListener("click", addUser, false);
document.getElementById("update").addEventListener("click", update, false);
document.getElementById("clear").addEventListener("click", clear, false);
