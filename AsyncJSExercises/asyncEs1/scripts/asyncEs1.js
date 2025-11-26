const URL = 'https://jsonplaceholder.typicode.com/users/1'

//Perchè due then? Cosa sta succedendo?
fetch(URL)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => {
        console.log('Errore:', error);  // Gestisce eventuali errori
    });