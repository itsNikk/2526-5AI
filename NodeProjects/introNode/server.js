//PRO TIP: CTRL+J
const http = require("http");

const PORT = 80;
const HOSTNAME = "localhost";

//Esercizio:
// Create endpoint /number: che restiuisce al client un numero random tar 1 e 100
// Create endopoint /number/N che restiuisce un numero tra 1 e N
//Metodi supportati su ogni endpoint: GET
//Non permettere: POST,DELETE -> resttuite una rappresentazione JSON del problema.

const server = http.createServer((req, res) => {

    if (req.url === "/" && req.method === "GET") {
        res.statusCode = 200;
        //HEADER NAME - MIME Type
        res.setHeader("Content-Type", "text/plain");
        res.end("Ciaoo, benvenuto!");
    } if (req.url === "/" && req.method === "POST") {
        res.statusCode = 405; //Method not allowed
        res.setHeader("Allow", "GET");
        res.end()
    } else if (req.url === "/users") {
        //Restituite un array JSON di 5 utenti
        // ogni utente è descritto da username, eta, email
    }
    else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: req.url + " Not found" }))
    }

})

server.listen(PORT, HOSTNAME, () => {
    console.log("ONLINE su http:/" + HOSTNAME + ":" + PORT);
})
