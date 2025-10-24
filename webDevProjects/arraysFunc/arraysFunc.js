// prenda 'res' e ci metta dentro una str
//Controller (WIP)

//??????
let output = document.getElementById("res")
let inputObj = document.getElementById("input")
let btn = document.getElementById("btn")

output.textContent = "Ciao"
//InnerHTml= aggiunge testo ed interpreta eventuali tag HTML
//RISCHIOSO!!! Usare solo... 
output.innerHTML += " <strong>Mondo"

//prendi l'input dell'utente e mettilo nel paragrafo
btn.addEventListener("click", getInputAndShow)

//prendere un numero dall'utente -> n+5
function getInputAndShow() {
    let tmp = inputObj.value
    if(tmp === ""){
        return
    }

    let v = Number(tmp)

    //Guardia
    if (isNaN(v)) {
        return 
    }

    console.log(typeof v);

    output.textContent = v + ": " + (v + 5)
} 


