const URL = "https://jsonplaceholder.typicode.com/users/1"

//perchè -then() così non va bene?
/*
fetch(URL).then(e => {console.log(e);
}).catch(e => {console.log(e.message)})
*/

async function getUser(URL) {
    let response = await fetch(URL);

    if (response.ok) {
        let json = await response.json();
        console.log(json);
    } else {
        console.log("HTTP Error: " + response.status);
    }
}

getUser(URL)