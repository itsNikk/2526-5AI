//PRO TIP: CTRL+J
const http = require("http");

const PORT = 80;
const HOSTNAME = "localhost";

const server = http.createServer((req, res) => {

    if (req.url === "/") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.end("Ciaoo, benvenuto!");
    }

})

server.listen(PORT, HOSTNAME, () => {
    console.log("ONLINE su http:/" + HOSTNAME + ":" + PORT);
})
