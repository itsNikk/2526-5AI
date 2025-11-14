//1) fare reset
//2) pensare al pause 


let display = document.getElementById("timer")
let startBtn = document.getElementById("startBtn")

let timer = {
    seconds: 1500,
    running: false
}

//ctrl+alt+l = auto-format
function updateView() {
    let min = parseInt(timer.seconds / 60)
    let sec = timer.seconds % 60

    display.textContent = min + ":" + sec
}

//alt+shift+frecce = sposto tutta una riga sopra o sotto
function tick() {
    timer.seconds--;
    updateView()
}

function start() {
    if (!timer.running) {
        setInterval(tick, 1000);
        timer.running = true
    }
    //SetInterval(p1, p2):
    // esegui p1 ogni p2 ms
    // esegui p1 ogni p2 ms
    //SetTimeout(p1, p2):
    //esegue p1 DOPO p2 ms (ONESHOT)
}


// Se la funzione è corta allora lambda
// altrimenti normale
startBtn.addEventListener("click", start)
resetBtn.addEventListener("click", reset)


