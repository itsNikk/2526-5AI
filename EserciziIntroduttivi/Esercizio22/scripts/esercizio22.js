async function fetchUsers(URL) {
    let response = await fetch(URL);

    if (response.ok) {
        let json = await response.json()
        console.log(json);
    } else {
        console.log("HTTP Error: " + response.status);

    }
}


fetchUsers("https://dummyjson.com/users")