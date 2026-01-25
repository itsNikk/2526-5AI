const URL = "https://pokeapi.co/api/v2/pokemon/pikachu"

fetch(URL)
    .then(res => res.json())
    .then(data => extractFeatures(data))
    .then(output => console.log(output[0] + ", " + output[1] + "kg"))
    .catch(err => console.log(err.message));

//Per comodità. Se in futuro dovrò estrarre altre feature modifcherò più facilmente una funzione invece che un .then()
function extractFeatures(data) {
    //console.log(data);
    return [data.name, data.weight]
}