const listOfCountryContinent = [
    { country: "France", continent: "Europe" },
    { country: "Singapore", continent: "Asia" },
    { country: "Paraguay", continent: "South America" }
]
const country = document.querySelector("#country")
const filter = document.querySelector("#filter")
const option = document.querySelector("select")
const add = document.querySelector("#add")
const countryList = document.querySelector("#countries")
const continentList = document.querySelector("#continents")
const removeBtn = document.querySelector(".removeBtn")
let filteredCountries = []
let filteredContinents = []
let showAllContinents = true



add.addEventListener("submit", event => {
    event.preventDefault()
    if (country.value !== "") {
        if (continentIsSelected()) {
            listOfCountryContinent.push({ country: country.value, continent: option.value })
        }
    } else {
        alert("Please insert a country!")
    }
    country.value = ""
    option.value = "selectContinent"
    const radioBtns = document.getElementsByName("cathegory")
        for (i = 0; i < radioBtns.length; i++) {
            if (radioBtns[i].value === "all") {
                radioBtns[i].checked = true
            }
        }
    drawList(listOfCountryContinent)
})

const continentIsSelected = () => {
    if (option.value === "selectContinent") {
        alert("Select a continent from the list!")
        return false
    }
    return true
}

const drawList = arr => {
    countryList.innerHTML = ""
    arr.forEach(obj => {
        const li = document.createElement("li")
        const countrySpan = document.createElement("span")
        countrySpan.className = "countrySpan"
        countrySpan.textContent = obj.country
        const continentSpan = document.createElement("span")
        continentSpan.className = "continentSpan"
        continentSpan.textContent = obj.continent
        const removeBtn = document.createElement("button")
        removeBtn.className = "removeBtn"
        removeBtn.textContent = "🗑️"
        removeBtn.addEventListener("click", () => {
            removeCountry(obj)
        })
        li.appendChild(countrySpan)
        li.appendChild(continentSpan)
        li.appendChild(removeBtn)
        countryList.appendChild(li)
    })
}
drawList(listOfCountryContinent)

const removeCountry = x => {
    const index = listOfCountryContinent.indexOf(x)
    listOfCountryContinent.splice(index, 1)
    drawList(listOfCountryContinent)
}

filter.addEventListener("input", event => {
    const searchFor = event.currentTarget.value.toLowerCase()
    if (showAllContinents) {
        filteredCountries = listOfCountryContinent.filter(obj => {
            return obj.country.toLowerCase().includes(searchFor)
        })
    } else {
        filteredCountries = filteredContinents.filter(obj => {
            return obj.country.toLowerCase().includes(searchFor)
        })
    }
    drawList(filteredCountries)
})

const filterByContinent = event => {
    if (event.value === "all") {
        showAllContinents = true
        drawList(listOfCountryContinent)
    } else {
        filteredContinents = listOfCountryContinent.filter(obj => {
            return obj.continent.toLowerCase().includes(event.value)
        })
        showAllContinents = false
        drawList(filteredContinents)
    }

}
