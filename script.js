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
    console.log("se entro a addUser")
    let cantidadDeUsuarios = prompt("ingresa el numero de objetos a ingresar");
    for (i = 0; i < cantidadDeUsuarios; i++) {
        let nombre = IngresarDato("nombre");
        let placas = IngresarDato("placas");
        let ethereum = IngresarDato("ethereum");
        let gastoElectrico = IngresarDato("gastoElectrico");
        let id = i + 1;
        arrayUsuarios[i] = new Usuario(id, nombre, placas, ethereum, gastoElectrico);
        document.getElementById("newUser").innerHTML = ('usuario nuevo añadido: ' + JSON.stringify(arrayUsuarios[i]));
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

document.getElementById("addUser").addEventListener("click", addUser, false);
document.getElementById("update").addEventListener("click", update, false);
document.getElementById("clear").addEventListener("click", clear, false);
