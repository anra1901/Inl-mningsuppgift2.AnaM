const country = document.querySelector("#country")
const filter = document.querySelector("#filter")
const option = document.querySelector("select")
const add = document.querySelector("#add")
const countryList = document.querySelector("#countries")
const continentList = document.querySelector("#continents")
const listOfCountryContinent = [
    {country: "France", continent: "Europe"},
    {country: "Singapore", continent: "Asia"},
    {country: "Paraguay", continent: "South America"}
]
const removeBtn = document.querySelector(".removeBtn")

add.addEventListener("submit", event => {
    event.preventDefault()
    if (country.value !== "") {
        if (continentIsSelected()) {
            listOfCountryContinent.push({country: country.value, continent: option.value})
        }
    } else {
        alert("Please insert a country!")
    }
    country.value = ""
    drawList(listOfCountryContinent)
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

function removeCountry(x) {
    const index = listOfCountryContinent.indexOf(x)
    listOfCountryContinent.splice(index, 1)
    drawList(listOfCountryContinent)
}

filter.addEventListener("input", event => {
    const searchFor = event.currentTarget.value.toLowerCase()
    const filteredCountries = listOfCountryContinent.filter(obj => {
        return obj.country.toLowerCase().includes(searchFor)
    })
    drawList(filteredCountries)
})

