let productosEnCarro = JSON.parse(localStorage.getItem("productos-en-carrito"));
const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector(
  "#contenedor-carrito-productos"
);
const carritoAcciones = document.querySelector("#carrito-acciones");
const carritoComprado = document.querySelector("#carrito-comprado");
const botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

const btnVaciar = document.getElementById("btnVaciar");
btnVaciar.addEventListener("click", vaciarCarrito);

const contenedorTotal = document.querySelector("#total");

const btnComprar = document.querySelector(".carrito-acciones-comprar");
btnComprar.addEventListener("click", comprarCarrito);

function cargarProductosCarrito() {
  if (productosEnCarro && productosEnCarro.length > 0) {
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.remove("disabled");
    carritoAcciones.classList.remove("disabled");
    carritoComprado.classList.add("disabled");

    contenedorCarritoProductos.innerHTML = "";

    productosEnCarro.forEach((prod) => {
      const div = document.createElement("div");
      div.classList.add("carrito-producto");
      div.innerHTML = `
                        <img class="carrito-img" src="${prod.imagen}" alt="${
        prod.titulo
      }">
    
                        <div class="carrito-producto-titulo">
                            <small>Titulo</small>
                            <h3>${prod.titulo}</h3>
                        </div>
    
                        <div class="carrito-producto-cantidad">
                            <small>Cantidad</small>
                            <p>${prod.cantidad}</p>
                        </div>
    
                        <div class="carrito-producto-precio">
                            <small>precio</small>
                            <p>$${prod.precio}</p>
                        </div>
    
                        <div class="carrito-producto-total">
                            <small>Subtotal</small>
                            <p>$${prod.precio * prod.cantidad}</p>
                        </div>
                        <button class="carrito-producto-eliminar" id="${
                          prod.id
                        }"><i class="bi bi-trash-fill"></i></button>
                    `;

      contenedorCarritoProductos.append(div);
    });
  } else {
    contenedorCarritoVacio.classList.remove("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    carritoAcciones.classList.add("disabled");
    carritoComprado.classList.add("disabled");
  }

  actualizarBotonesEliminar();
  actualizarTotal();
}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
  let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", eliminarDelCarrito);
  });
}

function eliminarDelCarrito(e) {
  const idBoton = e.currentTarget.id;
  const index = productosEnCarro.findIndex((prod) => prod.id === idBoton);

  productosEnCarro.splice(index, 1);
  cargarProductosCarrito();

  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarro)
  );
}

function vaciarCarrito() {
  productosEnCarro.length = 0;
  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarro)
  );
  cargarProductosCarrito();
}

function actualizarTotal() {
  let templateTotal = productosEnCarro.reduce(
    (ac, prod) => ac + prod.precio * prod.cantidad,
    0
  );
  total.innerText = `$${templateTotal}`;
}

function comprarCarrito() {
  productosEnCarro.length = 0;
  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarro)
  );
  cargarProductosCarrito();

  contenedorCarritoVacio.classList.add("disabled");
  contenedorCarritoProductos.classList.add("disabled");
  carritoAcciones.classList.add("disabled");
  carritoComprado.classList.remove("disabled");

  alert("Muchas gracias por tu compra!!");
}
