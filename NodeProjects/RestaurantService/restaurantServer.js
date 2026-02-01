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

// Input: "/restaurants/1/reviews?sort=date"
// Output: {
//   parts: ['', 'restaurants', '1', 'reviews'],
//   query: { sort: 'date' }
// }
function parseURL(url) {

    let qIndex = url.indexOf("?");
    let path = []
    let queryString = url.split("?");

    if (qIndex !== -1) {
        path = url.substring(0, qIndex);
        queryString = url.substring(qIndex + 1);
    } else {
        path = url;
        queryString = '';
    }

    let parts = [];
    let pathParts = path.split('/');
    for (let i = 0; i < pathParts.length; i++) {
        if (pathParts[i] !== '') {
            parts.push(pathParts[i]);
        }
    }

    let query = {};
    if (queryString !== '') {
        let pairs = queryString.split('&');
        for (let i = 0; i < pairs.length; i++) {
            let pair = pairs[i].split('=');
            query[pair[0]] = pair[1];
        }
    }

    return { parts: path, query: query }
}

const server = http.createServer((req, res) => {
    const method = req.method;
    const url = req.url;

    let urlParts = parseURL(url)

    console.log(method + ' ' + url);
    console.log(urlParts);

    sendJSON(res, 404, { error: "Not Found" })
})


server.listen(PORT, HOSTNAME, () => {
    console.log("Restaurant service online on http://" + HOSTNAME + ":" + PORT);
})