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

let arrayUsuarios = new Array;
function añadirUsuario() {
    let cantidadDeUsuarios = prompt("ingresa el numero de objetos a ingresar");
    for (i = 0; i < cantidadDeUsuarios; i++) {
        let nombre = IngresarDato("nombre");
        let placas = IngresarDato("placas");
        let ethereum = IngresarDato("ethereum");
        let gastoElectrico = IngresarDato("gastoElectrico");
        let id = i + 1;
        arrayUsuarios[i] = new Usuario(id, nombre, placas, ethereum, gastoElectrico);
        console.log("objeto añadido: " + JSON.stringify(arrayUsuarios[i]));
        localStorage.setItem('arrayUsuarios', JSON.stringify(arrayUsuarios));
    }
}
console.log("array de objetos: " + JSON.stringify(arrayUsuarios));
function actualizar() {
    let listaOrdenada = JSON.parse(localStorage.getItem('arrayUsuarios')).sort(function (a, b) {
        return (a.ethereum - b.ethereum)
    })
    document.getElementById("objeto").innerHTML = JSON.stringify(listaOrdenada);
}

function clearUsuarios() {
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

