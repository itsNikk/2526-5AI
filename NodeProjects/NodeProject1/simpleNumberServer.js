/*
* Servizio NODE (HTTP) dove:
* X GET /numbers : restituisamo tutti i numeri salvati sul server
* POST /numbers : aggiungiamo un numero sul server
    - cosa mi può inviare il client?
    - validazione?
* GET /numbers/n : restituisce l'ennesimo numero salvato sul server
* XUna qualunque chiamata a /: reindirizza a /numbers
*/
const http = require("http");

const PORT = 1533;
const HOSTNAME = "localhost"

let numbers = [1, 2, 3, 4, 5];

const server = http.createServer((req, res) => {
    /*
        console.log(req.url);
        console.log(req.url.split("/"));
    */
    let actualUrl = [];
    for (let part of req.url.split("/")) {
        if (part !== "") actualUrl.push(part)
    }
    console.log(actualUrl);

    //if(actualUrl.length === 0)
    if (req.url === "/") {
        res.statusCode = 302;
        res.setHeader("Location", "/numbers");
        return res.end();
    }


    //if (req.url === "/numbers" && req.method === "GET") {
        if (actualUrl[0] === "numbers" && req.method === "GET") {
            //restituire tutti numeri
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json") //MIME type
            return res.end(JSON.stringify({ numbers: numbers }))
        }
        
    //if (req.url === "/numbers" && req.method === "POST") {
    if (actualUrl[0] === "numbers" && req.method === "POST") {
        //Fintanto ceh il client mi sta inviando dati...
        let body = ''
        req.on("data", (chunk) => {
            body += chunk
        })

        req.on("end", () => {
            let value = Number(body);

            if (isNaN(value)) {
                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json");
                return res.end(JSON.stringify({ error: " il body deve essere un numero" }))
            }

            numbers.push(value);
            res.statusCode = 201;
            res.setHeader("Location", "/numbers/" + (numbers.length - 1))
            return res.end();
        })

        return;
    }

    //If resuorces doesn't exist...
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({ error: req.url + " not found" }))

})

server.listen(PORT, HOSTNAME, () => {
    console.log("Number service ONLINE su http://" + HOSTNAME + ":" + PORT);
})
