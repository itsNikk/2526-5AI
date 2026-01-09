//numero bottoni
const numButtons = 5;

let container = document.getElementById("btnContainer");
let targetBtn = document.getElementById("target");

for (let i = 0; i < numButtons; i++) {
    let newBtn = document.createElement("button");

    //Math.floor() => arrotonda per difetto = a fare parseInt()
    const index = 1 + parseInt(Math.random() * 10)

    newBtn.id = "b" + i;

    newBtn.textContent = index;

    container.append(newBtn);
}

targetBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        //togli un punto a chi di dovere
        let btnToDamage = document.getElementById(targetBtn.value)
        //check if null...
        if (btnToDamage === null) throw new Error("Bottone non trovato")
        btnToDamage.textContent = Number(btnToDamage.textContent) - 1
        //Se vita bottone <=0 eliminalo dal DOM
        if (Number(btnToDamage.textContent) <= 0) btnToDamage.remove()
    }
})