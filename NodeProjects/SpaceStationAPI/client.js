const BASE_URI = "http://localhost:3000"
//PRO TIP: MAIUSC+F6=rename all occurences
const REFRESH_RATE_MS = 3000

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

async function startStationMonitor() {
    console.clear()

    console.log("--- results task 1---");
    let task1Res = await getSolarPanels()
    console.log(task1Res.totalPanels);
    console.log("Operational:"+task1Res.operational);
    console.log("%Operational:"+task1Res.percentage);
}

setInterval(startStationMonitor, REFRESH_RATE_MS)