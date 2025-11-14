let num = document.getElementById("guess");
let guessBtn = document.getElementById("guessBtn");
let res = document.getElementById("res");

let rnd = Math.floor(Math.random() * 20);

let triesValues = [];
let gameOver = false;

guessBtn.addEventListener("click", () => {

    if (gameOver) return

    //Basic input validation needed...
    if (num.value === "") {
        res.textContent = "Inserire un numero"
        return
    }

    let userGuess = Number(num.value);

    if (userGuess < rnd) {
        res.textContent = "Tropppo basso";
    } else if (userGuess > rnd) {
        res.textContent = "Tropppo alto";
    } else {
        res.innerHTML = "Indovinato! <br> Tentativi totali: " + triesValues.length + "<br>" + "Tentativi: " + triesValues
        guessBtn.disabled = true
        gameOver = true
    }

    num.value = ""
    triesValues.push(userGuess)
})