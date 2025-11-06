// Prendere i nomi dal DOM tramite input text. aggiungere un bottone che, ogni volta che vien cliccato, aggiunge quanto 
// c'è nella input al vettore
let names = [];


let resObj = document.getElementById("res");
let btn = document.getElementById("btn");
//find max. le str sono array
//foreach JS 
// per ogni elem della collezione names. for non indicizzato
// [5,2,9,7]


let maxName = names[0];
// ES6
/// Funzioni anonima (lambda functions)
//function x(){} -> () => {} //programmaizone funzionale

btn.addEventListener("click", () => {
    for (let elem of names) {
        if (elem.length > maxName.length) {
            maxName = elem
        }
    }

    //show result
    resObj.textContent = maxName;
})