
console.log("test");
const btn = document.createElement("button")

btn.textContent = "click"

//btn.addEventListener("click", btnClick)
btn.addEventListener("click", () => {
    console.log("bottone cliccato");
})

function btnClick() {
    alert("cliccato")
}


document.body.append(btn)
console.log("test dopo");


// temporizzazione 
//1) setTimeout(funzione, tempoinMS) => ONESHOT
setTimeout(() => alert("Ciaooo"), 2000)
//2)  SetInterval() => ripetitivo
let timer1 = setInterval(() => { console.log("timer"); }, 1000);
setInterval(() => { console.log("GGG"); }, 500);

//fermare interval/timeout
setTimeout(() => { clearInterval(timer1) }, 3000)