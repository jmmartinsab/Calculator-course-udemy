var operator = null; //variable con valor nulo para ser tomada como parametro por setOperation
var inputValueMemo = 0;

function getContentClick(event) { //pasa como referencia el objeto event por la función getContentClick, esta función captura los eventos provocados por cada click
    const value = event.target.innerHTML; //aquí en la constante value se establece el evento que provocó clicar en una tecla determinada y se asocia a su innerHTML
    filterAction(value); // conecta value con la función filterAction
}

const filterAction = value => { // esta función => ayudará a filtar cada click y enviarlo con su respectiva función, si es un numero o una operacion, o borrar etc...
    //valores del teclado
    value === "0" ? addNumberInput(0) : null; //si el valor de value igual al numero "x" (Va entre comillas porque debe devolver un string) es verdadero se ejecuta addNumberInput de lo contrario asignará null(Que en Js representa nulo o vacío) 
    value === "1" ? addNumberInput(1) : null; //todos estos son if ternarios por ej. condición(en este caso value = 1) ?(la interrogación simboliza true) valor1(si la condicion era verdead se ejecuta este valor1 en este caso addNumber imput) :(estos dos puntos sustituirían al else como "si no") valor2(si no se cumplían las condiciones anteriores se asigna valor2 en este caso null)
    value === "2" ? addNumberInput(2) : null;
    value === "3" ? addNumberInput(3) : null;
    value === "4" ? addNumberInput(4) : null;
    value === "5" ? addNumberInput(5) : null;
    value === "6" ? addNumberInput(6) : null;
    value === "7" ? addNumberInput(7) : null;
    value === "8" ? addNumberInput(8) : null;
    value === "9" ? addNumberInput(9) : null;
    value === "," ? addNumberInput(",") : null;

    value === "AC" ? resetCalculator() : null;
    value === "=" ? calculation() : null;

    //valores de operadores
    value === "+" ? setOperation("+") : null; //Define los if ternarios de las operaciones de la función set operation
    value === "-" ? setOperation("-") : null;
    value === "×" ? setOperation("*") : null;
    value === "÷" ? setOperation("/") : null;
    value === "%" ? setOperation("%") : null;
    value === "+/-" ? setOperation("+/-") : null;

}

function addNumberInput(value) { //pasa como referencia el objeto value por la función addNumberImput, está definida para que la screen muestre los números
    const inputScreen = document.getElementsByClassName('calculator__screen')[0]; //lo que hace es es obtener todos los elementos del DOM que tienen como classe calculator__screen y coger el primer elemento de todos y asignarselo a la constante.
    const inputValue = inputScreen.value; //hace que el valor de la screen sea el valor pulsado y que este quede guardado por la constante

   if (inputValue === "0" && inputValue.length === 1 && value !== ",") { //hace que si inputValue es = a 0 y que si su tamaño es igual a 1 y value es diferente a ","
       inputScreen.value = value; //sustituye el 0 por el nuevo numero
       return; // se hace para que pare la ejecución y lo afecte a la actualización de abajo.
   }

   if (inputScreen.value ==="" && value === ",") {
       inputScreen.value = 0 + value;
       return;
   }

    inputScreen.value = inputValue + value; //actualización del input que hace que el valor actual y el nuevo se sumen pero no matematicamente, si no que si pon 4 y pulsas 5 aparece 45 en screen
}

function setOperation(operator) { //pasa como referencia el objeto operator por la función operation, esta función guardará las operaciones matemáticas
    const inputScreenValue = document.getElementsByClassName("calculator__screen")[0].value; //lo que hace es es obtener todos los elementos del DOM que tienen como classe calculator__screen y coger el primer elemento de todos y asignarselo a la constante con un punto value para acceder al valor.
    this.operator = operator; //este this apunta a operator fuera de la función.

    if (inputScreenValue != 0) { // este if dice que si inputScreenValue no es igual a 0 que se ejecute calculation()
        calculation();
    }
}

function calculation() { //esta función se ocupa del calculo de las operaciones
    const inputScreen = document.getElementsByClassName("calculator__screen")[0]; //lo que hace es es obtener todos los elementos del DOM que tienen como classe calculator__screen y coger el primer elemento de todos y asignarselo a la constante.
    let valueOne = transformComaToPoint(this.inputValueMemo); 
    let valueTwo = transformComaToPoint(inputScreen.value); //esta variable selecciona el valor de la pantalla para operar y calcular
    let total = 0; // esta variable almacenará el total

    //Operación suma
    if (this.operator === "+" && inputScreen.value !== "") {// si this.operator es igual a + y el valor de la pantalla no es igual a nada
        total = valueOne + valueTwo;//actualiza la variable total
    }

    //Operación resta
    if (this.operator === "-" && inputScreen.value !== "") {
        if (valueOne !== 0) {
            total = valueOne - valueTwo;
        }else{
            total = valueTwo;
        }
    }

    //Operación multiplicar
    if (this.operator === "*" && inputScreen.value !== "") {
        if (valueOne !== 0) {
            total = valueOne * valueTwo;
        }else{
            total = valueTwo;
        }
    }

    //Operación división
    if (this.operator === "/" && inputScreen.value !== "") {
        if (valueOne !== 0) {
            total = valueOne / valueTwo;
        }else{
            total = valueTwo;
        }
    }

    //porcentaje
    if (this.operator === "%" && inputScreen.value !== "") {
        total = valueTwo / 100;
    }

    //positivo/negativo
    if (this.operator === "+/-" && inputScreen.value !== "") {
        if (valueTwo > 0) {
            total = -valueTwo;
        }
    }

    total = transformPointToComa(total); //una vez acaban los calculos transforma el punto numerico por la coma string para cuando se muestre el resultado
    this.inputValueMemo = total; //esto nos hará poder operar con el valor total derivado de una operación previa
    inputScreen.value = ""; //el inputscreen.value es igual a string, en siguientes funciones se reparará
    inputScreen.placeholder = total; //para mostrar el valor en la pantalla una vez terminan los cálculos
}

const resetCalculator = () => {
    const inputScreen = document.getElementsByClassName("calculator__screen")[0];
    inputScreen.value = 0;
    this.inputValueMemo = 0;
    this.operator = null;
}

function transformComaToPoint(value) { // pasa como referencia el objeto value por la función transformComaToPoint.Esta función es para transformar string en number, el comaToPoint es porque se aprovecha para cambiar la coma que es string por punto que es numérico
    if (typeof value !== "number") { //si el tipo de valor es diferente a number lo retorna convertido en number
        let resultTransforn = value.replace(',', '.');//este let reemplaza la coma(string) por el punto(number), para poder operar
        return parseFloat(resultTransforn); //el parsefloat de return transforma en number los string de value
    }
    return value; //si es number lo devuelve tal como estaba
}

function transformPointToComa(value) {//esta función transforma el punto en , para que una vez terminados los calculos numéricos lo muestre con la presentación correcta como string
    let resultTransforn = value.toString();
    resultTransforn = resultTransforn.replace('.', ',');
    return resultTransforn;
}

