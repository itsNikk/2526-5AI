// il DOM gestisce 
// con un input l'inserimento nell lista dei voti
//

let grades = []

//1) prendere tag html dal DOM
let btn = document.getElementById("calc")
let res = document.getElementById("res")
let addBtn = document.getElementById("addValue")
let usIn = document.getElementById("userIn")
let reset = document.getElementById("reset")

reset.addEventListener("click", () => {
    grades = []
})

usIn.addEventListener("keydown", () => {
    grades.push(Number(usIn.value))
    usIn.value = ""
})


btn.addEventListener("click", () => {
    const numberOfGrades = grades.length
    let gradeSum = 0

    //sommo tutti i voti
    for (let i = 0; i < numberOfGrades; i++) {
        gradeSum += grades[i]
    }

    const avarage = gradeSum / numberOfGrades

    //tofixed(n) => prende n decimali
    res.textContent = "Media: " + avarage.toFixed(2)

    if (avarage >= 6) {
        res.textContent += " Promosso!"
    } else {
        res.textContent += " Bocciato!"

    }

})


// () => {} -> arrow function/lambda function / funzone anonima