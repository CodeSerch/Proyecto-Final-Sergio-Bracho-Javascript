let usuarioActual = "ninguno";
let movimiento = "ninguno";

function defaultValue() {

    //$('#selectMovimiento option[contains("Tipo de Movimiento")').prop("selected",true);
    $('#selectMovimiento option:contains("Tipo de Movimiento")').prop('selected', true);
}
defaultValue();

function makeList() {
    console.log(localStorage.getItem('arrayUsuarios'));
    if (localStorage.getItem('arrayUsuarios') == null) {

    } else {
        // Establish the array which acts as a data source for the list
        let listaOrdenada = JSON.parse(localStorage.getItem('arrayUsuarios')).sort(function (a, b) {
            return (b.nombreCuenta - a.nombreCuenta)
        })
        let listContainer = document.getElementById('listContainer');
        // Make the list
        let listElement = document.createElement('select'),

            // Set up a loop that goes through the items in listItems one at a time
            numberOfListItems = listaOrdenada.length,
            listItem,
            i;

        listElement.className = "listaCuenta form-select w-50"
        listElement.id = 'select'

        listContainer.appendChild(listElement);

        listItem = document.createElement('option');
        listItem.label = "selecciona la cuenta";
        listItem.value = "false";
        listElement.appendChild(listItem);



        for (i = 0; i < numberOfListItems; ++i) {
            // create an item for each one
            listItem = document.createElement('option');

            // Add the item text
            listItem.label = "Usuario: " + listaOrdenada[i].nombre + ", Cuenta: " + listaOrdenada[i].cuenta.nombreCuenta;
            listItem.value = JSON.stringify(listaOrdenada[i]);

            // Add listItem to the listElement  
            listElement.appendChild(listItem);
        }

    }


}

// Usage
makeList();

//$('#select disabled selected value');
function cuentaSelect() {
    
    updateBalance();

    let selected = $("#select option:selected").val();
    
    selected = JSON.parse(selected);

    let arrayUsuarios = JSON.parse(localStorage.getItem('arrayUsuarios'));
    const thisUser = arrayUsuarios[selected.id-1];
    //arrayUsuarios[selected.id-1]

    if (selected == "false") {
        console.log("cuenta no seleccionada");
        cuentaSeleccionada.innerHTML = "Ninguna cuenta seleccionada";
        usuarioActual = "ninguno";
        $('#formMov').hide(1000);
    } else {
        $('#formMov').show(1000);
        

        let cuentaSeleccionada = document.getElementById('cuentaSeleccionada');
        cuentaSeleccionada.innerHTML = "Usuario: " + thisUser.nombre + ", " + thisUser.cuenta.nombreCuenta + "<br/>Balance: " + thisUser.cuenta.balance;
        usuarioActual = arrayUsuarios[selected.id-1];
        console.log(usuarioActual);
    }
}

$('#select').on('change', function (e) {

    cuentaSelect();

});

$('#selectMovimiento').on('change', function (e) {
    let selected = $("#selectMovimiento option:selected").text();
    //let cuentaSeleccionada = document.getElementById('cuentaSeleccionada');
    //cuentaSeleccionada.innerHTML = "Usuario: " + selected.nombre + ", " + selected.cuenta.nombreCuenta;
    movimiento = selected;
    console.log(selected + " de: " + usuarioActual.nombre);
});


class Usuario {
    constructor(id, nombre, correo, cuenta) {
        this.id = id;
        this.nombre = nombre;
        this.cuenta = cuenta;
        this.correo = correo;
    }
}
function IngresarDato(dato) {
    return prompt("Ingresa tu " + dato);
}

$(function () {
    $("#nav-placeholder").load("nav.html");
});

function addUser(nombre, correo, nombreCuenta) {
    if (nombre == "" || correo == "" || nombreCuenta == "") {
        alert("un campo esta vacio!")
    } else {
        if (!(localStorage.getItem('arrayUsuarios'))) {
            console.log("no existe el array, creando uno...");
            let arrayUsuarios = new Array;
            localStorage.setItem('arrayUsuarios', JSON.stringify(arrayUsuarios));
        }
        let arrayUsuarios = JSON.parse(localStorage.getItem('arrayUsuarios'));
        let id = arrayUsuarios.length + 1;

        let cuenta = {
            nombreCuenta: nombreCuenta,
            balance: 0,
            ingresos: [],
            gastos: [],
        }

        const usuarioNuevo = new Usuario(id, nombre, correo, cuenta);
        arrayUsuarios.push(usuarioNuevo);

        document.getElementById("newUser").innerHTML = ('Nuevo Usuario: ' + JSON.stringify(usuarioNuevo));
        console.log("objeto añadido: " + JSON.stringify(arrayUsuarios[id]));
        localStorage.setItem('arrayUsuarios', JSON.stringify(arrayUsuarios));
        console.log("setItem: " + JSON.stringify(arrayUsuarios));
    }
}

function updateBalance() {
    let arrayNuevo = JSON.parse(localStorage.getItem('arrayUsuarios'));
    for (let i = 0; i < arrayNuevo.length; i++) {
        let totalGastos = 0;
        let totalIngresos = 0;
        for (let x = 0; x < arrayNuevo[i].cuenta.ingresos.length; x++) {
            totalIngresos = totalIngresos + arrayNuevo[i].cuenta.ingresos[x];
        }
        for (let x = 0; x < arrayNuevo[i].cuenta.gastos.length; x++) {
            totalGastos = totalGastos + arrayNuevo[i].cuenta.gastos[x];
        }
        arrayNuevo[i].cuenta.balance = totalIngresos - totalGastos;
    }
    localStorage.setItem('arrayUsuarios', JSON.stringify(arrayNuevo));

}

