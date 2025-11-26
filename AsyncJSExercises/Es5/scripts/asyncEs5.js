const URL = "https://api.open-meteo.com/v1/forecast?latitude=45.46&longitude=9.19&current_weather=true"

async function getWeather(URL) {
    let response = await fetch(URL);

    if (response.ok) {
        let json = await response.json();
        console.log(json);
    } else {
        console.log("Errore HTTP: " + response.status);
    }
}

getWeather(URL)