const BASE_URL = "http://localhost:3000"

async function assegnaDroneZona() {
    const deliveriesResponse = await fetch(BASE_URL + '/deliveries');
    const deliveriesData = await deliveriesResponse.json();

    const dronesResponse = await fetch(BASE_URL + '/drones');
    const dronesData = await dronesResponse.json();

    const assigned = [];
    const notAssigned = [];

    const droniAssegnati = [];

    for (const delivery of deliveriesData.deliveries) {
        if (delivery.status === 'pending') {
            let trovatoMatch = false;

            for (const drone of dronesData.drones) {
                // Verifica che il drone non sia già stato assegnato
                let giaAssegnato = false;
                for (const droneAssegnatoId of droniAssegnati) {
                    if (droneAssegnatoId === drone.id) {
                        giaAssegnato = true;
                        break;
                    }
                }

                if (!giaAssegnato && drone.status === 'available' && drone.location.zone === delivery.destination.zone) {
                    const assignResponse = await fetch(BASE_URL + '/drones/' + drone.id + '/assign', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            deliveryId: delivery.id
                        })
                    });

                    const assignData = await assignResponse.json();

                    if (assignData.success !== true) {
                        console.log('ERRORE 400:', assignData.error);
                        console.log('Drone:', drone.id, 'Battery:', drone.battery);
                        console.log('Consegna:', delivery.id, 'Peso:', delivery.package.weight, 'Distanza:', delivery.destination.distance);
                    }

                    if (assignData.success === true) {
                        assigned.push({
                            deliveryId: delivery.id,
                            droneId: drone.id
                        });
                        droniAssegnati.push(drone.id);
                        trovatoMatch = true;
                        break;
                    }
                }
            }

            if (!trovatoMatch) {
                notAssigned.push(delivery.id);
            }
        }
    }

    return {
        assigned: assigned,
        notAssigned: notAssigned
    };
}

assegnaDroneZona().then((e) => {
    console.log(e);
})