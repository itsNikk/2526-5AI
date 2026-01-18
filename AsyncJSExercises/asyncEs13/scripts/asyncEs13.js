const URL = "https://jsonplaceholder.typicode.com/users/2"

function delay(time) {
    //Si può usare solo un parametro dei due previsti nelle promise...
    //Resolve è una funzione, quindi posso inserirla direttamente come paramtro di ST()
    return new Promise(resolve => {
        setTimeout(resolve, time)
    })
}

async function slowLoad() {
    console.log("Simulating slow loading...");

    await delay(2000);

    const response = await fetch(URL)
    const user = await response.json()

    console.log("Loading complete: " + user.name);
}

slowLoad()