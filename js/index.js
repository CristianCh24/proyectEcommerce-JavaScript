const contenedorTarjetas = document.getElementById("productos-container");

// Crea las tarjetas de productos teniendo en cuenta la lista en data.json //
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
  // Obtener datos del producto "data.json" //
  const response = await fetch("./json/data.json");
  const productos = await response.json();

  // Create and append product cards
  const tarjetas = productos.map(crearTarjetaProducto);
  agregarTarjetasAlContenedor(tarjetas);
}

// Llama a la funcion para crear y mostrar tarjetas de productos //
crearTarjetasProductosInicio();

// Función para mostrar la alerta de bienvenida //
function showWelcomeAlert() {
  // Verifica si el usuario viene del carrito //
  const referer = document.referrer;
  if (referer.includes('cart.html')) {
    // No muestra la alerta de bienvenida //
    return;
  }

  // Verifica si el nombre del usuario ya está almacenado //
  const userName = localStorage.getItem('userName');

  if (!userName) {
    // Solicita el nombre del usuario //
    Swal.fire({
      title: '¡Bienvenido al X-Online!',
      text: '¿Cómo te llamas?',
      input: 'text',
      inputPlaceholder: 'Ingresa tu nombre de Usuario',
      showCancelButton: false,
      confirmButtonText: 'Guardar',
      allowOutsideClick: false,
      preConfirm: (name) => {
        if (!name) {
          Swal.showValidationMessage('Por favor, ingresa tu nombre de Usuario');
          return false;
        }
        return name;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Guarda el nombre en localStorage //
        localStorage.setItem('userName', result.value);
        // Muestra la alerta de bienvenida personalizada //
        Swal.fire({
          title: `¡Bienvenido, ${result.value}!`,
          text: '¿Que compraremos hoy?',
          icon: 'info',
          confirmButtonText: 'Cerrar'
        });
      }
    });
  } else {
    // Muestra la alerta de bienvenida personalizada //
    Swal.fire({
      title: `¡Bienvenido de nuevo, ${userName}!`,
      text: 'Gracias por volver, continuemos...',
      icon: 'info',
      confirmButtonText: 'Cerrar'
    });
  }
}

// Llama a la función cuando la página haya cargado completamente //
window.onload = showWelcomeAlert;

// Obtener el botón de reinicio //
const resetButton = document.getElementById('resetButton');

// Agregar un evento de clic al botón de reinicio //
resetButton.addEventListener('click', () => {
  // Eliminar el nombre de usuario del localStorage //
  localStorage.removeItem('userName');
  // Recargar la página para aplicar los cambios //
  location.reload();
  reiniciarCarrito();
});
