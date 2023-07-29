//condicional
let nombre =  prompt('Por favor ingrese su nombre')
let edad = parseInt(prompt('Ingrese su edad porfavor'))

if (edad >= 18){
    alert('Bienvenido ' + nombre + ' Cumples los requisitos')
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
    for(let inicio = 0; inicio <= numero; inicio = inicio + 1){
        console.log("iteracion del numero elegido", inicio)
    }
}else{
    console.log("ERROR")
}



