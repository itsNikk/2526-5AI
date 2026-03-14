const BASE_URL = "http://localhost:3000"

async function rechargeDrones() {
    const allDronesResponse = await fetch(BASE_URL + "/drones")
    const allDronesResponseData = await allDronesResponse.json()

    let risultati = []
    for (const drone of allDronesResponseData.drones) {
        if (drone.battery < 40) {
            let actualBatteryLevel = drone.battery

            const putResponse = await fetch(BASE_URL + '/drones/' + drone.id + '/battery', {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ charge: 30 })
            });

            const putData = await putResponse.json();
            const batteryLevelAfterRecharge = putData.drone.battery;

            risultati.push({
                droneId: drone.id,
                batteryPrima: actualBatteryLevel,
                batteryDopo: batteryLevelAfterRecharge
            });
        }
    }

    return risultati;
}

rechargeDrones().then((e) => {
    console.log(e);
})