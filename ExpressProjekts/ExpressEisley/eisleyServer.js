const express = require("express")
// Creo il servizio...
const app = express()

let clienti = [
    { id: 1, nome: "Han Solo", specie: "umano", credito: 1500 },
    { id: 2, nome: "Greedo", specie: "rodiano", credito: 350 },
    { id: 3, nome: "Chewbecca", specie: "wookie", credito: 840 },
    { id: 4, nome: "ObiWan", specie: "umano", credito: 200 }
]

let nexClientId = clienti.length + 1

app.listen(3000, () => {
    console.log("Cantina aperta su porta " + 3000);
})