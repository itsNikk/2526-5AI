const API_BASE = 'http://localhost:3000';

// TASK 1: Analisi droni critici
async function analisiDroniCritici() {
  const response = await fetch(API_BASE + '/drones');
  const data = await response.json();

  const droniCritici = [];

  // Filtro droni
  for (let i = 0; i < data.drones.length; i++) {
    const drone = data.drones[i];

    //Non necessario ma più ordinato, riduce la lunghezza dell'if sottostante
    const batteryBassa = drone.battery < 30;
    const inManutenzione = drone.status === 'maintenance';
    const haProblemi = drone.maintenance.issues.length > 0;

    if (batteryBassa || inManutenzione || haProblemi) {
      droniCritici.push({
        id: drone.id,
        battery: drone.battery,
        status: drone.status,
        issuesCount: drone.maintenance.issues.length
      });
    }
  }

  // Ordina per battery crescente (Un algoritmo qualunque va bene)
  for (let i = 0; i < droniCritici.length - 1; i++) {
    for (let j = 0; j < droniCritici.length - 1 - i; j++) {
      if (droniCritici[j].battery > droniCritici[j + 1].battery) {
        const temp = droniCritici[j];
        droniCritici[j] = droniCritici[j + 1];
        droniCritici[j + 1] = temp;
      }
    }
  }

  return droniCritici;
}

// TASK 2: Consegne per zona
async function consegnePerZona() {
  const response = await fetch(API_BASE + '/deliveries');
  const data = await response.json();

  // Inizializza contatori 
  const contatori = {
    north: 0,
    south: 0,
    east: 0,
    west: 0,
    central: 0
  };

  // Conta consegne
  for (const del of data.deliveries) {
    const z = del.destination.zone
    contatori[z]++
  }

  return contatori;
}

// TASK 3: Creazione e verifica consegna
async function creazioneEVerificaConsegna() {
  // PARTE 1: Crea nuova consegna
  const createResponse = await fetch(API_BASE + '/deliveries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      destination: {
        address: 'Via Matteotti 456, Milano',
        zone: 'east'
      },
      package: {
        weight: 4.2,
        category: 'electronics',
      },
      priority: 'medium'
    })
  });

  const createData = await createResponse.json();
  const nuovoId = createData.delivery.id;

  // PARTE 2: Verifica 
  const deliveriesResponse = await fetch(API_BASE + '/deliveries');
  const deliveriesData = await deliveriesResponse.json();

  let trovata = false;
  for (const delivery of deliveriesData.deliveries) {
    if (delivery.id === nuovoId) {
      trovata = true
      break
    }
  }

  return {
    created: trovata,
    deliveryId: nuovoId,
    totalDeliveries: deliveriesData.deliveries.length
  };
}


// TASK BONUS: Dashboard
async function dashboardCompleta() {
  const dronesResponse = await fetch(API_BASE + '/drones');
  const dronesData = await dronesResponse.json();

  const deliveriesResponse = await fetch(API_BASE + '/deliveries');
  const deliveriesData = await deliveriesResponse.json();

  const zonesResponse = await fetch(API_BASE + '/zones/stats');
  const zonesData = await zonesResponse.json();

  // Conta droni per status
  const droniPerStatus = {
    available: 0,
    assigned: 0,
    'in-flight': 0,
    charging: 0,
    maintenance: 0
  };

  for (let i = 0; i < dronesData.drones.length; i++) {
    const status = dronesData.drones[i].status;
    droniPerStatus[status] = droniPerStatus[status] + 1;
  }

  // Conta consegne per status
  const consegnePerStatus = {
    pending: 0,
    assigned: 0,
    'in-transit': 0,
    completed: 0
  };

  for (let i = 0; i < deliveriesData.deliveries.length; i++) {
    const status = deliveriesData.deliveries[i].status;
    consegnePerStatus[status] = consegnePerStatus[status] + 1;
  }

  // Trova zona più attiva
  let zonaPiuAttiva = '';
  let maxConsegneAttive = 0;

  for (let i = 0; i < zonesData.zones.length; i++) {
    const zona = zonesData.zones[i];
    if (zona.activeDeliveries > maxConsegneAttive) {
      maxConsegneAttive = zona.activeDeliveries;
      zonaPiuAttiva = zona.name;
    }
  }

  console.log('=== DRONE DELIVERY SYSTEM ===');
  console.log('Droni disponibili: ' + droniPerStatus.available);
  console.log('Droni assegnati: ' + droniPerStatus.assigned);
  console.log('Droni in volo: ' + droniPerStatus['in-flight']);
  console.log('Droni in ricarica: ' + droniPerStatus.charging);
  console.log('Droni in manutenzione: ' + droniPerStatus.maintenance);
  console.log('');
  console.log('Consegne pending: ' + consegnePerStatus.pending);
  console.log('Consegne assigned: ' + consegnePerStatus.assigned);
  console.log('Consegne in-transit: ' + consegnePerStatus['in-transit']);
  console.log('Consegne completate: ' + consegnePerStatus.completed);
  console.log('');
  console.log('Zona più attiva: ' + zonaPiuAttiva + ' (' + maxConsegneAttive + ' consegne attive)');
}

//Just for easy testing
async function runAllTasks() {
  console.log('========================================');
  console.log('TEST TASK 1: Analisi droni critici');
  console.log('========================================');
  const task1 = await analisiDroniCritici();
  console.log(task1);
  console.log('');

  console.log('========================================');
  console.log('TEST TASK 2: Consegne per zona');
  console.log('========================================');
  const task2 = await consegnePerZona();
  console.log(task2);
  console.log('');

  console.log('========================================');
  console.log('TEST TASK 3: Creazione e verifica');
  console.log('========================================');
  const task3 = await creazioneEVerificaConsegna();
  console.log(task3);
  console.log('');

  console.log('========================================');
  console.log('TEST BONUS: Dashboard completa');
  console.log('========================================');
  await dashboardCompleta();
}

runAllTasks();

