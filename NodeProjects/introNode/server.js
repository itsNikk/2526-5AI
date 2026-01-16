//PRO TIP: CTRL+J
const http = require("http");

const PORT = 80;
const HOSTNAME = "localhost";

const server = http.createServer((req, res) => {

    if (req.url === "/") {
        res.statusCode = 200;
        //HEADER NAME - MIME Type
        res.setHeader("Content-Type", "text/plain");
        res.end("Ciaoo, benvenuto!");
    } else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: req.url + " Not found" }))
    }

})

server.listen(PORT, HOSTNAME, () => {
    console.log("ONLINE su http:/" + HOSTNAME + ":" + PORT);
})