function update() {
    updateBalance();
    const Objeto = document.getElementById("objeto")
    Objeto.innerHTML = '';
    let listaOrdenada = JSON.parse(localStorage.getItem('arrayUsuarios')).sort(function (a, b) {
        return (b.nombreCuenta - a.nombreCuenta)
    })

    let texto;
    for (let i = 0; i < listaOrdenada.length; i++) {
        texto = "Nombre: " + listaOrdenada[i].nombre + "<br/>Cuenta: " + listaOrdenada[i].cuenta.nombreCuenta + "<br/>Balance: " + listaOrdenada[i].cuenta.balance + "<br/>Ingresos: " + listaOrdenada[i].cuenta.ingresos + "<br/>Gastos: " + listaOrdenada[i].cuenta.gastos + "<br/>Id: " + listaOrdenada[i].id + "<br/>"

        let div = document.createElement('div');
        div.innerHTML = texto;

        div.classList.add('objeto2');
        Objeto.appendChild(div);
    }
    Objeto.classList.add('objeto1');
    $("#objeto").show(1000);
    $("#ocultarU").show();
    $(".clearUsuarios").hide(1000);
    $("#update").hide();
}

function clear() {
    localStorage.removeItem('arrayUsuarios');
    console.log("variables locales borradas..");
    alert("se limpio el almacenamiento local")
}

let test = document.getElementById("cuadrado");

/*   test.addEventListener("mouseenter", function (event) {
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
}, false);*/


document.getElementById("update").addEventListener("click", update, false);
document.getElementById("clear").addEventListener("click", clear, false);


function f1() {
    console.log("hola")
    $(".bloque1").hide(1000)
}

$("#ocultarU").click(function () {
    $("#objeto").hide(1000);
    $("#ocultarU").hide();
    $("#update").show();
    $(".clearUsuarios").show(1000);
})


$("#sendMov").click(function () {
    //alert("sendMov... " + movimiento  + " de: " + usuarioActual.nombre );
    if (movimiento == "Gasto") {
        let gasto = parseInt($('#movNum').val());
        alert("Gasto: " + gasto);
        $('#movNum').val('');
        let arrayUsuarios = JSON.parse(localStorage.getItem('arrayUsuarios'));
        let index = arrayUsuarios.findIndex(x => x.id === usuarioActual.id);

        arrayUsuarios[index].cuenta.gastos.push(gasto);
        console.log(arrayUsuarios[index].cuenta.gastos);

        localStorage.setItem('arrayUsuarios', JSON.stringify(arrayUsuarios))
    } else {
        let ingreso = parseInt($('#movNum').val());
        alert("Ingreso: " + ingreso);
        $('#movNum').val('');
        let arrayUsuarios = JSON.parse(localStorage.getItem('arrayUsuarios'));
        let index = arrayUsuarios.findIndex(x => x.id === usuarioActual.id);

        arrayUsuarios[index].cuenta.ingresos.push(ingreso);
        console.log(arrayUsuarios[index].cuenta.ingresos);

        localStorage.setItem('arrayUsuarios', JSON.stringify(arrayUsuarios))
    }
    //update();
    //$('cuentaSeleccionada').hide(1000);
    cuentaSelect();
});

$("#send").click(function () {
    let nombre = document.getElementById('nombre').value;
    let correo = document.getElementById('correo').value;
    let nombreCuenta = document.getElementById('cuenta').value;
    if (nombre == "" || correo == "" || nombreCuenta == "") {
        console.log("un campo esta vacio! sendForm")
    } else {
        console.log("funcion enviar!");

        addUser(nombre, correo, nombreCuenta);

        let data = "<h1>Nombre: " + nombre + '<br/>' + " Correo: " + correo + '<br/>' + " Cuenta de: " + nombreCuenta + "<h1/>";
        console.log("data a enviar: " + data);
        $.ajax({
            type: 'get',
            data: data,
            url: 'send.php',
            beforeSend: function () {
                alert('Processing form...');
            },
            success: function () {
                console.log("sucess, data:" + data);
                update();
                alert("envio exitoso")
            }
        })
        return false;
    }
});

$("#getJson").click(function () {
    //let pokemon = document.getElementById('pokemon').value;
    let apiInfo = document.getElementById('apiInfo');
    apiInfo
    $.ajax({
        type: 'GET',
        url: 'https://api.bluelytics.com.ar/v2/latest',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            alert('Processing form...');
        },
        success: function (data) {
            console.log("sucess, data:" + JSON.stringify(data));
            //apiInfo.innerHTML = ("Nombre: " + data.name + " Id: " + data.id + " Tipo: " + JSON.stringify(data.types[0].type.name));
            apiInfo.innerHTML = "Usuario actual: " + usuarioActual.nombre + "<br/>Balance en USD: " + (usuarioActual.cuenta.balance / data.blue.value_avg) + "<br/>Dolar Blue: " + data.blue.value_avg;
            alert("getJson existoso");
        }
    })
}
);






