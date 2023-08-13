// SECCION DE INICIO DE SESION

window.onload = function () {
    const loginSection = document.getElementById("login");
    const registerSection = document.getElementById("register");
    const restablecerContraseña = document.getElementById("restablecer");
    const registro = document.getElementById("registro");

    restablecerContraseña.addEventListener("click", function () {
        
        window.location.href = "restablecer_contraseña.php";
    });

    registro.addEventListener("click", function () {
        
        registerSection.style.display = "block";
        loginSection.style.display = "none";
    });

    
    const formularioInicioSesion = loginSection.querySelector("form");
    formularioInicioSesion.addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar el envío del formulario

        const email = formularioInicioSesion.querySelector("#loginEmail").value;
        const contraseña = formularioInicioSesion.querySelector("#loginPassword").value;

        //lógica para enviar los datos de inicio de sesión al servidor
        // Por ejemplo, utilizando AJAX o fetch


        mostrarMensaje("¡Inicio de sesión exitoso!");
    });

    // Para el formulario de registro
    const formularioRegistro = registerSection.querySelector("form");
    formularioRegistro.addEventListener("submit", function (event) {
        event.preventDefault(); 

        const nombreUsuario = formularioRegistro.querySelector("#username").value;
        const emailRegistro = formularioRegistro.querySelector("#email").value;
        const contraseñaRegistro = formularioRegistro.querySelector("#password").value;

        //Para enviar los datos de registro al servidor
        // Por ejemplo, utilizando AJAX o fetch

       mostrarMensaje("¡Registro exitoso! Ahora puedes iniciar sesión.");
    });
};

function mostrarMensaje(mensaje) {
    alert(mensaje);
}


// SECCION DE BUSQUEDA

// BOTON Y CASILLA DE DATOS

const botonBuscador = document.getElementById("boton-buscador");
const inputBusqueda = document.getElementById("search");
const productos = document.querySelectorAll(".product");

botonBuscador.addEventListener("click", function () {
    realizarBusqueda();
});

inputBusqueda.addEventListener("input", function () {
    realizarBusqueda();
});

function realizarBusqueda() {
    const terminoBusqueda = inputBusqueda.value.toLowerCase();

    productos.forEach(producto => {
        const nombreProducto = producto.querySelector(".miH2").textContent.toLowerCase();

        if (nombreProducto.includes(terminoBusqueda)) {
            producto.style.display = "block"; // Mostrar producto si coincide con la búsqueda
        } else {
            producto.style.display = "none"; // Ocultar producto si no coincide con la búsqueda
        }
    });
}

// SECCION DE BOTON AGREGAR AL CARRITO


const alCarritoButtons = document.getElementsByClassName("carro");
const resultadoTabla = document.querySelector(".resultado");
const totalGeneralElement = document.getElementById("totalGeneral");
let totalGeneral = 0;
const productosEnCarrito = [];

for (let i = 0; i < alCarritoButtons.length; i++) {
    alCarritoButtons[i].addEventListener("click", function () {
        const productoSection = this.parentElement;
        const seleccionadoCheckbox = productoSection.querySelector(".seleccionado");
        const h2 = productoSection.querySelector(".miH2").textContent;

        // Verificar si el producto ya está en el carrito
        const productoExistente = productosEnCarrito.find(producto => producto.nombre === h2);
        if (productoExistente) {
            alert("Este producto ya ha sido agregado al carrito.");
            return;
        }

        const cantidadInput = productoSection.querySelector(".cantidad");
        const cantidad = cantidadInput.value;
        const precioP = productoSection.querySelector(".precio").textContent;
        const precio = parseFloat(precioP.replace("Precio: $", ""));
        const total = cantidad * precio;

        const producto = {
            nombre: h2,
            cantidad: cantidad,
            precio: precio,
            total: total,
            checkbox: seleccionadoCheckbox 
        };

        productosEnCarrito.push(producto);
        seleccionadoCheckbox.checked = true; 
        cantidadInput.select(); 

        actualizarTabla();
    });
}

function actualizarTabla() {
    resultadoTabla.innerHTML = '<tr><th>Producto</th><th>Cantidad</th><th>Precio</th><th>Total</th><th>Eliminar</th></tr>';
    totalGeneral = 0;

    for (const producto of productosEnCarrito) {
        const newRow = resultadoTabla.insertRow();
        const cellProducto = newRow.insertCell();
        const cellCantidad = newRow.insertCell();
        const cellPrecio = newRow.insertCell();
        const cellTotal = newRow.insertCell();
        const cellEliminar = newRow.insertCell();

        cellProducto.textContent = producto.nombre;
        cellCantidad.textContent = producto.cantidad;
        cellPrecio.textContent = "$" + producto.precio.toFixed(2);
        cellTotal.textContent = "$" + producto.total.toFixed(2);
        cellEliminar.innerHTML = '<button class="eliminar">Eliminar</button>';

        totalGeneral += producto.total;

        const eliminarButton = cellEliminar.querySelector(".eliminar");
        eliminarButton.addEventListener("click", function () {
            const index = productosEnCarrito.indexOf(producto);
            productosEnCarrito.splice(index, 1);
            producto.checkbox.checked = false; // Deseleccionar el checkbox
            actualizarTabla();
        });
    }

    actualizarTotalGeneral();
}

function actualizarTotalGeneral() {
    totalGeneralElement.textContent = "Total General: $" + totalGeneral.toFixed(2);
}

window.onload = function () {
    if (productosEnCarrito.length > 0) {
        actualizarTabla();
    }
};


// BOTON DE PAGO

window.onload = function () {
    if (productosEnCarrito.length > 0) {
        actualizarTabla();
    }

 
    const btnPagar = document.getElementById("btnPagar");
    btnPagar.addEventListener("click", function () {
        realizarPago(totalGeneral);
    });
};


function realizarPago(total) {
    
    alert("¡Pago realizado con éxito!\nTotal: $" + total.toFixed(2));
    
}

// SECCION DE LAS OPCIONES DE PAGO


window.onload = function () {
    if (productosEnCarrito.length > 0) {
        actualizarTabla();
    }

    const btnPagar = document.getElementById("btnPagar");
    const opcionesPago = document.getElementById("opcionesPago");

    btnPagar.addEventListener("click", function () {
        opcionesPago.style.display = "block"; 
    });

   
    const pagoTarjeta = document.getElementById("pagoTarjeta");
    pagoTarjeta.addEventListener("click", function () {
        realizarPago("Tarjeta de Crédito");
        reiniciarPagina();
    });

    const pagoTransferencia = document.getElementById("pagoTransferencia");
    pagoTransferencia.addEventListener("click", function () {
        realizarPago("Transferencia Bancaria");
        reiniciarPagina();
    });

    const pagoConsignacion = document.getElementById("pagoConsignacion");
    pagoConsignacion.addEventListener("click", function () {
        realizarPago("Consignación");
        reiniciarPagina();
    });
};

function realizarPago(opcion) {
    // Lógica para procesar el pago
    alert("¡Pago realizado con éxito!\nOpción de pago: " + opcion);

   
    productosEnCarrito.length = 0; 
    actualizarTabla();
}

function reiniciarPagina() {
    setTimeout(function () {
        location.reload(); 
    }, 1000); 
}