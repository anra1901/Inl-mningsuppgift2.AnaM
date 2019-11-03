const country = document.querySelector("#country")
const filter = document.querySelector("#filter")
const option = document.querySelector("select")
const add = document.querySelector("#add")
const countryList = document.querySelector("#countries")
const continentList = document.querySelector("#continents")
const listOfCountries = ["France", "Singapore", "Paraguay"]
const listOfContinents = ["Europe", "Asia", "South America"]
const removeBtn = document.querySelector(".removeBtn")

add.addEventListener("submit", event => {
    event.preventDefault()
    if (country.value !== "") {
        if (continentIsSelected()) {
            listOfCountries.push(country.value)
            listOfContinents.push(option.value)
        }
    } else {
        alert("Please insert a country!")
    }
    country.value = ""
    drawList(listOfCountries)
})

function continentIsSelected() {
    if (option.value === "selectContinent") {
        alert("Select a continent from the list!")
        return false
    }
    return true
}

function drawList(arr) {
    countryList.innerHTML = ""
    arr.forEach(x => {
        const li = document.createElement("li")
        const countrySpan = document.createElement("span")
        countrySpan.className = "countrySpan"
        countrySpan.textContent = x
        const continentSpan = document.createElement("span")
        continentSpan.className = "continentSpan"
        continentSpan.textContent = listOfContinents[arr.indexOf(x)]
        const removeBtn = document.createElement("button")
        removeBtn.className = "removeBtn"
        removeBtn.textContent = "🗑️"
        removeBtn.addEventListener("click", () => {
            removeCountry(x)
        })
        li.appendChild(countrySpan)
        li.appendChild(continentSpan)
        li.appendChild(removeBtn)
        countryList.appendChild(li)
    })
}
drawList(listOfCountries)

function removeCountry(x) {
    const index = listOfCountries.indexOf(x)
    listOfCountries.splice(index, 1)
    listOfContinents.splice(index, 1)
    drawList(listOfCountries)
}

filter.addEventListener("input", event => {
    const searchFor = event.currentTarget.value.toLowerCase()
    const filteredCountries = listOfCountries.filter(country => {
        return country.toLowerCase().includes(searchFor)
    })
    drawList(filteredCountries)
})

