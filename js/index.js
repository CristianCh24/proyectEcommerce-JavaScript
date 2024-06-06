const contenedorTarjetas = document.getElementById("productos-container");

/** Crea las tarjetas de productos teniendo en cuenta la lista en data.json */
function crearTarjetaProducto(producto) {
  const nuevaMercaderia = document.createElement("div");
  nuevaMercaderia.classList.add("tarjeta-producto");
  nuevaMercaderia.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombre}">
    <h3>${producto.nombre}</h3>
    <p class="precio">$${producto.precio}</p>
    <button>Agregar al carrito</button>`;
  nuevaMercaderia.querySelector("button").addEventListener("click", () => agregarAlCarrito(producto));
  return nuevaMercaderia;
}

function agregarTarjetasAlContenedor(tarjetas) {
  const fragmento = document.createDocumentFragment();
  tarjetas.forEach(tarjeta => {
    fragmento.appendChild(tarjeta);
  });
  contenedorTarjetas.appendChild(fragmento);
}

async function crearTarjetasProductosInicio() {
  // Fetch product data from "data.json"
  const response = await fetch("./json/data.json");
  const productos = await response.json();

  // Create and append product cards
  const tarjetas = productos.map(crearTarjetaProducto);
  agregarTarjetasAlContenedor(tarjetas);
}

// Call the function to create and display product cards
crearTarjetasProductosInicio();