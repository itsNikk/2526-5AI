const url = "https://jsonplaceholder.typicode.com/usersXXX/1"

fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log("Errore nella richiesta: " + err.message))