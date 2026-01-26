const baseURL = "https://jsonplaceholder.typicode.com/users/"
let usersDataElem = document.getElementById("usersData")

const max = 3;

async function getUsersData() {

    for (let i = 0; i < max; i++) {
        const actualURL = baseURL + (i + 1)
        console.log(actualURL);
        let response = await fetch(actualURL);
        let json = await response.json()
        console.log(json);

        usersDataElem.innerHTML += json.id + ": " + json.name + "<br>"

    }

}

getUsersData()