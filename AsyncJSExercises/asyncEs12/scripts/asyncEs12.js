const popResElem = document.getElementById("populationRes")


async function getCountryPopulation(countryName) {
    const URL = "https://restcountries.com/v3.1/name/" + countryName

    let response = await fetch(URL)

    if (response.ok) {
        let json = await response.json()
        //Estrema atttenzione alla struttura della response. Leggere il body completamente prima di estrarre dati.
        //console.log(json);
        popResElem.textContent = "Pooplazione " + json[0].name.common + ": " + json[0].population
    }
}

getCountryPopulation("germany")