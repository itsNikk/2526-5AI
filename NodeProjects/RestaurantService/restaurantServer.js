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

    return { parts: parts, query: query }
}

const server = http.createServer((req, res) => {
    const method = req.method;
    const url = req.url;
    console.log(method + ' ' + url);

    let parsedUrl = parseURL(url)
    const parts = parsedUrl.parts;
    const query = parsedUrl.query;

    console.log(parsedUrl);

    if (method === "GET" && parts.length === 0) {
        sendJSON(res, 200, { message: "Welcome to TripAdvisor" })
        return;
    }

    if (method === "GET" && parts.length === 1 && parts[0] === "restaurants") {
        let restaurants = data.restaurants;

        if (query.cucina) {
            let filteredRes = []
            for (const restaurant of restaurants) {
                if (restaurant.cucina === query.cucina) {
                    filteredRes.push(restaurant);
                }
            }
            restaurants = filteredRes
        }


        sendJSON(res, 200, restaurants)
        return
    }


    ///restaurants/{id}
    if (method === "GET" && parts.length === 2 && parts[0] === "restaurants") {
        let restaurantId = Number(parts[1]);

        let restaurant = JSON.parse(JSON.stringify(findRestaurantById(restaurantId)));
        if (restaurant) {
            //Loop over reviews
            let avg = 0;
            let restReviews = 0;
            for (const review of data.reviews) {
                if (restaurantId === review.id_ristorante) {
                    restReviews++;
                    avg += review.voto;
                }
            }
            //TODO: Occhio alle divisioni per zero
            avg = avg / restReviews;
            restaurant.voto_medio = avg;
            sendJSON(res, 200, restaurant)
        } else sendJSON(res, 404, { error: "not found" })
        return
    }

    // /restaurants/{id}/reviews
    if (method === "GET" && parts.length === 3 && parts[0] === "restaurants" && parts[1] === "reviews") {
        let restaurant = findRestaurantById(Number(parts[1]));
        if (!restaurant) {
            sendJSON(res, 404, { error: "not found" })
            return
        }

        let restReviews = []
        for (const review of data.reviews) {
            if (review.id_ristorante === restaurant.id) {
                restReviews.push(review)
            }
        }
        sendJSON(res, 200, restReviews)
        return
    }


    //Res doesn't exist
    sendJSON(res, 404, { error: "Not Found" })
})


server.listen(PORT, HOSTNAME, () => {
    console.log("Restaurant service online on http://" + HOSTNAME + ":" + PORT);
})

function findRestaurantById(restaurantId) {
    for (const restaurant of data.restaurants) {
        if (restaurant.id === restaurantId) {
            return restaurant;
        }
    }
    return null;
}