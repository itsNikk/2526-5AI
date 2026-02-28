const BASE_URI = "http://localhost:3000"
//PRO TIP: MAIUSC+F6 (while mouse cursor on variable)=rename all occurences
const REFRESH_RATE_MS = 3000

//Task 1
async function getSolarPanels() {
    const resp = await fetch(BASE_URI + "/station/status");

    if (resp.ok) {
        const json = await resp.json();
        //       console.log(json);
        const totalPanels = json.power.solar.panels
        const totalPanelsLength = json.power.solar.panels.length
        //     console.log(totalPanels);

        let activeCount = 0;
        for (const panel of totalPanels) {
            if (panel.status === "nominal") {
                activeCount++;
            }
        }

        const percentage = (activeCount / totalPanelsLength) * 100

        return {
            totalPanels: totalPanels,
            operational: activeCount,
            percentage: percentage
        }
    }
}

//Task 2
async function trovaModuliDegradati() {
    const response = await fetch(BASE_URL + '/station/modules');
    const data = await response.json();

    const moduliProblematici = [];

    for (let i = 0; i < data.modules.length; i++) {
        const modulo = data.modules[i];

        // Controlla se il modulo ha subsystems ... perchè è importante?
        if (modulo.systems && modulo.systems.subsystems) {
            const degradedSystemNames = [];

            for (let j = 0; j < modulo.systems.subsystems.length; j++) {
                const subsystem = modulo.systems.subsystems[j];
                if (subsystem.status !== 'nominal') {
                    degradedSystemNames.push(subsystem.name);
                }
            }

            // Se ha trovato almeno un sistema degradato, aggiungi il modulo
            if (degradedSystemNames.length > 0) {
                moduliProblematici.push({
                    moduleId: modulo.id,
                    degradedSystemNames: degradedSystemNames
                });
            }
        }
    }

    return moduliProblematici;
}

//Task 3
async function calcolaConsumiEsperimenti() {
    const response = await fetch(BASE_URL + '/station/modules');
    const data = await response.json();

    let totalPower = 0;
    let totalCooling = 0;
    let activeExperimentsCount = 0;

    for (let i = 0; i < data.modules.length; i++) {
        const modulo = data.modules[i];

        // è un esperimento di lab?
        if (modulo.type === 'laboratory' && modulo.experiments) {
            for (let j = 0; j < modulo.experiments.length; j++) {
                const experiment = modulo.experiments[j];

                if (experiment.status === 'active') {
                    totalPower = totalPower + experiment.resourceConsumption.power;
                    totalCooling = totalCooling + experiment.resourceConsumption.cooling;
                    activeExperimentsCount = activeExperimentsCount + 1;
                }
            }
        }
    }

    return {
        totalPower: totalPower,
        totalCooling: totalCooling,
        activeExperimentsCount: activeExperimentsCount
    };
}

//Task4
async function gestioneEnergiaCritica() {
    const statusResponse = await fetch(BASE_URL + '/station/status');
    const statusData = await statusResponse.json();

    const reserves = statusData.power.reserves;

    if (reserves >= 95) {
        return {
            message: 'Energia sufficiente, nessuna azione necessaria'
        };
    }

    const modulesResponse = await fetch(BASE_URL + '/station/modules');
    const modulesData = await modulesResponse.json();

    const esperimentiAttivi = [];

    for (let i = 0; i < modulesData.modules.length; i++) {
        const modulo = modulesData.modules[i];

        if (modulo.type === 'laboratory' && modulo.experiments) {
            for (let j = 0; j < modulo.experiments.length; j++) {
                const experiment = modulo.experiments[j];

                if (experiment.status === 'active') {
                    esperimentiAttivi.push({
                        experimentId: experiment.id,
                        name: experiment.name,
                        powerConsumption: experiment.resourceConsumption.power
                    });
                }
            }
        }
    }

    return esperimentiAttivi;
}


async function startStationMonitor() {
    console.clear()

    try {
        //Task 1
        console.log("--- results task 1---");
        let task1Res = await getSolarPanels()
        console.log(task1Res.totalPanels);
        console.log("Operational:" + task1Res.operational);
        console.log("%Operational:" + task1Res.percentage);

        //res task2
        console.log("--- Task 2 results ---");
        const degradedMods = await trovaModuliDegradati()
        console.log(degradedMods);

        //res task3
        console.log("--- Task 3 results ---");
        const expConsumption = await calcolaConsumiEsperimenti()
        console.log(expConsumption);

        //res task4
        console.log("--- Task 4 results ---");
        const stationEnergy = await gestioneEnergiaCritica();
        console.log(stationEnergy);
    } catch (error) {
        console.log("ERRORE di rete: ", error.message);
    }

}

setInterval(startStationMonitor, REFRESH_RATE_MS)