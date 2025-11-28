const URL = "https://jsonplaceholder.typicode.com/users/1szsdfgbsdfgbs"

let resElem = document.getElementById("res")

fetch(URL)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            //Error= Class Exception di Java
            throw new Error("Errore: " + response.status);
        }
    })
    .then(data => {
        resElem.textContent = JSON.stringify(data)
    })
    .catch(error => resElem.textContent = error.message)



let x = new Promise((resolve, reject) => {
    setTimeout(() => { reject(new Error("hhhhh")) }, 3000)
})

x.catch(error => console.log(error))