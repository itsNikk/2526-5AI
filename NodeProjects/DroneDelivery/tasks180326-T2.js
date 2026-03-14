const BASE_URL = "http://localhost:3000"

async function deleteTooOldDeliveries() {
    const response = await fetch(BASE_URL + '/deliveries');
    const data = await response.json();

    const now = Date.now();
    const millisecondiIn48Ore = 48 * 60 * 60 * 1000; 

    let conteggioEliminati = 0;

    for (const delivery of data.deliveries) {
        if (delivery.status === 'pending') {
            const createdTime = new Date(delivery.timeline.created).getTime();
            const differenzaInMillis = now - createdTime;

            if (differenzaInMillis > millisecondiIn48Ore) {
                const deleteResponse = await fetch(BASE_URL + '/deliveries/' + delivery.id, {
                    method: 'DELETE'
                });

                const deleteData = await deleteResponse.json();

                if (deleteData.success === true) {
                    conteggioEliminati = conteggioEliminati + 1;
                }
            }
        }
    }

    return conteggioEliminati;
}

deleteTooOldDeliveries().then((e) => {
    console.log(e);
})