const URL = "https://jsonplaceholder.typicode.com/users/999999"

async function getUser() {
    let response = await fetch(URL)

    if (response.ok) {
        let json = await response.json()
        console.log(json);
    } else {
        console.log("Errore HTTP: " + response.status);
    }
}

getUser()