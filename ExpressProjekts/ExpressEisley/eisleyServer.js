const express = require("express") //import 

const PORT = 3000;

//1) creare il server
const server = express()

server.use(express.json())

//MW globale che stampa info per ogni richiesta (REQ)
server.use((req, res, next) => {
    console.log("[GL.MW] " + req.method + " - " + req.url);

    next()
})

server.use("/clienti", (req, res, next) => {
    //controlla se header custom esiste
    //prendo un header
    const tessera = req.headers["x-tessera"]

    if (!tessera) {
        //Possibile 403...
        return res.status(400).json({ err: " niente tessera, niente ingresso." })
    }

    next()
})

server.use("/clienti", (req, res, next) => {
    // leggere x-gettoni 
    const gettoni = parseInt(req.headers["x-gettoni"])
    // se esiste associa il valore in req.campo
    if (gettoni) {
        req.gettoni = gettoni
    } else {
        req.gettoni = 0;
    }

    console.log(req.gettoni);

    next();
})

server.get("/clienti", (req, res) => {
    res.status(200).json({ msg: "test" })
})

//listen - exc EADDRINUSE se porta già occupata
server.listen(PORT, () => {
    console.log("ONLINE");
})
