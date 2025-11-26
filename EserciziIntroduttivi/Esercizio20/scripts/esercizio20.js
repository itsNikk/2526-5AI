let btn = document.getElementById("genBtn")
let notificationContainer = document.getElementById("notificationContainer")

let index = 1;

//for fun
setInterval(() => {
    index = 0;
}, 10000);

btn.addEventListener("click", () => {
    let newNotification =
        document.createElement("div")
    newNotification.textContent = "NOTIFICA #" + index++

    newNotification.addEventListener("click", () => {
        index = 0;
    })

    notificationContainer.append(newNotification)

    setTimeout(() => {
        newNotification.remove()
    }, 3000)
})