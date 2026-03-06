/* Scriviamo una funzione che
* 1) recuperata tutti i droni
* 2) filtra solo quelli disponibili
* 3) restituisce un array con gli ID dei Droni disponibili
*/

async function getDrones() {
    // Il pacchetto HTTP del server
    let dronesResponse = await fetch("http://localhost:3000/drones");
    let dronesBody = await dronesResponse.json();
    //console.log(dronesBody.drones);

    //Per ogni drone...
    let availableDronesIds = []
    for (const drone of dronesBody.drones) {
        if (drone.status === "available") {
            availableDronesIds.push(drone.id)
        }
    }

    return availableDronesIds
}

/*
    Scrivere funzione che:
    * 1) Crea una nuova consegna
    * 2) crea il pacchetto giusto
    * 3) Restituisce l'oggetto consegnato creato (con il nuoov ID)
*/
async function postNewDelivery() {
    let res = await fetch("http://localhost:3000/deliveries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
            {
                destination: {
                    address: "via asan giovanni bosco 44",
                    zone: "south"
                }, package: {
                    weight: 3.5,
                    category: "electronics",
                    fragile: false
                }, priority:"high"
            }
        )
    })

    return await res.json()

}


async function printResults() {

    let task1Result = await getDrones()
    console.log(task1Result);

    let task2 = await postNewDelivery()
    console.log(task2);
    
}

printResults()


