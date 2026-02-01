const http = require("http")
const fs = require("fs");

const PORT = 8080
const HOSTNAME = "localhost"


let data = JSON.parse(fs.readFileSync("./data.json", 'utf-8'));

function saveData() {
    fs.writeFileSync("./data.json", JSON.stringify(data))
}

function sendJSON(res, statusCode, body) {
    //Uguale a res.statusCode=statusCode 
    //res.setHeader("...")
    //Non è la mia soluzione preferita ma è valida
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(body));
}

function parseURL(url) {

}

const server = http.createServer((req, res) => {
    const method = req.method;
    const url = req.url;

    let urlParts = parseURL(url)

    console.log(method + ' ' + url);
    sendJSON(res, 404, { error: "Not Found" })
})


server.listen(PORT, HOSTNAME, () => {
    console.log("Restaurant service online on http://" + HOSTNAME + ":" + PORT);
})