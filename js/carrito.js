// Llamados del DOM
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

// funcion de cargar productos, si hay productos en el storage se agregan y añaden clases para cambiar la apariencia, luego se toma el contenedor del carrito en el html y se renderizan los productos llamados del storage creando asi las tarjetas y haciendo un append hacia el contenedor.
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

// se llama a la funcion de cargar productos, para que renderice
cargarProductosCarrito();

// se llaman a los botones de eliminar y se les agrega el onclick y la funcion.
function actualizarBotonesEliminar() {
  let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", eliminarDelCarrito);
  });
}

// funcion para eliminar productos, que recibe el evento como parametro y se busca dentro del index un producto cuyo id sea igual al del boton para buscar su posicion, luego de encontrar la posicion si hacemos click se eliminara y se volvera a cargar el carrito para que se actualice.
function eliminarDelCarrito(e) {
  const idBoton = e.currentTarget.id;
  const index = productosEnCarro.findIndex((prod) => prod.id === idBoton);

  Swal.fire({
    title: "Esta seguro que desea eliminar el producto?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Si",
    denyButtonText: `No`,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: `error`,
        title: `Producto Eliminado`,
        showConfirmButton: false,
        timer: 1000,
      });

      productosEnCarro.splice(index, 1);
      cargarProductosCarrito();
      localStorage.setItem(
        "productos-en-carrito",
        JSON.stringify(productosEnCarro)
      );
    } else if (result.isDenied) {
      Swal.fire({
        icon: `info`,
        title: `El producto no se elimino`,
        showConfirmButton: false,
        timer: 800,
      });
    }
  });
}

// funcion vaciar carrito, en esta funcion tuve que buscar ejemplos y maneras de vaciarlo ya que no encontraba la manera de hacer andar el clear.
function vaciarCarrito() {
  productosEnCarro.length = [];
  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarro)
  );
  cargarProductosCarrito();
}

// funcion para actualizar el total, se ejecuta un reduce con el precio de los productos en carro, luego cambia el valor de total convirtiendolo en el precio total del carrito.
function actualizarTotal() {
  let templateTotal = productosEnCarro.reduce(
    (ac, prod) => ac + prod.precio * prod.cantidad,
    0
  );
  total.innerText = `$${templateTotal}`;
}

// en esta funcion lo primero que hacemos es vaciar el carrito y luego damos una alerta de compra.
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

  Swal.fire({
    icon: `success`,
    title: `Compra recibida`,
    showConfirmButton: false,
    timer: 2300,
  });
}
