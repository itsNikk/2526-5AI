//numero bottoni
const numButtons = 5;

let container = document.getElementById("btnContainer");

for (let i = 0; i < numButtons; i++) {
    let newBtn = document.createElement("button");

    //Math.floor() => arrotonda per difetto = a fare parseInt()
    const index = parseInt(Math.random() * 10) + 1

    newBtn.id = "b" + i;

    newBtn.textContent = index;

    container.append(newBtn);
}