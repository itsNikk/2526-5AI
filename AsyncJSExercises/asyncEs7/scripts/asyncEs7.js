const baseURL = "https://jsonplaceholder.typicode.com/users/"

let data = document.getElementById("data")

async function getUser(URL) {

    let response = await fetch(URL)
    //console.log(response);

    if (response.ok) {
        //console.log("OK");
        let json = await response.json()

        //OK ma troppo banale
        //data.textContent = json;


        //OK, meglio ma troppo banale
        //data.textContent = JSON.stringify(json);

        // ok ci sta...
        data.innerHTML += json.name.split(" ")[1].toUpperCase() + "<br>";

    } else {
        console.log("Errore HTTP: " + response.status);
    }


}

for (let i = 1; i <= 15; i++) {
    const urlToCall = baseURL + i

    getUser(urlToCall);

}