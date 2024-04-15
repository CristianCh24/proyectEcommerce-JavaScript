let nombreIngresado;
// Se ingresa nombre de usuario obligatoriamente.
do {
    nombreIngresado = prompt('Hola, Binvenido al "Supermercado X-Online".' + "\n" + "Por favor ingrese su nombre:");
} while (!nombreIngresado);
// Se define la lista de productos con nombre y precio.
const productos = [
    { nombre: "harina", precio: 20 },
    { nombre: "leche", precio: 30 },
    { nombre: "gaseosa", precio: 250 },
    { nombre: "queso", precio: 270 },
    { nombre: "mortadela", precio: 80 },
];
// Se inicializa el carrito vacío.
let carrito = [];
// Se pregunta al usuario si desea comprar algún producto.
let seleccion = prompt(`Hola ${nombreIngresado}.` + "\n" + "¿Desea comprar algún producto? (si/no)");
// Bucle para validar la respuesta del usuario ("sí" o "no").
while (seleccion.toLowerCase() !== "si" && seleccion.toLowerCase() !== "no") {
    alert('Por favor, escribe "si" o "no".');
    seleccion = prompt("¿Desea comprar algo? (si/no)");
}
// Si el usuario desea comprar, se muestra la lista de productos.
if (seleccion.toLowerCase() === "si") {
    // Mostrar lista de productos.
    alert("A continuación nuestra lista de productos disponibles con sus precios:");
    const listaProductos = productos.map((productos) => `${productos.nombre} - $${productos.precio}` + "\n");
    alert("Productos disponibles:" + "\n\n" + listaProductos.join(""));
    // Bucle para agregar productos al carrito.
    while (true) {
        let producto = prompt("Agrega un producto a tu carrito:");
        producto = producto.toLowerCase();

        if (productos.some((productoDisponible) => productoDisponible.nombre === producto)) {
            const precio = productos.find((productoDisponible) => productoDisponible.nombre === producto).precio;
            const unidades = parseInt(prompt("¿Cuántas unidades quieres llevar?"));

            carrito.push({ producto, unidades, precio });
            console.log(carrito);

            let detalleProducto = `Producto agregado: ${producto}\n`;
            detalleProducto += `Cantidad: ${unidades}\n`;
            detalleProducto += `Precio unitario: $${precio}\n`;
            detalleProducto += `Precio total: $${precio * unidades}\n`;
            detalleProducto += "----------------------------\n";
            alert(detalleProducto);

        } else {
            alert(`No tenemos el producto "${producto}"`);
        }
        // Se pregunta al usuario si desea seguir comprando.
        let seguirComprando = prompt("¿Desea seguir comprando? (si/no)");
        // Si el usuario elige NO y el carrito está vacío, se muestra el mensaje.
        if (seguirComprando.toLowerCase() !== "si" && carrito.length === 0) {
            alert("No hay problema, tal vez te confundiste. ¡Vuelve pronto!");
            break; // Salir del bucle si no desea seguir comprando y el carrito está vacío.
        } else if (seguirComprando.toLowerCase() !== "si") {
            // Mensaje para indicar que ya ha elegido productos.
            alert("Gracias por elegir tus productos." + "\n" + "¡Continuemos con el proceso de compra!");
            break; // Salir del bucle si no desea seguir comprando.
        }
    }
} else {
    alert("No hay problema" + " " + nombreIngresado + ".\n" + "¡Hasta pronto!");
}
// Si el carrito no está vacío, se muestra el resumen.
if (carrito.length > 0) {
    let resumenCarrito = "Resumen del carrito:\n\n";
    carrito.forEach((productoCarrito) => {
        resumenCarrito += `Producto: ${productoCarrito.producto}\n`;
        resumenCarrito += `Cantidad: ${productoCarrito.unidades}\n`;
        resumenCarrito += `Precio unitario: $${productoCarrito.precio}\n`;
        resumenCarrito += `Subtotal: $${productoCarrito.precio * productoCarrito.unidades}\n`;
        resumenCarrito += "----------------------------\n";
    });
    alert(resumenCarrito);
}
// Se calcula el total y se muestra el mensaje de despedida.
if (carrito.length > 0) {
    const total = carrito.reduce((acumulador, producto) => acumulador + producto.precio * producto.unidades, 0);
    let mensajeTotal = `El total a pagar por su compra es de: $${total}` + "\n";
    alert(mensajeTotal + "\n" + "¡Gracias por la compra!" + "\n" + "Hasta pronto" + " " + nombreIngresado + ".");
}