const express = require("express") //import 

const PORT = 3000;

//1) creare il server
const server = express()

server.use(express.json())

let clienti = [
    { id: 1, nome: 'Han Solo', specie: 'umano', credito: 1500 },
    { id: 2, nome: 'Greedo', specie: 'rodiano', credito: 300 },
    { id: 3, nome: 'Chewbacca', specie: 'wookiee', credito: 900 },
    { id: 4, nome: 'Hammerhead', specie: 'ithoriano', credito: 200 }
];


//https://starwars.fandom.com/wiki/Spotchka
let bevande = [
    { id: 1, nome: 'Corellian Ale', prezzo: 50, gradazione: 8 },
    { id: 2, nome: 'Juri Juice', prezzo: 80, gradazione: 15 },
    { id: 3, nome: 'Spotchka', prezzo: 120, gradazione: 20 },
    { id: 4, nome: 'Merenzane Gold', prezzo: 200, gradazione: 5 }
];


//MW globale che stampa info per ogni richiesta (REQ)
server.use((req, res, next) => {
    console.log("[GL.MW] " + req.method + " - " + req.url);

    next()
})

server.use("/clienti", (req, res, next) => {
    //controlla se header custom esiste
    //prendo un header
    const tessera = req.headers["x-tessera"]

    // ma davvero sto controllando quello che voglio...?
    if (!tessera) {
        //Possibile 403...
        return res.status(400).json({ err: " niente tessera, niente ingresso." })
    }

    next()
})

server.use("/clienti", (req, res, next) => {
    // leggere x-gettoni 
    const gettoni = parseInt(req.headers["x-gettoni"])

    // se esiste (sto controllando davvero l'esistenza?) associa il valore in req.campo
    if (gettoni) {
        req.gettoni = gettoni
    } else {
        req.gettoni = 0;
    }

    console.log(req.gettoni);

    next();
})

server.get("/clienti", (req, res) => {
    res.status(200).json(clienti)
})

//Route - rotta: gestita dal route handler
server.get("/clienti/:id", (req, res) => {
    let idCliente = parseInt(req.params.id);
    //TODO (tu-dù): Check se id è davvero un numero intero
    //TODO: ricerca se ho davvero quel cliente
    for (let cliente of clienti) {
        if (cliente.id === idCliente) {
            return res.status(200).json(cliente);
        }
    }

    return res.status(404).json({ "msg": "Cliente non trovato" })
})

server.post("/clienti", (req, res) => {
    let name = req.body.nome;
    //se ci sono più campi devo controllarli tutti

    if (!name) return res.status(400).json({ "msg": "errore client" })
    clienti.push({
        id: clienti.length,
        nome: name
    })
})

//listen - exc EADDRINUSE se porta già occupata
server.listen(PORT, () => {
    console.log("ONLINE");
})
