//PRO TIP: CTRL+J
const http = require("http");

const PORT = 80;
const HOSTNAME = "localhost";

const users = [
    { "username": "luca_rossi", "eta": 28, "email": "luca.rossi@example.com" },
    { "username": "marta_bianchi", "eta": 34, "email": "marta.bianchi@example.com" },
    { "username": "giulio_verdi", "eta": 22, "email": "giulio.verdi@example.com" },
    { "username": "chiara_neri", "eta": 41, "email": "chiara.neri@example.com" },
    { "username": "paolo_ferri", "eta": 30, "email": "paolo.ferri@example.com" }
]

//Esercizio:
// Create endpoint /number: che restiuisce al client un numero random tar 1 e 100
// Create endopoint /number/N che restiuisce un numero tra 1 e N
//Metodi supportati su ogni endpoint: GET
//Non permettere: POST,DELETE -> restituite una rappresentazione JSON del problema.

const server = http.createServer((req, res) => {
    const url = new URL(req.url, "http://" + req.headers.host)
    
    const rawParts = url.pathname.split("/")
    let parts = [];

    for (let i = 0; i < rawParts.length; i++) {
        if (rawParts[i] !== "") {
            parts.push(rawParts[i]);
        }
    }

    if (req.url === "/" && req.method === "GET") {
        //HEADER NAME - MIME Type
        sendText(res, 200, "Ciao, Benvenuto")
    } else if (req.url === "/" && req.method === "POST") {
        res.statusCode = 405; //Method not allowed
        res.setHeader("Allow", "GET");
        res.end()
    } else if (req.url === "/users") {
        //Restituite un array JSON di 5 utenti
        // ogni utente è descritto da username, eta, email
        sendJSON(res, 200, JSON.stringify(users))
    } else if (parts[0] === "/number" && req.method !== "GET") {
        sendError(res, 405, "Method not allowed", "GET");
        return
    } else if (parts.length === 1 && parts[0] === "number" && req.method === "GET") {
        //give a number to client
        const n = parseInt(Math.random() * 100) + 1;
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        //NON SI PUO' INVIARE ALTRO SE NON STRINGHE.
        res.end(n.toString());
    } else if (parts.length === 2 && parts[0] === "number" && req.method === "GET") {
        const max = Number(parts[1]);

        if (isNaN(max) || max <= 0) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "N must be positive number" }))
            return;
        }

        const n = parseInt(Math.random() * max) + 1;
        sendText(res, 200, n.toString())
    }
    else {
        sendError(res, 404, req.url + " Not Found")
    }

})

server.listen(PORT, HOSTNAME, () => {
    console.log("ONLINE su http:/" + HOSTNAME + ":" + PORT);
})


function sendJSON(res, statusCode, data) {
    res.statusCode = statusCode;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
}
function sendText(res, statusCode, data) {
    res.statusCode = statusCode;
    res.setHeader("Content-Type", "text/plain");
    res.end(data);
}

function sendError(res, statusCode, message, allowed = null) {
    const error = { error: message };
    if (allowed) error.allowed = allowed;
    sendJSON(res, statusCode, error);
}

function sendMethodNotAllowed(res, allowedMethods) {
    res.statusCode = 405;
    res.setHeader("Allow", allowedMethods.join(", "));
    sendError(res, 405, "Method not allowed", allowedMethods);
}