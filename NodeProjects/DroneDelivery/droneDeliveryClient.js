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
                }, priority: "high"
            }
        )
    })

    return await res.json()

}

async function getCriticalDrones() {
    const response = await fetch("http://localhost:3000/drones");
    const data = await response.json();

    //console.log(data);
    //console.log(data.drones);

    //For each...
    let droneObj = []
    for (const drone of data.drones) {
        const isBatteryCritical = drone.battery < 30
        if (isBatteryCritical || drone.status === "maintenance" || drone.maintenance.issues.length >= 1) {
            //console.log(drone);
            droneObj.push({
                id: drone.id,
                battery: drone.battery,
                status: drone.status,
                issuesCount: drone.maintenance.issues.length
            })
            console.log(droneObj);
        }
    }

    //Ordinamento


}

getCriticalDrones()

async function printResults() {

    /*let task1Result = await getDrones()
    console.log(task1Result);

    let task2 = await postNewDelivery()
    console.log(task2);
    */
}

printResults()


