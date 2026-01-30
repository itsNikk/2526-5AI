//Servizio NODE (HTTP) dove:
/*
* GET /numbers : restituisamo tutti i numeri salvati sul server
* POST /numbers : aggiungiamo un numero sul server
    - cosa mi può inviare il client?
    - validazione?
* GET /numbers/n : restituisce l'ennesimo numero salvato sul server
* Una qualunque chiamata a /: reindirizza a /numbers
*/
const http = require("http")


