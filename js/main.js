const productos = [
    //arigos
    {
        id: "abrigo-01",
        titulo: "Abrigo 01",
        imagen: "./img/abrigos/01.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 1000
    },
    {
        id: "abrigo-02",
        titulo: "Abrigo 02",
        imagen: "./img/abrigos/02.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 1000
    },
    {
        id: "abrigo-03",
        titulo: "Abrigo 03",
        imagen: "./img/abrigos/03.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 1000
    },
    {
        id: "abrigo-04",
        titulo: "Abrigo 04",
        imagen: "./img/abrigos/04.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 1000
    },
    {
        id: "abrigo-05",
        titulo: "Abrigo 05",
        imagen: "./img/abrigos/05.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 1000
    },
    //pantalones
    {
        id: "pantalo-01",
        titulo: "pantalon 01",
        imagen: "./img/pantalones/01.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 5000
    },    {
        id: "pantalo-02",
        titulo: "pantalon 02",
        imagen: "./img/pantalones/02.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 5000
    },
    {
        id: "pantalo-03",
        titulo: "pantalon 03",
        imagen: "./img/pantalones/03.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 5000
    },
    {
        id: "pantalo-04",
        titulo: "pantalon 04",
        imagen: "./img/pantalones/04.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 5000
    },
    {
        id: "pantalo-05",
        titulo: "pantalon 05",
        imagen: "./img/pantalones/05.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 5000
    },
    //camisetas
    {
        id: "camiseta-01",
        titulo: "camiseta 01",
        imagen: "./img/camisetas/01 .jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 3000
    },
    {
        id: "camiseta-02",
        titulo: "camiseta 02",
        imagen: "./img/camisetas/02.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 3000
    },
    {
        id: "camiseta-03",
        titulo: "camiseta 03",
        imagen: "./img/camisetas/03.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 3000
    },
    {
        id: "camiseta-04",
        titulo: "camiseta 04",
        imagen: "./img/camisetas/04.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 3000
    },
    {
        id: "camiseta-05",
        titulo: "camiseta 05",
        imagen: "./img/camisetas/05.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 3000
    }
];


const contenedorProductos = document.querySelector(".contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#tituloPrincipal");
const botonesAgregar = document.querySelectorAll(".producto-agregar");
const numeroDelCarrito = document.querySelector("#numero-carrito")

function cargarProductos(productosElegidos){
    contenedorProductos.innerHTML = ""
    
    productosElegidos.forEach(producto =>{

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-img" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-info">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
            <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })
}

cargarProductos(productos)

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (evento) => {

        botonesCategorias.forEach(boton =>{boton.classList.remove("active")})

        evento.currentTarget.classList.add("active");
        
        if(evento.currentTarget.id != "todos"){
            const productoCategoria = productos.find(prod => prod.categoria.id === evento.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

            const productosBoton = productos.filter(producto => producto.categoria.id === evento.currentTarget.id)
            cargarProductos(productosBoton);
    
        }else{
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos)
        }
    })
    actualizarBotonesAgregar();
})

function actualizarBotonesAgregar(){
    let botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito)
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if(productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumeroCarrito();
}else{
    productosEnCarrito = [];
}

function agregarAlCarrito(e){

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(prod => prod.id === idBoton);

    if(productosEnCarrito.some(prod => prod.id === idBoton)){
        const index = productosEnCarrito.findIndex(prod => prod.id === idBoton);
        productosEnCarrito[index].cantidad++;
    }else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumeroCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumeroCarrito(){
    let numeroCarrito = productosEnCarrito.reduce((ac, prod) => ac + prod.cantidad, 0); 
    numeroDelCarrito.innerText = numeroCarrito;
}







