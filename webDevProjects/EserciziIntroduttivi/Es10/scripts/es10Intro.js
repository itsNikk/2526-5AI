// il DOM gestisce 
// con un input l'inserimento nell lista dei voti


const grades = []

//1) prendere tag html dal DOM
let btn = document.getElementById("calc")
let res = document.getElementById("res")

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