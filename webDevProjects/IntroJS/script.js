// JS è debolmente tipizzato
// in JS non è obbligatorio il ; alla fine delle righe

console.log("Hello");

// variabili
let x = 6;
let y = "ajidf"

//x = "ciuaosiad"
let z = "d"
//costanti
const PI = 3.14;

console.log("x:" + typeof (x))
x = "dksjhffjka"
console.log("x:" + typeof (x))
console.log("PI:" + typeof (PI))

// Boolean= true false

// undefined e null
//undefined è un default
// null lo dice il programmatore
let a;
console.log("a: " + typeof (a))
let b = null;
console.log("b: " + typeof (b))
console.log("b: " + b)

//Array
let arr = [1, 2, 3]
//Oggetti
let obj = {}

console.log("arr:" + typeof (arr))
console.log("obj:" + typeof (obj))

//String
let str = "NicolòBuganza"
console.log(str[2])
console.log(str.charAt(2))

console.log(str.length)

//Se la ricerca fallisce ottengo -1
console.log("IndexOf:" + str.indexOf("i"))
console.log("lastIndexOf:" + str.lastIndexOf("i"))

//Sottostringhe [start,end)
console.log("SLICE:" + str.slice(0, 6))
console.log("SLICE:" + str.substring(0, 6))

//sostituzione carattere
console.log(str.replace("o", "X"))
console.log(str.replaceAll("o", "X"))

console.log("Includes:" + str.includes("ò"));

//OPERAZIONI
// +, -, *; /, ** (elevamento a potenza), %
//BIMDAS () > ** > * > / > + > -

// ++, -- , -=, +=, *=, /=

console.log(2**5)
console.log(5 * "Ciao") //NaN = Not a Number
console.log(typeof(NaN))
console.log(2*5/3)