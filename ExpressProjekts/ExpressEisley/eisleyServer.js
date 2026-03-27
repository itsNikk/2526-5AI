const express = require("express")
// Creo il servizio...
const app = express()

app.use(express.json())

let clienti = [
    { id: 1, nome: "Han Solo", specie: "umano", credito: 1500 },
    { id: 2, nome: "Greedo", specie: "rodiano", credito: 350 },
    { id: 3, nome: "Chewbecca", specie: "wookie", credito: 840 },
    { id: 4, nome: "ObiWan", specie: "umano", credito: 200 }
]

let nexClientId = clienti.length + 1

// MW = (req,res,next)
// Global: printare methodo e url della res
app.use((req, res, next) => {

    console.log(req.method + " : " + req.url);

    next()
})

app.use("/clienti", (req, res, next) => {
    const tesseraHeader = req.headers["x-tessera"]
    console.log(tesseraHeader);

    if (!tesseraHeader) {
        return res.status(403).json({ error: "Nessun tesserino, nessun accesso." })
    }

    next()
})

app.use("/clienti", (req, res, next) => {
    // analizza l'header x-gettoni
    // se esiste ed è un numero maggiore di 0, inseriscilo in una var req.gettoni
    //altrimenti imposatala di default a 0
})

app.get("/clienti", (req, res) => {
    res.status(200).json(clienti)
})

//Aprite un endpoint GET /clienti/:id che rstituisce il cliente con id pari a il p.dinamico id
//Aprite un endpoint POST /clienti inserisce un nuovo cliente
// bisogna controllare che non esista un cliente con lo stesso nome già registrato

app.listen(3000, () => {
    console.log("Cantina aperta su porta " + 3000);
})