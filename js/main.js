//condicional
let nombre =  prompt('Por favor ingrese su nombre')
let edad = +(prompt('Ingrese su edad porfavor'))

if (edad >= 18){
    alert(`Bienvenido ${nombre}`)
}

else if (edad < 18){
    alert('No cumple los requisitos de Edad, no puede acceder.')
}

else if (edad = isNaN){
    alert('Por favor ingrese un numero')
}








// ciclo
let  numero = +(prompt("ingrese la cantidad de numeros q quiere q se impriman"))

if(numero >= 0){
    for(let i = 0; inicio <= numero; i = i++){
        console.log("iteracion del numero elegido", inicio)
    }
}else{
    console.log("ERROR")
}








//Arrays
const listaNombres = [];
let cantidad = 3;

do{
    let entrada = prompt("Ingresar nombre");
    listaNombres.push(entrada.toUpperCase());
    console.log(listaNombres.length);
}while(listaNombres.length != cantidad)

alert(`Tu lista de nombres incluye: \n${listaNombres.join(" - ")}`)








//Objetos
class Producto{
    //en constructor van solo los atributos
    constructor(nombre, precio, categoria){
        this.nombre = nombre.toUpperCase()
        this.precio = parseFloat(precio)
        this.categoria = categoria 
    }
    //fuera del constructor y dentro de las llaves de la clases van los metodos
    sumarIva(){
        this.precio *= 1.21
    }

}

let productoIngresado = prompt("ingresa el nombre de tu producto")
let precioIngresado = prompt("ingresa el precio de tu producto")
let categoriaIngresada = prompt("ingresa la categoria de tu producto")

const productoUno = new Producto(productoIngresado, precioIngresado, categoriaIngresada)
const productoDos = new Producto(productoIngresado, precioIngresado, categoriaIngresada)
const productoTres = new Producto(productoIngresado, precioIngresado, categoriaIngresada)

console.log(productoUno)
//ejecutamos la suma del iva para que el precio se actualice con iva llamando al metodo
productoUno.sumarIva
//luego llamamos al precio que ya va a estar actualizado con su respectivo iva
console.log(productoUno.precio)
