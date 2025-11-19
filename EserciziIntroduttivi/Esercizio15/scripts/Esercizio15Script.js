let resElem = document.getElementById("res")

function stampaNumeri(da, a) {
    //Non mi serve questo TimerId fuori da questa funzione
    const interval = setInterval(() => {
        if (da > a) {
            //ESTREMAMENTE IMPORTANTE, perchè?
            clearInterval(interval)
            return
        }
        resElem.textContent += da++ + " "
    }, 1000)
}

stampaNumeri(10, 17)