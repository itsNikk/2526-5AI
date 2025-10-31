let names = ["AURORA", "cristiano", "nicolò", "pietro"]


let resObj = document.getElementById("res")
//find max. le str sono array
//foreach JS 
// per ogni elem della collezione names. for non indicizzato
// [5,2,9,7]

let maxName = names[0]
for (elem of names) {
    if (elem.length > maxName.length) {
        maxName = elem
    }
}

//show result
resObj.textContent = maxName