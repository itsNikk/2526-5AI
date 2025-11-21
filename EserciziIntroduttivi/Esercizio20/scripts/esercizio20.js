let btn = document.getElementById("genBtn")
let notificationContainer = document.getElementById("notificationContainer")

let index = 1;
btn.addEventListener("click", () => {
    let newNotification =
        document.createElement("div")

    newNotification.textContent = "NOTIFICA #" + index++

    notificationContainer.append(newNotification)



})