let subBtn = document.getElementById("subBtn")
let userInElem = document.getElementById("userIn")

userInElem.addEventListener("keyup", () => {
    if (userInElem.value.length >= 20) {
        subBtn.disabled = false
    } else {
        subBtn.disabled = true
    }
})


subBtn.addEventListener("submit", (e) => {
    e.preventDefault()

    alert("Submitted!")
})