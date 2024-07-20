const contenedorTarjetas = document.getElementById("cart-container");
const cantidadElement = document.getElementById("cantidad");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesContainer = document.getElementById("totales");

/** Reinicia el carrito */
function reiniciarCarrito() {
  localStorage.removeItem("productos");
  cantidadElement.innerText = "0";
  precioElement.innerText = "0";
}

/** Crea las tarjetas de productos teniendo en cuenta lo guardado en localStorage */
function crearTarjetasProductosCarrito() {
  contenedorTarjetas.innerHTML = "";
  const productos = JSON.parse(localStorage.getItem("productos"));
  if (productos && productos.length > 0) {
    productos.forEach((producto) => {
      const nuevaTarjeta = document.createElement("div");
      nuevaTarjeta.classList = "item";
      nuevaTarjeta.innerHTML = `
        <a href="#"><img src="Imagenes/Productos/${producto.nombre}.png" alt="${producto.nombre}"></a>
        <div class="info-product">
          <h3>${producto.nombre}</h3>
          <span>$${producto.precio}</span>
          <div>
            <button class="restar">-</button>
            <span class="cantidad">${producto.cantidad}</span>
            <button class="sumar">+</button>
          </div>
        </div>
      `;
      contenedorTarjetas.appendChild(nuevaTarjeta);
      nuevaTarjeta.querySelector(".restar").addEventListener("click", () => {
        const cantidadElement = nuevaTarjeta.querySelector(".cantidad");
        cantidadElement.innerText = restarAlCarrito(producto);
        crearTarjetasProductosCarrito();
        actualizarTotales();
      });
      nuevaTarjeta.querySelector(".sumar").addEventListener("click", () => {
        const cantidadElement = nuevaTarjeta.querySelector(".cantidad");
        cantidadElement.innerText = agregarAlCarrito(producto);
        actualizarTotales();
      });
    });
  }
  revisarMensajeVacio();
  actualizarTotales();
  actualizarNumeroCarrito();
}

crearTarjetasProductosCarrito();

/** Actualiza el total de precio y unidades de la página del carrito */
function actualizarTotales() {
  const productos = JSON.parse(localStorage.getItem("productos"));
  let cantidad = 0;
  let precio = 0;
  if (productos && productos.length > 0) {
    productos.forEach((producto) => {
      cantidad += producto.cantidad;
      precio += producto.precio * producto.cantidad;
    });
  }
  cantidadElement.innerText = cantidad;
  precioElement.innerText = precio;
  if (precio === 0) {
    reiniciarCarrito();
    revisarMensajeVacio();
  }
}

document.getElementById("reiniciar").addEventListener("click", () => {
  contenedorTarjetas.innerHTML = "";
  reiniciarCarrito();
  revisarMensajeVacio();
});

/** Muestra o esconde el mensaje de que no hay nada en el carrito */
function revisarMensajeVacio() {
  const productos = JSON.parse(localStorage.getItem("productos"));
  const carritoVacioElement = document.getElementById("carrito-vacio");
  const totalesContainer = document.getElementById("totales");

  if (!productos || productos.length === 0) {
    carritoVacioElement.classList.remove("escondido");
    if (totalesContainer) {
      totalesContainer.classList.add("escondido");
    }
  } else {
    carritoVacioElement.classList.add("escondido");
    if (totalesContainer) {
      totalesContainer.classList.remove("escondido");
    }
  }
}

  
  document.addEventListener("DOMContentLoaded", function() {
    const comprarBtn = document.getElementById("comprar");
    
    // Agregar evento de clic al botón "Comprar"
    comprarBtn.addEventListener("click", function() {
      // Redirigir al usuario a la página de pago
      window.location.href = "Pago.html";
      
      // Luego, puedes reiniciar el carrito si lo deseas
      reiniciarCarrito();
    });
  });
  
  /** Reinicia el carrito */
  function reiniciarCarrito() {
    // Eliminar los productos del carrito en el localStorage
    localStorage.removeItem("productos");
    
    // Actualizar el contador del carrito en el header
    actualizarNumeroCarrito();
    
    // Actualizar el contenido del carrito en la página
    crearTarjetasProductosCarrito();
  }
