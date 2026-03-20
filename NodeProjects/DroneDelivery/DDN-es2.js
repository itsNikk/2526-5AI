const API_BASE_URL = 'http://localhost:3000';

// TASK 1: Ricarica droni scarichi
async function ricaricaDroniScarichi() {
  const dronesResponse = await fetch(API_BASE_URL + '/drones');
  const dronesData = await dronesResponse.json();
  
  const risultati = [];
  
  for (const drone of dronesData.drones) {
    if (drone.battery < 40) {
      const batteryBefore = drone.battery;
      const incremento = batteryBefore * 0.30;
      
      const putResponse = await fetch(API_BASE_URL + '/drones/' + drone.id + '/battery', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          charge: incremento
        })
      });
      
      const putData = await putResponse.json();
      const batteryAfterCharge = putData.drone.battery;
      
      risultati.push({
        droneId: drone.id,
        batteryPrima: batteryBefore,
        batteryDopo: batteryAfterCharge
      });
    }
  }
  
  return risultati;
}

// TASK 2: Pulizia consegne vecchie
async function clearOldDeliveries() {
  const response = await fetch(API_BASE_URL + '/deliveries');
  const data = await response.json();
  
  const now = Date.now();
  const oreIn48 = 48 * 60 * 60 * 1000;
  
  let conteggioEliminati = 0;
  
  for (const delivery of data.deliveries) {
    if (delivery.status === 'pending') {
      const createdTime = new Date(delivery.timeline.created).getTime();
      const differenza = now - createdTime;
      
      if (differenza > oreIn48) {
        const deleteResponse = await fetch(API_BASE_URL + '/deliveries/' + delivery.id, {
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

// TASK 3: Assegnazione automatica zona-compatibile
async function autoAssignDelivery() {
  const deliveriesResponse = await fetch(API_BASE_URL + '/deliveries');
  const deliveriesData = await deliveriesResponse.json();
  
  const dronesResponse = await fetch(API_BASE_URL + '/drones');
  const dronesData = await dronesResponse.json();
  
  const assigned = [];
  const notAssigned = [];
  
  // Array per tracciare droni già assegnati in questa sessione
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
          const assignResponse = await fetch(API_BASE_URL + '/drones/' + drone.id + '/assign', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              deliveryId: delivery.id
            })
          });
          
          const assignData = await assignResponse.json();
          
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

// TASK 4: Assegnazione consegne urgenti con setup dati
async function assignUrgentDelivery() {
  // FASE 1: Verifica consegne high esistenti
  const initialResponse = await fetch(API_BASE_URL + '/deliveries');
  const initialData = await initialResponse.json();
  
  let conteggioHigh = 0;
  for (const delivery of initialData.deliveries) {
    if (delivery.status === 'pending' && delivery.priority === 'high') {
      conteggioHigh = conteggioHigh + 1;
    }
  }
  
  // Se meno di 2, creane altre
  let created = 0;
  const zone = ['north', 'south', 'east', 'west'];
  
  while (conteggioHigh + created < 2) {
    const zonaScelta = zone[created % zone.length];
    
    await fetch(API_BASE_URL + '/deliveries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        destination: {
          address: 'Via Test ' + (created + 1) + ', Milano',
          zone: zonaScelta
        },
        package: {
          weight: 2.0,
          category: 'food',
          fragile: false
        },
        priority: 'high'
      })
    });
    
    created = created + 1;
  }
  
  // FASE 2: Assegna consegne high
  const deliveriesResponse = await fetch(API_BASE_URL + '/deliveries');
  const deliveriesData = await deliveriesResponse.json();
  
  const dronesResponse = await fetch(API_BASE_URL + '/drones');
  const dronesData = await dronesResponse.json();
  
  const assigned = [];
  const notAssigned = [];
  const droniAssegnati = [];
  
  for (const delivery of deliveriesData.deliveries) {
    if (delivery.status === 'pending' && delivery.priority === 'high') {
      let trovatoMatch = false;
      
      for (const drone of dronesData.drones) {
        let giaAssegnato = false;
        for (const droneAssegnatoId of droniAssegnati) {
          if (droneAssegnatoId === drone.id) {
            giaAssegnato = true;
            break;
          }
        }
        
        if (!giaAssegnato && drone.status === 'available' && drone.location.zone === delivery.destination.zone) {
          const assignResponse = await fetch(API_BASE_URL + '/drones/' + drone.id + '/assign', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              deliveryId: delivery.id
            })
          });
          
          const assignData = await assignResponse.json();
          
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
    created: created,
    assigned: assigned,
    notAssigned: notAssigned
  };
}


// TASK 5: Workflow completo
async function performCompleteWorkflow() {
  // FASE 1: Crea consegna
  const createResponse = await fetch(API_BASE_URL + '/deliveries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      destination: {
        address: 'Via Verdi 42, Milano',
        zone: 'north'
      },
      package: {
        weight: 2.5,
        category: 'food',
        fragile: false
      },
      priority: 'high'
    })
  });
  
  const createData = await createResponse.json();
  const deliveryId = createData.delivery.id;
  
  // FASE 2: Trova drone disponibile in zona north
  const dronesResponse = await fetch(API_BASE_URL + '/drones');
  const dronesData = await dronesResponse.json();
  
  let droneId = null;
  for (const drone of dronesData.drones) {
    if (drone.status === 'available' && drone.location.zone === 'north') {
      droneId = drone.id;
      break;
    }
  }
  
  // FASE 3: Assegna drone
  await fetch(API_BASE_URL + '/drones/' + droneId + '/assign', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      deliveryId: deliveryId
    })
  });
  
  // FASE 4: Metti in transito
  await fetch(API_BASE_URL + '/deliveries/' + deliveryId, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      status: 'in-transit'
    })
  });
  
  // FASE 5: Verifica timeline
  const verifyResponse = await fetch(API_BASE_URL + '/deliveries');
  const verifyData = await verifyResponse.json();
  
  let inTransitTime = null;
  for (const delivery of verifyData.deliveries) {
    if (delivery.id === deliveryId) {
      inTransitTime = delivery.timeline.inTransit;
      break;
    }
  }
  
  return {
    deliveryId: deliveryId,
    droneId: droneId,
    inTransitTime: inTransitTime
  };
}

async function testTuttiITask() {
  console.log('========================================');
  console.log('TEST TASK 1: Ricarica droni scarichi');
  console.log('========================================');
  const task1 = await ricaricaDroniScarichi();
  console.log(task1);
  console.log('');
  
  console.log('========================================');
  console.log('TEST TASK 2: Pulizia consegne vecchie');
  console.log('========================================');
  const task2 = await clearOldDeliveries();
  console.log('Consegne eliminate: ' + task2);
  console.log('');
  
  console.log('========================================');
  console.log('TEST TASK 3: Assegnazione zona-compatibile');
  console.log('========================================');
  const task3 = await autoAssignDelivery();
  console.log(task3);
  console.log('');
  
  console.log('========================================');
  console.log('TEST TASK 4: Assegnazione consegne urgenti');
  console.log('========================================');
  const task4 = await assignUrgentDelivery();
  console.log(task4);
  console.log('');
  
  console.log('========================================');
  console.log('TEST TASK 5: Workflow completo');
  console.log('========================================');
  const task5 = await performCompleteWorkflow();
  console.log(task5);
}
//testTuttiITask();